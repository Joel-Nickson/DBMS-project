const fs = require('fs');
const crypto = require('crypto');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

async function insertUser(name, pass, mail, type) {
    console.log(name, pass, mail, type);
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        let id = await connection.execute(
            ` Select max(id) from users`
        );

        let hash = crypto.createHash('sha512')
        let pass_hash = hash.update(mail + pass, 'utf-8').digest('base64')
        let result = await connection.execute(
            // `INSERT INTO users( name, type, pass_hash) VALUES ( :nm, :ty, :ph)`,
            `INSERT INTO users VALUES (:id, :nm, :ty, :ph)`,
            [parseInt(id.rows[0][0]) + 1, name, type, pass_hash]
        );

        result = await connection.execute(
            `SELECT id, name, type, pass_hash
             FROM users`
        )
        console.log(result.rows)

        await connection.commit();


    } catch (err) {
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
}


module.exports.insertUser = insertUser;
// insertUser();