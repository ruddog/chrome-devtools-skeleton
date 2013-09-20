//Handler request from background page
chrome.extension.onMessage.addListener(function (message,sender) {
	switch (message) {
		case 'btn-1-msg':
			//do staff
			console.log('btn-1-msg 	action');
			//send result back
			chrome.extension.sendMessage({msg:'btn-1-msg-back',data : 'btn-1 returned data from content.js'});
		  break;
		case 'btn-2-msg':
			console.log('btn-2-msg 	action');
			chrome.extension.sendMessage({msg:'btn-2-msg-back',data : 'btn-2 returned data from content.js'});
		  break;
		case 'btn-3-msg':
			console.log('btn-3-msg 	action');
			chrome.extension.sendMessage({msg:'btn-3-msg-back',data : 'btn-3 returned data from content.js'});
		  break;
	}
	//handle console.log sending from background and content pages
	if('log' == message.name) {
		console.log(message.data); 
	}
});