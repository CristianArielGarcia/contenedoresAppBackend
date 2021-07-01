const sql = require('mssql');
const { sqlConfig } = require('../../db/config');

const getUsuariosByUsername = async (username) => {

    const dbConn = new sql.ConnectionPool(sqlConfig);

    let res = await dbConn.connect().then(async function () {
        const request = new sql.Request(dbConn);
        const query = `select * from Produccionr4107.dbo.CON_Cuenta where username =  '${username}'`;
        const respuesta = request.query(query)

            .then((resp) => {
                dbConn.close();
                return resp;
            }).catch((err) => {
                dbConn.close();
            });
        return respuesta

    }).catch((err) => {
        console.log(err);
    });
    if (res.rowsAffected[0] >= 1) {
        return res.recordset;
    }
    return null

}



module.exports = {

    getUsuariosByUsername,

}