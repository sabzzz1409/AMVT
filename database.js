import { createPool } from 'mysql2';

const dbConfigs = [
    {
        name: 'db1',
        config: {
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "revamp_db",
            connectTimeout: 20000,
            connectionLimit: 20,
            debug: false,
            multipleStatements: true
        }
    },
    {
        name: 'db2',
        config: {
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "some_db",
            connectTimeout: 20000,
            connectionLimit: 20,
            debug: false,
            multipleStatements: true
        }
    }
];

export const databases = {};
dbConfigs.forEach(({ name, config }) => {
    databases[name] = createPool(config);
});

