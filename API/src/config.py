import os
import re

from dotenv import load_dotenv

load_dotenv()


def env_flag(name, default=False):
    raw = os.getenv(name)
    if raw is None or raw.strip() == '':
        return default
    return raw.strip().lower() in {'1', 'true', 'yes', 'on'}


def env_int(name, default):
    raw = os.getenv(name)
    if raw is None or raw.strip() == '':
        return default
    raw = raw.strip()
    try:
        return int(raw)
    except ValueError:
        if re.fullmatch(r'\d+(\s*\*\s*\d+)+', raw):
            value = 1
            for part in raw.split('*'):
                value *= int(part.strip())
            return value
        return default


def cors_origins():
    raw = os.getenv(
        'CORS_ORIGINS',
        'http://localhost:3000,http://127.0.0.1:3000,http://www.example.com,https://www.example.com',
    )
    return [origin.strip() for origin in raw.split(',') if origin.strip()]


class Development(object):
    """
    Development environment configuration
    """
    DEBUG = env_flag('DEBUG', False)
    TESTING = env_flag('TESTING', False)
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = env_flag('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    MAX_CONTENT_LENGTH = env_int('MAX_CONTENT_LENGTH', 16 * 1024 * 1024)
    CORS_ORIGINS = cors_origins()


class Production(object):
    """
    Production environment configurations
    """
    DEBUG = env_flag('DEBUG', False)
    TESTING = env_flag('TESTING', False)
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = env_flag('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    MAX_CONTENT_LENGTH = env_int('MAX_CONTENT_LENGTH', 16 * 1024 * 1024)
    CORS_ORIGINS = cors_origins()


app_config = {
    'development': Development,
    'production': Production,
}
