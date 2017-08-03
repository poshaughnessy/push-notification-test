/*
Based on a Google Code Lab:

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

if (!('Notification' in window)) {
  console.log('This	browser	does not support notifications!');
}

Notification.requestPermission(function(status)	{
  console.log('Notification	permission status:', status);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    console.log('Service Worker Registered!', reg);
  }).catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
}

function displayNotification()	{
  if (Notification.permission	== 'granted')	{

    navigator.serviceWorker.getRegistration().then(function(reg)	{
      var	options	=	{
        body:	'Hey!',
        icon:	'images/notification-flat.png',
        vibrate:	[100,	50,	100],
        data:	{
            somePieceOfData:	'hey here is some data'
        },
        actions: [
          {
            action: 'yay',
            title: 'Hey you!',
            icon: 'images/checkmark.png'
          },
          {
            action: 'nay',
            title: 'Go away, I don\'t want to say hello back',
            icon: 'images/xmark.png'
          }
        ]
      };

      console.log('hello?');

      reg.getNotifications().then(function(notifications) {

        console.log('got notifications', notifications);

      });

      reg.showNotification('Hey Diego!', options);
    });
	}
}

// Handle messages from service worker

if ('serviceWorker' in navigator){
  navigator.serviceWorker.addEventListener('message', function(event){
    console.log('Client received message', event.data);
  });
}
