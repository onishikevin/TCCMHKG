from flask import Flask
from .routes import bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object('app.config.DevelopmentConfig')
    app.register_blueprint(bp)
    return app
