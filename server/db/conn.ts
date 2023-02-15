import mysql from 'mysql'

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mycdlist'
})

    console.log("Conectamos ao banco")
    
export default pool