console.log("Content script is running.");
// Function to send a message to the background script
function toggleRequestBlocking(isBlocking) {
  console.log("toggle request running");
  chrome.runtime.sendMessage({ action: "toggleBlocking", isBlocking });
}
toggleRequestBlocking();

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === "toggleBlocking") {
    // Implement your logic to enable or disable request blocking here
    if (request.isBlocking) {
      // Enable request blocking (if needed)
      console.log("Request blocking enabled.");
    } else {
      // Disable request blocking (if needed)
      console.log("Request blocking disabled.");
    }
  }
});
