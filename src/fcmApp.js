const dboperations = require("./dboperations")



function sendAlert (groupGoogleId){
    //console.log(groupGoogleId)
    dboperations.getSupervisorDevicesByGroupGoogleId(groupGoogleId).then(result=>{

        result.forEach(element => {
            sendMessage(element.fcmtoken)
        });
    })
}

function sendMessage(fcmtoken){
    var FCM = require('fcm-node');
    var serverKey = 'AAAAQHFqesw:APA91bFI8siEND-8Vdasa2VJMRrNcN2_a0wvF3_sJrT6a5ETFUOb8gLwG45SM8A9lv-SFufol2s5RbXK6AGpzfIZqpiYgKqoaxF7ZLrK6OU70aMLIf3fDWv7sWE6O4F9YzniMFaeYB0N';
    var fcm = new FCM(serverKey);

    var message = {
    to: fcmtoken,
        notification: {
            title: 'Alerta',
            body: 'Se ha encontrado que la persona salio de su hogar',
            click_action: "OPEN_ACTIVITY_1"
        },

        data: { //you can send only notification or only data(or include both)
            title: 'ok cdfsdsdfsd',
            body: '{hello}'
        }

    };
    fcm.send(message, function(err, response) {
        if (err) {
            console.log("Something has gone wrong!"+err);
            console.log("Respponse:! "+response);
        } else {
            // showToast("Successfully sent with response");
            //console.log("sendMessage")
            //console.log("Successfully sent with response: ", response);
        }
    
    });
}

module.exports = {
    sendAlert
}

