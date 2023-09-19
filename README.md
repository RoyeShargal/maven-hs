# mavens
to run the project, make sure that:
1. you have cloned the repo
2. docker desktop is running on your computer
2. execute docker-compose up --build

Incase that you don't have docker desktop:
Client:
1. go to client folder
2. execute npm install
3. execute npm start

Server:
1. go to express folder
2. execute npm install
3. execute npm run dev



client:
the client consists of several pages: 
1. Homepage - where you sign up
2. Gamepage - where you play

The main logic & game functionality is handled in the Gamepage.tsx file.
generic logic & types were exported to different files.

server:
The server has a couple of routes:
1. Create new user - that checks if the user already exists, and if not - sign him/her up
2. Update a specific user score - posts a new score to a user
3. Retrieve the users sorted by their maxSteps
In addition, the server stores the logs of key-spots in the flows, creating a user and posting the score - in order to check where we had errors or when we succeeded to trace actions.

The DB that I chose is MongoDB, mainly because of the fact that I wanted to be able to change the schemas fast and adapt them according to my needs,
and seconly that because I was needed to hold just the Integer of the max score, I didn't see a point in creating a SCORES table and to relate it to the users.

Enjoy!
