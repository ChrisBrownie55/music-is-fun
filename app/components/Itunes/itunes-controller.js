import ItunesService from './itunes-service.js';

//PRIVATE

const itunesService = new ItunesService();

function drawSongs(songs) {
  // console.log(songs);
  document.getElementById('songs').innerHTML = songs
    .map(
      song =>
        !song.preview || song.preview.includes('video')
          ? ''
          : `
    <article class='card mx-2 my-2 fade' style='width: 20rem'>
      <img src='${
        song.albumArt
      }' alt='album art' class='card-img-top' width='250' height='250' style='object-fit: cover'/>
      <div class='card-body'>
        <h3 class='card-title text-truncate w-75 mb-1'>
          ${song.title}
          <span class='position-absolute r-10'>$${song.price || 0}</span>
        </h3>
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

  setTimeout(
    () =>
      document
        .querySelectorAll('#songs > article')
        .forEach(song => song.classList.add('show')),
    250
  );
}

//PUBLIC
class ItunesController {
  getMusic(event) {
    event.preventDefault();
    var artist = event.target.artist.value;
    const loader = document.getElementById('loader');
    const formInputWrapper = event.target.children[1];
    const hideInputAnimation = formInputWrapper.animate(
      [
        { width: '100%', flexWrap: 'nowrap', overflow: 'hidden' },
        { width: '0%', flexWrap: 'nowrap', overflow: 'hidden' }
      ],
      {
        duration: 250,
        fill: 'forwards',
        easing: 'ease-in-out'
      }
    );
    hideInputAnimation.onfinish = () => loader.classList.add('active');
    itunesService.getMusicByArtist(artist).then(songs =>
      setTimeout(() => {
        setTimeout(() => drawSongs(songs), 250);
        event.target.parentNode.classList.add('pushed-up');
        loader.classList.remove('active');
        formInputWrapper.animate(
          [
            { width: '0%', flexWrap: 'nowrap', overflow: 'hidden' },
            { width: '100%', flexWrap: 'wrap', overflow: 'hidden' }
          ],
          {
            duration: 250,
            delay: 250,
            easing: 'ease-in-out',
            fill: 'forwards'
          }
        );
      }, 500)
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
