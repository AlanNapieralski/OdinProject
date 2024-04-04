import './style.css'

let images = [];
let currentImage;

async function importAllImages() {
  const imageModules = import.meta.glob('./public/img/*.{png,jpg,jpeg,svg}');
  const modules = [];
  for (const path in imageModules) {
    modules.push(imageModules[path]());
  }
  const importedImages = await Promise.all(modules);
  images = importedImages.map(module => module.default);
}

function loadImages() {
  const imagesContainer = document.querySelector('.imgContainer');
  images.forEach((image) => {
    const img = document.createElement('img');
    img.src = image;
    img.dataset.current = images.indexOf(image) === images.indexOf(currentImage) ? true : false;
    imagesContainer.appendChild(img);
  });
}

function updateImageFormat() {
  const images = document.querySelectorAll('.imgContainer img');
  images.forEach((image) => {
    if (image.dataset.current === 'false') {
      image.style.opacity = 0.4;
      image.style.transform = 'scale(1)';
      image.style.zIndex = '1';
      
    } else {
      image.style.transform = 'scale(1.3)';
      image.style.zIndex = '2';
      image.style.opacity = 1;
    }
  });
}


const shift =  {
  totalTranslation: 0,
  left() {
    const images = document.querySelectorAll('.imgContainer img');
    const container = document.querySelector('.imgContainer');
    const currentImageIndex = Array.from(images).indexOf(document.querySelector('.imgContainer img[data-current="true"]'));
    if (currentImageIndex === 0) {
      return;
    }
  
    const imageWidth = images[currentImageIndex - 1].offsetWidth;
    const containerWidth = container.offsetWidth;
    const remainingSpace = containerWidth - imageWidth;
    const translationPercentage = (remainingSpace / containerWidth) * 100 / 2;
  
    this.totalTranslation += translationPercentage; // Subtract the new translation from the total translation
    container.style.transform = `translateX(${this.totalTranslation}%) scale(3)`; // Apply the total translation
  
    images[currentImageIndex].dataset.current = false;
    images[currentImageIndex - 1].dataset.current = true;
    updateImageFormat();
  },
  right() {
    const images = document.querySelectorAll('.imgContainer img');
    const container = document.querySelector('.imgContainer');
    const currentImageIndex = Array.from(images).indexOf(document.querySelector('.imgContainer img[data-current="true"]'));
    if (currentImageIndex === images.length - 1) {
      return;
    }

    const imageWidth = images[currentImageIndex + 1].offsetWidth;
    const containerWidth = container.offsetWidth;
    const remainingSpace = containerWidth - imageWidth;
    const translationPercentage = (remainingSpace / containerWidth) * 100 / 2;

    this.totalTranslation -= translationPercentage; // Subtract the new translation from the total translation
    container.style.transform = `translateX(${this.totalTranslation}%) scale(3)`; // Apply the total translation

    images[currentImageIndex].dataset.current = false;
    images[currentImageIndex + 1].dataset.current = true;
    updateImageFormat();
  }
}

const leftButton = document.querySelector('.left');
leftButton.addEventListener('click', () => {
  shift.left();
});

const rightButton = document.querySelector('.right');
rightButton.addEventListener('click', () => { 
  shift.right();
});

document.addEventListener('DOMContentLoaded', async () => {
  await importAllImages();
  currentImage = images[Math.floor(images.length / 2)];
  loadImages();
  updateImageFormat();
});