import Song from '../../models/Song.js';

class ItunesService {
  //DO NOT MODIFY
  getMusicByArtist(artist) {
    var url1 = '//bcw-getter.herokuapp.com/?url=';
    var url2 = 'https://itunes.apple.com/search?term=' + artist;
    var apiUrl = url1 + encodeURIComponent(url2);
    // @ts-ignore
    return fetch(apiUrl)
      .then(response => response.json())
      .then(json => json.results.map(s => new Song(s)))
      .catch(error =>
        console.error(`There's been an error with the itunes service: ${error}`)
      );
  }
}

export default ItunesService;
