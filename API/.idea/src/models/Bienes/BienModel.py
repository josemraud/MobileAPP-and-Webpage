"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Bienes
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from sqlalchemy import func

from .. import db, bcrypt
from .TipoBienModel import TblTipoBienModel, TblTipoBienSchema
from ..Mantenimientos.CiudadModel import TblCiudadModel, TblCiudadSchema
from ..Mantenimientos.UnidadMedidaModel import TblUnidadMedidaModel, TblUnidadMedidaSchema
from ..Auth.UsuarioModel import TblUserModel, TblUserSchema
from sqlalchemy.schema import Sequence


# Model ciudad
class TblBienModel(db.Model):
    """
    Bien Model
    """

    # table name
    __tablename__ = 'tbl_bienes'
    __table_args__ = {
        "schema": "sch_bienes"
    }

    # cambiar de acuerdo al diseño de la DB
    id_bien = db.Column(db.Integer, primary_key=True)
    desc_bien = db.Column(db.String(200), nullable=False)
    direccion = db.Column(db.String(200), nullable=False)
    latitud = db.Column(db.String, nullable=False)
    longitud = db.Column(db.String, nullable=False)
    dimensiones = db.Column(db.Float, nullable=False)
    habitaciones = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    pisos = db.Column(db.Integer, nullable=False)
    parqueo = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.Float, nullable=False)
    venta_renta = db.Column(db.String(20), nullable=False)
    aprobado = db.Column(db.String(20), default='En Revision')
    seo = db.Column(db.Boolean, nullable=False)
    fecha_registro = db.Column(db.Date, default=datetime.datetime.now())
    fecha_aprobacion = db.Column(db.Date, nullable=True)
    fecha_modificacion = db.Column(db.Date, nullable=True)
    seguridad = db.Column(db.Boolean)
    cisterna = db.Column(db.Boolean)
    area_verde = db.Column(db.Boolean)
    lavanderia = db.Column(db.Boolean)
    mascotas = db.Column(db.Boolean)
    amueblado = db.Column(db.Boolean)
    aire = db.Column(db.Boolean)
    calentador = db.Column(db.Boolean)
    cuarto_servicio = db.Column(db.Boolean)
    area_construccion = db.Column(db.Float, nullable=False)

    # Relaciones
    id_tipo_bien = db.Column(db.Integer, db.ForeignKey(TblTipoBienModel.id_tipo_bien), nullable=True)
    id_ciudad = db.Column(db.Integer, db.ForeignKey(TblCiudadModel.id_ciudad), nullable=True)
    id_unidad_medida = db.Column(db.Integer, db.ForeignKey(TblUnidadMedidaModel.id_unidad_medida), nullable=True)
    id_unidad_medida_cons = db.Column(db.Integer, db.ForeignKey(TblUnidadMedidaModel.id_unidad_medida), nullable=True)
    id_usuario = db.Column(db.Integer, nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.desc_bien = data.get('desc_bien')
        self.direccion = data.get('direccion')
        self.latitud = data.get('latitud')
        self.longitud = data.get('longitud')
        self.dimensiones = data.get('dimensiones')
        self.habitaciones = data.get('habitaciones')
        self.bathrooms = data.get('bathrooms')
        self.pisos = data.get('pisos')
        self.parqueo = data.get('parqueo')
        self.identidad_propietario = data.get('identidad_propietario')
        self.nombre_propietario = data.get('nombre_propietario')
        self.precio = data.get('precio')
        self.venta_renta = data.get('venta_renta')
        self.aprobado = data.get('aprobado')
        self.seo = data.get('seo')
        self.fecha_registro = data.get('feca_registro')
        self.fecha_aprobacion = data.get('fecha_aprobacion')
        self.fecha_modificacion = data.get('fecha_modificacion')
        self.seguridad = data.get('seguridad')
        self.cisterna = data.get('cisterna')
        self.area_verde = data.get('area_verde')
        self.lavanderia = data.get('lavanderia')
        self.mascotas = data.get('mascotas')
        self.amueblado = data.get('amueblado')
        self.aire = data.get('aire')
        self.calentador = data.get('calentador')
        self.cuarto_servicio = data.get('cuarto_servicio')
        self.area_construccion = data.get('area_construccion')

        self.id_ciudad = data.get('id_ciudad')
        self.id_tipo_bien = data.get('id_tipo_bien')
        self.id_usuario = data.get('id_usuario')
        self.id_unidad_medida = data.get('id_unidad_medida')
        self.id_unidad_medida_cons = data.get('id_unidad_medida_cons')

    #  INI | CRUD *******************************************
    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    # traer todos
    def get_all_bien():
        return TblBienModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_bien(id_bien):
        return TblBienModel.query.get(id_bien)

    # traer uno por id.
    @staticmethod
    def get_bien_user(id_usuario):
        return TblBienModel.query.filter(TblBienModel.id_usuario == id_usuario,
                                         TblBienModel.aprobado != "Vendido")

    #  FIN | CRUD *******************************************


# Eschema ciudad MAPEO
class TblBienSchema(Schema):
    """
    Bien Schema
    """
    id_bien = fields.Int(dump_only=True)
    desc_bien = fields.Str(required=True,
                           validate=Length(min=1, max=200, error="Ingrese el desc de la bien"))
    direccion = fields.Str(required=True,
                           validate=Length(min=1, max=200, error="Ingrese la direccion"))
    latitud = fields.Str(required=True)
    longitud = fields.Str(required=True)
    dimensiones = fields.Float(required=True)
    habitaciones = fields.Int(required=True)
    bathrooms = fields.Int(required=True)
    pisos = fields.Int(required=True)
    parqueo = fields.Int(required=True)
    venta_renta = fields.Str(required=True,
                             validate=Length(min=1, max=200, error="Ingrese si es venta o renta"))
    aprobado = fields.Str(required=False)
    seo = fields.Boolean(required=True)
    fecha_registro = fields.Date(required=False)
    fecha_aprobacion = fields.Date(required=False)
    fecha_modificacion = fields.Date(required=False)
    precio = fields.Float(required=True)
    seguridad = fields.Boolean(required=True)
    cisterna = fields.Boolean(required=True)
    area_verde = fields.Boolean(required=True)
    lavanderia = fields.Boolean(required=True)
    mascotas = fields.Boolean(required=True)
    amueblado = fields.Boolean(required=True)
    aire = fields.Boolean(required=True)
    calentador = fields.Boolean(required=True)
    cuarto_servicio = fields.Boolean(required=True)
    area_construccion = fields.Float(required=True)

    # Relaciones
    id_ciudad = fields.Int(required=True)
    id_tipo_bien = fields.Int(required=True)
    id_usuario = fields.Int(required=True)
    id_unidad_medida = fields.Int(required=True)
    id_unidad_medida_cons = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']


# Model ciudad
class VwBienModel(db.Model):
    """
    Bien Model
    """

    # table name
    __tablename__ = 'vw_bienes'
    __table_args__ = {
        "schema": "sch_bienes"
    }

    # cambiar de acuerdo al diseño de la DB
    id_bien = db.Column(db.Integer, primary_key=True)
    desc_bien = db.Column(db.String(200), nullable=False)
    direccion = db.Column(db.String(200), nullable=False)
    latitud = db.Column(db.String, nullable=False)
    longitud = db.Column(db.String, nullable=False)
    dimensiones = db.Column(db.Float, nullable=False)
    habitaciones = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    pisos = db.Column(db.Integer, nullable=False)
    parqueo = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.Float, nullable=False)
    venta_renta = db.Column(db.String(20), nullable=False)
    aprobado = db.Column(db.String(20), default='En Revision')
    seo = db.Column(db.Boolean, nullable=False)
    fecha_registro = db.Column(db.Date, default=datetime.datetime.now())
    fecha_aprobacion = db.Column(db.Date, nullable=True)
    fecha_modificacion = db.Column(db.Date, nullable=True)
    seguridad = db.Column(db.Boolean, nullable=False)
    cisterna = db.Column(db.Boolean)
    area_verde = db.Column(db.Boolean)
    lavanderia = db.Column(db.Boolean)
    mascotas = db.Column(db.Boolean)
    amueblado = db.Column(db.Boolean)
    aire = db.Column(db.Boolean)
    calentador = db.Column(db.Boolean)
    cuarto_servicio = db.Column(db.Boolean)
    area_construccion = db.Column(db.Float, nullable=False)

    # Relaciones
    id_tipo_bien = db.Column(db.Integer, nullable=True)
    desc_tipo_bien = db.Column(db.String, nullable=False)
    id_ciudad = db.Column(db.Integer, nullable=True)
    nombre_ciudad = db.Column(db.String, nullable=True)
    id_usuario = db.Column(db.Integer, nullable=True)
    correo = db.Column(db.String, nullable=False)
    telefono = db.Column(db.String, nullable=False)
    nombre_propietario = db.Column(db.String, nullable=False)
    id_unidad_medida = db.Column(db.Integer, nullable=False)
    desc_unidad_medida = db.Column(db.String, nullable=False)
    id_unidad_medida_cons = db.Column(db.Integer, nullable=False)
    desc_unidad_medida_cons = db.Column(db.String, nullable=False)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.desc_bien = data.get('desc_bien')
        self.direccion = data.get('direccion')
        self.latitud = data.get('latitud')
        self.longitud = data.get('longitud')
        self.dimensiones = data.get('dimensiones')
        self.habitaciones = data.get('habitaciones')
        self.bathrooms = data.get('bathrooms')
        self.pisos = data.get('pisos')
        self.parqueo = data.get('parqueo')
        self.precio = data.get('precio')
        self.venta_renta = data.get('venta_renta')
        self.aprobado = data.get('aprobado')
        self.seo = data.get('seo')
        self.fecha_registro = data.get('feca_registro')
        self.fecha_aprobacion = data.get('fecha_aprobacion')
        self.fecha_modificacion = data.get('fecha_modificacion')
        self.seguridad = data.get('seguridad')
        self.cisterna = data.get('cisterna')
        self.area_verde = data.get('area_verde')
        self.lavanderia = data.get('lavanderia')
        self.mascotas = data.get('mascotas')
        self.amueblado = data.get('amueblado')
        self.aire = data.get('aire')
        self.calentador = data.get('calentador')
        self.cuarto_servicio = data.get('cuarto_servicio')
        self.area_construccion = data.get('area_construccion')

        self.id_ciudad = data.get('id_ciudad')
        self.nombre_ciudad = data.get('nombre_ciudad')
        self.id_tipo_bien = data.get('id_tipo_bien')
        self.desc_tipo_bien = data.get('desc_tipo_bien')
        self.id_usuario = data.get('id_usuario')
        self.correo = data.get('correo')
        self.telefono = data.get('telefono')
        self.nombre_propietario = data.get('nombre_propietario')
        self.id_unidad_medida = data.get('id_unidad_medida')
        self.desc_unidad_medida = data.get('desc_unidad_medida')
        self.id_unidad_medida_cons = data.get('id_unidad_medida_cons')
        self.desc_unidad_medida_cons = data.get('desc_unidad_medida_cons')

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
    def get_all_bien():
        return VwBienModel.query.all()

    @staticmethod
    # traer todos
    def get_all_bien_approved(aprobado):
        return VwBienModel.query.filter_by(aprobado=aprobado)

    @staticmethod
    # traer todos
    def get_by_objective(tipo):
        return VwBienModel.query.filter_by(venta_renta=tipo, aprobado="Aprobado")

    @staticmethod
    # traer todos
    def get_by_type(tipo):
        return VwBienModel.query.filter_by(id_tipo_bien=tipo, aprobado="Aprobado")

    @staticmethod
    # traer todos
    def get_seo():
        return VwBienModel.query.filter_by(seo=True, aprobado="Aprobado")

    @staticmethod
    # traer todos
    def get_filters_sale(id_ciudad, id_tipo_bien, precio_menor, precio_mayor, direccion):
        return VwBienModel.query.filter(VwBienModel.aprobado == "Aprobado",
                                        VwBienModel.id_ciudad == id_ciudad,
                                        VwBienModel.id_tipo_bien == id_tipo_bien,
                                        VwBienModel.precio >= precio_menor,
                                        VwBienModel.precio <= precio_mayor,
                                        VwBienModel.venta_renta == "Venta",
                                        func.lower(VwBienModel.direccion).like('%' + direccion + '%'))

    @staticmethod
    # traer todos
    def get_filters_rental(id_ciudad, id_tipo_bien, precio_menor, precio_mayor, direccion):
        return VwBienModel.query.filter(VwBienModel.aprobado == "Aprobado",
                                        VwBienModel.id_ciudad == id_ciudad,
                                        VwBienModel.id_tipo_bien == id_tipo_bien,
                                        VwBienModel.precio >= precio_menor,
                                        VwBienModel.precio <= precio_mayor,
                                        VwBienModel.venta_renta == "Renta",
                                        func.lower(VwBienModel.direccion).like('%' + direccion + '%'))

    # traer uno por id.
    @staticmethod
    def get_one_bien_vw(id_bien):
        return VwBienModel.query.filter_by(id_bien=id_bien)


