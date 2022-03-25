const { Pool } = require("pg");

const pool = new Pool({
    host:"oregon-postgres.render.com",
    user:"rbgc",
    password:"FLHvI5DFvGQKBb1BbEPzZl8yHVqg2H50",
    database:"dbcuidarte",
    port:"5432",
    ssl:true
});

 async function getPersons () {
     try{
        const response = await pool.query("SELECT * FROM Person");
        return response.rows
     }catch(error){
        console.log(error);
    }
}

async function getCoordinates(deviceId) {
    try{
        const response = await pool.query("SELECT * FROM Coordinates WHERE deviceId="+deviceId)
        return response.rows;
    }catch(error){
        console.log(error);
    }
}

async function getDevicesByGroupGoogleId(groupGoogleId){
    try{
        const response = await pool.query("SELECT * FROM Device WHERE groupgoogleid="+groupGoogleId)
        return response.rows;
    }catch(error){
        console.log(error);
    }
}

async function getSupervisorDevicesByGroupGoogleId(groupGoogleId){
    try{
        const response = await pool.query("SELECT * FROM Device WHERE groupgoogleid="+groupGoogleId+" and type = 2")
        return response.rows;
    }catch(error){
        console.log(error);
    }
}

async function getSupervisedDeviceByGroupGoogleId(groupGoogleId){
    try{
        const response = await pool.query("SELECT * FROM Device WHERE groupgoogleid="+groupGoogleId+" and type = 1")
        return response.rows[0].deviceid;
    }catch(error){
        console.log(error);
    }
}


async function insertGroupGoogle(googleId,displayName,email){
    try {
        const responseSelect = await pool.query("SELECT groupGoogleId, googleid, displayname, email FROM GroupGoogle WHERE googleId='"+googleId+"'")

        if(responseSelect.rows == 0)
        {
            var result = await pool.query(
                `INSERT INTO GroupGoogle (googleid,displayname,email)  
                 VALUES ($1, $2, $3) RETURNING *`, [googleId,displayName,email]); // sends queries
            return result.rows[0];
        }else{
            return responseSelect.rows[0];
        }
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}

async function getGroupGoogleByGoogleId(googleId) {
    try{
        const response = await pool.query("SELECT * FROM GroupGoogle WHERE googleId='"+googleId+"'")
        return response.rows;
    }catch(error){
        console.log(error);
    }
}

async function getHomesByDeviceId(deviceId) {
    try{
        const response = await pool.query("SELECT * FROM home WHERE deviceId='"+deviceId+"'")
        return response.rows;
    }catch(error){
        console.log(error);
    }
}


async function insertDevice(imei, GroupGoogleId, fcmtoken, type){
    try {
        const responseSelect = await pool.query("SELECT * FROM Device WHERE imei='"+imei+"' and groupgoogleid='"+GroupGoogleId+"'")

        if(responseSelect.rows == 0)
        {
            var result = await pool.query(
                `INSERT INTO Device (imei,GroupGoogleId,fcmtoken,type)  
                 VALUES ($1, $2, $3, $4) RETURNING *`, [imei,GroupGoogleId,fcmtoken,type]); // sends queries
            return result.rows[0];
        }else{
            return responseSelect.rows[0];
        }        
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}

async function insertCoordinates(datetime,longitude,latitude,deviceId){
    try {
        var result = await pool.query(
            `INSERT INTO coordinates (datetime,longitude,latitude, deviceId)  
             VALUES ($1, $2, $3, $4) RETURNING *`, [datetime,longitude, latitude,deviceId]); // sends queries
        return result.rows[0];
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}



module.exports = {
    getPersons,
    insertGroupGoogle,
    getGroupGoogleByGoogleId,
    insertDevice,
    insertCoordinates,
    getCoordinates,
    getHomesByDeviceId,
    getDevicesByGroupGoogleId,
    getSupervisorDevicesByGroupGoogleId,
    getSupervisedDeviceByGroupGoogleId
}