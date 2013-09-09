//Created a port with background page for continous message communication
 var port = chrome.extension.connect({
    name: "Give me name" 
});

//sending console.log to content page so it can be desplayed in console
console.log = function() {
	var args = Array.apply(null, arguments);
	port.postMessage({name : 'log' , data: args});
};

//Hanlde response when recieved from background page
port.onMessage.addListener(function (msg) {
    console.log(" devtools panel recieved msg from background page :  " + msg.data);
});

function postMsg(msg) {
	//Posting message to background page
	port.postMessage(msg);
}

//get details from manifest
details=chrome.app.getDetails();

//show current version
document.getElementById("version").innerHTML	= details.version;

//binding events
document.getElementById("btn-1").onclick		= function(){postMsg('btn-1-msg');};
document.getElementById("btn-2").onclick		= function(){postMsg('btn-2-msg');};
document.getElementById("btn-3").onclick		= function(){postMsg('btn-3-msg');};

//console.log('something');
 
 
