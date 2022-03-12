const express = require("express");

const fcmApp = require("./fcmApp")

var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

const dboperations = require("./dboperations")


var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);

router.use((request,response,next)=>{
    next();
});


router.route("/getPersons").get((request,response)=> {
    sendPushNotification();
    /*dboperations.getPersons().then(result=>{
        response.json(result)
    })*/
})


router.route("/getCoordinatesByPerson").get((request,response)=> {
    const personId = request.query.personId;
    dboperations.getCoordinates(personId).then(result=>{
        response.json(result)
    })
})

router.route("/insertGroupGoogle").post((request,response)=> {
    var googleId = request.query.googleId;
    var displayName = request.query.displayName;
    var email = request.query.email;

    dboperations.insertGroupGoogle(googleId, displayName,email).then(result=>{
        response.json(result)
    })
})

router.route("/getGroupGoogleByGoogleId").get((request,response)=> {
    const googleId = request.query.googleId;
    console.log(googleId)
    dboperations.getGroupGoogleByGoogleId(googleId).then(result=>{
        console.log(result)
        response.json(result)
    })
})

router.route("/insertDevice").post((request,response)=> {
    var imei = request.query.IMEI;
    var GroupGoogleId = request.query.GroupGoogleId;
    var fcmtoken = request.query.fcmtoken
    var type = request.query.type;

    sendPushNotification();

    dboperations.insertDevice(imei,GroupGoogleId,fcmtoken,type).then(result=>{
        response.json(result)
    })
})

router.route("/insertCoordinates").post((request,response)=> {
    var datetime = request.query.datetime;
    var longitude = request.query.longitude;
    var latitude = request.query.latitude;
    var deviceId = request.query.deviceId;
    dboperations.insertCoordinates(datetime,longitude,latitude,deviceId).then(result=>{
        console.log(result)
        response.json(result)
    })

    

})


function sendPushNotification()
{
    fcmApp.sendMessage()
}




app.listen(3000)
console.log("Server on port 3000")