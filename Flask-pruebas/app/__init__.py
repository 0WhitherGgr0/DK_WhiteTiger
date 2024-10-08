from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)

    # Registrar las rutas
    from .routes.location_routes import location_bp
    app.register_blueprint(location_bp)

    return app
