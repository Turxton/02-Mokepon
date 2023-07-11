const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const sectionHistorial = document.getElementById('historial')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const imgMascotaJugador = document.getElementById('img-mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const imgMascotaEnemigo = document.getElementById('img-mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const resultadosDeLosAtaques = document.getElementById('resultados-ataques')

const mensajeFinal = document.getElementById('mensaje-final')
const subtitulo = document.getElementById('subtitulo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

let mokepones = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let ataqueJugadorNew = []
let ataqueJugador = []
let ataqueEnemigo = []
let vidasJugador = 3
let vidasEnemigo = 3

// las clases siempre inician con mayúscula como regla general
//Creamos la clase Mokepones, inicializamos los 3 mokepones con sus respestivos ataques
class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/Hipodoge.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/Capipepo.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/Ratigueya.png', 5)

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)
capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
)
ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
)

mokepones.push(hipodoge, capipepo, ratigueya)

// Por cada "mokepon" en el arreglo mokepones haga... =>
mokepones.forEach((mokepon)=>{
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
    </label>
    `

    contenedorTarjetas.innerHTML += opcionDeMokepones
})

inputHipodoge = document.getElementById('Hipodoge')
inputCapipepo = document.getElementById('Capipepo')
inputRatigueya = document.getElementById('Ratigueya')

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionHistorial.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = hipodoge.nombre
        mascotaJugador = hipodoge.nombre
        imgMascotaJugador.src = hipodoge.foto
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = capipepo.nombre
        mascotaJugador = capipepo.nombre
        imgMascotaJugador.src = capipepo.foto
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = ratigueya.nombre
        mascotaJugador = ratigueya.nombre
        imgMascotaJugador.src = ratigueya.foto
    } else {
        alert('Selecciona una mascota')
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="btnAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.btnAtaque')

    // botonFuego.addEventListener('click', ataqueFuego)
    // botonAgua.addEventListener('click', ataqueAgua)
    // botonTierra.addEventListener('click', ataqueTierra)
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugadorNew.push('Fuego')
                console.log(ataqueJugadorNew)
                boton.style.background = '#112f58'
            } else if (e.target.textContent === '💧') {
                ataqueJugadorNew.push('Agua')
                console.log(ataqueJugadorNew)
                boton.style.background = '#112f58' 
            } else {
                ataqueJugadorNew.push('Tierra')
                console.log(ataqueJugadorNew)
                boton.style.background = '#112f58'
            }
        })
    })

    ataqueAleatorioEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    imgMascotaEnemigo.src = mokepones[mascotaAleatoria].foto
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo.push('Fuego')
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo.push('Agua')
    } else {
        ataqueEnemigo.push('Tierra')
    }

    combate()
}


// ⬇️ --- Corregir esta parte --- ⬇️
function combate() {
    
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("Empate")
    } else if(ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra') {
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego') {
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua') {
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("Perdiste")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    sectionHistorial.style.display = 'flex'

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("✨ FELICITACIONES ✨<br>Ganaste la batalla Mokepón!")
        imgMascotaEnemigo.style.filter = 'grayscale(1)'

    } else if (vidasJugador == 0) {
        crearMensajeFinal('Perdiste 😔<br>Mejor suerte para la próxima')
        imgMascotaJugador.style.filter = 'grayscale(1)'
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    let nuevoResultadoAtaque = document.createElement('p')

    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo
    nuevoResultadoAtaque.innerHTML = resultado

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    resultadosDeLosAtaques.appendChild(nuevoResultadoAtaque)
}

function crearMensajeFinal(resultadoFinal) {
    mensajeFinal.innerHTML = resultadoFinal
    subtitulo.style.display = 'none'
    botonFuego.disabled = true
    botonFuego.style.display = 'none'
    botonAgua.disabled = true
    botonAgua.style.display = 'none'
    botonTierra.disabled = true
    botonTierra.style.display = 'none'
    sectionReiniciar.style.display = 'flex'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)
