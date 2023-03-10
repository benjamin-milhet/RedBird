FROM python:3.8

RUN apt-get update
RUN apt-get install python3-pip -y
RUN pip install Flask
RUN pip install redis

ENV FLASK_APP=back/main.py
ENV FLASK_ENV=development

COPY  . .

EXPOSE 5000
CMD [ "flask","run" ]