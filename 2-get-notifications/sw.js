/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// TODO 5 - Handle the notificationclose event
self.addEventListener('notificationclose', function(e)	{
  var notification = e.notification;
  var data = notification.data.somePieceOfData;
  console.log('Closed notification:	' + data);
});


// TODO 6 - Handle the notificationclick event
self.addEventListener('notificationclick', function(e)	{
  var notification = e.notification;
  var action = e.action;
  console.log('Clicked:	' + action);
  // TODO just send to specific client from this notification instead of all
  sendMessageToAllClients(action);
  notification.close();
});

/**
 * To test this, you can press the 'push' button in the debugging tools Application tab
 * (This UI may be subject to change).
 */
self.addEventListener('push',	function(e)	{

  console.log('Push notification received!');

  //	TODO 4 - update push event handler to get data from the message
  var	options	=	{
    body:	'This	notification was generated from a push!',
    icon:	'images/notification-flat.png',
    vibrate:	[100,	50,	100],
    data:	{
      dateOfArrival:	Date.now(),
      primaryKey:	'-push-notification'
    },
    actions: [
      {
        action: 'explore',	
        title: 'Explore this new world',
        icon: 'images/checkmark.png'
      },
      {
        action: 'close',	
        title: 'I don’t want any of this',
        icon: 'images/xmark.png'
      }
    ]
  };

  e.waitUntil(
    self.registration.showNotification('Hello	world!',	options)
  );
});

function sendMessageToAllClients(msg) {
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      var channel = new MessageChannel();  
      client.postMessage(msg, [channel.port1]);
    });
  });
}
