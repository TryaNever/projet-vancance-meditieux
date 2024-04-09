const acceuil = document.querySelector('.acceuil');
const btnTester = document.querySelector('.tester');
btnTester.addEventListener('click', function() {
    acceuil.classList.add('hidden');
    contenaireMusic.classList.remove('hidden')
})