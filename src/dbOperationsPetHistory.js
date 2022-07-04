const { Pool } = require("pg");

const pool = new Pool({
    host:"oregon-postgres.render.com",
    user:"rbgc",
    password:"ZO9YzVjpXAkiKsHoRGkuIrF144pMXhvA",
    database:"dbpethistory",
    port:"5432",
    ssl:true
});

async function getVets(){
    try{
        const response = await pool.query("SELECT * FROM Vet")
        return response.rows
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getVets: getVets
}