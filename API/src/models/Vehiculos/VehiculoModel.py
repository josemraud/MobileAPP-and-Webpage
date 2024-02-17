"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Vehiculos
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt
from .TipoVehiculoModel import TblTipoVehiculoModel, TblTipoVehiculoSchema
from ..Mantenimientos.CiudadModel import TblCiudadModel, TblCiudadSchema
from ..Mantenimientos.UnidadDistanciaModel import TblUnidaddistanciaModel, TblUnidaddistanciaSchema
from ..Auth.UsuarioModel import TblUserModel, TblUserSchema


# Model ciudad
class TblVehiculoModel(db.Model):
    """
    Vehiculo Model
    """

    # table name
    __tablename__ = 'tbl_vehiculos'
    __table_args__ = {
        "schema": "sch_vehiculos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_vehiculo = db.Column(db.Integer, primary_key=True)
    desc_vehiculo = db.Column(db.String(200), nullable=False)
    marca = db.Column(db.String(20), nullable=False)
    modelo = db.Column(db.String(20), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.Float, nullable=False)
    usado_nuevo = db.Column(db.String(20), nullable=False)
    aprobado = db.Column(db.String(20), default='En Revision')
    seo = db.Column(db.Boolean, nullable=False)
    fecha_registro = db.Column(db.Date, default=datetime.datetime.now())
    fecha_aprobacion = db.Column(db.Date, nullable=True)
    fecha_modificacion = db.Column(db.Date, nullable=True)
    motor = db.Column(db.String(25), nullable=False)
    caja = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(25), nullable=False)
    kilometraje = db.Column(db.Float, nullable=False)
    cabina = db.Column(db.String(20), nullable=False)
    combustible = db.Column(db.String(20), nullable=False)
    camara_trasera = db.Column(db.Boolean, nullable=False)
    aire_acondicionado = db.Column(db.Boolean, nullable=False)
    doble_traccion = db.Column(db.Boolean, nullable=False)
    ventanas_electricas = db.Column(db.Boolean, nullable=False)
    bolsas_aire = db.Column(db.Boolean, nullable=False)
    pantalla = db.Column(db.Boolean, nullable=False)
    rines_deluxe = db.Column(db.Boolean, nullable=False)
    sunroof = db.Column(db.Boolean, nullable=False)
    asientos_cuero = db.Column(db.Boolean, nullable=False)
    calentador = db.Column(db.Boolean, nullable=False)

    # Relaciones
    id_tipo_vehiculo = db.Column(db.Integer, db.ForeignKey(TblTipoVehiculoModel.id_tipo_vehiculo), nullable=True)
    id_ciudad = db.Column(db.Integer, db.ForeignKey(TblCiudadModel.id_ciudad), nullable=True)
    id_unidad_distancia = db.Column(db.Integer, db.ForeignKey(TblUnidaddistanciaModel.id_unidad_distancia),
                                    nullable=False)
    id_usuario = db.Column(db.Integer, nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.desc_vehiculo = data.get('desc_vehiculo')
        self.marca = data.get('marca')
        self.modelo = data.get('modelo')
        self.year = data.get('year')
        self.motor = data.get('motor')
        self.caja = data.get('caja')
        self.color = data.get('color')
        self.kilometraje = data.get('kilometraje')
        self.cabina = data.get('cabina')
        self.combustible = data.get('combustible')
        self.precio = data.get('precio')
        self.usado_nuevo = data.get('usado_nuevo')
        self.aprobado = data.get('aprobado')
        self.seo = data.get('seo')
        self.fecha_registro = data.get('feca_registro')
        self.fecha_aprobacion = data.get('fecha_aprobacion')
        self.fecha_modificacion = data.get('fecha_modificacion')
        self.camara_trasera = data.get('camara_trasera')
        self.aire_acondicionado = data.get('aire_acondicionado')
        self.doble_traccion = data.get('doble_traccion')
        self.ventanas_electricas = data.get('ventanas_electricas')
        self.bolsas_aire = data.get('bolsas_aire')
        self.pantalla = data.get('pantalla')
        self.rines_deluxe = data.get('rines_deluxe')
        self.sunroof = data.get('sunroof')
        self.asientos_cuero = data.get('asientos_cuero')
        self.calentador = data.get('calentador')

        self.id_unidad_distancia = data.get('id_unidad_distancia')
        self.id_ciudad = data.get('id_ciudad')
        self.id_tipo_vehiculo = data.get('id_tipo_vehiculo')
        self.id_usuario = data.get('id_usuario')

    #  INI | CRUD *******************************************
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    #  FIN | CRUD *******************************************

    @staticmethod
    # traer todos
    def get_all_vehiculo():
        return TblVehiculoModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_vehiculo(id_vehiculo):
        return TblVehiculoModel.query.get(id_vehiculo)

    @staticmethod
    def get_vehiculo_user(id_usuario):
        return TblVehiculoModel.query.filter(TblVehiculoModel.id_usuario == id_usuario,
                                             TblVehiculoModel.aprobado != "Vendido")


# Eschema ciudad MAPEO
class TblVehiculoSchema(Schema):
    """
    Vehiculo Schema
    """
    id_vehiculo = fields.Int(dump_only=True)
    desc_vehiculo = fields.Str(required=True,
                               validate=Length(min=1, max=200, error="Ingrese el desc de la vehiculo"))
    marca = fields.Str(required=True,
                       validate=Length(min=1, max=200, error="Ingrese la marca"))
    modelo = fields.Str(required=True,
                        validate=Length(min=1, max=200, error="Ingrese la modelo"))
    year = fields.Integer(required=True)
    motor = fields.Str(required=True,
                       validate=Length(min=1, max=200, error="Ingrese la motor"))
    caja = fields.Str(required=True,
                      validate=Length(min=1, max=200, error="Ingrese la caja"))
    cabina = fields.Str(required=True,
                        validate=Length(min=1, max=200, error="Ingrese la cabina"))
    color = fields.Str(required=True,
                       validate=Length(min=1, max=200, error="Ingrese el color"))
    combustible = fields.Str(required=True,
                             validate=Length(min=1, max=200, error="Ingrese el tipo de combustible"))
    kilometraje = fields.Float(required=True)
    usado_nuevo = fields.Str(required=True,
                             validate=Length(min=1, max=200, error="Ingrese si es usado o nuevo"))
    aprobado = fields.Str(required=False)
    seo = fields.Boolean(required=True)
    fecha_registro = fields.Date(required=False)
    fecha_aprobacion = fields.Date(required=False)
    fecha_modificacion = fields.Date(required=False)
    precio = fields.Float(required=True)
    camara_trasera = fields.Boolean(required=True)
    aire_acondicionado = fields.Boolean(required=True)
    doble_traccion = fields.Boolean(required=True)
    ventanas_electricas = fields.Boolean(required=True)
    bolsas_aire = fields.Boolean(required=True)
    pantalla = fields.Boolean(required=True)
    rines_deluxe = fields.Boolean(required=True)
    sunroof = fields.Boolean(required=True)
    asientos_cuero = fields.Boolean(required=True)
    calentador = fields.Boolean(required=True)

    # Relaciones
    id_ciudad = fields.Int(required=True)
    id_tipo_vehiculo = fields.Int(required=True)
    id_usuario = fields.Int(required=True)
    id_unidad_distancia = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']


class VwVehiculoModel(db.Model):
    """
    Vehiculo Model
    """

    # table name
    __tablename__ = 'vw_vehiculos'
    __table_args__ = {
        "schema": "sch_vehiculos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_vehiculo = db.Column(db.Integer, primary_key=True)
    desc_vehiculo = db.Column(db.String(200), nullable=False)
    marca = db.Column(db.String(20), nullable=False)
    modelo = db.Column(db.String(20), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.Float, nullable=False)
    usado_nuevo = db.Column(db.String(20), nullable=False)
    aprobado = db.Column(db.String(20), default='En Revision')
    seo = db.Column(db.Boolean, nullable=False)
    fecha_registro = db.Column(db.Date, default=datetime.datetime.now())
    fecha_aprobacion = db.Column(db.Date, nullable=True)
    fecha_modificacion = db.Column(db.Date, nullable=True)
    motor = db.Column(db.String(25), nullable=False)
    caja = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(25), nullable=False)
    kilometraje = db.Column(db.Float, nullable=False)
    cabina = db.Column(db.String(20), nullable=False)
    combustible = db.Column(db.String(20), nullable=False)
    camara_trasera = db.Column(db.Boolean, nullable=False)
    aire_acondicionado = db.Column(db.Boolean, nullable=False)
    doble_traccion = db.Column(db.Boolean, nullable=False)
    ventanas_electricas = db.Column(db.Boolean, nullable=False)
    bolsas_aire = db.Column(db.Boolean, nullable=False)
    pantalla = db.Column(db.Boolean, nullable=False)
    rines_deluxe = db.Column(db.Boolean, nullable=False)
    sunroof = db.Column(db.Boolean, nullable=False)
    asientos_cuero = db.Column(db.Boolean, nullable=False)
    calentador = db.Column(db.Boolean, nullable=False)

    # Relaciones
    id_tipo_vehiculo = db.Column(db.Integer, db.ForeignKey(TblTipoVehiculoModel.id_tipo_vehiculo), nullable=True)
    desc_tipo_vehiculo = db.Column(db.String(20), nullable=False)
    id_ciudad = db.Column(db.Integer, db.ForeignKey(TblCiudadModel.id_ciudad), nullable=True)
    nombre_ciudad = db.Column(db.String(60), nullable=False)
    id_usuario = db.Column(db.Integer, nullable=True)
    correo = db.Column(db.String, nullable=False)
    nombre_propietario = db.Column(db.String, nullable=False)
    id_unidad_distancia = db.Column(db.Integer, db.ForeignKey(TblUnidaddistanciaModel.id_unidad_distancia),
                                    nullable=True)
    desc_unidad_distancia = db.Column(db.String(20), nullable=False)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.desc_vehiculo = data.get('desc_vehiculo')
        self.marca = data.get('marca')
        self.modelo = data.get('modelo')
        self.year = data.get('year')
        self.motor = data.get('motor')
        self.caja = data.get('caja')
        self.color = data.get('color')
        self.kilometraje = data.get('kilometraje')
        self.cabina = data.get('cabina')
        self.combustible = data.get('combustible')
        self.identidad_propietario = data.get('identidad_propietario')
        self.nombre_propietario = data.get('nombre_propietario')
        self.precio = data.get('precio')
        self.usado_nuevo = data.get('usado_nuevo')
        self.aprobado = data.get('aprobado')
        self.seo = data.get('seo')
        self.fecha_registro = data.get('feca_registro')
        self.fecha_aprobacion = data.get('fecha_aprobacion')
        self.fecha_modificacion = data.get('fecha_modificacion')
        self.camara_trasera = data.get('camara_trasera')
        self.aire_acondicionado = data.get('aire_acondicionado')
        self.doble_traccion = data.get('doble_traccion')
        self.ventanas_electricas = data.get('ventanas_electricas')
        self.bolsas_aire = data.get('bolsas_aire')
        self.pantalla = data.get('pantalla')
        self.rines_deluxe = data.get('rines_deluxe')
        self.sunroof = data.get('sunroof')
        self.asientos_cuero = data.get('asientos_cuero')
        self.calentador = data.get('calentador')

        self.id_unidad_distancia = data.get('id_unidad_distancia')
        self.desc_unidad_distancia = data.get('desc_unidad_distancia')
        self.id_ciudad = data.get('id_ciudad')
        self.nombre_ciudad = data.get('nombre_ciudad')
        self.id_tipo_vehiculo = data.get('id_tipo_vehiculo')
        self.desc_tipo_vehiculo = data.get('desc_tipo_vehiculo')
        self.id_usuario = data.get('id_usuario')
        self.nombre_usuario = data.get('nombre_propietario')
        self.correo = data.get('correo')

    @staticmethod
    # traer todos
    def get_all_vehiculo():
        return VwVehiculoModel.query.all()

    @staticmethod
    # traer todos
    def get_all_vehiculo_approved(aprobado):
        return VwVehiculoModel.query.filter_by(aprobado=aprobado)

    @staticmethod
    # traer todos
    def get_by_objective(tipo):
        return VwVehiculoModel.query.filter_by(usado_nuevo=tipo, aprobado="Aprobado")

    # traer uno por id.
    @staticmethod
    def get_one_vehiculo(id_vehiculo):
        return VwVehiculoModel.query.filter_by(id_vehiculo=id_vehiculo)

    @staticmethod
    # traer todos
    def get_by_type(tipo):
        return VwVehiculoModel.query.filter_by(id_tipo_vehiculo=tipo, aprobado="Aprobado")

    @staticmethod
    # traer todos
    def get_seo():
        return VwVehiculoModel.query.filter_by(seo=True, aprobado="Aprobado")

    @staticmethod
    # traer todos
    def get_filters_new(id_ciudad, id_tipo_vehiculo, precio_menor, precio_mayor):
        return VwVehiculoModel.query.filter(VwVehiculoModel.aprobado == "Aprobado",
                                            VwVehiculoModel.id_ciudad == id_ciudad,
                                            VwVehiculoModel.id_tipo_vehiculo == id_tipo_vehiculo,
                                            VwVehiculoModel.precio >= precio_menor,
                                            VwVehiculoModel.precio <= precio_mayor,
                                            VwVehiculoModel.usado_nuevo == "Nuevo")

    @staticmethod
    # traer todos
    def get_filters_used(id_ciudad, id_tipo_vehiculo, precio_menor, precio_mayor):
        return VwVehiculoModel.query.filter(VwVehiculoModel.aprobado == "Aprobado",
                                            VwVehiculoModel.id_ciudad == id_ciudad,
                                            VwVehiculoModel.id_tipo_vehiculo == id_tipo_vehiculo,
                                            VwVehiculoModel.precio >= precio_menor,
                                            VwVehiculoModel.precio <= precio_mayor,
                                            VwVehiculoModel.usado_nuevo == "Usado")


# Eschema ciudad MAPEO
class VwVehiculoSchema(Schema):
    """
    Vehiculo Schema
    """
    id_vehiculo = fields.Int(dump_only=True)
    desc_vehiculo = fields.Str(required=True,
                               validate=Length(min=1, max=200, error="Ingrese el desc de la vehiculo"))
    marca = fields.Str(required=True,
                       validate=Length(min=1, max=200, error="Ingrese la marca"))
    modelo = fields.Str(required=True,
                        validate=Length(min=1, max=200, error="Ingrese la modelo"))
    year = fields.Integer(required=True)
    motor = fields.Str(required=True,
                       validate=Length(min=1, max=200, error="Ingrese la motor"))
    caja = fields.Str(required=True,
                      validate=Length(min=1, max=200, error="Ingrese la caja"))
    cabina = fields.Str(required=True,
                        validate=Length(min=1, max=200, error="Ingrese la cabina"))
    color = fields.Str(required=True,
                       validate=Length(min=1, max=200, error="Ingrese el color"))
    combustible = fields.Str(required=True,
                             validate=Length(min=1, max=200, error="Ingrese el tipo de combustible"))
    kilometraje = fields.Float(required=True)
    identidad_propietario = fields.Str(required=True,
                                       validate=Length(min=1, max=200, error="Ingrese la identidad del propietario"))
    usado_nuevo = fields.Str(required=True,
                             validate=Length(min=1, max=200, error="Ingrese si es usado o nuevo"))
    aprobado = fields.Str(required=False)
    seo = fields.Boolean(required=True)
    fecha_registro = fields.Date(required=False)
    fecha_aprobacion = fields.Date(required=False)
    fecha_modificacion = fields.Date(required=False)
    precio = fields.Float(required=True)
    camara_trasera = fields.Boolean(required=True)
    aire_acondicionado = fields.Boolean(required=True)
    doble_traccion = fields.Boolean(required=True)
    ventanas_electricas = fields.Boolean(required=True)
    bolsas_aire = fields.Boolean(required=True)
    pantalla = fields.Boolean(required=True)
    rines_deluxe = fields.Boolean(required=True)
    sunroof = fields.Boolean(required=True)
    asientos_cuero = fields.Boolean(required=True)
    calentador = fields.Boolean(required=True)

    # Relaciones
    id_ciudad = fields.Int(required=True)
    nombre_ciudad = fields.Str(required=False)
    id_tipo_vehiculo = fields.Int(required=True)
    desc_tipo_vehiculo = fields.Str(required=False)
    id_usuario = fields.Int(required=True)
    correo = fields.Str(required=False)
    nombre_propietario = fields.Str(required=False)
    id_unidad_distancia = fields.Int(required=True)
    desc_unidad_distancia = fields.Str(required=False)

    class Meta:
        strict = True
        # exclude = ['password']
