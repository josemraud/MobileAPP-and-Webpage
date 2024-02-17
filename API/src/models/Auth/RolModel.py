"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Roles
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from src.models import db, bcrypt


# Model rol
class TblRolModel(db.Model):
    """
    TblRol Model
    """

    # table name
    __tablename__ = 'tbl_rol'
    __table_args__ = {
        "schema": "sch_seguridad"
    }

    # cambiar de acuerdo al diseño de la DB
    id_rol = db.Column(db.Integer, primary_key=True)
    desc_rol = db.Column(db.String(50), nullable=False)
    activo = db.Column(db.Boolean, default=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.desc_rol = data.get('desc_rol')
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
    def get_all_rol():
        return TblRolModel.query.all()

    # traer todos
    @staticmethod
    def get_all_rol_activos():
        return TblRolModel.query.filter_by(activo=True)

    # traer uno por id.
    @staticmethod
    def get_one_rol(id_rol):
        return TblRolModel.query.get(id_rol)


# Eschema rol MAPEO
class TblRolSchema(Schema):
    """
    rol Schema
    """
    id_rol = fields.Int(dump_only=True)
    desc_rol = fields.Str(required=True, validate=Length(min=1, max=50, error="Ingrese el nombre del rol"))
    activo = fields.Boolean(required=False)

    class Meta:
        strict = True
        # exclude = ['password']
