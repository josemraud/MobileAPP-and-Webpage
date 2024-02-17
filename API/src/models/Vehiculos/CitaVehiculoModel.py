"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Citas
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt
from .VehiculoModel import TblVehiculoModel, TblVehiculoSchema
from ..Auth.EmpleadosModel import TblEmpleadoModel, TblEmpleadoSchema
from ..Auth.UsuarioModel import TblUserModel, TblUserSchema


# Model pais
class TblCitaModel(db.Model):
    """
    Cita Model
    """

    # table name
    __tablename__ = 'tbl_cita_vehiculo'
    __table_args__ = {
        "schema": "sch_vehiculos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_cita = db.Column(db.Integer, primary_key=True)
    fecha_solicitud = db.Column(db.Date, default=datetime.datetime.now())
    fecha_cita = db.Column(db.Date, nullable=True)
    realizado = db.Column(db.String, default="Pendiente")

    # Relaciones
    id_vehiculo = db.Column(db.Integer, db.ForeignKey(TblVehiculoModel.id_vehiculo), nullable=False)
    id_usuario = db.Column(db.Integer, nullable=False)
    id_empleado = db.Column(db.Integer, db.ForeignKey(TblEmpleadoModel.id_empleado), nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.id_cita = data.get('id_cita')
        self.fecha_solicitud = data.get('fecha_solicitud')
        self.fecha_cita = data.get('fecha_cita')
        self.realizado = data.get('realizado')
        self.id_vehiculo = data.get('id_vehiculo')
        self.id_empleado = data.get('id_empleado')
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
    def get_all_cita():
        return TblCitaModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_cita(id_cita):
        return TblCitaModel.query.get(id_cita)


# Eschema pais MAPEO
class TblCitaSchema(Schema):
    """
    Cita Schema
    """
    id_cita = fields.Int(dump_only=True)
    fecha_solicitud = fields.Date(required=False)
    fecha_cita = fields.Date(required=False)
    realizado = fields.Str(required=False)

    # Relaciones
    id_empleado = fields.Int(required=False)
    id_usuario = fields.Int(required=True)
    id_vehiculo = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']


# Model pais
class VwCitaVModel(db.Model):
    """
    Cita Model
    """

    # table name
    __tablename__ = 'vw_citas'
    __table_args__ = {
        "schema": "sch_vehiculos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_cita = db.Column(db.Integer, primary_key=True)
    fecha_solicitud = db.Column(db.Date, default=datetime.datetime.now())
    fecha_cita = db.Column(db.Date, nullable=True)
    realizado = db.Column(db.String, default=False)

    # Relaciones
    id_vehiculo = db.Column(db.Integer, nullable=False)
    desc_vehiculo = db.Column(db.String, nullable=False)
    id_usuario = db.Column(db.Integer, nullable=False)
    correo = db.Column(db.String, nullable=False)
    nombre_usuario = db.Column(db.String, nullable=False)
    id_empleado = db.Column(db.Integer, nullable=True)
    empleado = db.Column(db.String, nullable=False)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.id_cita = data.get('id_cita')
        self.fecha_solicitud = data.get('fecha_solicitud')
        self.fecha_cita = data.get('fecha_cita')
        self.realizado = data.get('realizado')
        self.id_vehiculo = data.get('id_vehiculo')
        self.desc_vehiculo = data.get('desc_vehiculo')
        self.id_empleado = data.get('id_empleado')
        self.empleado = data.get('empleado')
        self.id_usuario = data.get('id_usuario')
        self.correo = data.get('correo')
        self.nombre_usuario = data.get('nombre_usuario')


    @staticmethod
    # traer todos
    def get_all_cita():
        return VwCitaVModel.query.all()

    @staticmethod
    def get_appointment_employee(id_empleado):
        return VwCitaVModel.query.filter_by(id_empleado=id_empleado)


    # traer uno por id.
    @staticmethod
    def get_appointment_pending():
        return VwCitaVModel.query.filter(VwCitaVModel.realizado == "Pendiente", VwCitaVModel.id_empleado == None)

    # traer uno por id.
    @staticmethod
    def get_appointment_assigned():
        return VwCitaVModel.query.filter(VwCitaVModel.realizado == "Pendiente", VwCitaVModel.id_empleado != None)

    # traer uno por id.
    @staticmethod
    def get_appointment_completed():
        return VwCitaVModel.query.filter(VwCitaVModel.realizado == "Realizada")

# Eschema pais MAPEO
class VwCitaVSchema(Schema):
    """
    Cita Schema
    """
    id_cita = fields.Int(dump_only=True)
    fecha_solicitud = fields.Date(required=False)
    fecha_cita = fields.Date(required=False)
    realizado = fields.Str(required=False)

    # Relaciones
    id_empleado = fields.Int(required=False)
    empleado = fields.Str(required=False)
    id_usuario = fields.Int(required=True)
    correo = fields.Str(required=False)
    nombre_usuario = fields.Str(required=False)
    id_vehiculo = fields.Int(required=True)
    desc_vehiculo = fields.Str(required=False)

    class Meta:
        strict = True
        # exclude = ['password']
