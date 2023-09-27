// background.js

// Define a listener function to intercept and block network requests
function blockAPIRequests(details) {
  // Check if the URL contains "dynamicyield" and ends with "api_static.js"
  if (details.url.includes("dynamicyield") && details.url.endsWith("api_static.js")) {
    return { cancel: true }; // Block the request
  }
  // If the request should not be blocked, return nothing
}

// Add a listener to intercept network requests
chrome.webRequest.onBeforeRequest.addListener(
  blockAPIRequests,
  { urls: ["<all_urls>"] }, // Match all URLs
  ["blocking"]
);
