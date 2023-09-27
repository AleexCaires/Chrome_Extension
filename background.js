// background.js

let blockedWords = [];

// Load blocked words from the JSON file
fetch(chrome.runtime.getURL('blocked-words.json'))
  .then(response => response.json())
  .then(data => {
    blockedWords = data.blockedWords || [];
  });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getBlockedWords") {
    sendResponse({ blockedWords });
  }
});
