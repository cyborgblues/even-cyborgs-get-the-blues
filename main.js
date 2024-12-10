// enabling dragging
let activeElement = null;
let offsetX = 0;
let offsetY = 0;

// Function to randomize the position of images on reload
function randomizePositions() {
  const images = document.querySelectorAll('.draggable');
  images.forEach(img => {
    // Generate random position within the container bounds
    const containerWidth = document.querySelector('#container').offsetWidth;
    const containerHeight = document.querySelector('#container').offsetHeight;

    // Random positions ensuring they are within the container and overlap
    const randomX = Math.random() * (containerWidth - img.offsetWidth);
    const randomY = Math.random() * (containerHeight - img.offsetHeight);

    // Set the image's random position
    img.style.left = randomX + 'px';
    img.style.top = randomY + 'px';
  });
}



// Make a div draggable
function makeDraggable(element) {
  element.addEventListener('mousedown', function(e) {
    e.preventDefault();

    element.style.zIndex = 1000;

    let otherImages = document.querySelectorAll('.draggable');
    otherImages.forEach(img => {
      if (img !== element) {
        img.style.zIndex = 1;  // Reset z-index for other images
      }
    });

    activeElement = element;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}

function onMouseMove(e) {
  if (activeElement) {
    activeElement.style.left = e.clientX - offsetX + 'px';
    activeElement.style.top = e.clientY - offsetY + 'px';
  }
}

function onMouseUp() {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  activeElement = null;
}

// Make all the div elements with class "draggable" draggable
const draggableElements = document.querySelectorAll('.draggable');
draggableElements.forEach(makeDraggable);

// Randomize positions of images on page load
window.onload = randomizePositions;
