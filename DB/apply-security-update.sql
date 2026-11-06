-- Apply on an existing localizadb. Safe to run more than once.
-- Retires the published bootstrap password and removes password hashes from the employee view.

UPDATE sch_seguridad.tbl_empleados
SET password = '$2b$10$xtd0aoayzEDvQhxqMCjNnei3P1aSlKSYiNaeiuyd9poxDVamG7ftW'
WHERE correo = 'dtecnologia@example.com';

CREATE OR REPLACE VIEW sch_seguridad.vw_empleados
AS SELECT te.id_empleado,
    te.correo,
    te.nombre,
    te.apellido,
    te.id_pais,
    te.activo,
    te.fecha_creacion,
    te.fecha_modificacion,
    te.id_rol,
    tp.nombre_pais,
    tr.desc_rol
   FROM sch_seguridad.tbl_empleados te
     JOIN sch_seguridad.tbl_rol tr ON tr.id_rol = te.id_rol
     JOIN sch_mantenimientos.tbl_pais tp ON tp.id_pais = te.id_pais;
