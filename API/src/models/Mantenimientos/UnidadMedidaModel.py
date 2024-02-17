"""
@Author Jose Raudales
@Version 1.0.0
@desc Modelo de unidad_medidaes
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt


# Model unidad_medida
class TblUnidadMedidaModel(db.Model):
    """
    Tblunidad_medida Model
    """

    # table name
    __tablename__ = 'tbl_unidad_medida'
    __table_args__ = {
        "schema": "sch_mantenimientos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_unidad_medida = db.Column(db.Integer, primary_key=True)
    desc_unidad_medida = db.Column(db.String(50), nullable=False)
    activo = db.Column(db.Boolean, default=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.desc_unidad_medida = data.get('desc_unidad_medida')
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
    def get_all_unidad_medida():
        return TblUnidadMedidaModel.query.all()

    @staticmethod
    # traer todos
    def get_all_unidad_medida_activos():
        return TblUnidadMedidaModel.query.filter_by(activo=True)

    # traer uno por id.
    @staticmethod
    def get_one_unidad_medida(id_unidad_medida):
        return TblUnidadMedidaModel.query.filter_by(id_unidad_medida=id_unidad_medida).first()


# Eschema unidad_medida MAPEO
class TblUnidadMedidaSchema(Schema):
    """
    unidad_medida Schema
    """
    id_unidad_medida = fields.Int(dump_only=True)
    desc_unidad_medida = fields.Str(required=True,
                             validate=Length(min=1, max=50, error="Ingrese el desc del unidad de medida"))
    activo = fields.Boolean(required=False)

    class Meta:
        strict = True
        # exclude = ['password']
