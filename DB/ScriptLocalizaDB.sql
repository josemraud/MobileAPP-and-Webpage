--gcloud sql connect applocaliza-2021 --user=postgres
--create database applocalizadb;
-- \c applocalizadb;

CREATE SCHEMA sch_seguridad;
CREATE SCHEMA sch_mantenimientos;
CREATE SCHEMA sch_vehiculos; 
CREATE SCHEMA sch_bienes; 
CREATE SCHEMA sch_publicidad;

-- sch_mantenimientos.tbl_pais definition

-- Drop table

-- DROP TABLE sch_mantenimientos.tbl_pais;

CREATE TABLE sch_mantenimientos.tbl_pais (
	id_pais serial4 NOT NULL,
	nombre_pais varchar(50) NOT NULL,
	activo bool NOT NULL,
	CONSTRAINT tbl_pais_pk PRIMARY KEY (id_pais)
);

-- sch_mantenimientos.tbl_region definition

-- Drop table

-- DROP TABLE sch_mantenimientos.tbl_region;

CREATE TABLE sch_mantenimientos.tbl_region (
	id_region serial4 NOT NULL,
	nombre_region varchar(100) NOT NULL,
	id_pais int8 NOT NULL,
	activo bool NOT NULL,
	CONSTRAINT tbl_region_pk PRIMARY KEY (id_region)
);
CREATE INDEX idx_region ON sch_mantenimientos.tbl_region USING btree (id_pais);


-- sch_mantenimientos.tbl_region foreign keys

ALTER TABLE sch_mantenimientos.tbl_region ADD CONSTRAINT tbl_region_fk FOREIGN KEY (id_pais) REFERENCES sch_mantenimientos.tbl_pais(id_pais);

-- sch_mantenimientos.tbl_ciudad definition

-- Drop table

-- DROP TABLE sch_mantenimientos.tbl_ciudad;

CREATE TABLE sch_mantenimientos.tbl_ciudad (
	id_ciudad serial4 NOT NULL,
	nombre_ciudad varchar(100) NOT NULL,
	id_region int8 NOT NULL,
	activo bool NOT NULL,
	CONSTRAINT tbl_ciudad_pk PRIMARY KEY (id_ciudad)
);
CREATE INDEX idx_ciudad ON sch_mantenimientos.tbl_ciudad USING btree (id_region);


-- sch_mantenimientos.tbl_ciudad foreign keys

ALTER TABLE sch_mantenimientos.tbl_ciudad ADD CONSTRAINT tbl_ciudad_fk FOREIGN KEY (id_region) REFERENCES sch_mantenimientos.tbl_region(id_region);

-- sch_mantenimientos.tbl_unidad_medida definition

-- Drop table

-- DROP TABLE sch_mantenimientos.tbl_unidad_medida;

CREATE TABLE sch_mantenimientos.tbl_unidad_medida (
	id_unidad_medida serial4 NOT NULL,
	desc_unidad_medida varchar NOT NULL,
	activo bool NOT NULL,
	CONSTRAINT tbl_unidad_medida_pk PRIMARY KEY (id_unidad_medida)
);

-- sch_mantenimientos.tbl_unidad_distancia definition

-- Drop table

-- DROP TABLE sch_mantenimientos.tbl_unidad_distancia;

CREATE TABLE sch_mantenimientos.tbl_unidad_distancia (
	id_unidad_distancia serial4 NOT NULL,
	desc_unidad_distancia varchar NOT NULL,
	activo bool NOT NULL,
	CONSTRAINT tbl_unidad_distancia_pk PRIMARY KEY (id_unidad_distancia)
);

-- sch_mantenimientos.vw_region source

CREATE OR REPLACE VIEW sch_mantenimientos.vw_region
AS SELECT tr.id_region,
    tr.nombre_region,
    tr.id_pais,
    tp.nombre_pais,
    tr.activo
   FROM sch_mantenimientos.tbl_region tr
     JOIN sch_mantenimientos.tbl_pais tp ON tr.id_pais = tp.id_pais;
     
    
-- sch_mantenimientos.vw_ciudad source

