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
    <article class='card mx-2 my-2' style='width: 20rem'>
      <img src='${song.albumArt}' alt='album art' class='card-img-top' />
      <div class='card-body'>
        <h3 class='card-title text-truncate mb-1'>${song.title} $${song.price ||
              0}</h3>
        <h5 class='card-subtitle text-muted text-truncate mb-1'>Album:
          <span class='font-weight-normal'>${song.collection}</span>
        </h5>
        <h5 class='card-subtitle text-muted text-truncate mb-2'>Artist:
          <span class='font-weight-normal'>${song.artist}</span>
        </h5>
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
