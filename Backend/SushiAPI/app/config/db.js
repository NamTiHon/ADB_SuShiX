import sql from 'mssql';

const config = {
    user: 'sa',
    password: '123',
    server: 'localhost',
    database: 'DB_SushiX',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
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