CREATE OR REPLACE VIEW sch_mantenimientos.vw_ciudad
AS SELECT tc.id_ciudad,
    tc.nombre_ciudad,
    tc.id_region,
    tr.nombre_region,
    tp.id_pais,
    tp.nombre_pais,
    tc.activo
   FROM sch_mantenimientos.tbl_ciudad tc
     JOIN sch_mantenimientos.tbl_region tr ON tc.id_region = tr.id_region
     JOIN sch_mantenimientos.tbl_pais tp ON tr.id_pais = tp.id_pais;
     
-- sch_seguridad.tbl_rol definition

-- Drop table

-- DROP TABLE sch_seguridad.tbl_rol;

CREATE TABLE sch_seguridad.tbl_rol (
	id_rol serial4 NOT NULL,
	desc_rol varchar NOT NULL,
	activo bool NULL,
	CONSTRAINT tbl_rol_pk PRIMARY KEY (id_rol)
);


-- sch_seguridad.tbl_empleados definition

-- Drop table

-- DROP TABLE sch_seguridad.tbl_empleados;

CREATE TABLE sch_seguridad.tbl_empleados (
	id_empleado serial4 NOT NULL,
	nombre varchar(50) NOT NULL,
	apellido varchar(50) NOT NULL,
	correo varchar(50) NOT NULL,
	"password" varchar(500) NOT NULL,
	id_pais int8 NOT NULL,
	activo bool NOT NULL,
	fecha_creacion date NULL,
	fecha_modificacion date NULL,
	id_rol int8 NULL,
	CONSTRAINT tbl_empleados_pk PRIMARY KEY (id_empleado),
	CONSTRAINT tbl_empleados_un UNIQUE (correo)
);


-- sch_seguridad.tbl_empleados foreign keys

ALTER TABLE sch_seguridad.tbl_empleados ADD CONSTRAINT tbl_empleados_fk FOREIGN KEY (id_pais) REFERENCES sch_mantenimientos.tbl_pais(id_pais);
ALTER TABLE sch_seguridad.tbl_empleados ADD CONSTRAINT tbl_empleados_fk_1 FOREIGN KEY (id_rol) REFERENCES sch_seguridad.tbl_rol(id_rol);


-- sch_seguridad.tbl_usuarios definition

-- Drop table

-- DROP TABLE sch_seguridad.tbl_usuarios;

CREATE TABLE sch_seguridad.tbl_usuarios (
	id_usuario serial4 NOT NULL,
	correo varchar(50) NOT NULL,
	nombre varchar(50) NOT NULL,
	apellido varchar(50) NOT NULL,
	telefono varchar(50) NOT NULL,
	id_pais int4 NOT NULL,
	"password" varchar(500) NOT NULL,
	confirmado bool NOT NULL,
	fecha_creacion date NULL,
	fecha_modificacion date NULL,
	activo bool NULL,
	fecha_nacimiento date NULL,
	CONSTRAINT tbl_usuarios_pk PRIMARY KEY (id_usuario),
	CONSTRAINT tbl_usuarios_un UNIQUE (correo)
);
CREATE INDEX idx_user ON sch_seguridad.tbl_usuarios USING btree (id_usuario, correo);


-- sch_seguridad.tbl_usuarios foreign keys

ALTER TABLE sch_seguridad.tbl_usuarios ADD CONSTRAINT tbl_usuarios_fk FOREIGN KEY (id_pais) REFERENCES sch_mantenimientos.tbl_pais(id_pais);


-- sch_seguridad.vw_empleados source

CREATE OR REPLACE VIEW sch_seguridad.vw_empleados
AS SELECT te.id_empleado,
    te.correo,
    te.nombre,
    te.apellido,
    te.id_pais,
    te.password,
    te.activo,
    te.fecha_creacion,
    te.fecha_modificacion,
    te.id_rol,
    tp.nombre_pais,
    tr.desc_rol
   FROM sch_seguridad.tbl_empleados te
     JOIN sch_seguridad.tbl_rol tr ON tr.id_rol = te.id_rol
     JOIN sch_mantenimientos.tbl_pais tp ON tp.id_pais = te.id_pais;
    
    
-- sch_seguridad.vw_usuarios source

CREATE OR REPLACE VIEW sch_seguridad.vw_usuarios
AS SELECT tu.id_usuario,
    tu.correo,
    tu.nombre,
    tu.fecha_nacimiento,
    tu.activo,
    tu.apellido,
    tu.telefono,
    tu.id_pais,
    tu.confirmado,
    tu.fecha_creacion,
    tu.fecha_modificacion,
    tp.nombre_pais
   FROM sch_seguridad.tbl_usuarios tu
     JOIN sch_mantenimientos.tbl_pais tp ON tp.id_pais = tu.id_pais;
    
