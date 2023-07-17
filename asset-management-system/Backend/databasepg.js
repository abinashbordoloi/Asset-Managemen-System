const {client} = require('pg')
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'abinash',
    database: 'Neepco'
})

client.connect();
client.query('SELECT * FROM users', (err, res) => {
    if (err){
        console.error(res.rows);
        
    }
    else{
        console.log(err.message);
        
    }
    client.end();
})