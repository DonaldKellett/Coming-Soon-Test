/*
  eventually.js
  The JS file that powers the subscription page
  (c) Donald Leung.  All rights reserved.
*/

// Predefined Variables

var $form = document.querySelectorAll('#signup-form')[0], $message;
$message = document.createElement('span');
  $message.classList.add('message');
  $form.appendChild($message);
$message._show = function(type, text) {
  $message.innerHTML = text;
  $message.classList.add(type);
  $message.classList.add('visible');
  window.setTimeout(function() {
    $message._hide();
  }, 3000);
};
$message._hide = function() {
  $message.classList.remove('visible');
  // Minor visual bug here - if the email is invalid even once, even if the email is valid later on, the styling of the popup message remains red.
};

// Eventually Object

var eventually = {
  subscribe: function() {
    $message._hide();
    var subscribeEmail = document.getElementById("email").value;
    var emailArray = subscribeEmail.split("");
    var atCount = 0, dotCount = 0, otherCount = 0;
    for (i = 0; i < emailArray.length; i++) {
      if (emailArray[i] === "@") {
        atCount++;
      } else if (emailArray[i] === ".") {
        dotCount++;
      } else {
        otherCount++;
      }
    }
    if (atCount === 1 && dotCount >= 1 && otherCount >= atCount + dotCount + 1) {
      window.location = "mailto:dleung@connect.kellettschool.com?subject=Subscribe to Eventually News&body=Hello, my email is " + subscribeEmail + " and I would like to subscribe to the latest News of Eventually.";
      $message._show('success', 'Your subscription request has been successfully sent.');
    } else {
      $message._show('failure', 'Sorry, your email address seems to be invalid.  Please make sure you have typed it correctly.');
    }
  }
};
