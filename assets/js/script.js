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
var pixaKey = "38708546-2cfb7c47338a280cf45ea2b47";
var bibleKey = "e0069271426c93138b3100997ccfbd51";
// var pixaUrl = `https://pixabay.com/api/?key=${pixaKey}`;
var bibleUrl = `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books`;


fetch(bibleUrl, {
    headers: {
      'api-key': 'e0069271426c93138b3100997ccfbd51',
    //   'mode': 'no-cors'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

fetch(pixaUrl)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
  
