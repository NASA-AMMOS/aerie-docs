# Advanced - Database Migrations

To aid in migrating between database versions we provide a Python script called [aerie_db_migration.py](https://github.com/NASA-AMMOS/aerie/blob/develop/deployment/aerie_db_migration). In order to run it, the following software is required:

- [Python 3.7](https://www.python.org/downloads/) or later
- [Hasura CLI 2.13.0](https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/) or later

Additional Python package requirements can be installed by running the following command in the [deployment](https://github.com/NASA-AMMOS/aerie/tree/develop/deployment) directory:

```sh
python -m pip install -r requirements.txt
```

Once the prerequisite software has been installed, the script can be executed by running the following command from inside the Aerie [deployment](https://github.com/NASA-AMMOS/aerie/tree/develop/deployment) directory:

```sh
python aerie_db_migration.py
```

Alternatively, you can add the script to your `PATH` and run it from anywhere with the command `aerie_db_migration.py`:

```sh
export PATH="$HOME/path/to/deployment:$PATH"
```

The script expects all migration files present on the server to also exist on the local machine. In order to reset the state of all migrations (for example, to be able to remove old migration files), see the [Hasura documentation](https://hasura.io/docs/latest/migrations-metadata-seeds/resetting-migrations-metadata/).

## Arguments

`aerie_db_migration` takes the following command line arguments:

```sh
aerie_db_migration.py [-h] (-a | -r) [--all] [-db DB_NAMES [DB_NAMES ...]] [-p HASURA_PATH] [-e ENV_PATH] [-n NETWORK_LOCATION]
```

| Option Name                                                              | Option Description                                                                                                           |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `-h`, `--help`                                                           | Shows the help message.                                                                                                      |
| `-a`, `--apply`                                                          | Apply migration steps to specified databases.                                                                                |
| `-r`, `--revert`                                                         | Revert migration steps to specified databases.                                                                               |
| `--all`                                                                  | Apply (Revert) _ALL_ unapplied (applied) migration steps to specified databases.                                             |
| `-db DB_NAMES [DB_NAMES ...]`, <br/>`--db-names DB_NAMES [DB_NAMES ...]` | List of databases to migrate. Migrates all available databases if unspecified.                                               |
| `-p HASURA_PATH`, `--hasura-path HASURA_PATH`                            | The path to the directory containing the `config.yaml` for Aerie. Defaults to `./hasura`                                     |
| `-e ENV_PATH`, `--env-path ENV_PATH`                                     | The path to the `.env` file used to deploy Aerie. **Must** define `AERIE_USERNAME` and `AERIE_PASSWORD`. Defaults to `.env`. |
| `-n NETWORK_LOCATION`, `--network-location NETWORK_LOCATION`             | The network location of the database. Defaults to `localhost`.                                                               |

It is necessary to at least specify `--apply` or `--revert`.

If you are not running `aerie_db_migration` from within `deployment`, or if the `hasura` directory containing the `config.yaml` and the `migrations` directory is not in the directory that `aerie_db_migration` is being run from, then it is necessary to specify `--hasura-path`.

## Migrating a Database

If `--all` has been specified, then `aerie_db_migration.py` will automatically apply or revert all applicable changes to the specified databases (or all available databases if none are specified). It will then output the details of each change applied, followed by the overall status. For example:

```sh
> aerie_db_migration.py -a -db AerieMerlin --all
###########
AerieMerlin
###########
VERSION        TYPE  NAME
1667319761264  up    test_migration
INFO migrations applied
INFO Metadata reloaded
INFO Metadata is consistent

###############
Database Status
###############

Database: AerieMerlin
VERSION        NAME            SOURCE STATUS  DATABASE STATUS
1667319761264  test_migration  Present        Present
```

Otherwise, `aerie_db_migration` will enter a step-by-step mode, where you first select which database to migrate, and then select whether
to apply each available migration step. For example:

```sh
> aerie_db_migration.py -a -db AerieMerlin
###############################
AERIE DATABASE MIGRATION HELPER
###############################

0) Quit the migration helper

1) Database: AerieMerlin
VERSION        NAME            SOURCE STATUS  DATABASE STATUS
1667319761264  test_migration  Present        Not Present

Select a database to migrate (0-1): 1

###########
AerieMerlin
###########

MIGRATION STEPS AVAILABLE:
VERSION        NAME            SOURCE STATUS  DATABASE STATUS
1667319761264  test_migration  Present        Not Present

CURRENT STEP:

VERSION        TYPE  NAME
1667319761264  up    test_migration

Apply 1667319761264_test_migration? (y/n): _
```

Entering `y` will apply the migration and then proceed to the next step,
should one exist. Entering `n` will return to the Database Selection screen.

Entering `q` at any point will exit the program.
