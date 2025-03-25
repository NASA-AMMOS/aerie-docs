# ADR-0### - Phoenix Data Persistence

## Status

Proposed

## Context

With the introduction of actions (see [ADR-0101](adr-0101-aerie-actions)), we expect users to perform various operations on sequences such a compiling, static checking, and checking against simulation results. Such actions will likely require numerous configuration files and produce output files that users will want to store alongside the sequence.

Currently, only sequences can be stored in Phoenix within a workspaces, but we plan to extend the capability of workspaces such that it can include non-sequence files. Workspaces are a common location where users (mission operators) can collaborate together to ready sequences for uplink. As a containerized, cloud native application, we need a way to manage these workspaces and store all of the sequence files and other associated files, some of which may be large files.

In the current Aerie architecture, a docker volume is used to store files the user needs to access to like .jar model files. If the user wants access to other custom files (e.g. SPICE kernels), the user has to alter the Docker deployment to mount a local file system.

The high-level requirements for this capability include:

- Store sequence and non-sequence files (some of which may be large files) in workspaces
- Stay cloud-agnostic (e.g. persistent storage solution should not rely upon AWS or GCP)
- Optional version control of files
- Ability to reference/share files between workspaces
- All added dependencies must be free and open-source

## Alternatives considered

Below are some options that were considered and some pros/cons of each

### Object Storage (e.g., AWS S3, GCP Cloud Storage, Azure Blob Storage, MinIO for cloud-provider agnostic)

**Pros:**

- Scalable & performant: Designed for large file storage and streaming; better for large binaries than Postgres.
- Cloud-native: Fits naturally in containerized architectures.
- Versioning: Built-in support (S3, for example, can keep file versions).
- Sharing: Easy to share files by workspace through URL-based access or APIs.
- Tooling: Many SDKs and integrations with CI/CD, data pipelines, etc.
- If missions have other cloud-data stores, pushing/pulling from these stores would be simplified

Cons:

- Requires external service: Needs S3/MinIO server running if self-hosted.
- Lose simplicity of direct file system manipulation, perhaps from different tools
- Eventually consistent: May not be ideal for strict ACID-type file ops.
- Permission management: More complex than a simple DB and will require mapping to our role/permission model.

### Filesystem Storage (e.g., mounted NFS, EFS, or local persistent volumes)

Pros:

- Simple: Feels like a normal directory tree. Great for tools that expect a traditional FS layout.
- No external service required (unless you use NFS/EFS).
- Fine-grained control over permissions and structure.

Cons:

- Scaling: Hard to scale across nodes without something like NFS/EFS.
- Manual versioning: Need to build our own system or integrate git-like behavior.
- Complex in containers: Docker volumes (esp. local ones) don’t persist or scale well across replicas or clusters.

### Docker Volumes (local or named volumes)

Pros:

- Simple for dev/test: Good for prototyping and local workflows.
- Ephemeral workspace: Great for stateless test runners or pipelines.

Cons:

- Not shareable across containers easily (especially across hosts in a cluster).
- Hard to manage: No easy interface to browse/manage contents.
- No native metadata/versioning

### Database BLOB Storage (e.g., Postgres bytea or large objects)

Pros:

- Transactional: Great for small files tied closely to other DB records.
- Simple permissions: Easily inherits from our existing DB role/permission model.

Cons:

- Poor performance with large files (>1MB) or high-throughput workloads.
- Backups and bloat: DB can grows quickly and become hard to manage.
- No streaming: Not great for partial reads or binary pipelines.

### Git-based Storage (e.g., git repos per workspace)

Pros:

- Native versioning: Tracks history, diffs, authorship.
- Tooling: Developers are comfortable with git; works well with CI/CD.

Cons:

- Complex implementation: Need a service to abstract git operations per user/session.
- Poor performance with large binary files.
- Overhead: Conflicts, merges, and large histories can become painful.

This may work well for tracking source-like files (e.g. sequences) — but probably not the best for outputs and compiled artifacts.

## Decision

- Use Object Storage

  - Specifically use MinIO, which has the following benefits
    - S3 API compatible: You can build your software as if you're using AWS S3 and S3 API support is also common across other cloud-providers
    - Multi-cloud and on-prem deployable
    - Lightweight and performant.
    - Open source and has a large community.
    - Kubernetes-native (we have customers currently deploying Aerie via Kubernetes)

- Store Metadata in Postgres:

  - File metadata, version pointers, and relationships between sequences, users, and workspaces.

- Wrap All Access via an API Gateway:
  - Implement workspace-aware access policies and permission checks.
  - Abstract away storage backend details from the client/UI.

## Consequences

- We will inevitably incur some technical debt as we rush to deliver something for Clipper, but this should in part be mitigated by establishing an adaptation interface.
- Tying Phoenix to the activity planning portion of Aerie could cause issues if a mission wants to take Phoenix updates without taking activity planning updates, especially if those updates include breaking changes.
- Adds a new dependency (CodeMirror) to Aerie so that Aerie will now depend on two code editors (Monaco for scheduling, constraint, and expansion eDSLs and CodeMirror for sequencing). This will likely increase maintenance costs.
- The activity expansion capability within Aerie will expand sequences into seq-json as opposed to seqN, so developers of expansions will have to be familiar with two separate languages instead of one.

## References

- https://codemirror.net/
- https://lezer.codemirror.net/
