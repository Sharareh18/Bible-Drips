var pixaKey = "38708546-2cfb7c47338a280cf45ea2b47";
var bibleKey = "e0069271426c93138b3100997ccfbd51";
// var verseId = 'JHN.3.16'; // I inserted example chapter w/ verse
var bibleId = 'de4e12af7f28f599-02'; // This is for the Bible version
// var chapterId = 'JHN.1' // This is how a chapter ID looks
// var chapterBookId = "JHN"
var pixaUrl = `https://pixabay.com/api/?key=${pixaKey}`;
var allBooks = 'https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books';
// var allChapters = `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${chapterBookId}/chapters`; // These two variables are for pulling data in the console log
// var allVerses = `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}/verses`; // These two variables are for pulling data in the console log
// var singleVerse = `https://api.scripture.api.bible/v1/bibles/${bibleId}/verses/${verseId}`; // Pulls a verse

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
        document.querySelector("div").innerHTML = verse + reference; // <---- Sheri this is the gold!
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
        var verse = data.data[Math.floor(Math.random()*data.data.length)];
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
    var chapter = data.data[Math.floor(Math.random()*data.data.length)];
    fetchVerses(chapter.id);
  })
  .catch(error => console.error('Error:', error));
}

fetch(allBooks, {
    headers: {
      'api-key': 'e0069271426c93138b3100997ccfbd51',
    //   'mode': 'no-cors'
    }
  })
  .then(response => response.json())
  .then(data => { 
    var books = data.data[Math.floor(Math.random()*data.data.length)];
    fetchBooks(books.id);
  })
  .catch(error => console.error('Error:', error));
  
fetch(pixaUrl)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));