-- sch_bienes.tbl_tipo_bien definition

-- Drop table

-- DROP TABLE sch_bienes.tbl_tipo_bien;

CREATE TABLE sch_bienes.tbl_tipo_bien (
	id_tipo_bien serial4 NOT NULL,
	desc_tipo_bien varchar(50) NOT NULL,
	activo bool NOT NULL,
	CONSTRAINT tbl_tipo_bien_pk PRIMARY KEY (id_tipo_bien)
);

-- sch_bienes.tbl_bienes definition

-- Drop table

-- DROP TABLE sch_bienes.tbl_bienes;

CREATE TABLE sch_bienes.tbl_bienes (
	id_bien serial4 NOT NULL,
	desc_bien varchar NULL,
	direccion varchar NULL,
	latitud varchar NULL,
	longitud varchar NULL,
	dimensiones float8 NULL,
	habitaciones int8 NULL,
	bathrooms int8 NULL,
	pisos int8 NULL,
	parqueo int8 NULL,
	venta_renta varchar NULL,
	aprobado varchar NULL,
	seo bool NULL,
	fecha_registro date NULL,
	fecha_aprobacion date NULL,
	id_ciudad serial4 NOT NULL,
	id_tipo_bien int4 NOT NULL,
	id_usuario int8 NOT NULL,
	fecha_modificacion date NULL,
	precio float8 NOT NULL,
	seguridad bool NOT NULL,
	cisterna bool NOT NULL,
	area_verde bool NOT NULL,
	lavanderia bool NOT NULL,
	mascotas bool NOT NULL,
	amueblado bool NOT NULL,
	aire bool NOT NULL,
	calentador bool NOT NULL,
	id_unidad_medida int8 NULL,
	cuarto_servicio bool NULL,
	area_construccion float8 NULL,
	id_unidad_medida_cons int8 NULL,
	CONSTRAINT tbl_bienes_pk PRIMARY KEY (id_bien)
);
CREATE INDEX idx_filtered_bienes ON sch_bienes.tbl_bienes USING btree (aprobado, id_tipo_bien, id_ciudad, precio, venta_renta, id_bien);


-- sch_bienes.tbl_bienes foreign keys

ALTER TABLE sch_bienes.tbl_bienes ADD CONSTRAINT tbl_bienes_fk FOREIGN KEY (id_tipo_bien) REFERENCES sch_bienes.tbl_tipo_bien(id_tipo_bien);
ALTER TABLE sch_bienes.tbl_bienes ADD CONSTRAINT tbl_bienes_fk_1 FOREIGN KEY (id_ciudad) REFERENCES sch_mantenimientos.tbl_ciudad(id_ciudad);
ALTER TABLE sch_bienes.tbl_bienes ADD CONSTRAINT tbl_bienes_fk_2 FOREIGN KEY (id_unidad_medida) REFERENCES sch_mantenimientos.tbl_unidad_medida(id_unidad_medida);
ALTER TABLE sch_bienes.tbl_bienes ADD CONSTRAINT tbl_bienes_fk_3 FOREIGN KEY (id_unidad_medida_cons) REFERENCES sch_mantenimientos.tbl_unidad_medida(id_unidad_medida);


-- sch_bienes.tbl_foto_bien definition

-- Drop table

-- DROP TABLE sch_bienes.tbl_foto_bien;

CREATE TABLE sch_bienes.tbl_foto_bien (
	nombre_foto varchar NULL,
	id_bien int8 NULL,
	id_foto serial4 NOT NULL,
	CONSTRAINT tbl_foto_bien_pk PRIMARY KEY (id_foto)
);
CREATE INDEX idx_pics ON sch_bienes.tbl_foto_bien USING btree (id_bien);


-- sch_bienes.tbl_foto_bien foreign keys

ALTER TABLE sch_bienes.tbl_foto_bien ADD CONSTRAINT tbl_foto_bien_fk FOREIGN KEY (id_bien) REFERENCES sch_bienes.tbl_bienes(id_bien);

-- sch_bienes.tbl_cita_bien definition

-- Drop table

-- DROP TABLE sch_bienes.tbl_cita_bien;

