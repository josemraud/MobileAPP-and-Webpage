"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Publicidades
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt


# Model publicidad
class TblPublicidadModel(db.Model):
    """
    TblPublicidad Model
    """

    # table name
    __tablename__ = 'tbl_publicidad'
    __table_args__ = {
        "schema": "sch_publicidad"
    }

    # cambiar de acuerdo al diseño de la DB
    id_publicidad = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.String, nullable=False)
    thumbnail = db.Column(db.String, nullable=False)
    empresa = db.Column(db.String, nullable=False)
    tipo = db.Column(db.String, nullable=False)
    activo = db.Column(db.Boolean, default=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.link = data.get('link')
        self.thumbnail = data.get('thumbnail')
        self.empresa = data.get('empresa')
        self.tipo = data.get('tipo')
        self.activo = data.get('activo')

    #  INI | CRUD *******************************************
    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    # traer todos
    def get_all_publicidad():
        return TblPublicidadModel.query.all()

    @staticmethod
    # traer todos
    def get_all_publicidad_activos():
        return TblPublicidadModel.query.filter_by(activo=True, tipo="Vehiculo")

    @staticmethod
    # traer todos
    def get_all_publicidad_activos_bien():
        return TblPublicidadModel.query.filter_by(activo=True, tipo="Bien")

    # traer uno por id.
    @staticmethod
    def get_one_publicidad(id_publicidad):
        return TblPublicidadModel.query.filter_by(id_publicidad=id_publicidad).first()


# Eschema publicidad MAPEO
class TblPublicidadSchema(Schema):
    """
    publicidad Schema
    """
    id_publicidad = fields.Int(dump_only=True)
    link = fields.Str(required=True,
                      validate=Length(min=1, max=50, error="Ingrese el nombre del link"))
    thumbnail = fields.Str(required=True,
                           validate=Length(min=1, max=50, error="Ingrese el nombre del thumbnail"))
    empresa = fields.Str(required=True,
                         validate=Length(min=1, max=50, error="Ingrese el nombre del empresa"))
    tipo = fields.Str(required=True,
                      validate=Length(min=1, max=50, error="Ingrese el nombre del tipo"))
    activo = fields.Boolean(required=False)

    class Meta:
        strict = True
