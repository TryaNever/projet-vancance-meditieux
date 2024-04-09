const main = document.querySelector('main')
const audio = document.querySelector('.audio')
const progressBar = document.querySelector('.progressBar')
const nameSound = document.querySelector('.name-sound-play')
const vinille = document.querySelector('.vinille')
const nameSoundPlay = document.querySelector('.name-sound-play')
const buttonPlayPause = document.querySelector('.btn-play-pause')
const imgSoundPlay = document.querySelector('.img-sound-play')
let ok = true
console.log(audio.src == "");
function convertTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    let timeRes = formattedMinutes + ':' + formattedSeconds
    return timeRes
}

function updateProgressBar() {
    progressBar.value = (audio.currentTime / audio.duration) * 100;

}

function switchPlayPauseButton() {

    if (ok === true) {
        buttonPlayPause.src = "assets/images/btn-play.png"
        audio.pause();
        vinille.classList.remove("vinille-animation")
        ok = false
    } else {
        buttonPlayPause.src = "assets/images/btn-pause.png"
        audio.play();
        vinille.classList.add("vinille-animation")
        ok = true
    }
}

function spawnSound(res) {
    for (let i = 0; i < res.tracks.items.length; i++) {
        const divContainer = document.createElement('div')
        const img = document.createElement('img')
        const nameSound = document.createElement('h3')
        const timeSound = document.createElement('p')

        divContainer.classList.add('container')
        nameSound.classList.add('title-sound')
        timeSound.classList.add('time-length')


        img.src = res.tracks.items[i].track.album.images[0].url
        nameSound.textContent = res.tracks.items[i].track.name
        timeSound.textContent = convertTime(res.tracks.items[i].track.duration_ms) + "   (probleme donc 0:30s)"

        main.appendChild(divContainer)
        divContainer.appendChild(img)
        divContainer.appendChild(nameSound)
        divContainer.appendChild(timeSound)
    }
    const audioEvent = document.querySelectorAll('.container')
    soundGest(res, audioEvent)
}

function soundGest(res, audioE) {
    for (let i = 0; i < res.tracks.items.length; i++) {
        audioE[i].addEventListener('click', function () {
            nameSoundPlay.textContent = res.tracks.items[i].track.name;
            imgSoundPlay.src = res.tracks.items[i].track.album.images[0].url
            if (audio.src == res.tracks.items[i].track.preview_url) {
                switchPlayPauseButton()
            } else {
                audio.pause();
                audio.src = res.tracks.items[i].track.preview_url;
                console.log(audio.src == '');
                audio.play();
                vinille.classList.add("vinille-animation")
            }

        });
    }
}

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", "Basic N2VmODkyYzY1ODAwNDYyOWI4ZjhkNWRhMzViZWI3MzQ6NmUxMmMxNmI1MWQ4NDY3MTg4YWM5ZTFkMGZiZDhmMzI=");
myHeaders.append("Cookie", "sp_t=20ba4111ec66eb2cb04f042729273d65; __Host-device_id=AQDQpHOfe1IqjwZvkrJxAD6IvMMn1a_KzvtLawPOBS29OC_fFqX9L3iQrWsvID5-Nx03_DONj-ipCFMIg9C_oRCb2KLNMDNORRQ; sp_tr=false");
const urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "client_credentials");
const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
};
fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then((response) => response.json())
    .then(function (result) {
        const token = result.access_token;
        const myHeaderss = new Headers();
        myHeaderss.append("Authorization", "Bearer " + token);
        const requestOptionss = {
            method: "GET",
            headers: myHeaderss,
            redirect: "follow"
        };
        fetch("https://api.spotify.com/v1/playlists/37sktwnER4qfx8RwQ5eqiB", requestOptionss)
            .then((response) => response.json())
            .then(function (result) {
                spawnSound(result);
            })
            .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));

audio.addEventListener('timeupdate', function () {
    updateProgressBar()
})

progressBar.addEventListener('input', function (event) {
    const progress = parseInt(event.target.value);
    const duration = audio.duration;
    const newTime = (progress / 100) * duration;
    audio.currentTime = newTime;
    if (progress) {

    }
});

buttonPlayPause.addEventListener('click', function () {
    if (audio.src == "") {
    } else {
        switchPlayPauseButton()
    }

})