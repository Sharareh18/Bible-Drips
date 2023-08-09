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
  