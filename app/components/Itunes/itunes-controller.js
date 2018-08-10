import ItunesService from "./itunes-service.js";

//PRIVATE

const itunesService = new ItunesService()

function drawSongs(songs) {
  console.log(songs)
  //YOUR CODING STARTS HERE

  document.getElementById('songs').innerHTML = songs.map(song => `
    <article class='card'>
      <div class='card-header'>
        ${song.title}
        <br />${song.price}
      </div>
      <img src='${song.albumArt}' alt='album art' class='card-img-top' />
      <div class='card-body'>
        <h4 class='card-title'>${song.collection}</h4>
        <h5 class='card-subtitle text-muted mb-2'>${song.artist}</h5>
      </div>
      <div class='card-footer'>
        <audio src='${song.preview}' />
      </div>
    </article>
  `)

}


//PUBLIC
class ItunesController {
  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    //changes the button to loading while songs load
    $('#get-music-button').text('LOADING....');
    itunesService.getMusicByArtist(artist).then(results => {
      drawSongs(results)
      //changes button back to GET MUSIC once songs are loaded
      $('#get-music-button').text('GET MUSIC');
    })
  }


}


export default ItunesController