# Eschema ciudad MAPEO
class VwBienSchema(Schema):
    """
    Bien Schema
    """
    id_bien = fields.Int(dump_only=True)
    desc_bien = fields.Str(required=True,
                           validate=Length(min=1, max=200, error="Ingrese el desc de la bien"))
    direccion = fields.Str(required=True,
                           validate=Length(min=1, max=200, error="Ingrese la direccion"))
    latitud = fields.Str(required=True)
    longitud = fields.Str(required=True)
    dimensiones = fields.Float(required=True)
    habitaciones = fields.Int(required=True)
    bathrooms = fields.Int(required=True)
    pisos = fields.Int(required=True)
    parqueo = fields.Int(required=True)
    nombre_propietario = fields.Str(required=True,
                                    validate=Length(min=1, max=200, error="Ingrese el nombre del propietario"))
    venta_renta = fields.Str(required=True,
                             validate=Length(min=1, max=200, error="Ingrese si es venta o renta"))
    aprobado = fields.Str(required=False)
    seo = fields.Boolean(required=True)
    fecha_registro = fields.Date(required=False)
    fecha_aprobacion = fields.Date(required=False)
    fecha_modificacion = fields.Date(required=False)
    precio = fields.Float(required=True)
    seguridad = fields.Boolean(required=True)
    cisterna = fields.Boolean(required=True)
    area_verde = fields.Boolean(required=True)
    lavanderia = fields.Boolean(required=True)
    mascotas = fields.Boolean(required=True)
    amueblado = fields.Boolean(required=True)
    aire = fields.Boolean(required=True)
    calentador = fields.Boolean(required=True)
    cuarto_servicio = fields.Boolean(required=True)
    area_construccion = fields.Boolean(required=True)

    # Relaciones
    id_ciudad = fields.Int(required=True)
    nombre_ciudad = fields.Str(required=False)
    id_tipo_bien = fields.Int(required=True)
    desc_tipo_bien = fields.Str(required=False)
    id_usuario = fields.Int(required=True)
    telefono = fields.Str(required=False)
    correo = fields.Str(required=False)
    id_unidad_medida = fields.Int(required=True)
    desc_unidad_medida = fields.Str(required=True)
    id_unidad_medida_cons = fields.Int(required=True)
    desc_unidad_medida_cons = fields.Str(required=True)

    class Meta:
        strict = True
        # exclude = ['password']
