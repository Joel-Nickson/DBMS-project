const fs = require('fs');
const crypto = require('crypto');
// const oracledb = require('oracledb');
// const dbConfig = require('./dbconfig.js');

// let libPath;
// if (process.platform === 'win32') {           // Windows
//     libPath = 'D:\\oracleclient\\instantclient_19_9';
// } else if (process.platform === 'darwin') {   // macOS
//     libPath = process.env.HOME + '/Downloads/instantclient_19_8';
// }
// if (libPath && fs.existsSync(libPath)) {
//     oracledb.initOracleClient({ libDir: libPath });
// }

async function setupUsers(connection) {
    try {

        //
        // Create a table
        //
        const stmts = [
            `DROP TABLE users`,

            `CREATE TABLE users (id NUMBER, name VARCHAR(20), type VARCHAR(3), pass_hash VARCHAR(90))`,

            `INSERT INTO users VALUES (1, 'chris', 'pat', 'ObcoALEFWrnbg5Ap+B9xVCe+kpwBnNojYyN440bYLe5zJx8fzAMcipFaqqdH3uMqhnb8y2t28pvtKwJRhSUh9A==')`,
            `INSERT INTO users VALUES (2, 'Alison', 'pat', 'zxvjF+HJJYyn7SqA+jC5wXVd+RGu3H7nNzHfUBl4srLxe0QxqJ/ZthuoFU81EO1KtmkWLklDduqDyQHDCWgnWw==')`
        ];

        for (const s of stmts) {
            try {
                await connection.execute(s);
            } catch (e) {
                if (e.errorNum != 942)
                    console.error(e);
            }
        }

        //
        // examples of inserting
        //
        let hash = crypto.createHash('sha512')
        let data = hash.update('Chris', 'utf-8').digest('base64')
        let result = await connection.execute(
            `INSERT INTO users VALUES (:id, :nm, :ty, :ph)`,
            [3, 'Chris', 'pat', data]
        );

        // hash = crypto.createHash('sha512')
        // data = hash.update('alison', 'utf-8').digest('base64')
        // result = await connection.execute(
        //     `INSERT INTO users VALUES (:id, :nm, :ty, :ph)`,
        //     [2, 'Alison', 'pat', data]
        // );

        // result = await connection.execute(
        //     `UPDATE users SET name = :nm`,
        //     ['Bambi'],
        //     { autoCommit: true }  // commit once for all DML in the script
        // );

        result = await connection.execute(
            `SELECT id, name, type, pass_hash
             FROM users`
        )

        await connection.commit();


    } catch (err) {
        console.error(err);
    }
}


module.exports.setupUsers = setupUsers;
// setupUsers();