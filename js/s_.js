let slideIndex = 0;
let savcount = 0;
let slideTimeoutId = null; // Stores the setTimeout ID for the *next slide transition*
let photoIntervalId = null; // Stores the setInterval ID for *photo updates*

// --- Image Display State ---
let mainCurrentIndex = 0;
const mainImagesToShow = 5;
const mainImageContainer = document.getElementById('fs_img');

let libraryCurrentIndex = 0;
const libraryImagesToShow = 3;
const libraryImageContainer = document.getElementById('s_img');

const demoImages = [
    { id: 'demo0', src: 'dashboard/images/empty.jpg', title: 'No Book Data' },
];

// --- Initialization ---
showSlides(); // Start the slideshow initially
setInterval(checkForUpdates, 1000); // Start checking for external updates

// --- Core Slideshow Logic ---

function showSlides() {
    // 1. Clear any pending slide transition timer
    if (slideTimeoutId) {
        clearTimeout(slideTimeoutId);
        slideTimeoutId = null;
    }

    let slides = document.getElementsByClassName("mySlides");
    if (!slides || slides.length === 0) {
        console.error("No elements with class 'mySlides' found.");
        return; // Exit if no slides
    }

    // 2. Determine the previous slide index (to know if photos need stopping)
    // Note: On first run, slideIndex is 0, so previous effectively doesn't exist.
    const previousSlideIndex = slideIndex;

    // 3. Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // 4. Advance slide index (and wrap around)
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1; // Wrap around to the first slide
    }

    // 5. Get the current slide element
    const currentSlideElement = slides[slideIndex - 1];
    if (!currentSlideElement) {
        // console.error(`Slide element at index ${slideIndex - 1} not found.`);
        slideIndex = 1; // Reset to be safe
        // Optionally try again or handle error
        showSlides(); // Attempt to recover by showing slide 1
        return;
    }


    // 6. Determine slide duration and if photos are needed
    let duration = 10 * 1000; // Default duration (e.g., for slide 1)
    let needsPhotos = false;

    if (slideIndex === 1) {
        duration = 10 * 1000; // Slide 1 duration
        needsPhotos = false;
    } else if (slideIndex === 2) {
        duration = 20 * 1000; // Slide 2 duration
        needsPhotos = false;
    } else if (slideIndex === 3) {
        duration = 30 * 1000; // Slide 2 duration
        needsPhotos = true;
    } else if (slideIndex === 4) {
        duration = 30 * 1000; // Slide 3 duration
        needsPhotos = true;
        // Add more else if blocks for more slides
    } else {
        // Fallback for unexpected slide index - maybe go back to 1?
        // console.warn(`Unexpected slideIndex: ${slideIndex}. Using default duration.`);
        duration = 10 * 1000;
        needsPhotos = false; // Assume no photos for safety
        // slideIndex = 1; // Option: force reset if index is invalid
    }


    // 7. Control Photo Updates
    const wasShowingPhotos = (previousSlideIndex === 2 || previousSlideIndex === 3); // Add other photo slide indices if needed

    if (needsPhotos) {
        // If current slide needs photos, ensure the photo update loop is running
        startPhotoUpdates();
    } else if (wasShowingPhotos) {
        // If current slide *doesn't* need photos, but the *previous* one did, stop the loop
        stopPhotoUpdates();
    }

    // 8. Display the current slide
     currentSlideElement.style.display = "block";

    // 9. Schedule the next slide transition
    slideTimeoutId = setTimeout(showSlides, duration);
}

// --- Photo Update Logic ---

function updatePhotos() {
    // Fetch and display both sets of images
    fetchMainImages().then(displayMainImages);
    fetchLibraryImages().then(displayLibraryImages);
}

function startPhotoUpdates() {
    // Only start the interval if it's not already running
    if (!photoIntervalId) {
        // console.log("Starting photo updates...");
        updatePhotos(); // Run immediately once
        photoIntervalId = setInterval(updatePhotos, 5000); // Run every 5 seconds
    }
}

function stopPhotoUpdates() {
    // Only stop the interval if it's running
    if (photoIntervalId) {
        // console.log("Stopping photo updates...");
        clearInterval(photoIntervalId);
        photoIntervalId = null;
    }
}

// --- External Update Check ---

