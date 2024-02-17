import os

from dotenv import load_dotenv

load_dotenv()


class Development(object):
    """
    Development environment configuration
    """
    DEBUG = os.getenv('DEBUG')
    TESTING = os.getenv('TESTING')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS')


class Production(object):
    """
    Production environment configurations
    """
    DEBUG = os.getenv('DEBUG')
    TESTING = os.getenv('TESTING')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS')


app_config = {
    'development': Development,
    'production': Production,
}
