const imgMadame = document.querySelector('.femme-meditation')

function convertion(timeS) {
    let newTimeS = ""
    for (let i = 0; i < timeS.length - 1; i++) {
        newTimeS += timeS[i];
    }
    return newTimeS * 1000
}

imgMadame.addEventListener('mouseover', function () {
    imgMadame.classList.add('femme-animation')
    const timeAnim = getComputedStyle(imgMadame).getPropertyValue('animation-duration')
    setTimeout(function () {
        imgMadame.classList.remove('femme-animation')
    }, convertion(timeAnim))
})
