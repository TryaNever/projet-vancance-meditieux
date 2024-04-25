const imgMadame = document.querySelector('.femme-meditation')
const testerBtn = document.querySelector('.tester')
const rondAnim = document.querySelector('.rond')

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

testerBtn.addEventListener('click', function () {
    window.location.href = './view/abonemment.html';
})

window.addEventListener('resize', function () {
    rondAnim.classList.remove('anim_rond')
    setTimeout(function () {
        rondAnim.classList.add('anim_rond')
    }, 100);
});