CREATE TABLE sch_bienes.tbl_cita_bien (
	id_cita serial4 NOT NULL,
	id_usuario int8 NOT NULL,
	id_bien int4 NOT NULL,
	fecha_solicitud date NULL,
	fecha_cita date NULL,
	realizado varchar(20) NOT NULL,
	id_empleado int8 NULL,
	CONSTRAINT tbl_cita_bien_pk PRIMARY KEY (id_cita)
);


-- sch_bienes.tbl_cita_bien foreign keys

ALTER TABLE sch_bienes.tbl_cita_bien ADD CONSTRAINT tbl_cita_bien_fk FOREIGN KEY (id_bien) REFERENCES sch_bienes.tbl_bienes(id_bien);
ALTER TABLE sch_bienes.tbl_cita_bien ADD CONSTRAINT tbl_cita_bien_fk_1 FOREIGN KEY (id_empleado) REFERENCES sch_seguridad.tbl_empleados(id_empleado);

-- sch_bienes.tbl_trato_bien definition

-- Drop table

-- DROP TABLE sch_bienes.tbl_trato_bien;

CREATE TABLE sch_bienes.tbl_trato_bien (
	id_trato serial4 NOT NULL,
	fecha date NOT NULL,
	id_cita int8 NOT NULL,
	CONSTRAINT tbl_trato_bien_pk PRIMARY KEY (id_trato)
);


-- sch_bienes.tbl_trato_bien foreign keys

ALTER TABLE sch_bienes.tbl_trato_bien ADD CONSTRAINT tbl_trato_bien_fk FOREIGN KEY (id_cita) REFERENCES sch_bienes.tbl_cita_bien(id_cita);

-- sch_bienes.vw_bienes source

CREATE OR REPLACE VIEW sch_bienes.vw_bienes
AS SELECT tb.id_bien,
    tb.desc_bien,
    tb.direccion,
    tb.latitud,
    tb.longitud,
    tb.dimensiones,
    tb.id_unidad_medida,
    tum.desc_unidad_medida,
    tb.habitaciones,
    tb.bathrooms,
    tb.pisos,
    tb.parqueo,
    tb.venta_renta,
    tb.aprobado,
    tb.seo,
    tb.fecha_registro,
    tb.fecha_aprobacion,
    tb.id_ciudad,
    tc.nombre_ciudad,
    tb.id_tipo_bien,
    ttb.desc_tipo_bien,
    tb.id_usuario,
    tb.fecha_modificacion,
    tb.precio,
    tu.telefono,
    tu.correo,
    tb.seguridad,
    tb.cisterna,
    tb.area_verde,
    tb.lavanderia,
    tb.mascotas,
    tb.amueblado,
    tb.aire,
    tb.calentador,
    concat(tu.nombre, ' ', tu.apellido) AS nombre_propietario,
    tb.id_unidad_medida_cons,
    tb.area_construccion,
    tumc.desc_unidad_medida AS desc_unidad_medida_cons,
    tb.cuarto_servicio
   FROM sch_bienes.tbl_bienes tb
     LEFT JOIN sch_mantenimientos.tbl_ciudad tc ON tb.id_ciudad = tc.id_ciudad
     LEFT JOIN sch_bienes.tbl_tipo_bien ttb ON tb.id_tipo_bien = ttb.id_tipo_bien
     LEFT JOIN sch_seguridad.tbl_usuarios tu ON tu.id_usuario = tb.id_usuario
     LEFT JOIN sch_mantenimientos.tbl_unidad_medida tum ON tum.id_unidad_medida = tb.id_unidad_medida
     LEFT JOIN sch_mantenimientos.tbl_unidad_medida tumc ON tumc.id_unidad_medida = tb.id_unidad_medida_cons;
    
-- sch_bienes.vw_citas_bienes source

CREATE OR REPLACE VIEW sch_bienes.vw_citas_bienes
AS SELECT tcb.id_cita,
    tcb.id_usuario,
    concat(tu.nombre, ' ', tu.apellido) AS usuario,
    tcb.id_bien,
    tcb.fecha_solicitud,
    tcb.fecha_cita,
    tcb.realizado,
    tcb.id_empleado,
    tb.direccion,
    tu.correo,
    concat(te.nombre, ' ', te.apellido) AS empleado
   FROM sch_bienes.tbl_cita_bien tcb
     LEFT JOIN sch_bienes.tbl_bienes tb ON tcb.id_bien = tb.id_bien
     LEFT JOIN sch_seguridad.tbl_usuarios tu ON tu.id_usuario = tcb.id_usuario
     LEFT JOIN sch_seguridad.tbl_empleados te ON tcb.id_empleado = te.id_empleado;
    
    
