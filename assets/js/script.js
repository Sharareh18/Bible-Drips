// declaration of variables and API keys
var allBooks =
  "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books";
var bibleId = "01b29f4b342acc35-01"; // 01b29f4b342acc35-01 // de4e12af7f28f599
var pixaUrl = `https://pixabay.com/api/?key=${pixaKey}`;
var verseText = document.querySelector("#mainVerse");
var verseButton = document.getElementById("verseButton");
var imageButton = document.getElementById("displayImage");
var viButton = document.getElementById("viButton");

// var pixaKeyEx = "38768763-bb697d80fc015bc0e4d2af0a5";  extra key
// var bibleKeyEx = "263f98bda97323ccd9096b75045b7876";  extra key
var pixaKey = "38708546-2cfb7c47338a280cf45ea2b47";
var bibleKey = "e0069271426c93138b3100997ccfbd51";

// function to save and display user's last verse upon refresh using localstorage.
function localVerseStorage() {
  var storedVerse = localStorage.getItem("StoredVerse");
  if (storedVerse) {
    document.querySelector("#mainVerse").innerHTML = storedVerse;
  } else {
    document.querySelector("#mainVerse").innerHTML = "31,102 Verse..." + "<br>" + "Click verse button to get random verse." + "<br>" + "Start your Journey!";
  }
}

// function to go through all the different bible API categories and create the final verse.
var displayVerse = function () {
  verseButton.textContent = "Loading";

  fetch(allBooks, {
    headers: {
      "api-key": "e0069271426c93138b3100997ccfbd51",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      var books = data.data[Math.floor(Math.random() * data.data.length)];
      fetchBooks(books.id);
    })
    .catch((error) => console.error("Error:", error));
};

function fetchVerse(verseId) {
  var singleVerse = `https://api.scripture.api.bible/v1/bibles/${bibleId}/verses/${verseId}?content-type=text&include-verse-numbers=false`;
  fetch(singleVerse, {
    headers: {
      "api-key": "e0069271426c93138b3100997ccfbd51",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      var verse = data.data.content;
      var reference = data.data.reference;
      document.querySelector("#mainVerse").innerHTML = verse + "<br>" + reference;
      localStorage.setItem("StoredVerse", verse + "<br>" + reference);
      verseButton.textContent = "Get Verse";
      viButton.textContent = "Verse + Image";
      imageButton.textContent = "Get Image";
    })
    .catch((error) => console.error("Error:", error));
}

function fetchVerses(chapterId) {
  var allVerses = `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}/verses`;
  fetch(allVerses, {
    headers: {
      "api-key": "e0069271426c93138b3100997ccfbd51",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      var verse = data.data[Math.floor(Math.random() * data.data.length)];
      fetchVerse(verse.id);
    })
    .catch((error) => console.error("Error:", error));
}

function fetchBooks(chapterBookId) {
  var allChapters = `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${chapterBookId}/chapters`;
  fetch(allChapters, {
    headers: {
      "api-key": "e0069271426c93138b3100997ccfbd51",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.data.shift();
      var chapter = data.data[Math.floor(Math.random() * data.data.length)];
      fetchVerses(chapter.id);
    })
    .catch((error) => console.error("Error:", error));
}

//  function to display random backgroun image for the verses using the pixabay API.
function displayImage() {
  fetch(
    `https://pixabay.com/api/?key=${pixaKey}&q=sky+clouds&image_type=photo&min_width=1200&category=backgrounds`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
      var hitsNumber = Math.round(Math.random() * (20 - 1) + 1);
      var largeImageURL = data.hits[hitsNumber].largeImageURL;
      localStorage.setItem("viewedImagesList", JSON.stringify(largeImageURL));
      var img = "<img src='" + largeImageURL + "'width=1200/>";
      document.getElementById("bgImage").style.backgroundImage =
        "url(" + largeImageURL + ")";
      // .catch(error => console.error('Error:', error));
    });
}

function displayVerseImage() {
  viButton.textContent = "Loading";

  fetch(allBooks, {
    headers: {
      "api-key": "e0069271426c93138b3100997ccfbd51",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      var books = data.data[Math.floor(Math.random() * data.data.length)];
      fetchBooks(books.id);
      displayImage();
    })
    .catch((error) => console.error("Error:", error));
}

// event listeners for user action on page
// Father God, I pray over the person clicking for a verse. I pray for the wisdom of your word to bring life to them. In Jesus name, Amen.
localVerseStorage();
verseButton.addEventListener("click", displayVerse);
viButton.addEventListener("click", displayVerseImage);
imageButton.addEventListener("click", displayImage);
