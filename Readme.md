

After cloning please Edit Config/Local.js with credentials<br />
 - Add username, password and host (As we are using Basic Auth)<br />

Note: client and server have separate servers. Please Start both the servers. We would also need two npm install<br />

Use Latest Node Version >= V.16 <br />




To start Server(default Port 3001) <br />
- npm install
- npm start
- npm test (for testing)


To start Client: <br />
Client is in /Client folder(default Port 3000)
 - cd client
   - - npm install
   - - npm start
   - - npm test(for testing)

Design Choices <br />

W have kept frontend and backend separate. As ideally, we can have different teams working on them on different repos. They are in the same repo here, just for the convenience of submission. <br />


Server Files  <br />

Assumptions:<br />
- Tickets data is <4 MB and can be fetched by a single REST api call. So, all the tickets data can be fetched by the server before returning the data to the client.

Implementation:<br />
- Call the GET /api/v1/tickets api recursively till we have a valid nextPageValue returned by the api
- Combine all the reusultt and return to the Frontend
- The frontend can then get all the enteries and simply page them 25 at a time

An Alternative approach could be to have the frontend keep track for pagination and request the backend with a parameter next_page(if there are more tickets possible, make a zendesk api call). However due to our initial assumption such an implementation is not required and we have kept the frontend simple and not required for the user to wait. <br />
