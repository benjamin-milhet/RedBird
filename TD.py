import sys
from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, world!"