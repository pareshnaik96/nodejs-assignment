# nodejs-assignment

Key points
* Created API to upload the attached XLSX/CSV data into MongoDB.
* Performed CRUD operation for User, Account, and Policy
* Created different collection in MongoDB for each info.(Agent, User, User's Account, LOB, Carrier, Policy).

POST APIs
* Upload the file using multer(for handling multipart/form-data) and save it to public folder.
* Created user, user's account, agent, LOB, carrier and policy collection by getting the data from csv file.
* From public csv file fetching the data for every collection and stored the data into mongoDB database.

GET APIs
* Returns data with complete details by Id.
* Return the HTTP status 200 if any documents are found.
* If no documents found then return an HTTP status 404.

GET APIs (for filter data by query)
* filtering data by query.
* Return the HTTP status 200 if any documents are found.
* If no documents found then return an HTTP status 404.

PUT APIs
* Update document by changing its details like (e.g. name,gender,dob,phone,email,etc in user document)
* Checking if the Id exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body.
* Return an HTTP status 200 if updated successfully.

DELETE APIs
* Check if the Id exists and is not deleted. If it does, mark it deleted and return an HTTP status 200 with a response body with status and message.
* If the document doesn't exist then return an HTTP status of 404 with a body.


