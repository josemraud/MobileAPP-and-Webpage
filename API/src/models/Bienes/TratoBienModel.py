"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Tratos
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt
from .CitaBienModel import TblCitaModel


# Model pais
class TblTratoModel(db.Model):
    """
    Trato Model
    """

    # table name
    __tablename__ = 'tbl_trato_bien'
    __table_args__ = {
        "schema": "sch_bienes"
    }

    # cambiar de acuerdo al diseño de la DB
    id_trato = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date, default=datetime.datetime.now())

    # Relaciones
    id_cita = db.Column(db.Integer, db.ForeignKey(TblCitaModel.id_bien), nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.fecha = data.get('fecha')
        self.id_bien = data.get('id_bien')
        self.id_cita = data.get('id_cita')

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
    def get_all_trato():
        return TblTratoModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_trato(id_trato):
        return TblTratoModel.query.get(id_trato)


# Eschema pais MAPEO
class TblTratoSchema(Schema):
    """
    Trato Schema
    """
    id_trato = fields.Int(dump_only=True)
    fecha = fields.Str(required=False)

    # Relaciones
    id_cita = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']


# Model pais
class VwTratoBienModel(db.Model):
    """
    Trato Model
    """

    # table name
    __tablename__ = 'vw_trato_bienes'
    __table_args__ = {
        "schema": "sch_bienes"
    }

    # cambiar de acuerdo al diseño de la DB
    id_trato = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date, default=datetime.datetime.now())

    # Relaciones
    direccion = db.Column(db.String, nullable=False)
    vendedor = db.Column(db.String, nullable=False)
    id_vendedor = db.Column(db.Integer, nullable=False)
    id_comprador = db.Column(db.Integer, nullable=False)
    comprador = db.Column(db.String, nullable=False)
    id_empleado = db.Column(db.Integer, nullable=False)
    empleado = db.Column(db.String, nullable=False)
    id_cita = db.Column(db.Integer, nullable=True)
    id_bien = db.Column(db.Integer, nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.fecha = data.get('fecha')
        self.id_bien = data.get('id_bien')
        self.id_cita = data.get('id_cita')
        self.direccion = data.get('direccion')
        self.vendedor = data.get('vendedor')
        self.id_vendedor = data.get('id_vendedor')
        self.comprador = data.get('comprador')
        self.id_comprador = data.get('id_comprador')
        self.empleado = data.get('empleado')
        self.id_empleado = data.get('id_empleado')
        self.id_bien = data.get('id_bien')

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
    def get_all_trato():
        return VwTratoBienModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_trato(id_trato):
        return VwTratoBienModel.query.get(id_trato)


# Eschema pais MAPEO
class VwTratoBienSchema(Schema):
    """
    Trato Schema
    """
    id_trato = fields.Int(dump_only=True)
    fecha = fields.Str(required=False)
    direccion = fields.Str(required=False)
    id_empleado = fields.Int(required=False)
    empleado = fields.Str(required=False)
    id_vendedor = fields.Int(required=False)
    vendedor = fields.Str(required=False)
    id_comprador = fields.Int(required=False)
    comprador = fields.Str(required=False)

    # Relaciones
    id_cita = fields.Int(required=True)
    id_bien = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']
