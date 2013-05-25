//sending console.log to content page so it can be desplayed in console
console.log = function(data) {
	message = {name : 'log' , data: data};
	chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.sendMessage(tab.id, message, function(response) {});
	});
};
// The onClicked callback function.
function onClickHandler(info, tab) {
	switch (info.menuItemId) {
		case 'Context-1':
		case 'Context-2':
		case 'child-1':
		case 'child-2':
			console.log(info.menuItemId);
			break;
	}
}; 
 // Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var contexts = ["selection","link","editable","image","video","audio"];
  for (var i = 0; i < contexts.length; i++) {
	  var context = contexts[i];
	  var title = "Context " + context;
	  var id = chrome.contextMenus.create({"title": title, "contexts":[context],"id": context,"onclick": onClickHandler});
  }
  
  chrome.contextMenus.create({"title": "Context Action-1", "id": "Context-1","onclick": onClickHandler});
  chrome.contextMenus.create({"title": "Context Action-2", "id": "Context-2","onclick": onClickHandler});
  //Create a parent item and two children.
  chrome.contextMenus.create({"title": "Context Parent ", "id": "parent"});
  chrome.contextMenus.create({"title": "Context child-1", "parentId": "parent", "id": "child-1","onclick": onClickHandler});
  chrome.contextMenus.create({"title": "Context child-2", "parentId": "parent", "id": "child-2","onclick": onClickHandler});
});

//Handle request from devtools   
chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
		//Request a tab for sending needed information
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, message, function(response) {});
		});
	});
	//handle message from content.js
	chrome.extension.onMessage.addListener(function (message) {
		switch (message.msg) {
			case 'btn-1-msg-back':
				 console.log(message.data);
			break;
			default:
			//Posting back to Devtools from content.js
			port.postMessage(message);
		}
	});
});	


