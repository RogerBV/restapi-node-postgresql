const { Pool } = require("pg");

const pool = new Pool({
    host:"oregon-postgres.render.com",
    user:"rbgc",
    password:"OL16NN1wzcQrMFIjhtGUvGLfWUbwAZ5L",
    database:"dbcuidarte_e47t",
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
        console.log(response.rows)
        return response.rows;
    }catch(error){
        console.log(error);
    }
}

async function getDevicesByGroupGoogleId(familiargroupid){
    try{
        const response = await pool.query("SELECT * FROM Device WHERE familiargroupid="+familiargroupid)
        return response.rows;
    }catch(error){
        console.log(error);
    }
}

async function getSupervisorDevicesByGroupGoogleId(familiargroupid){
    try{
        const response = await pool.query("SELECT * FROM Device WHERE familiargroupid="+familiargroupid+" and usertype = 2")
        return response.rows;
    }catch(error){
        console.log(error);
    }
}

async function getSupervisedDeviceByGroupGoogleId(familiargroupid){
    try{
        const response = await pool.query("SELECT * FROM Device WHERE familiargroupid="+familiargroupid+" and usertype = 1")
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


async function insertDevice(imei, mobileNumber, fcmtoken, email, userName, type, familiargroupid){
    try {
        const responseSelect = await pool.query("SELECT * FROM Device WHERE imei='"+imei+"'")

        if(responseSelect.rows == 0)
        {
            var result = await pool.query(
                `INSERT INTO Device (imei,mobilenumber,fcmtoken,email,userName, usertype, familiargroupid)  
                 VALUES ($1, $2, $3, $4, $5, $6, 1) RETURNING *`, [imei,mobileNumber,fcmtoken,email, userName, type]); // sends queries
            console.log(result.rows[0])
            return result.rows[0];
        }else{
            
            const query = `UPDATE Device 
                   SET fcmtoken = $3, mobileNumber = $4 
                   WHERE imei = $1 AND GroupGoogleId = $2 AND mobileNumber = $4`;

            return await pool.query(query, [imei, GroupGoogleId, fcmtoken, mobileNumber]); // sends queries

            //return responseSelect.rows[0];
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

async function getDeviceByEmail(email){
    try{
        const response = await pool.query("SELECT * FROM device WHERE email='"+email+"'")
        return response.rows;
    }catch(error){
        console.error(error);
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
    getSupervisedDeviceByGroupGoogleId,
    getDeviceByEmail
}