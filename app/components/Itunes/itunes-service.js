import Song from '../../models/Song.js';

class ItunesService {
  //DO NOT MODIFY
  getMusicByArtist(artist) {
    var url = 'https://itunes.apple.com/search?&term=' + artist;
    // @ts-ignore
    return fetch(url)
      .then(res => res.json())
      .then(json => json.results.map(s => new Song(s)))
      .catch(err => console.log(err));
  }
}

export default ItunesService;
