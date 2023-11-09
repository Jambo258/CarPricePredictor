FROM python:3.9

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 80

#ENTRYPOINT [ "python" ]

#CMD [ "app.py" ]

#CMD ["flask", "run", "--host", "0.0.0.0"]

CMD ["flask", "run", "-h", "0.0.0.0", "-p", "80"]
