CREATE DATABASE estudiantes;

CREATE TABLE estudiante(
    nombre varchar(50) NOT NULL,
    rut varchar(12) NOT NULL PRIMARY KEY,
    curso varchar (20) NOT NULL,
    nivel varchar(10) NOT NULL
);