"""
@Author Jose Raudales, Alejandro Mendoza, Felipe Cantarero
App Localiza
"""

import os
# from flask import Flask
from src.app import create_app

# app = Flask(__name__)

if __name__ == '__main__':
    env_name = os.getenv('FLASK_ENV')
    app = create_app(env_name)

    # run app

    app.run(host='0.0.0.0', port='8080')

