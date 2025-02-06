const main = document.querySelector('main')
const audio = document.querySelector('.audio')
const progressBar = document.querySelector('.progressBar')
const nameSound = document.querySelector('.name-sound-play')
const vinille = document.querySelector('.vinille')
const nameSoundPlay = document.querySelector('.name-sound-play')
const buttonPlayPause = document.querySelector('.btn-play-pause')
const imgSoundPlay = document.querySelector('.img-sound-play')
let ok = true
let timeMusic = [30, 120, 300, 600, 1200];
let numberToSelectTimeMusic = 0
let timeBarProgressSave = 0
let imgEster = document.querySelector('.vinille')
let conteurEster = 0

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
    progressBar.value = ((audio.currentTime + timeBarProgressSave) / timeMusic[numberToSelectTimeMusic]) * 100;
}

function switchPlayPauseButton() {
    if (ok === true) {
        buttonPlayPause.src = " ../assets/images/btn-play.png"
        audio.pause();
        vinille.classList.remove("vinille-animation")
        ok = false
    } else {
        buttonPlayPause.src = "../assets/images/btn-pause.png"
        audio.play();
        vinille.classList.add("vinille-animation")
        ok = true
    }
}

function spawnSound(res) {
    for (let i = 0; i < res.tracks.items.length; i++) {
        const divContainer = document.createElement('div');
        const img = document.createElement('img');
        const nameSound = document.createElement('h3');
        const timeSound = document.createElement('p');

        divContainer.classList.add('container');
        nameSound.classList.add('title-sound');
        timeSound.classList.add('time-length');

        img.src = res.tracks.items[i].track.album.images[0].url;
        nameSound.textContent = res.tracks.items[i].track.name;
        timeSound.textContent = convertTime(res.tracks.items[i].track.duration_ms) + "   (probleme donc 0:30s)";

        main.appendChild(divContainer);
        divContainer.appendChild(img);
        divContainer.appendChild(nameSound);
        divContainer.appendChild(timeSound);

        divContainer.addEventListener('click', function () {
            popTimeSelect(res, i);
        });
    }
}



function soundGest(res, audioE) {
    for (let i = 0; i < res.tracks.items.length; i++) {
        audioE[i].addEventListener('click', function () {
            popTimeSelect(res, i)
        });
    }
}

function popTimeSelect(res, i) {
    let divAll = document.createElement('div');
    let divContain = document.createElement('div');
    let closePop = document.createElement('i');
    let containPopMusicInfo = document.createElement('div');
    let imgMusicInfo = document.createElement('img');
    let nameMusicInfo = document.createElement('p');
    let divTimeMusic = document.createElement('div')

    divAll.classList.add('div-pop-all-screen');
    divContain.classList.add('div-pop-wrapper');
    closePop.classList.add('fa-solid', 'fa-xmark', 'closePop');
    containPopMusicInfo.classList.add('contain-pop-info-music');
    divTimeMusic.classList.add('contain-time-music')

    imgMusicInfo.src = res.tracks.items[i].track.album.images[0].url;
    nameMusicInfo.textContent = res.tracks.items[i].track.name;

    main.append(divAll);
    divAll.appendChild(divContain);
    divContain.appendChild(closePop);
    divContain.appendChild(containPopMusicInfo);
    containPopMusicInfo.appendChild(imgMusicInfo);
    containPopMusicInfo.appendChild(nameMusicInfo);
    divContain.appendChild(divTimeMusic)

    for (let index = 0; index < timeMusic.length; index++) {
        let timeMusicP = document.createElement('p')
        timeMusicP.classList.add('buttonAnimationTime')
        timeMusicP.textContent = numberToTime(timeMusic[index])
        divTimeMusic.appendChild(timeMusicP)
        for (let index = 0; index < 4; index++) {
            let spanAnimation = document.createElement('span')
            timeMusicP.appendChild(spanAnimation)
        }
    }
    

    const closePopUp = document.querySelector('.closePop');

    closePopUp.addEventListener('click', function () {
        divAll.remove()
    })

    let timeSelectorBtn = document.querySelectorAll('.contain-time-music p')
    for (let ind = 0; ind < timeSelectorBtn.length; ind++) {
        timeSelectorBtn[ind].addEventListener('click', function () {
            numberToSelectTimeMusic = ind
            timeBarProgressSave = 0
            imgSoundPlay.src = res.tracks.items[i].track.album.images[0].url
            nameSoundPlay.textContent = res.tracks.items[i].track.name
            let timeLoop = 0
            vinille.classList.add("vinille-animation")
            audio.src = audio.src = res.tracks.items[i].track.preview_url;
            audio.play()
            audio.addEventListener('ended', function () {
                timeLoop++
                if (timeMusic[ind] - 30 >= timeLoop * 30) {
                    timeBarProgressSave += audio.currentTime
                    console.log(timeBarProgressSave);
                    audio.currentTime = 0
                    audio.play()
                } else {
                    audio.pause()
                    vinille.classList.remove("vinille-animation")
                }
            })
        })
    }
}

function numberToTime(number) {
    if (number <= 59) {
        return number + " secondes"
    } else {
        return number / 60 + " minutes"
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
    const duration = timeMusic[numberToSelectTimeMusic];
    const progressTime = (progress / 100) * duration;
    const adjustedTime = progressTime % duration;
    const newTime = adjustedTime + Math.floor(progressTime / duration) * duration;
    audio.currentTime = newTime;
});


buttonPlayPause.addEventListener('click', function () {
    if (audio.src == "") {
    } else {
        switchPlayPauseButton()
    }
})

