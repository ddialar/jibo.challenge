# JIBO CHALLENGE - TECHNICAL DEBT

## ➡️ Third party API error messages unknown structure

-   Recorded by: Dailos Rafael Díaz Lara
-   Observed at: 2022, July 22
-   Impact (_if this tech debt affected your work somehow, add a +1 here with a date and optionally a note_):
    -   +1 Jane Doe 2021, March 26 (_this is an example of +1_)

### Updates

No updates yet.

### Affected layers

- `infrastructure > api > rest`

### Problem

Due to we don't really know what kind of error message is returned by third party NLU_A and NLU_B APIs, in order to implement this service API layer, I'm assuming that in case we receive an Axios error, it will contain a `response.data` object which contains a `message` field.

If in opposite, we get any other sort of error, it will be recorded and parsed like that: `{ error: true, message: 'error message here' }`.

### Why it was done this way?

Lack of information about how the third party APIs return a request error.

### Why this way is problematic?

I am guessing the response of the external API and despite of the error is handled, due to the information provided by these external services can be different, we could be lossing critical information about incidents in this part of the application, that is not been recorded in the system logs. This situation could difficult maintenance and error analysis processes.

### What the solution might be?

Confirm the third party API error messages structure and make the needed modification in the affected pieces of code.

### Why we aren't already doing the above?

The third party error messages structed is unknown.

### Next steps

- Confirm the third party API error message structure.
- Make the needed modification to the implemented code.
- Validate the code is working as expected, through the implementation/modification of unit and E2E tests.

### Other notes

There are no additional notes.