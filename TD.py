from flask import Flask, request
import sys

app = Flask(__name__)

@app.route("/")
def hello_world():
	return "Hello, world!"