-- sch_bienes.vw_trato_bienes source

CREATE OR REPLACE VIEW sch_bienes.vw_trato_bienes
AS SELECT tt.id_trato,
    tt.id_cita,
    tt.fecha,
    tb.direccion,
    tb.id_bien,
    tb.id_usuario AS id_vendedor,
    vb.nombre_propietario AS vendedor,
    tcb.id_usuario AS id_comprador,
    concat(tu.nombre, ' ', tu.apellido) AS comprador,
    te.id_empleado,
    concat(te.nombre, ' ', te.apellido) AS empleado
   FROM sch_bienes.tbl_trato_bien tt
     LEFT JOIN sch_bienes.tbl_cita_bien tcb ON tcb.id_cita = tt.id_cita
     LEFT JOIN sch_bienes.tbl_bienes tb ON tb.id_bien = tcb.id_bien
     LEFT JOIN sch_seguridad.tbl_usuarios tu ON tu.id_usuario = tcb.id_usuario
     LEFT JOIN sch_seguridad.tbl_empleados te ON tcb.id_empleado = te.id_empleado
     LEFT JOIN sch_bienes.vw_bienes vb ON tb.id_bien = vb.id_bien;
    
-- sch_vehiculos.tbl_tipo_vehiculo definition

-- Drop table

-- DROP TABLE sch_vehiculos.tbl_tipo_vehiculo;

CREATE TABLE sch_vehiculos.tbl_tipo_vehiculo (
	id_tipo_vehiculo serial4 NOT NULL,
	desc_tipo_vehiculo varchar NOT NULL,
	activo bool NOT NULL,
	CONSTRAINT tbl_tipo_vehiculo_pk PRIMARY KEY (id_tipo_vehiculo)
);


-- sch_vehiculos.tbl_vehiculos definition

-- Drop table

-- DROP TABLE sch_vehiculos.tbl_vehiculos;

CREATE TABLE sch_vehiculos.tbl_vehiculos (
	id_vehiculo serial4 NOT NULL,
	desc_vehiculo varchar NULL,
	marca varchar NULL,
	modelo varchar NULL,
	"year" int8 NULL,
	seo bool NULL,
	motor varchar NULL,
	caja varchar NULL,
	color varchar NULL,
	kilometraje float8 NULL,
	cabina varchar NULL,
	aprobado varchar NULL,
	combustible varchar NULL,
	fecha_registro date NULL,
	fecha_aprobacion date NULL,
	usado_nuevo varchar NULL,
	id_tipo_vehiculo int8 NOT NULL,
	id_usuario int8 NOT NULL,
	id_ciudad int8 NOT NULL,
	fecha_modificacion date NULL,
	precio float8 NOT NULL,
	camara_trasera bool NULL,
	aire_acondicionado bool NULL,
	doble_traccion bool NULL,
	ventanas_electricas bool NULL,
	bolsas_aire bool NULL,
	pantalla bool NULL,
	rines_deluxe bool NULL,
	sunroof bool NULL,
	asientos_cuero bool NULL,
	calentador bool NULL,
	id_unidad_distancia int4 NOT NULL,
	CONSTRAINT tbl_vehiculos_pk PRIMARY KEY (id_vehiculo)
);
CREATE INDEX idx_filtered_vehiculos ON sch_vehiculos.tbl_vehiculos USING btree (aprobado, id_tipo_vehiculo, id_ciudad, precio, usado_nuevo, id_vehiculo);


-- sch_vehiculos.tbl_vehiculos foreign keys

ALTER TABLE sch_vehiculos.tbl_vehiculos ADD CONSTRAINT tbl_vehiculos_fk FOREIGN KEY (id_tipo_vehiculo) REFERENCES sch_vehiculos.tbl_tipo_vehiculo(id_tipo_vehiculo);
ALTER TABLE sch_vehiculos.tbl_vehiculos ADD CONSTRAINT tbl_vehiculos_fk3 FOREIGN KEY (id_unidad_distancia) REFERENCES sch_mantenimientos.tbl_unidad_distancia(id_unidad_distancia);
ALTER TABLE sch_vehiculos.tbl_vehiculos ADD CONSTRAINT tbl_vehiculos_fk_2 FOREIGN KEY (id_ciudad) REFERENCES sch_mantenimientos.tbl_ciudad(id_ciudad);

