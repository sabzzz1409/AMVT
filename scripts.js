import jwt from 'jsonwebtoken';

export const consoleLog = (req, res) => console.log("hi");
export const consoleLogReq = (req, res) => console.log(req);
export const consoleLogRes = (req, res) => console.log(res);
export const consoleLogCheck = (results, req, res) => console.log("bye");
export const consoleLogRequest = (results, req, res) => console.log(req);
export const consoleLogResponse = (results, req, res) => console.log(res);
export const consoleLogResults = (results, req, res) => console.log(results);

export const token = (req, res) => console.log(jwt.sign(req.body, 'secretKey'));

export const login = (results, req, res) => {
    switch (results.length) {
        case 0:
            results.push({ msg: "not a user" })
            break;
        case 1:
            let password = results[0].password;
            if (req.body.password !== password) {
                results.length = 0;
                results.push({ msg: "not a valid password" })
            }
            else{
                results.length = 0;
            }
            break;
        default:
            results.length = 0;
            results.push({ msg: "Multiple response" })
    }
}

export const otp = (req, res) => {
    let length = 4;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    req.body.otp = otp
}

