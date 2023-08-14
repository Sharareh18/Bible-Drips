var allBooks = 'https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books';
var bibleId = '01b29f4b342acc35-01'; // 01b29f4b342acc35-01 // de4e12af7f28f599
var versePlacement = document.getElementById("insertVerseHere");
var imagePlacement = document.getElementById("insertImageHere");
var verseButton = document.getElementById("verseButton");
var imageButton = document.getElementById("imageButton");
var viewedVersesList = [];
var viewedImagesList = [];
var verse = [];
var image = [];

// var pixaKeyS = "38768763-bb697d80fc015bc0e4d2af0a5";
var pixaKey = "38708546-2cfb7c47338a280cf45ea2b47";
var bibleKey = "e0069271426c93138b3100997ccfbd51";


function localVerseStorage() {
  document.querySelector("#insertVerseHere").innerHTML = localStorage.getItem("StoredVerse");
};

var displayVerse = function () {
  fetch(allBooks, {
    headers: {
      'api-key': 'e0069271426c93138b3100997ccfbd51',
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
    }
  })
    .then(response => response.json())
    .then(data => {
      var verse = data.data.content;
      var reference = data.data.reference;
      document.querySelector("#insertVerseHere").innerHTML = verse + reference;
      localStorage.setItem("StoredVerse", verse + reference);
    })
    .catch(error => console.error('Error:', error));
}

function fetchVerses(chapterId) {
  var allVerses = `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}/verses`;
  fetch(allVerses, {
    headers: {
      'api-key': 'e0069271426c93138b3100997ccfbd51',
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






// function to fetch, save and display verses and Images
// maybe create a save button and only save those user chooses to save? 
// check to make sure this doesn't create double inputs, pretty sure
// need to add condition to verse display that if verse id doesn't exist then 
// save.  maybe should do that anyway. 




function displayImage() {
  fetch(`https://pixabay.com/api/?key=${pixaKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('data', data);

      // imagePlacement.style.backgroundImage = data.image;
      // viewedImagesList.push(displayImage.pic);
      // localStorage.setItem("viewedImagesList", JSON.stringify(viewedImagesList));

      // .catch(error => console.error('Error:', error));

      // displayImage();

    });

  // fetch("bible api here")
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     versePlacement.innerHTML = data.verse;
  //     viewedVersesList.push(displayVerse.text);
  //     localStorage.setItem("viewedVersesList", JSON.stringify(viewedVersesList));
  //     displayVerse();
  //   });
};

// funciton to display the previous searches on the page. 
// Need to limit how many are saved in localstorage. Figure out how to do that.
// need to decide on how they're displayed might affect the code i.e. carousel on 
// bottom of page?  should only display ones with images?  
var showSearches = function () {
  var viewedVersesList = JSON.parse(localStorage.getItem("viewedVersesList"));
  if (viewedVersesList) {
    viewedVerses = viewedVersesList;
    for (i = 0; i < searchedCitiesList.length; i++) {
      var viewedVerses = document.getElementById("viewedVersesList");
      viewedVerses.innerHTML = "<li>" + viewedVerses + "</li>";

    }
  }
  var viewedImagesList = JSON.parse(localStorage.getItem("viewedImagesList"));
  if (viewedImagesList) {
    viewedImages = viewedImagesList;
    for (i = 0; i < viewedImagesList.length; i++) {
      var viewedImages = document.getElementById("viewedImagesList");
      viewedImages.innerHTML = "<li>" + viewedImages + "</li>";

    }
  }
};

localVerseStorage();
verseButton.addEventListener("click", displayVerse);
