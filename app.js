import { handleBackendPost } from './code.js';
import * as script from './scripts.js';
import { databases } from './database.js';

///request 1
handleBackendPost({
    route: "get_data",
    auth_fns: [
        // (req, res) => console.log("Auth function 1 executed")
    ],
    dbQuery: [
        {
            db: databases.db1,
            query: `SELECT * FROM login_tbl;`,
            param: [],
            calc_fns: [
                // (results, req, res) => console.log("Calc function 1 executed for db1")
            ],
            show: false
        },
        {
            db: databases.db2,
            query: `SELECT * FROM simple;`,
            param: [],
            calc_fns: [
                // (results, req, res) => console.log("Calc function 1 executed for db2")
            ],
            show: true
        }
    ]
});
///request 2
handleBackendPost({
    route: "send_data",
    auth_fns: [
        (req, res) => console.log("Auth function 1 executed", 82)
    ],
    dbQuery: [
        {
            db: databases.db1,
            query: `INSERT INTO login_tbl (username, password) VALUES (?,?);`,
            param: ["username", "password"],
            calc_fns: [
                (results, req, res) => console.log("Calc function 1 executed", 89)
            ],
            show: true
        }
    ]
});
/// request 3
handleBackendPost({
    route: "login_data",
    auth_fns: [
        (req, res) => console.log("Auth function 1 executed", 103),
        script.otp,
        script.token
    ],
    dbQuery: [
        {
            db: databases.db1,
            query: `SELECT password FROM login_tbl WHERE username = ?;`,
            param: ["username"],
            calc_fns: [
                (results, req, res) => console.log(req.body),
                script.login
            ],
            show: true
        }
    ]
});
/// request 4
handleBackendPost({
    route: "formdata",
    auth_fns: [
        (req, res) => console.log("Auth function 1 executed", 103),
        script.otp,
        script.token
    ],
    dbQuery: [
        {
            db: databases.db1,
            query: `SELECT password FROM login_tbl WHERE username = ?;`,
            param: ["username"],
            calc_fns: [
                (results, req, res) => console.log(req.body),
                script.login
            ],
            show: false
        }
    ]
});

//// end of request