const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Unsplash API
const count = 5;
apiKey = '7XpEmWbTRMzgX8_B4D4dAc9-Gz6IbdSIIvB9jH7Y4ak';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//chek if al images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
    }

}
//Helper Function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
//Create Elemets for links and Photos
function displayPhotos() {
    totalImages += photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {

    }
}

//Check to see if scrollin near to reach bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

//onLoad 
getPhotos();