function checkForUpdates() {
    fetch('api/count.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Ensure data is treated as a number
            const currentCount = Number(data);
            if (!isNaN(currentCount) && currentCount > savcount) {
                // console.log(`Update detected! New count: ${currentCount}, Previous count: ${savcount}. Resetting slideshow.`);
                savcount = currentCount;

                // --- Reset Process ---
                // 1. Stop the scheduled slide transition
                if (slideTimeoutId) {
                    clearTimeout(slideTimeoutId);
                    slideTimeoutId = null;
                }
                // 2. Stop any active photo updates
                stopPhotoUpdates();

                // 3. Reset slide index to 0 (showSlides will increment to 1)
                slideIndex = 0;

                 // 4. Reset image indices if you want the images to restart from the beginning on reset
                 mainCurrentIndex = 0;
                 libraryCurrentIndex = 0;

                // 5. Immediately start the slideshow from the beginning
                showSlides();
            }
        })
        .catch(error => console.error('Error fetching count data:', error));
}

// --- Image Fetching and Display Logic ---
// Main Images (Books)
async function fetchMainImages() {
    try {
        const response = await fetch('api/b_images.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ensure data is an array, return empty array or demo if not
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching main images:', error);
        return []; // Return empty array on error
    }
}

function displayMainImages(images) {
    if (!mainImageContainer) {
        console.error("Main image container 'fs_img' not found.");
        return;
    }
    mainImageContainer.innerHTML = ''; // Clear the container

    const totalImages = images.length;
    let imagesToDisplay = [];

    if (totalImages === 0) {
        // If no images fetched, show only demo images
        imagesToDisplay = demoImages.slice(0, mainImagesToShow); // Use slice to avoid modifying original
    } else {
        // Calculate slice for fetched images
        let endIndex = mainCurrentIndex + mainImagesToShow;
        imagesToDisplay = images.slice(mainCurrentIndex, endIndex);

        // Handle wrap-around for fetched images
        if (endIndex > totalImages) {
            imagesToDisplay = imagesToDisplay.concat(images.slice(0, endIndex - totalImages));
        }

         // Update index for next cycle AFTER slicing
         mainCurrentIndex = endIndex % totalImages; // Use modulo for clean wrap-around
    }

    // Add demo images if needed to fill up to mainImagesToShow
    while (imagesToDisplay.length < mainImagesToShow && demoImages.length > 0) {
        imagesToDisplay.push(demoImages[0]); // Add the first demo image
    }


    // Create and append elements
    imagesToDisplay.forEach(image => {
        if (!image || !image.src) return; // Skip if image data is invalid

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card fade'; // Add fade class if you have CSS for it

        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.title || 'Image'; // Use default alt text
        imgElement.onerror = () => { imgElement.src = demoImages[0].src; imgElement.alt = demoImages[0].title; }; // Fallback for broken image links


        cardDiv.appendChild(imgElement);

        // Only add title and ID if they exist (not for demo usually)
        if (image.title) {
            const titleElement = document.createElement('h3');
            titleElement.textContent = image.title;
            cardDiv.appendChild(titleElement);
        }
        // if (image.id && image.id !== 'demo0') { // Don't show ID for the specific demo image
        //     const idElement = document.createElement('p');
        //     idElement.textContent = `ID: ${image.id}`;
        //     cardDiv.appendChild(idElement);
        // }


        mainImageContainer.appendChild(cardDiv);
    });


}

// Library Images
async function fetchLibraryImages() {
     try {
        const response = await fetch('api/l_images.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching library images:', error);
        return []; // Return empty array on error
    }
}

function displayLibraryImages(images) {
     if (!libraryImageContainer) {
        console.error("Library image container 's_img' not found.");
        return;
    }
    libraryImageContainer.innerHTML = ''; // Clear the container

    const totalImages = images.length;
    let imagesToDisplay = [];

     if (totalImages === 0) {
        // If no images fetched, show only demo images
        imagesToDisplay = demoImages.slice(0, libraryImagesToShow);
    } else {
         // Calculate slice for fetched images
        let endIndex = libraryCurrentIndex + libraryImagesToShow;
        imagesToDisplay = images.slice(libraryCurrentIndex, endIndex);

        // Handle wrap-around
        if (endIndex > totalImages) {
            imagesToDisplay = imagesToDisplay.concat(images.slice(0, endIndex - totalImages));
        }

        // Update index for next cycle AFTER slicing
        libraryCurrentIndex = endIndex % totalImages; // Use modulo for clean wrap-around
    }

    // Add demo images if needed to fill up to libraryImagesToShow
    while (imagesToDisplay.length < libraryImagesToShow && demoImages.length > 0) {
         imagesToDisplay.push(demoImages[0]); // Add the first demo image
    }


    // Create and append elements
    imagesToDisplay.forEach(image => {
        if (!image || !image.src) return; // Skip if image data is invalid

        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.title || 'Library Image'; // Use title or default alt
        imgElement.className = 'fade'; // Add fade class if you have CSS for it
        imgElement.onerror = () => { imgElement.src = demoImages[0].src; imgElement.alt = demoImages[0].title; }; // Fallback

        libraryImageContainer.appendChild(imgElement);
    });

}