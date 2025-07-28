import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="audio-recording"
export default class extends Controller {
  start(e) {
    e.preventDefault()
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
      navigator.mediaDevices
        .getUserMedia(
          // constraints - only audio needed for this app
          {
            audio: true,
          },
        )

        // Success callback
        .then((stream) => {})

        // Error callback
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }
}
