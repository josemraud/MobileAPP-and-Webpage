"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de TipoBienes
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt


# Model tipo_bien
class TblTipoBienModel(db.Model):
    """
    TblTipoBien Model
    """

    # table name
    __tablename__ = 'tbl_tipo_bien'
    __table_args__ = {
        "schema": "sch_bienes"
    }

    # cambiar de acuerdo al diseño de la DB
    id_tipo_bien = db.Column(db.Integer, primary_key=True)
    desc_tipo_bien = db.Column(db.String(50), nullable=False)
    activo = db.Column(db.Boolean, default=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.desc_tipo_bien = data.get('desc_tipo_bien')
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
    def get_all_tipo_bien():
        return TblTipoBienModel.query.all()

    @staticmethod
    # traer todos
    def get_all_tipo_bien_activos():
        return TblTipoBienModel.query.filter_by(activo=True)

    # traer uno por id.
    @staticmethod
    def get_one_tipo_bien(id_tipo_bien):
        return TblTipoBienModel.query.filter_by(id_tipo_bien=id_tipo_bien).first()


# Eschema tipo_bien MAPEO
class TblTipoBienSchema(Schema):
    """
    tipo_bien Schema
    """
    id_tipo_bien = fields.Int(dump_only=True)
    desc_tipo_bien = fields.Str(required=True,
                             validate=Length(min=1, max=50, error="Ingrese el desc del tipo de bien"))
    activo = fields.Boolean(required=False)

    class Meta:
        strict = True
        # exclude = ['password']
