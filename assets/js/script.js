// declaring variables
let verseButton = document.getElementById("verse-button");
let imageButton = document.getElementById("image-btn");








function displayVerse() {

}

function displayImage() {

}


let displayVerse = () => {
    fetch(url)
        .then((data) => data.json())
        .then((item) => {
            verse.innerText = item.verse;
        });
};

let displayImage = () => {
    fetch(url)
        .then((data) => data.json())
        .then((item) => {
            image.innerText = item.image;
        });
};



let nextVerse = document.getElementById("next-verse");
nextVerse.addEventListener("click", function () {
    let displayVerse = document.getElementById("verse");

    verse.value = ++i;

    nextVerse (something .value, data);
});




verseButton.addEventListener("click", displayVerse);
imageButton.addEventListener("click", displayImage);