    



function sendMessage (){
    var FCM = require('fcm-node');
    var serverKey = 'AAAAQHFqesw:APA91bFI8siEND-8Vdasa2VJMRrNcN2_a0wvF3_sJrT6a5ETFUOb8gLwG45SM8A9lv-SFufol2s5RbXK6AGpzfIZqpiYgKqoaxF7ZLrK6OU70aMLIf3fDWv7sWE6O4F9YzniMFaeYB0N';
    var fcm = new FCM(serverKey);

    var message = {
    to:'eBupW4HqR3SQaArVWTS4WU:APA91bEpCdbK17OuWNgCQ-7ut0MTWbx_A58Eft3PLuahVWKZIiXw4Tbi2sUdxzi2H9lnNjsPdbnNmdXzGc2NVMOFQZETwHLpTRIZN3yDKnebdoo7A2k26MldMH5ffGoTU9kcGUjWwr3w',
        notification: {
            title: 'NotifcatioTestAPP',
            body: '{"Message from node js app"}',
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
            console.log("sendMessage")
            console.log("Successfully sent with response: ", response);
        }
    
    });
}

sendMessage();

module.exports = {
    sendMessage
}

