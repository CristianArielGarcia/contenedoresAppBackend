//para usar variables de entorno
require('dotenv').config();
const express = require('express');
const cors = require('cors');


const sql = require('mssql');
const { sqlConfig } = require('./db/config');


//Crear el sv de express
const app = express();


//CORS
app.use(cors());


app.use(express.json());



const inicio = async () => {

    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig);
        console.log('DB online');
    } catch (err) {
        // ... error checks
    }
}




inicio();



//Rutas 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dar', require('./routes/darsenas'));
app.use('/api/lpn', require('./routes/lpn'));
app.use('/api/detalle', require('./routes/detalleLPN'));



//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})




module.exports