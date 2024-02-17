"""
@Author Jose Raudales
@Version 1.0.0
@desc Modelo de unidad_distancia
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt


# Model unidad_distancia
class TblUnidaddistanciaModel(db.Model):
    """
    Tblunidad_distancia Model
    """

    # table name
    __tablename__ = 'tbl_unidad_distancia'
    __table_args__ = {
        "schema": "sch_mantenimientos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_unidad_distancia = db.Column(db.Integer, primary_key=True)
    desc_unidad_distancia = db.Column(db.String(50), nullable=False)
    activo = db.Column(db.Boolean, default=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.desc_unidad_distancia = data.get('desc_unidad_distancia')
        self.activo = data.get('activo')

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
    def get_all_unidad_distancia():
        return TblUnidaddistanciaModel.query.all()

    @staticmethod
    # traer todos
    def get_all_unidad_distancia_activos():
        return TblUnidaddistanciaModel.query.filter_by(activo=True)

    # traer uno por id.
    @staticmethod
    def get_one_unidad_distancia(id_unidad_distancia):
        return TblUnidaddistanciaModel.query.filter_by(id_unidad_distancia=id_unidad_distancia).first()


# Eschema unidad_distancia MAPEO
class TblUnidaddistanciaSchema(Schema):
    """
    unidad_distancia Schema
    """
    id_unidad_distancia = fields.Int(dump_only=True)
    desc_unidad_distancia = fields.Str(required=True,
                             validate=Length(min=1, max=50, error="Ingrese el desc del unidad de distancia"))
    activo = fields.Boolean(required=False)

    class Meta:
        strict = True
        # exclude = ['password']
