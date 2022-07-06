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

async function getPets(){
    try{
        const response = await pool.query("SELECT * FROM v_pets")
        return response.rows
    }catch(error){
        console.log(error)
    }
}

async function getPetsByOwnerId(ownerId){
    try{
        const response = await pool.query("SELECT * FROM Pet P INNER JOIN Owner O ON P.ownerid = O.id where P.ownerid="+ownerId)
        return response.rows

    }catch(error){
        console.log(error)
    }
}


module.exports = {
    getVets: getVets,
    getPets: getPets,
    getPetsByOwnerId:getPetsByOwnerId
}