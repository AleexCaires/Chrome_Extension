// content.js
let blockedWords = [];

// Function to remove scripts containing blocked words and links with specific href
function removeScriptsAndLinks() {
  const scriptTags = document.querySelectorAll("script");
  const linkTags = document.querySelectorAll("link");
  console.log(linkTags);

  scriptTags.forEach((element) => {
    // Check if the element matches a condition (e.g., script containing a specific word)
    if (matchesCondition(element)) {
      element.remove();
      console.log("Element removed:", element.outerHTML);
    }
  });

  linkTags.forEach((element) => {
    // Check if the element matches a condition (e.g., script containing a specific word)
    if (matchesCondition(element)) {
      element.remove();
      console.log("Element removed:", element.outerHTML);
    }
  });
}

// Function to check if an element matches a specific condition
function matchesCondition(element) {
  // Customize this function to specify your conditions
  // Example: Check if the script element's outerHTML contains a specific word
  if (element.tagName === "SCRIPT") {
    const scriptContent = element.outerHTML;
    if (
      blockedWords.some((word) => {
        const regex = new RegExp(word, "i"); // Case-insensitive regex
        return regex.test(scriptContent);
      })
    ) {
      return true;
    }
  }

  // Example: Check if the link element's href is a specific URL
  if (element.tagName === "LINK") {
    const href = element.getAttribute("href");
    if (href && href.includes("dynamicyield")) {
      return true;
    }
  }

  return false;
}

// Function to handle messages from popup.js
chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === "toggleBlocking") {
    removeScriptsAndLinks();
  }
});

// Create a Set to keep track of processed script and link tags
const processedTags = new Set();

// Function to detect and remove dynamically added scripts and links
function observeAndRemoveDynamicElements() {
  const observer = new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const addedNodes = mutation.addedNodes;
        addedNodes.forEach((node) => {
          if (!processedTags.has(node)) {
            if (node.tagName === "SCRIPT" || node.tagName === "LINK") {
              // Mark the script or link tag as processed
              processedTags.add(node);
              // Remove scripts and links
              removeScriptsAndLinks();
            }
          }
        });
      }
    }
  });

  observer.observe(document, { childList: true, subtree: true });
}

// Load the blocked words from blocked-words.json
function loadBlockedWords() {
  fetch(chrome.runtime.getURL("blocked-words.json"))
    .then((response) => response.json())
    .then((data) => {
      blockedWords = data.blockedWords;
      console.log("Blocked words loaded:", blockedWords);
      observeAndRemoveDynamicElements();
    })
    .catch((error) => console.error("Error loading blocked words:", error));
}

// Call the function to load the blocked words
loadBlockedWords();
