const cajaSeleccion = document.querySelector(".select-box"),
    btnJugadorX = cajaSeleccion.querySelector(".options .playerX"),
    btnJugadorO = cajaSeleccion.querySelector(".options .playerO"),
    cajaJuego = document.querySelector(".play-board"),
    jugadores = document.querySelector(".players"),
    todasCajas = document.querySelectorAll("section span"),
    cajaResultado = document.querySelector(".result-box"),
    textoGanador = cajaResultado.querySelector(".won-text"),
    btnReplay = cajaResultado.querySelector("button");

window.onload = () => {
    for (let i = 0; i < todasCajas.length; i++) {
        todasCajas[i].setAttribute("onclick", "clickedBox(this)");
    }
}

btnJugadorX.onclick = () => {
    cajaSeleccion.classList.add("hide");
    cajaJuego.classList.add("show");
}

btnJugadorO.onclick = () => {
    cajaSeleccion.classList.add("hide");
    cajaJuego.classList.add("show");
    jugadores.setAttribute("class", "players active player");
}

let iconoJugadorX = "fas fa-times",
    iconoJugadorO = "far fa-circle",
    signoJugador = "X",
    ejecutarBot = true;

function clickedBox(elemento) {
    if (jugadores.classList.contains("player")) {
        signoJugador = "O";
        elemento.innerHTML = `<i class="${iconoJugadorO}"></i>`;
        jugadores.classList.remove("active");
        elemento.setAttribute("id", signoJugador);
    } else {
        elemento.innerHTML = `<i class="${iconoJugadorX}"></i>`;
        elemento.setAttribute("id", signoJugador);
        jugadores.classList.add("active");
    }
    selectWinner();
    elemento.style.pointerEvents = "none";
    cajaJuego.style.pointerEvents = "none";
    let retardoAleatorio = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(ejecutarBot);
    }, retardoAleatorio);
}

function bot() {
    let array = [];
    if (ejecutarBot) {
        signoJugador = "O";
        for (let i = 0; i < todasCajas.length; i++) {
            if (todasCajas[i].childElementCount == 0) {
                array.push(i);
            }
        }
        let cajaAleatoria = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (jugadores.classList.contains("player")) {
                signoJugador = "X";
                todasCajas[cajaAleatoria].innerHTML = `<i class="${iconoJugadorX}"></i>`;
                todasCajas[cajaAleatoria].setAttribute("id", signoJugador);
                jugadores.classList.add("active");
            } else {
                todasCajas[cajaAleatoria].innerHTML = `<i class="${iconoJugadorO}"></i>`;
                jugadores.classList.remove("active");
                todasCajas[cajaAleatoria].setAttribute("id", signoJugador);
            }
            selectWinner();
        }
        todasCajas[cajaAleatoria].style.pointerEvents = "none";
        cajaJuego.style.pointerEvents = "auto";
        signoJugador = "X";
    }
}

function getIdVal(claseCaja) {
    return document.querySelector(".box" + claseCaja).id;
}

function checkIdSign(val1, val2, val3, sign) {
    if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (checkIdSign(1, 2, 3, signoJugador) || checkIdSign(4, 5, 6, signoJugador) || checkIdSign(7, 8, 9, signoJugador) || checkIdSign(1, 4, 7, signoJugador) || checkIdSign(2, 5, 8, signoJugador) || checkIdSign(3, 6, 9, signoJugador) || checkIdSign(1, 5, 9, signoJugador) || checkIdSign(3, 5, 7, signoJugador)) {
        ejecutarBot = false;
        bot(ejecutarBot);
        setTimeout(() => {
            cajaResultado.classList.add("show");
            cajaJuego.classList.remove("show");
        }, 700);
        textoGanador.innerHTML = `El jugador <p>${signoJugador}</p> ha ganado!`;
    } else {
        if (getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != "") {
            ejecutarBot = false;
            bot(ejecutarBot);
            setTimeout(() => {
                cajaResultado.classList.add("show");
                cajaJuego.classList.remove("show");
            }, 700);
            textoGanador.textContent = "¡Ha sido un empate!";
        }
    }
}

btnReplay.onclick = () => {
    window.location.reload();
}
