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
    <article class='card col-lg-3 col-md-4 col-sm-6 mx-2 my-2'>
      <img src='${song.albumArt}' alt='album art' class='card-img-top' />
      <div class='card-body'>
        <h3 class='card-title text-truncate mb-1'>${song.title} $${song.price ||
              0}</h3>
        <h5 class='card-subtitle text-muted text-truncate mb-1'>Album: ${
          song.collection
        }</h5>
        <h5 class='card-subtitle text-muted text-truncate mb-2'>Artist: ${
          song.artist
        }</h5>
      </div>
      <div class='card-footer'>
        <audio class='itunes-preview' onplay='app.controllers.itunesCtrl.playAudio(event.target)' src='${
          song.preview
        }' controls>
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

  playAudio(target) {
    console.log('playing audio');
    document
      .querySelectorAll('.itunes-preview')
      .forEach(audioElement => audioElement !== target && audioElement.pause());
  }
}

export default ItunesController;
