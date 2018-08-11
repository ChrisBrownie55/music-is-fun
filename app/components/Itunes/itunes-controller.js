import ItunesService from './itunes-service.js';

//PRIVATE

const itunesService = new ItunesService();

function drawSongs(songs) {
  // console.log(songs);
  document.getElementById('songs').innerHTML = songs
    .map(
      song =>
        song.preview.includes('video')
          ? ''
          : `
    <article class='card col-md-4 col-sm-6'>
      <img src='${song.albumArt}' alt='album art' class='card-img-top' />
      <div class='card-body'>
        <h3 class='card-title'>${song.title} $${song.price || 0}</h3>
        <h4 class='card-subtitle text-muted'>Album: ${song.collection}</h4>
        <h5 class='card-subtitle text-muted mb-2'>Artist: ${song.artist}</h5>
      </div>
      <div class='card-footer'>
        <audio src='${song.preview}' controls>
          Your browser doesn't support HTML5 Audio
        </audio>
      </div>
    </article>
  `
    )
    .join('');
}

//PUBLIC
class ItunesController {
  getMusic(event) {
    event.preventDefault();
    var artist = event.target.artist.value;
    itunesService
      .getMusicByArtist(artist)
      .then(
        songs => (
          setTimeout(() => drawSongs(songs), 250),
          event.target.parentNode.classList.add('pushed-up')
        )
      );
  }
}

export default ItunesController;
