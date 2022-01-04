const { Client } = require("pg");
const process = require("process");

//? Cambiar datos segun caso
const config = {
  user: "postgres",
  password: "Junjie1995",
  database: "estudiantes",
  host: "127.0.0.1",
  port: 5432,
};

const client = new Client(config);

client.connect();

const argumentos = process.argv.slice(2);
const funcion = argumentos[0];

//? Registro de un alumno
const registro = async () => {
  const nombre = argumentos[1];
  const rut = argumentos[2];
  const curso = argumentos[3];
  const nivel = argumentos[4];
  await client.query(
    `INSERT INTO estudiante (nombre, rut, curso, nivel) VALUES ('${nombre}','${rut}','${curso}','${nivel}') RETURNING *;`
  );
  console.log(`Estudiante ${nombre} agregado con exito`);
  client.end();
};

//? Busqueda alumno por rut
const buscaPorRut = async () => {
  const rut = argumentos[1];
  const res = await client.query(
    `SELECT * FROM estudiante WHERE rut = '${rut}'`
  );
  console.log(res.rows);
  client.end();
};

//? Muestra todos los alumnos registrados
const todosEstudiantes = async () => {
  const res = await client.query("SELECT * FROM estudiante");
  console.log("Registros: ", res.rows);
  client.end();
};

//? Edita datos de un alumno
const editarEstudiante = async () => {
  const nombre = argumentos[1];
  const rut = argumentos[2];
  const curso = argumentos[3];
  const nivel = argumentos[4];
  await client.query(
    `UPDATE estudiante SET nombre = '${nombre}', rut = '${rut}', curso = '${curso}', nivel = '${nivel}' WHERE nombre = '${nombre}' RETURNING *;`
  );
  console.log(`Estudiante ${nombre} editado con exito`);
  client.end();
};

//? Elimina un alumno
const eliminar = async () => {
  const rut = argumentos[1];
  await client.query(
    `DELETE FROM estudiante WHERE rut = '${rut}' RETURNING *;`
  );
  console.log(`Registro de estudiante con rut ${rut} eliminado`);
  client.end();
};

if (funcion === "nuevo") {
  registro();
} else if (funcion === "rut") {
  buscaPorRut();
} else if (funcion === "consulta") {
  todosEstudiantes();
} else if (funcion === "editar") {
  editarEstudiante();
} else if (funcion === "eliminar") {
  eliminar();
} else {
  console.log("Error en comando");
  client.end();
}
