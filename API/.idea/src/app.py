from flask import Flask
from flask_cors import CORS

from .config import app_config
from .models import db, bcrypt

# Mapeo de URIS
from .routes.Auth.UsuarioRoute import user_api as user_blueprint
from .routes.Auth.LoginUser import session_api as session_blueprint
from .routes.Auth.EmpleadoRoute import empleado_api as empleado_blueprint
from .routes.Auth.LoginEmployee import employee_session_api as employee_session_blueprint
from .routes.Mantenimientos.PaisRoute import pais_api as pais_blueprint
from .routes.Mantenimientos.RegionRoute import region_api as region_blueprint
from .routes.Mantenimientos.CiudadRoute import ciudad_api as ciudad_blueprint
from src.routes.Auth.RolRoute import rol_api as rol_blueprint
from src.routes.Bienes.TipoBienRoute import tipo_bien_api as tipo_bien_blueprint
from src.routes.Bienes.BienRoute import bien_api as bien_blueprint
from src.routes.Bienes.CitasRoute import cita_bien_api as cita_bien_blueprint
from src.routes.Bienes.TratoBienesRoute import trato_bien_api as trato_bien_blueprint
from src.routes.Bienes.FotosBienRoute import foto_api as foto_bien_blueprint
from src.routes.Vehiculos.TipoVehiculoRoute import tipo_vehiculo_api as tipo_vehiculo_blueprint
from src.routes.Vehiculos.VehiculoRoute import vehiculo_api as vehiculo_blueprint
from src.routes.Vehiculos.CitaVehiculoRoute import cita_vehiculo_api as cita_vehiculo_blueprint
from src.routes.Vehiculos.TratoVehiculoRoute import trato_vehiculo_api as trato_vehiculo_blueprint
from src.routes.Vehiculos.FotosVehiculoRoute import foto_vehiculo_api as foto_vehiculo_blueprint
from src.routes.Publicidad.PublicidadRoute import publicidad_api as publicidad_blueprint
from src.routes.Mantenimientos.UnidadMedidaRoute import unidad_medida_api as unidad_medida_blueprint
from src.routes.Mantenimientos.UnidadDistanciaRoute import unidad_distancia_api as unidad_distancia_blueprint


def create_app(env_name):
    """
    Create app
    """

    # app init
    app = Flask(__name__, static_url_path='/static')

    app.config.from_object(app_config[env_name])

    # initializing bcrypt
    bcrypt.init_app(app)

    # initializing db
    # FIXME: definir el pool de conexiones para sqlalchemy
    db.init_app(app)

    """ Configuracion de los CORS """
    app.config['CORS_HEADERS'] = 'Content-Type'
    CORS(app)
    CORS(app, resources={r"/*": {"origins": "*"}})

    @app.route('/', methods=['GET'])
    def index():
        """
        example endpoint
        """
        return 'Congratulations! Your first endpoint is working'

    # Registro de todas las URI
    app.register_blueprint(user_blueprint, url_prefix='/api/v1/user/auth')
    app.register_blueprint(session_blueprint, url_prefix='/api/v1/user/session')
    app.register_blueprint(pais_blueprint, url_prefix='/api/v1/countries')
    app.register_blueprint(empleado_blueprint, url_prefix='/api/v1/employee/auth')
    app.register_blueprint(employee_session_blueprint, url_prefix='/api/v1/employee/session')
    app.register_blueprint(region_blueprint, url_prefix='/api/v1/region')
    app.register_blueprint(ciudad_blueprint, url_prefix='/api/v1/city')
    app.register_blueprint(rol_blueprint, url_prefix='/api/v1/role')
    app.register_blueprint(tipo_bien_blueprint, url_prefix='/api/v1/property/type')
    app.register_blueprint(bien_blueprint, url_prefix='/api/v1/property')
    app.register_blueprint(cita_bien_blueprint, url_prefix='/api/v1/property/appointment')
    app.register_blueprint(trato_bien_blueprint, url_prefix='/api/v1/property/deals')
    app.register_blueprint(foto_bien_blueprint, url_prefix='/api/v1/property/pics')
    app.register_blueprint(tipo_vehiculo_blueprint, url_prefix='/api/v1/vehicle/type')
    app.register_blueprint(vehiculo_blueprint, url_prefix='/api/v1/vehicle')
    app.register_blueprint(cita_vehiculo_blueprint, url_prefix='/api/v1/vehicle/appointment')
    app.register_blueprint(trato_vehiculo_blueprint, url_prefix='/api/v1/vehicle/deals')
    app.register_blueprint(foto_vehiculo_blueprint, url_prefix='/api/v1/vehicle/pics')
    app.register_blueprint(publicidad_blueprint, url_prefix='/api/v1/ads')
    app.register_blueprint(unidad_medida_blueprint, url_prefix='/api/v1/measurement')
    app.register_blueprint(unidad_distancia_blueprint, url_prefix='/api/v1/distance')

    # Return all config app
    return app
