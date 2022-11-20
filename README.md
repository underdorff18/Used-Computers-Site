# Computers-Site-Backend
The backend (node and express) portion of the updated computers site


Current plan is to flesh out this system, and then move on to the refactor.
Flesh out means: make sure crud options are all available and working, add data validation options
-make sure no two items with same serial, make sure database accurately reflects files in case there are any errors

-Added feature to update database when a file is changed
-Added validation to inventorywatcher and readInventoryFile

Need: 
-check for duplicate serial numbers
-option in dbtools to run a full check on the data to make sure it matches the database
--this should probably run as soon as file watcher is started, and at regular intervals


