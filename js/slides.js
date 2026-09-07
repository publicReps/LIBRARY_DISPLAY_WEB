let slideIndex = 0;
let savcount = 0;
let intervalId = null; // To store the interval ID
let photoIntervalId = null;
showSlides();

function hi() {
    // console.log(savcount);
    fetch('api/count.php')
        .then(response => response.json())
        .then(data => {
            if (data > savcount) {
                savcount = data;
                slideIndex = 0;
                showSlides();
                // console.log(data);
            }
            // console.log(savcount);
        })
        .catch(error => console.error('Error fetching data:', error));
}
setInterval(hi, 1000);
// hi();



function slide_timeset(slides, slideIndex) {
    if (intervalId) {
        clearInterval(intervalId); // Clear any existing interval
    }

    if (slideIndex - 1 === 0) {
        slides[slideIndex - 1].style.display = "block";
        intervalId = setInterval(showSlides, 10 * 1000); // Run setInterval
        // console.log("10");
    } else if (slideIndex - 1 === 1) {
        slides[slideIndex - 1].style.display = "block";
        intervalId = setInterval(showSlides, 10 * 1000);
    } else if (slideIndex - 1 === 2) {
        slides[slideIndex - 1].style.display = "block";
        startPhotoSlides();
         // Automatically move to the next slide after photo slides are completed
        setTimeout(() => {
            stopPhotoSlides();
            showSlides();
        }, 15 * 1000); 
    } else if (slideIndex - 1 === 3) {
        slides[slideIndex - 1].style.display = "block";
        startPhotoSlides();
        // Automatically move to the next slide after photo slides are completed
       setTimeout(() => {
           stopPhotoSlides();
           showSlides();
       }, 30 * 1000); 
    }
}
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slide_timeset(slides, slideIndex);
}

// Function to start photo slides animation
function startPhotoSlides() {
    if (photoIntervalId) {
        clearInterval(photoIntervalId); // Clear any existing interval
    }

    // Fetch and display images immediately
    fetchMainImages().then(images => displayMainImages(images));
    fetchLibraryImages().then(images => displayLibraryImages(images));

    // Start the interval to update images every 5 seconds
    photoIntervalId = setInterval(() => {
        fetchMainImages().then(images => displayMainImages(images));
        fetchLibraryImages().then(images => displayLibraryImages(images));
    }, 5000); // Run every 5 seconds
}

// Function to stop photo slides animation
function stopPhotoSlides() {
    if (photoIntervalId) {
        clearInterval(photoIntervalId); // Stop the interval
        photoIntervalId = null;
    }
}