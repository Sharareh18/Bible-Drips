var allBooks = 'https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books';
var bibleId = 'de4e12af7f28f599-02';
var pixaUrl = `https://pixabay.com/api/?key=${pixaKey}`;

var versePlacement = document.getElementById("insertVerseHere");
var imagePlacement = document.getElementById("insertImageHere");
var verseButton = document.getElementById("verseButton");
var imageButton = document.getElementById("imageButton");


// var pixaKeyS = "38768763-bb697d80fc015bc0e4d2af0a5";
var pixaKey = "38708546-2cfb7c47338a280cf45ea2b47";
var bibleKey = "e0069271426c93138b3100997ccfbd51";



var displayVerse = function () {
  fetch(allBooks, {
    headers: {
      'api-key': 'e0069271426c93138b3100997ccfbd51',
      //   'mode': 'no-cors'
    }
  })
    .then(response => response.json())
    .then(data => {
      var books = data.data[Math.floor(Math.random() * data.data.length)];
      fetchBooks(books.id);
    })
    .catch(error => console.error('Error:', error));
};

function fetchVerse(verseId) {
  var singleVerse = `https://api.scripture.api.bible/v1/bibles/${bibleId}/verses/${verseId}?content-type=text&include-verse-numbers=false`;
  fetch(singleVerse, {
    headers: {
      'api-key': 'e0069271426c93138b3100997ccfbd51',
      //   'mode': 'no-cors'
    }
  })
    .then(response => response.json())
    .then(data => {
      var verse = data.data.content;
      var reference = data.data.reference;
      document.querySelector("#insertVerseHere").innerHTML = verse + reference; 
    })
    .catch(error => console.error('Error:', error));
}

function fetchVerses(chapterId) {
  var allVerses = `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}/verses`;
  fetch(allVerses, {
    headers: {
      'api-key': 'e0069271426c93138b3100997ccfbd51',
      //   'mode': 'no-cors'
    }
  })
    .then(response => response.json())
    .then(data => {
      var verse = data.data[Math.floor(Math.random() * data.data.length)];
      fetchVerse(verse.id);
    })
    .catch(error => console.error('Error:', error));
}

function fetchBooks(chapterBookId) {
  var allChapters = `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${chapterBookId}/chapters`;
  fetch(allChapters, {
    headers: {
      'api-key': 'e0069271426c93138b3100997ccfbd51',
      //   'mode': 'no-cors'
    }
  })
    .then(response => response.json())
    .then(data => {
      data.data.shift()
      var chapter = data.data[Math.floor(Math.random() * data.data.length)];
      fetchVerses(chapter.id);
    })
    .catch(error => console.error('Error:', error));
}




 
function displayImage() {
  fetch(`https://pixabay.com/api/?key=${pixaKey}&q=sky+clouds&image_type=photo&min_width=1200&category=backgrounds`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('data', data);
      var hitsNumber = Math.round(Math.random() * (20 - 1) +1);
      var largeImageURL = data.hits[hitsNumber].largeImageURL;
      localStorage.setItem("viewedImagesList", JSON.stringify(largeImageURL));
      var img = "<img src='" + largeImageURL + "'width=1200/>";
      document.getElementById("insertImageHere").style.backgroundImage = "url("+ largeImageURL + ")"
      // .catch(error => console.error('Error:', error));

    });

};


var showSearches = function () {

  var viewedImagesList = JSON.parse(localStorage.getItem("viewedImagesList"));
  console.log(viewedImagesList);
  var viewed = document.getElementById("viewed");

    viewed.setAttribute('src', viewedImagesList);

};
    
  


// // event listeners for user action on page 
verseButton.addEventListener("click", displayVerse);
imageButton.addEventListener("click", displayImage);
