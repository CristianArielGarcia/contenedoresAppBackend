const sql = require('mssql');
const { sqlConfig } = require('../../db/config');


const getAllLpn = async () => {

    const dbConn = new sql.ConnectionPool(sqlConfig);


    let res = await dbConn.connect().then(function () {
        const request = new sql.Request(dbConn);
        const query = `select id, nombre from Produccionr4107.dbo.CON_LPN ORDER BY Nombre`;
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
    console.log(res);
    if (res.rowsAffected[0] >= 1) {
        return res.recordset;
    }
    return null
}

const getLpnByNombreRequest = async (lpnNombre) => {

    const dbConn = new sql.ConnectionPool(sqlConfig);

    let res = await dbConn.connect().then(function () {
        const request = new sql.Request(dbConn);
        const query = `select id, nombre from Produccionr4107.dbo.CON_LPN where Nombre = '${lpnNombre}' `;
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
        console.log(res);
        return res.recordset;
    }
    return null


}


const createLpn = (nombre) => {

    var dbConn = new sql.ConnectionPool(sqlConfig);
    dbConn.connect().then(function () {
        var transaction = new sql.Transaction(dbConn);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            const query = `INSERT INTO Produccionr4107.dbo.CON_LPN (nombre) VALUES('${nombre}')`;
            request.query(query)
                .then(function () {
                    transaction.commit().then(function (resp) {
                        console.log(resp);
                        dbConn.close();
                    }).catch(function (err) {
                        console.log("Error in Transaction Commit " + err);
                        dbConn.close();
                    });
                }).catch(function (err) {
                    console.log("Error in Transaction Begin " + err);
                    dbConn.close();
                })
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        }).catch(function (err) {
            console.log(err);
        });
    });
}






module.exports = {

    getAllLpn,
    getLpnByNombreRequest,
    createLpn
}