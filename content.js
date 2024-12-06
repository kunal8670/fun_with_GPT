// Helper function to play video
function handlePlayVideo() {
  const video = document.querySelector("video");
  if (video && !document.hidden && document.hasFocus()) {
    video.play();
    console.log("Video resumed: Tab is visible and focused.");
  } else {
    console.log("Conditions for playing video not met:", {
      documentHidden: document.hidden,
      hasFocus: document.hasFocus(),
    });
  }
}

// Helper function to pause video
function handlePauseVideo() {
  const video = document.querySelector("video");
  if (video) {
    video.pause();
    console.log("Video paused: Tab is inactive or blurred.");
  } else {
    console.log("No video found to pause.");
  }
}

// Event: Visibility change
document.addEventListener("visibilitychange", () => {
  console.log("Visibility changed:", { hidden: document.hidden });
  if (document.hidden) {
    handlePauseVideo();
  } else {
    handlePlayVideo();
  }
});

// Event: Window gains focus (returning from another app)
window.addEventListener("focus", () => {
  console.log("Window focused.");
  handlePlayVideo();
});

// Event: Window loses focus (switching to another app)
window.addEventListener("blur", () => {
  console.log("Window blurred.");
  handlePauseVideo();
});
