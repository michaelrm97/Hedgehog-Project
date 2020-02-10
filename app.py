# Rudimentary flask app designed to act as a simple webserver

from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
   with open("index.html", encoding="utf-8") as f:
      return f.read()

@app.route('/<path>')
def page(path):
   with open(path, encoding="utf-8") as f:
      return f.read()

if __name__ == '__main__':
   app.run()
   