-- sch_vehiculos.tbl_foto_vehiculo definition

-- Drop table

-- DROP TABLE sch_vehiculos.tbl_foto_vehiculo;

CREATE TABLE sch_vehiculos.tbl_foto_vehiculo (
	id_foto serial4 NOT NULL,
	id_vehiculo int8 NOT NULL,
	nombre_foto varchar NOT NULL,
	CONSTRAINT tbl_foto_vehiculo_pk PRIMARY KEY (id_foto)
);
CREATE INDEX idx_pics ON sch_vehiculos.tbl_foto_vehiculo USING btree (id_vehiculo);


-- sch_vehiculos.tbl_foto_vehiculo foreign keys

ALTER TABLE sch_vehiculos.tbl_foto_vehiculo ADD CONSTRAINT tbl_foto_vehiculo_fk FOREIGN KEY (id_vehiculo) REFERENCES sch_vehiculos.tbl_vehiculos(id_vehiculo);

-- sch_vehiculos.tbl_cita_vehiculo definition

-- Drop table

-- DROP TABLE sch_vehiculos.tbl_cita_vehiculo;

CREATE TABLE sch_vehiculos.tbl_cita_vehiculo (
	id_cita serial4 NOT NULL,
	id_usuario int8 NULL,
	id_vehiculo int8 NULL,
	fecha_solicitud date NULL,
	fecha_cita date NULL,
	realizado varchar(20) NULL,
	id_empleado int8 NULL,
	CONSTRAINT tbl_cita_vehiculo_pk PRIMARY KEY (id_cita)
);


-- sch_vehiculos.tbl_cita_vehiculo foreign keys

ALTER TABLE sch_vehiculos.tbl_cita_vehiculo ADD CONSTRAINT tbl_cita_vehiculo_fk FOREIGN KEY (id_vehiculo) REFERENCES sch_vehiculos.tbl_vehiculos(id_vehiculo);
ALTER TABLE sch_vehiculos.tbl_cita_vehiculo ADD CONSTRAINT tbl_cita_vehiculo_fk_1 FOREIGN KEY (id_empleado) REFERENCES sch_seguridad.tbl_empleados(id_empleado);

-- sch_vehiculos.tbl_trato_vehiculo definition

-- Drop table

-- DROP TABLE sch_vehiculos.tbl_trato_vehiculo;

CREATE TABLE sch_vehiculos.tbl_trato_vehiculo (
	id_trato serial4 NOT NULL,
	id_cita int8 NOT NULL,
	fecha date NOT NULL,
	CONSTRAINT tbl_trato_vehiculo_pk PRIMARY KEY (id_trato)
);


-- sch_vehiculos.tbl_trato_vehiculo foreign keys

ALTER TABLE sch_vehiculos.tbl_trato_vehiculo ADD CONSTRAINT tbl_trato_vehiculo_fk FOREIGN KEY (id_cita) REFERENCES sch_vehiculos.tbl_cita_vehiculo(id_cita);

-- sch_vehiculos.vw_citas source

CREATE OR REPLACE VIEW sch_vehiculos.vw_citas
AS SELECT tcb.id_cita,
    tcb.id_usuario,
    tcb.id_vehiculo,
    tcb.fecha_solicitud,
    tcb.fecha_cita,
    tcb.realizado,
    tcb.id_empleado,
    concat(tb.marca, ' ', tb.modelo, ' ', tb.year) AS desc_vehiculo,
    tu.correo,
    concat(tu.nombre, ' ', tu.apellido) AS nombre_usuario,
    concat(te.nombre, ' ', te.apellido) AS empleado
   FROM sch_vehiculos.tbl_cita_vehiculo tcb
     LEFT JOIN sch_vehiculos.tbl_vehiculos tb ON tcb.id_vehiculo = tb.id_vehiculo
     LEFT JOIN sch_seguridad.tbl_usuarios tu ON tu.id_usuario = tcb.id_usuario
     LEFT JOIN sch_seguridad.tbl_empleados te ON te.id_empleado = tcb.id_empleado;
    
-- sch_vehiculos.vw_vehiculos source

