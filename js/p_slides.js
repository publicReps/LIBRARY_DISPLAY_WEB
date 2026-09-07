// For main images
const demoImages = [
    { id: 'demo1', src: 'dashboard/images/empty.jpg', title: 'Demo Book 1' },
];

let mainCurrentIndex = 0;
const mainImagesToShow = 5;
const mainImageContainer = document.getElementById('fs_img');

async function fetchMainImages() {
    return fetch('api/b_images.php')
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error fetching images:', error));
}

function displayMainImages(images) {
    mainImageContainer.innerHTML = ''; // Clear the container
    let endIndex = mainCurrentIndex + mainImagesToShow;
    let imagesToDisplay = images.slice(mainCurrentIndex, endIndex);

    // Add demo images if necessary to fulfill the limit of 5 images
    while (imagesToDisplay.length < mainImagesToShow) {
        // imagesToDisplay.push(demoImages[imagesToDisplay.length % demoImages.length]);
        imagesToDisplay.push(demoImages[0]);
    }

    imagesToDisplay.forEach(image => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card fade';

        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.title;

        const titleElement = document.createElement('h3');
        titleElement.textContent = image.title;

        const idElement = document.createElement('p');
        idElement.textContent = `ID: ${image.id}`;

        cardDiv.appendChild(imgElement);
        cardDiv.appendChild(titleElement);
        cardDiv.appendChild(idElement);

        mainImageContainer.appendChild(cardDiv);
    });

    mainCurrentIndex += mainImagesToShow;

    if (mainCurrentIndex >= images.length) {
        mainCurrentIndex = 0; // Reset to the beginning
    }
}

// library images
let libraryCurrentIndex = 0;
const libraryImagesToShow = 3;
const libraryImageContainer = document.getElementById('s_img');

async function fetchLibraryImages() {
    return fetch('api/l_images.php')
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error fetching images:', error));
}

function displayLibraryImages(images) {
    libraryImageContainer.innerHTML = ''; // Clear the container
    const endIndex = libraryCurrentIndex + libraryImagesToShow;
    const imagesToDisplay = images.slice(libraryCurrentIndex, endIndex);

    // Add demo images if necessary to fulfill the limit of 3 images
    while (imagesToDisplay.length < libraryImagesToShow) {
        // imagesToDisplay.push(libraryDemoImages[imagesToDisplay.length % libraryDemoImages.length]);
        imagesToDisplay.push(demoImages[0]);

    }

    imagesToDisplay.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = 'Image';
        imgElement.className = 'fade'; // Add fade-in class
        libraryImageContainer.appendChild(imgElement);
    });

    libraryCurrentIndex += libraryImagesToShow;

    if (libraryCurrentIndex >= images.length) {
        console.log(libraryCurrentIndex);
        libraryCurrentIndex = 0; // Reset to the beginning
    }
}