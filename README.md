# How to run project locally

to run only db in docker run following command
````
docker-compose -f docker-compose-db.yml up
````

and init database on ./server by following command
````
npm run dev
````

to start python flask without docker
````
pip install -r requirements.txt
python app.py
````

to run entire application in docker run following command
````
docker compose up
````

# Tests

backend tests

make sure database is running in docker in the root folder run following command

````
docker-compose -f docker-compose-db.yml up
````

in the ./flask-server folder run following command

````
python app.py
````

in the ./server folder run following command

````
npm run tests
````