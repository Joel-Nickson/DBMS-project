const fs = require('fs');
const crypto = require('crypto');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
const connect = require('./connect.js');

// let libPath;
// if (process.platform === 'win32') {           // Windows
//     libPath = 'D:\\oracleclient\\instantclient_19_9';
// } else if (process.platform === 'darwin') {   // macOS
//     libPath = process.env.HOME + '/Downloads/instantclient_19_8';
// }
// if (libPath && fs.existsSync(libPath)) {
//     oracledb.initOracleClient({ libDir: libPath });
// }

oracledb.fetchAsString = [oracledb.NUMBER];  // any number queried will be returned as a string

async function initUsers() {

    let connection, data;

    try {
        connection = await oracledb.getConnection(dbConfig);
        await connect.setupUsers(connection);
        let result = await connection.execute(
            `SELECT id, name, type, pass_hash
             FROM users`
        )
        data = result.rows

    }
    catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    return JSON.stringify(data)
}


async function selectUsers() {
    let connection, data;
    try {
        connection = await oracledb.getConnection(dbConfig);
        let result = await connection.execute(
            `SELECT id, name, type, pass_hash
             FROM users`
        )
        data = result.rows
    }
    catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    return data
}
module.exports.initUsers = initUsers;
module.exports.selectUsers = selectUsers;