# Car price predictor project

Fullstack application where user creates account to get access to car price predictor model which has been trained with Python.
Application contains PostgreSQL database, ReactJS frontend, NodeJS backend and Flask backend. Users in the application do have
basic CRUD operations to manage their account details in the database and admins have same CRUD operations without restrictions so they can edit any user details. Car price predictor is trained with decisiontree regressor algorithm and to get car price prediction user needs to give multiple inputs for the trained model (model was trained with dataset found in the kaggle).

# How to run project locally

to run only database in docker run following command:

````
docker-compose -f docker-compose-db.yml up
````

and seed database and start backend on ./server by following command:

````
npm install
npm run dev
````

to start python flask backend (to get access to the predictor model endpoint) run following command on ./flask-server:
````
pip install -r requirements.txt
python app.py
````

to start frontend run following command on ./client
````
npm install
npm run dev
````
# Running project locally in docker

to run entire application in docker run following command:
````
docker compose up
````

# Tests

Backend tests

make sure database is running in the docker (if not) navigate into the root folder of project and run following command:

````
docker-compose -f docker-compose-db.yml up
````

in the ./flask-server folder run following command:

````
python app.py
````

in the ./server folder run following command:

````
npm run tests
````

E2E tests

make sure all parts of the application is running either on terminals or docker container and after that navigate to ./client folder and run following command :

````
npm run cypress
````
which starts cypress program where you can run the tests

or if you want to run tests without cypress interface (headless browser)

````
npm run cy:run
````

Code coverage reports can be found in ./client/coverage/lcov-report/index.html and in ./server/coverage/lcov-report/index.html
(Assuming you have ran command ./server

````
npm run tests:coverage
````
and in ./client

````
npm run cy:run
````
)

# Deployment

Car price predictor is deployed to render.com where is hosted entire application (frontend, backend, db)

Link to project: https://car-project-front.onrender.com/

# Known issues

If trying to run cypress tests in headless mode (command npm run cy:run) when entire application is ran in docker the result
coverage report pathing is wrong inside the ./client/coverage/lcov-report/index.html but if application is run with only database in docker it works fine.

# Endpoints

<div align="center">
    <img src="/images/endpoints.png" width="600px"</img>
</div>