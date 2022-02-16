FROM python:3.9-alpine

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt
ENV FLASK_APP  main.py

CMD ["flask", "run", "--host", "0.0.0.0", "--port", "80", "--with-threads"]
