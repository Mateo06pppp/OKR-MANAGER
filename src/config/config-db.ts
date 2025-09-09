import mysql from 'mysql2';
import 'dotenv/config';

const db = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "mateo06pp",
  database: process.env.DB_NAME ?? "proyecto_okr",
  port: Number(process.env.DB_PORT), 
  connectTimeout: 10000 // 10 segundos
});

const promisePool = db.promise();

export async function testConnection() {
  try {
    const [result] = await promisePool.query('SELECT 1 AS test');
    console.log('✅ Conexión a la base de datos establecida correctamente:', result);
  } catch (err) {
    console.error('❌ Error al conectar con la base de datos:', err);
  }
}

export default promisePool;
