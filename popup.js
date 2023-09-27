document.addEventListener("DOMContentLoaded", function () {
  const toggleBlockingButton = document.getElementById("toggleBlocking");

  // Initialize blocking state to false
  let isBlocking = false;

  // Load blocking state from storage
  chrome.storage.sync.get({ isBlocking: false }, function (result) {
    isBlocking = result.isBlocking;
    updateButtonLabel();
  });

  // Function to update button label based on blocking state
  function updateButtonLabel() {
    toggleBlockingButton.textContent = isBlocking ? "Disable Script Blocking" : "Enable Script Blocking";
  }

  // Toggle blocking state when the button is clicked
  toggleBlockingButton.addEventListener("click", function () {
    // Toggle the blocking state
    isBlocking = !isBlocking;

    // Save the blocking state to storage
    chrome.storage.sync.set({ isBlocking }, function () {
      console.log("Blocking state saved:", isBlocking); // Log the blocking state
    });

    // Send a message to content.js to apply the new blocking state
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleBlocking", isBlocking });
    });

    // Update the button label
    updateButtonLabel();
  });
});
