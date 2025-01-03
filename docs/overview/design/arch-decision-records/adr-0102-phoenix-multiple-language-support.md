# ADR-0102 - Multiple Sequence Language Support DRAFT
## Context 
Phoenix will need to be able to support multiple sequencing in multiple languages: VML, SASF, SATF, SEQN, and more. Some formats are mainly import and export formats (ie., will not need to edit in those formats directly), while other formats must be supported for live editing and 

## Decision
- Define grammar files for **import** syntaxes for conversion
- Define grammar files for **editing** syntaxes
- Define **actions** for translation+export, compilation, data store, etc. 
- *Use file extensions to determine input type, similar to industry coding practices (to re-visit)*
- Example:
	- Upload sequence in SATF import format.
	- Detect import format via .satf file extension, parse via SATF grammar file, convert to SEQN edit format via SEQN grammar file. 
	- Populate Phoenix SDE with seqn editing format.
	- Export back to SATF via mission action. 

## Consequences
- Projects will need to provide grammar files for both import and edit formats.
- Projects will need to author actions for custom export formats. 
- SDE workspaces will support multiple languages in the same workspace

## Alternatives considered
1. Define all import/export behavior in project adaptations 
2. Define edit language as a workspace setting, rather than using file extensions 
3. 


Next Steps: 
1. Finish sasf/satf grammars
2. Finalize ADR on "actions" 
3. Defining an action spec 
4. Use a spec to write a translate action using an sasf or satf grammar file to get to seqn
5. Implement action in psyche adaptation 
Parallel track: 
1. Figure out "core" language support for editor
2. How do you define which formats I want to be able to open? 
3. Upload SASF and VML grammar and tell editor "these are the two files I want to be able to edit in" 

- How should globals be handled?
	- Special file you upload as like a dictionary
	- Should be more restricted than a sequence 
	- Would like to not have to update aerie core every new file type that we encounter 
	- Dream scenario: way to have generic dictionaries in a developer-friendly shape for adaptation authors 
		- Will require user-defined code somewhere 
		- We can author that code, but how many different paths? 
		- Don't want to have parsers for every type of input in core 
		- Not a good fit for an "action" 
	- how do we support many types of auxiliary files? 
Solution
* Offload exporters into plugins (actions) 
	* Adaptation layer invoke code for export 
	* Move everything out of core
	* Use plugins to export what they want

- Need to support multiple editing languages in one 



Side discussion on actions: 
- Actions will exist for things like compilation, translation, export, simulation, etc. 
	- All lumped under plugins before - now these are actions.
	- These can happen in a workflow
	- Expected inputs/outputs - controlled when you run them 
- Vs a plugin: code that can run all the time
- What's not clear: is everything an action? Or are there actions plus other things? 
	- likely actions + other things (adaptation isn't going away) 
- Allow us to define one actions interface 
- Languages are fuzzy: 
	- Need actions to translate from actions to one
	- but also an implicit editor feature
- Re-label to "action" and "core"? 
- What about hooks and actions? 
- 