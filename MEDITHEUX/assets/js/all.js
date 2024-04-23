const bar = document.querySelectorAll('.bar')
function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
    for (let i = 0; i < bar.length; i++) {
        bar[i].classList.toggle("lol")
    }
}