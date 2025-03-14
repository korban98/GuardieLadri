let guardia = document.getElementById("guardia");
let ladro = document.getElementById("ladro");
let esito = document.getElementById("esito");

const stanzaWidth = 500; 
const stanzaHeight = 500; 

let mosseRestanti = 20;

function muoviGuardia(direzione) {
    if (mosseRestanti <= 0) return; 

    let left = parseInt(guardia.style.left) || 0;
    let top = parseInt(guardia.style.top) || 0;

    switch (direzione) {
        case "su":
            if (top > 0) guardia.style.top = (top - 50) + "px";
            break;
        case "giu":
            if (top < stanzaHeight - 50) guardia.style.top = (top + 50) + "px";
            break;
        case "sinistra":
            if (left > 0) guardia.style.left = (left - 50) + "px";
            break;
        case "destra":
            if (left < stanzaWidth - 50) guardia.style.left = (left + 50) + "px";
            break;
    }

    muoviLadro(); 
    verificaVittoria(); 
}

function muoviLadro() {
    let left = parseInt(ladro.style.left) || 0;
    let top = parseInt(ladro.style.top) || 0;

    let direzioni = ["su", "giu", "sinistra", "destra"];
    let scelta = direzioni[Math.floor(Math.random() * 4)];

    switch (scelta) {
        case "su":
            if (top > 0) ladro.style.top = (top - 50) + "px";
            break;
        case "giu":
            if (top < stanzaHeight - 50) ladro.style.top = (top + 50) + "px";
            break;
        case "sinistra":
            if (left > 0) ladro.style.left = (left - 50) + "px";
            break;
        case "destra":
            if (left < stanzaWidth - 50) ladro.style.left = (left + 50) + "px";
            break;
    }
}

function verificaVittoria() {
    let leftGuardia = parseInt(guardia.style.left) || 0;
    let topGuardia = parseInt(guardia.style.top) || 0;

    let leftLadro = parseInt(ladro.style.left) || 0;
    let topLadro = parseInt(ladro.style.top) || 0;

    mosseRestanti--;

    // Verifica se la guardia ha raggiunto il ladro (con una distanza inferiore a 50px)
    if (Math.abs(leftGuardia - leftLadro) < 50 && Math.abs(topGuardia - topLadro) < 50) {
        esito.innerText = "La guardia ha catturato il ladro! Hai vinto!";
        disabilitaPulsanti();
    } else if (mosseRestanti <= 0) {
        esito.innerText = "Il ladro è scappato! Hai perso!";
        disabilitaPulsanti();
    } else {
        esito.innerText = `Mosse rimanenti: ${mosseRestanti}`;
    }
}

function disabilitaPulsanti() {
    let pulsanti = document.getElementsByTagName("button"); 
    for (let i = 0; i < pulsanti.length; i++) {
        pulsanti[i].disabled = true; 
    }
}

document.getElementById("nord").addEventListener("click", function() { muoviGuardia("su"); });
document.getElementById("sud").addEventListener("click", function() { muoviGuardia("giu"); });
document.getElementById("ovest").addEventListener("click", function() { muoviGuardia("sinistra"); });
document.getElementById("est").addEventListener("click", function() { muoviGuardia("destra"); });

function isWithinBounds(x, y) {
    return x >= 0 && x <= stanzaWidth - 50 && y >= 0 && y <= stanzaHeight - 50;
}
