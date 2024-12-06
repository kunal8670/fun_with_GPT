// Listen for tab activation (when a tab is focused)
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab && tab.url.includes("youtube.com")) {
      // Send message to content script to resume the video when the tab is active
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: resumeVideo
      });
    }
  });
});

// Listen for tab visibility changes (tab becomes inactive or active)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes("youtube.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: checkVideoVisibility
    });
  }
});

// Function to resume video when the tab becomes active
function resumeVideo() {
  const video = document.querySelector("video");
  if (video && !document.hidden) {
    video.play();
    console.log("Video resumed because the tab is active.");
  }
}

// Function to check visibility of the tab (pause/resume video based on visibility)
function checkVideoVisibility() {
  const video = document.querySelector("video");
  if (video) {
    if (document.hidden) {
      video.pause();
      console.log("Video paused due to tab inactivity.");
    } else {
      video.play();
      console.log("Video resumed because the tab is active.");
    }
  }
}
