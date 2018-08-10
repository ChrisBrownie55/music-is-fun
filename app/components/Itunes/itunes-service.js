import Song from "../../models/Song.js";


class ItunesService {

  //DO NOT MODIFY
  getMusicByArtist(artist) {
    var url = 'https://itunes.apple.com/search?callback=?&term=' + artist;
    // @ts-ignore
    return $.getJSON(url)
      .then(res => res.results.map(s => new Song(s)))
      .catch(err => console.log(err))
  }

}



export default ItunesService