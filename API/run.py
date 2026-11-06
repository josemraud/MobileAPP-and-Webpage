"""
@Author Jose Raudales, Alejandro Mendoza, Felipe Cantarero
App Plaza
"""

import os
from src.app import create_app
from src.config import app_config

if __name__ == '__main__':
    env_name = os.getenv('FLASK_ENV') or 'development'
    if env_name not in app_config:
        env_name = 'development'
    app = create_app(env_name)
    app.run(
        host=os.getenv('HOST', '127.0.0.1'),
        port=int(os.getenv('PORT', '8080')),
        debug=bool(app.config.get('DEBUG')),
    )
