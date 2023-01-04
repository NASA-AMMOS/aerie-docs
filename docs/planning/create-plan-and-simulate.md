# Create Plan and Simulate

Here we describe how to create a new plan and simulate it using the [Aerie UI](https://github.com/NASA-AMMOS/aerie-ui). This document assumes you already uploaded a model. If you still need to upload a model, first follow the [instructions for uploading a model](../upload-mission-model) and then come back here.

## Instructions

1. Navigate to the `/plans` page in the Aerie UI. If you are running Aerie locally it is at [http://localhost/plans](http://localhost/plans).

1. Fill out the form on the `/plans` page to create a new plan. Pick a model ("FireSat" in this example), and give the plan a name ("Demo Plan" in this example). For this example we will just create a 2-week plan, and we will not include a [simulation template](../../mission-modeling/configuration). After you fill in all the fields click the 'Create' button to create the plan. Here is a video demonstration:

   <video controls>
     <source src="/aerie-docs/videos/create-plan.webm" type="video/webm" />
   </video>

1. Next open the new plan and add an activity to it by dragging the activity to the timeline. Switch to the simulation tab and click the button to simulate the plan. The default timeline view for Aerie UI automatically includes all the resources in the plan-associated-model so you can see the simulation output easily. Here is a video demonstration:

   <video controls>
     <source src="/aerie-docs/videos/first-simulation.webm" type="video/webm" />
   </video>

   Notice in this demonstration we change the activity parameter from "THRUSTERS" to "REACTION_WHEELS" which effects the resource as shown in the timeline simulation output.
