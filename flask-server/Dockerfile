FROM python:3.9

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 80

CMD ["flask", "run", "-h", "0.0.0.0", "-p", "80"]
