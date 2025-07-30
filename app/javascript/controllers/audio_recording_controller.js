import { Controller } from "@hotwired/stimulus"
import { post } from "@rails/request.js"

// Connects to data-controller="audio-recording"
export default class extends Controller {
  static targets = ["start", "stop"]
  static values = { url: String }
  start(e) {
    e.preventDefault()
    this.toggleBtns()
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
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.ondataavailable = (e) => {
            //let audioFile = new File([e.data], "chunked-recording.mp3");
            if (this.posted) return;
            this.posted = true
            let reader = new FileReader();
            reader.addEventListener("loadend", async () => {
              await post(this.urlValue, {
                body: {
                  file: reader.result
                }
              })
            })
            reader.readAsDataURL(e.data);
          };
          this.mediaRecorder.start(1000)
        })

        // Error callback
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }

  stop(e) {
    e.preventDefault()
    this.toggleBtns()
    this.mediaRecorder.stop();
  }
  

  toggleBtns() {
    this.startTarget.classList.toggle("hidden")
    this.stopTarget.classList.toggle("hidden")
  }
}
