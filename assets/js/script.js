var versePlacement = document.getElementById("insertVerseHere");
var imagePlacement = document.getElementById("insertImageHere");
var verseButton = document.getElementById("verseButton");
var imageButton = document.getElementById("imageButton");
var viewedVersesList = [];
var viewedImagesList = [];
var verse = [];
var image = [];


// function to fetch, display and save verses. 
var displayVerse = function () {
  fetch("bible api here")
    .then(response => response.json())
    .then(data => (versePlacement.innerHTML = data.verse));

  viewedVersesList.push(displayVerse.text);
  localStorage.setItem("viewedVersesList", JSON.stringify(viewedVersesList));
  displayVerse();
}

// function to fetch, save and display verses and Images
// maybe create a save button and only save those user chooses to save? 
// check to make sure this doesn't create double inputs, pretty sure
// need to add condition to verse display that if verse id doesn't exist then 
// save.  maybe should do that anyway. 
var displayImage = function () {
  fetch("image api here")
    .then(response => response.json())
    .then(data => (imagePlacement.innerHTML = data.image));
  imagePlacement.style.backgroundImage = data.image;

  viewedImagesList.push(displayImage.pic);
  localStorage.setItem("viewedImagesList", JSON.stringify(viewedImagesList));
  displayImage();

  fetch("bible api here")
    .then(response => response.json())
    .then(data => (versePlacement.innerHTML = data.verse));

  viewedVersesList.push(displayVerse.text);
  localStorage.setItem("viewedVersesList", JSON.stringify(viewedVersesList));
  displayVerse();
}

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

// event listeners for user action on page 
verseButton.addEventListener("click", displayVerse);
imageButton.addEventListener("click", displayImage);
