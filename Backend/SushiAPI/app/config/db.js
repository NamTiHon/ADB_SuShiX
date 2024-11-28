import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        trustServerCertificate: true,
        trustedConnection: false, // SQL Server Authentication đang được sử dụng
        enableArithAbort: true,
        instancename: 'MSSQLSERVER',
    },
    port: 1433
}

const conn = new sql.ConnectionPool(config).connect().then(pool => {
    console.log('Connected to SQL Server');
    return pool;
}).catch(err => console.log('Database Connection Failed! Bad Config: ', err));

export default conn;