const sql = require('mssql');
const { moment } = require('moment');
const { sqlConfig } = require('../../db/config');



const createUser = (username, password) => {

    var dbConn = new sql.ConnectionPool(sqlConfig);
    dbConn.connect().then(function () {
        var transaction = new sql.Transaction(dbConn);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            //const query = "INSERT INTO Produccionr4107.dbo.CON_Cuenta (username, password, CreatedDate) VALUES (username,password,CreatedDate";
            const query = `INSERT INTO Produccionr4107.dbo.CON_Cuenta (username, password) VALUES('${username}', '${password}')`;
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

    createUser,

}