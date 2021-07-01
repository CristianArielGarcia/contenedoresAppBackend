const sql = require('mssql');
const { sqlConfig } = require('../../db/config');


const getAllDarsenas = async () => {

    const dbConn = new sql.ConnectionPool(sqlConfig);


    let res = await dbConn.connect().then(function () {
        const request = new sql.Request(dbConn);
        const query = `select id, nombre from Produccionr4107.dbo.CON_Darsena ORDER BY Nombre`;
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



const getDarsenaById = (darsenaId) => {

    const dbConn = new sql.ConnectionPool(sqlConfig);
    dbConn.connect().then(function () {
        const request = new sql.Request(dbConn);
        const query = `select id from Produccionr4107.dbo.CON_Darsena where id =  '${darsenaId}' `;
        request.query(query)
            .then(function (resp) {
                console.log(resp);
                dbConn.close();
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
    }).catch(function (err) {
        console.log(err);
    });

}







module.exports = {

    getAllDarsenas,
    getDarsenaById

}