CREATE OR REPLACE VIEW sch_vehiculos.vw_vehiculos
AS SELECT tv.id_vehiculo,
    tv.desc_vehiculo,
    tv.marca,
    tv.modelo,
    tv.year,
    tv.seo,
    tv.motor,
    tv.caja,
    tv.color,
    tv.kilometraje,
    tv.cabina,
    tv.aprobado,
    tv.combustible,
    tv.fecha_registro,
    tv.fecha_aprobacion,
    tv.usado_nuevo,
    tv.precio,
    tv.id_tipo_vehiculo,
    tv.id_usuario,
    tv.id_ciudad,
    tv.fecha_modificacion,
    ttv.desc_tipo_vehiculo,
    tc.nombre_ciudad,
    tu.correo,
    concat(tu.nombre, ' ', tu.apellido) AS nombre_propietario,
    tv.camara_trasera,
    tv.aire_acondicionado,
    tv.doble_traccion,
    tv.ventanas_electricas,
    tv.bolsas_aire,
    tv.pantalla,
    tv.rines_deluxe,
    tv.sunroof,
    tv.asientos_cuero,
    tv.calentador,
    tv.id_unidad_distancia,
    tud.desc_unidad_distancia
   FROM sch_vehiculos.tbl_vehiculos tv
     LEFT JOIN sch_vehiculos.tbl_tipo_vehiculo ttv ON tv.id_tipo_vehiculo = ttv.id_tipo_vehiculo
     LEFT JOIN sch_mantenimientos.tbl_ciudad tc ON tc.id_ciudad = tv.id_ciudad
     LEFT JOIN sch_seguridad.tbl_usuarios tu ON tu.id_usuario = tv.id_usuario
     LEFT JOIN sch_mantenimientos.tbl_unidad_distancia tud ON tv.id_unidad_distancia = tud.id_unidad_distancia;
    
-- sch_vehiculos.vw_tratos source

CREATE OR REPLACE VIEW sch_vehiculos.vw_tratos
AS SELECT tt.id_trato,
    tt.id_cita,
    tt.fecha,
    tcv.id_vehiculo,
    concat(tv.marca, ' ', tv.modelo, ' ', tv.year) AS desc_vehiculo,
    tcv.id_usuario AS id_comprador,
    concat(tu.nombre, ' ', tu.apellido) AS comprador,
    tv.id_usuario AS id_vendedor,
    vv.nombre_propietario AS vendedor,
    te.id_empleado,
    concat(te.nombre, ' ', te.apellido) AS empleado
   FROM sch_vehiculos.tbl_trato_vehiculo tt
     LEFT JOIN sch_vehiculos.tbl_cita_vehiculo tcv ON tcv.id_cita = tt.id_cita
     LEFT JOIN sch_vehiculos.tbl_vehiculos tv ON tv.id_vehiculo = tcv.id_vehiculo
     LEFT JOIN sch_seguridad.tbl_usuarios tu ON tu.id_usuario = tcv.id_usuario
     LEFT JOIN sch_seguridad.tbl_empleados te ON tcv.id_empleado = te.id_empleado
     LEFT JOIN sch_vehiculos.vw_vehiculos vv ON tv.id_usuario = vv.id_usuario;



    
-- sch_publicidad.tbl_publicidad definition

-- Drop table

-- DROP TABLE sch_publicidad.tbl_publicidad;

CREATE TABLE sch_publicidad.tbl_publicidad (
	id_publicidad serial NOT NULL,
	link varchar NULL,
	thumbnail varchar NULL,
	empresa varchar NULL,
	fecha_ingreso date NULL,
	activo bool NULL,
  tipo varchar NOT null
 );

INSERT INTO sch_seguridad.tbl_rol
(desc_rol, activo)
VALUES('Administrador', true);

INSERT INTO sch_mantenimientos.tbl_pais
(nombre_pais, activo)
VALUES('Honduras', true);

INSERT INTO sch_seguridad.tbl_empleados
(nombre, apellido, correo, "password", id_pais, activo, fecha_creacion, id_rol)
VALUES('Desarrollo', 'Tecnologico', 'dtecnologia@applocaliza.com', '$2b$10$bgo3JohP5mhFyHWwFoWqkOkkiw3AqOGPbCYisuhyU5Ok/uKwKyxrW', 1, true, now(), 1);
-- Password: T3chdev7