const sql = require('mssql');
const { sqlConfig } = require('../../db/config');


const getAllDetalles = async (darsena, lpn) => {

    const dbConn = new sql.ConnectionPool(sqlConfig);

    let res = await dbConn.connect().then(function () {
        const request = new sql.Request(dbConn);
        const query = `select serie from Produccionr4107.dbo.CON_DetalleLPN WHERE iddarsena = ${darsena} AND idlpn = ${lpn} ORDER BY fecha_hora`;
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
        return res;
    }
    return null
}


const getAllDetallesByFecha = async (darsena, lpn, fecha_desde, fecha_hasta) => {


    const dbConn = new sql.ConnectionPool(sqlConfig);

    let res = await dbConn.connect().then(function () {
        const request = new sql.Request(dbConn);
        const query = `select serie, fecha_hora from Produccionr4107.dbo.CON_DetalleLPN WHERE iddarsena = ${darsena} AND idlpn = ${lpn} AND fecha_hora BETWEEN '${fecha_desde}' AND '${fecha_hasta}' ORDER BY fecha_hora`;
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
        return res;
    }
    return null
}



const getAllDetallesBySerie = async (numero_serie, darsena, lpn) => {


    const dbConn = new sql.ConnectionPool(sqlConfig);

    let res = await dbConn.connect().then(function () {
        const request = new sql.Request(dbConn);
        const query = `select * from Produccionr4107.dbo.CON_DetalleLPN WHERE serie= '${numero_serie}'`;
        const respuesta = request.query(query)

            .then((resp) => {
                dbConn.close();
                return resp;
            }).catch((error) => {
                console.log(error);
                dbConn.close();
            });
        return respuesta

    }).catch((error) => {
        console.error(error);
    });
    console.log(res);
    if (res.rowsAffected[0] >= 1) {
        return res;
    }
    return null
}


const getExisteSerieHermanado = async (numero_serie, darsena, lpn) => {


    const dbConn = new sql.ConnectionPool(sqlConfig);

    let res = await dbConn.connect().then(function () {
        const request = new sql.Request(dbConn);
        const query = `select CodigoNewsan from Produccionr4107.dbo.Inicio WHERE CodigoNewsan= '${numero_serie}'`;
        const respuesta = request.query(query)

            .then((resp) => {
                dbConn.close();
                return resp;
            }).catch((error) => {
                console.log(error);
                dbConn.close();
            });
        return respuesta

    }).catch((error) => {
        console.error(error);
    });
    console.log(res);
    if (res.rowsAffected[0] >= 1) {
        return res;
    }
    return null
}





const insertarDetalle = (serie, iddarsena, idlpn) => {
    var dbConn = new sql.ConnectionPool(sqlConfig);
    dbConn.connect().then(function () {
        var transaction = new sql.Transaction(dbConn);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            const query = `INSERT INTO Produccionr4107.dbo.CON_DetalleLPN (serie, iddarsena, idlpn) VALUES('${serie}', '${iddarsena}', '${idlpn}')`;
            request.query(query)
                .then(function () {
                    transaction.commit().then(function (resp) {
                        console.log(resp);
                        dbConn.close();
                    }).catch(function (err) {
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

    getAllDetalles,
    insertarDetalle,
    getAllDetallesByFecha,
    getAllDetallesBySerie,
    getExisteSerieHermanado

}