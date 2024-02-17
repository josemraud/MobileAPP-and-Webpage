"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Ciudades
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt
from .RegionModel import TblRegionModel, TblRegionSchema


# Model region
class TblCiudadModel(db.Model):
    """
    Ciudad Model
    """

    # table name
    __tablename__ = 'tbl_ciudad'
    __table_args__ = {
        "schema": "sch_mantenimientos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_ciudad = db.Column(db.Integer, primary_key=True)
    nombre_ciudad = db.Column(db.String(50), nullable=False)
    activo = db.Column(db.Boolean, default=True)

    # Relaciones
    id_region = db.Column(db.Integer, db.ForeignKey(TblRegionModel.id_region), nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.nombre_ciudad = data.get('nombre_ciudad')
        self.activo = data.get('activo')
        self.id_region = data.get('id_region')

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
    def get_all_ciudad():
        return TblCiudadModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_ciudad(id_ciudad):
        return TblCiudadModel.query.get(id_ciudad)


class VwCiudadModel(db.Model):
    """
    Ciudad Model
    """

    # table name
    __tablename__ = 'vw_ciudad'
    __table_args__ = {
        "schema": "sch_mantenimientos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_ciudad = db.Column(db.Integer, primary_key=True)
    nombre_ciudad = db.Column(db.String(50), nullable=False)
    activo = db.Column(db.Boolean, default=True)
    id_region = db.Column(db.Integer, nullable=False)
    nombre_region = db.Column(db.String(50), nullable=False)
    id_pais = db.Column(db.Integer, nullable=False)
    nombre_pais = db.Column(db.String(50), nullable=False)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.id_ciudad = data.get('id_ciudad')
        self.nombre_ciudad = data.get('nombre_ciudad')
        self.activo = data.get('activo')
        self.id_region = data.get('id_region')
        self.nombre_region = data.get('nombre_region')
        self.id_pais = data.get('id_pais')
        self.nombre_pais = data.get('nombre_pais')

    @staticmethod
    # traer todos
    def get_all_ciudad_view():
        return VwCiudadModel.query.all()

    @staticmethod
    # traer todos
    def get_all_by_region_vw(id_region):
        return VwCiudadModel.query.filter_by(activo=True, id_region=id_region)


# Eschema region MAPEO
class TblCiudadSchema(Schema):
    """
    Ciudad Schema
    """
    id_ciudad = fields.Int(dump_only=True)
    nombre_ciudad = fields.Str(required=True,
                               validate=Length(min=1, max=50, error="Ingrese el nombre de la ciudad"))
    activo = fields.Boolean(required=False)

    # Relaciones
    id_region = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']


class VwCiudadSchema(Schema):
    """
    Ciudad Schema
    """
    id_ciudad = fields.Int(dump_only=True)
    nombre_ciudad = fields.Str(required=True,
                               validate=Length(min=1, max=50, error="Ingrese el nombre de la ciudad"))
    activo = fields.Boolean(required=False)

    # Relaciones
    id_region = fields.Int(required=True)
    nombre_region = fields.Str(required=True,
                               validate=Length(min=1, max=50, error="Ingrese el nombre del region"))
    id_pais = fields.Int(required=True)
    nombre_pais = fields.Str(required=True,
                             validate=Length(min=1, max=50, error="Ingrese el nombre del pais"))

    class Meta:
        strict = True
        # exclude = ['password']
