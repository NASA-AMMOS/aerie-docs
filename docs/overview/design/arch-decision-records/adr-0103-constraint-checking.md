## Context 

* All projects need to perform flight rule and constraint checks at different points during their operational processes. Examples: 
	* Constraint checks on plan fragments 
	* Constraint checks on integrated & simulated plans 
	* Static (no simulation) checks on individual sequences
	* Static (no simulation) checks on batches of sequences 
	* Constraint checks on integrated sequence simulation 
* All projects have a strong desire to quickly implement and deploy new flight rule checks in order to get them into the operational process as fast as possible, to minimize the risk of violating newly identified flight rules  
* MPSA offers two solutions for constraint checking today: 
	* Aerie constraint checker on simulated Aerie plans 
	* SEQGEN flight rule checker via FMRF as part of SEQGEN adaptation, which checks flight rules during SEQGEN simulations 
* There are very few non-JPL missions today that use SEQGEN for flight rule checking 
* There have been several notable cases where missions have opted to move several, the majority of, or even all of their flight rule checking out of SEQGEN into alternate tools: 
	* Europa Clipper (FRESH)
	* M2020 (SEQER, SOCER)
	* SphereX (Blackbird, seq_checks)
	* Psyche (sct_review)
* There are several missions currently in operation that use SEQGEN for flight rule checking for which SEQGEN flight rule checking capabilities must be maintained: 
	* Psyche
	* Europa Clipper
	* Juno
	* ODY 
	* MRO
	* MSL 
	* Many more... 
* Europa Clipper developed FRESH for flight rule checking, which is a powerful python flight rule checking library
	* FRESH currently is only used for static flight rule checks
	* However, it could easily be updated to read simulation data and 
* Objectives: 
	* Enable operators to specify/change flight rules independent of sim in order to enable quick development and deployment of flight rules to the correct place in the process
	* Provide a standardized way of developing flight rule checks and reporting flight rule check results *without forcing customers to use our solution*

## User Feedback Highlights: Flight Rule Checking 
* SEQGEN feedback: 
	* Implementing new flight rules in SEQGEN is always a challenge
	* Taking flight rule checking out of the adaptation framework will make them easier to author
	* Avoid dictating where flight rules get checked. There are always going to be Python-level checks at the end. 
	*  Authoring flight rule checks in something more universally known like python, csv files, or even something like yaml files would have benefits over FMRFs
* FR check outcomes should enable more nuance and human intervention
* Lack of standardization across flight rule report outputs creates a challenge
* Explore the idea of separating simulation from FR checking
* "Stand alone" rules vs. "integrated rules" should be well-defined and bounded
* Need to enable doing as many FR checks as possible early in the process

See all gather user feedback on flight rule checking here: https://airtable.com/appgTVNl5jTiex4wN/shrkgYE5c5Z9sHQCn/tblPYcdxG7srDKy5o

##  Solution Space 
1. Adopt FRESH as an MPSA solution for flight rule & constraint checking
	1. Add ability to read in generic simulation data (SEQGEN PEF, Aerie sim, or others) 
		1. Start with PEF, explore possibility of Aerie data, and SSIM 
	2. Add report generation capability for FRESH SEQGEN results 
	3. Add ability to read and pass through flight rule checks performed by other tools
	4. Add fresh "core" and "adaptation" layer separation 
	5. Develop example adaptations with flight rule checks 
2. Invest in & Improve SEQGEN flight rule checking
	1. Already added FRESH-like CSV checking already added 
3. Use Aerie constraints checking for sequence simulation and static flight rule checking 
	1. Determine way to pass PEF or generic sim data to Aerie constraint checking 
	2. Utilize existing aerie constraint checking on generic sim data 

| Solution                                        | Pros                                                                                                                                                                                                                                                                                                                                                                                   | Cons                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Adopt & Provide FRESH as an MPSA solution       | - Enables flight rule checking in Python, the preferred language of operators<br>- Already has significant and almost complete documentation<br>- Can be easily adapted to perform constraint checks on generic simulation or other kinds of input data<br>- Allows decoupling of simulation and V&V<br>- Allows flight rule owners/originators  to more easily own flight rule checks | - Does not currently have good separation between core and adaptation                                                                                                                                                                                                                           |
| Invest in & Improve SEQGEN flight rule checking | - Utilize existing functionality that has significant heritage and is used by many missions                                                                                                                                                                                                                                                                                            | - Cannot easily be adapted to perform checks on generic, non-SEQGEN simulation or other input data<br>- Flight rule checks can only be written by those trained in FRMF language. FMRF language has a steep learning curve<br>- FMRF in general is less capable than Python, Java or Javascript |
| Use Aerie constraints checking                  | - Already has powerful UI elements for authoring and reporting constraints <br>- MPSA team has strong familiarity with Aerie                                                                                                                                                                                                                                                           | - Aerie constraint checking is not currently well-architected towards checking generic input data                                                                                                                                                                                               |

