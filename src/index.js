const express = require("express");

const fcmApp = require("./fcmApp")

var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

const dboperations = require("./dboperations")

const dboperationsPetHistory = require("./dbOperationsPetHistory");
const dbOperationsPetHistory = require("./dbOperationsPetHistory");


var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);
console.log(__dirname)


router.use((request,response,next)=>{
    next();
});

router.route("/getVets").get((request,response)=> {
    console.log("getVets")
    dboperationsPetHistory.getVets().then(result =>{
        response.json(result)
    })
})

router.route("/getPetById").get((request,response)=> {
    var petId = request.query.id;
    dboperationsPetHistory.getPetById(petId).then(result =>{
        response.json(result)
    })
})

router.route("/getPetsByOwnerId").get((request,response)=> {
    var ownerId = request.query.ownerId;
    dboperationsPetHistory.getPetsByOwnerId(ownerId).then(result =>{
        response.json(result)
    })
})

router.route("/getPets").get((request,response)=>{
    console.log("getPets")
    dbOperationsPetHistory.getPets().then(result=>{
        response.json(result)
    })
})

router.route("/getPersons").get((request,response)=> {
    sendPushNotification();
    /*dboperations.getPersons().then(result=>{
        response.json(result)
    })*/
})

router.route("/sendAlert").get((request,response)=>{
    try{
        const groupGoogleId = request.query.groupGoogleId
        //console.log("groupGoogleId: "+groupGoogleId)
        fcmApp.sendAlert(groupGoogleId)
        response.json(true)
    }catch(error){
        console.log("error")
        response.json(false)
    }
})

router.route("/getSupervisedDeviceByGroupGoogleId").get((request,response)=>{
    try{
        const groupGoogleId = request.query.groupGoogleId
        dboperations.getSupervisedDeviceByGroupGoogleId(groupGoogleId).then(result=>{
            console.log(result)
            response.json(result)
        })
    }catch(error){
        console.log("error")
        response.json(false)
    }
})

router.route("/getCoordinatesByDevice").get((request,response)=> {
    const deviceId = request.query.deviceId;
    dboperations.getCoordinates(deviceId).then(result=>{
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
    dboperations.getGroupGoogleByGoogleId(googleId).then(result=>{
        console.log(result)
        response.json(result)
    })
})

router.route("/getHomesByDeviceId").get((request,response)=> {
    const deviceId = request.query.deviceId
    dboperations.getHomesByDeviceId(deviceId).then(result=>{
        response.json(result)
    })
})

router.route("/insertDevice").post((request,response)=> {
    var imei = request.query.IMEI;
    var GroupGoogleId = request.query.GroupGoogleId;
    var fcmtoken = request.query.fcmtoken
    var type = request.query.type;
    var mobileNumber = request.query.mobileNumber

    dboperations.insertDevice(imei,GroupGoogleId,fcmtoken,type,mobileNumber).then(result=>{
        console.log(result)
        response.json(result)
    })
})

router.route("/insertCoordinates").post((request,response)=> {
    var datetime = request.query.datetime;
    var longitude = request.query.longitude;
    var latitude = request.query.latitude;
    var deviceId = request.query.deviceId;
    
    dboperations.insertCoordinates(datetime,longitude,latitude,deviceId).then(result=>{
        //console.log(result)
        response.json(result)
    })

    

})


function sendPushNotification()
{
    fcmApp.sendMessage()
}



app.use(express.static(__dirname +'/public'))
app.listen(3000)
console.log("Server on port 3000")