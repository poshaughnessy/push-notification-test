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

function sendMessageToAllClients(msg) {
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      var channel = new MessageChannel();  
      client.postMessage(msg, [channel.port1]);
    });
  });
}
