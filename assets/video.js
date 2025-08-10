document.addEventListener("DOMContentLoaded", function(e) {
  productMediaVideoControls();
});
document.addEventListener("shopify:section:load", function(e) {
  productMediaVideoControls();
});
document.addEventListener("shopify:section:unload", function(e) {
  productMediaVideoControls();
});
document.addEventListener("shopify:section:reorder", function(e) {
  productMediaVideoControls();
});
function productMediaVideoControls() {
  var videosWrp = document.querySelectorAll('.section_hero-video-inner');
  if (videosWrp.length > 0) {
    videosWrp.forEach(function(videoWrp) {
      //console.log('videoWrp', videoWrp);
      var controls = videoWrp.querySelectorAll('.video-controls-btn .video-control');
      if (controls.length > 0) {
        console.log("Video section added");
        controls.forEach(function(control) {
          control.onclick = function(e) {
            e.preventDefault();
            var command;
            var iframe = videoWrp.querySelector('iframe');
            var video = videoWrp.querySelector('video');
            console.log(iframe);
            if (control.classList.contains('video-play')) {
              videoWrp.classList.add('hero-video-played');
              control.classList.add('hidden');
              if (iframe != null) {
                if (iframe.classList.contains('js-vimeo')) {
                  command = {
                    "method": "play",
                    "value": "true"
                  };
                }
                if (iframe.classList.contains('js-youtube')) {
                  command = {
                    "event": "command",
                    "func": "playVideo"
                  };
                }
                iframe.contentWindow.postMessage(JSON.stringify(command), "*");
              } else if (video != null) {
                video.play();
              }
            }
            if (control.classList.contains('video-pause')) {
              control.classList.add('hidden');
              if (iframe != null) {
                if (iframe.classList.contains('js-vimeo')) {
                  command = {
                    "method": "pause",
                    "value": "true"
                  };
                }
                if (iframe.classList.contains('js-youtube')) {
                  command = {
                    "event": "command",
                    "func": "pauseVideo"
                  };
                }
                iframe.contentWindow.postMessage(JSON.stringify(command), "*");
              } else if (video != null) {
                video.pause();
              }
            }
            controls.forEach(function(controlC) {
              if (control != controlC) {
                controlC.classList.remove('hidden');
              }
            });
            // others pause
            videosWrp.forEach(function(videoWrpCurrent) {
              if (videoWrpCurrent != videoWrp) {
                var controlsCurrent = videoWrpCurrent.querySelectorAll('.video-controls-btn .video-control');
                if (controlsCurrent.length > 0) {
                  controlsCurrent.forEach(function(controlCurrent) {
                    if (controlCurrent.classList.contains('video-play')) {
                      controlCurrent.classList.remove('hidden');
                    } else {
                      controlCurrent.classList.add('hidden');
                    }
                  });
                }
                var iframe = videoWrpCurrent.querySelector('iframe');
                var video = videoWrpCurrent.querySelector('video');
                if (iframe != null) {
                  if (iframe.classList.contains('js-vimeo')) {
                    command = {
                      "method": "pause",
                      "value": "true"
                    };
                  }
                  if (iframe.classList.contains('js-youtube')) {
                    command = {
                      "event": "command",
                      "func": "pauseVideo"
                    };
                  }
                  iframe.contentWindow.postMessage(JSON.stringify(command), "*");
                } else if (video != null) {
                  video.pause();
                }
              }
            });
          }
        });
      }
    });
  }
}
