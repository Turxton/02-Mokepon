const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const botonMascotaJugador = document.getElementById('boton-seleccionar-mascota')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const imgMascotaJugador = document.getElementById('img-mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const imgMascotaEnemigo = document.getElementById('img-mascota-enemigo')
const spanvictoriasJugador = document.getElementById('victorias-jugador')
const spanvictoriasEnemigo = document.getElementById('victorias-enemigo')
const subtitulo = document.getElementById('subtitulo')

const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionReiniciar = document.getElementById('reiniciar')
const mensajeFinal = document.getElementById('mensaje-final')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionHistorial = document.getElementById('historial')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const resultadosDeLosAtaques = document.getElementById('resultados-ataques')

let mokepones = []
let tarjetasMokepon
let botonesAtaquesMokepon

let inputHipodoge
let inputCapipepo
let inputRatigueya

let mascotaJugador
let ataquesMascotaJugador
let mascotaEnemigo
let ataquesMascotaEnemigo

let botones = []
let secuenciaAtaquesJugador = []
let secuenciaAtaquesEnemigo = []
let victoriasJugador = 0
let victoriasEnemigo = 0

let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let mokebola = new Image()
mokebola.src = './assets/mokebola.png'
let mokebolaPosiciónX = aleatorio (100,350)
let mokebolaPosiciónY = aleatorio (0,250)


// las clases siempre inician con mayúscula como regla general
//Creamos la clase Mokepon, y en su contrucctor ponemos las propiedades básicas que tienen todos los mokepons 
class Mokepon {
    constructor(nombre, elemento, foto, vida){
        this.nombre = nombre
        this.elemento = elemento
        this.foto = foto
        this.vida = vida
        this.ataques = []   // Los ataques pueden ser diferentes entre mokepones, entonces se deja vacío desde el contructor.
        this.x = 15
        this.y = 90
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

// Creamos los primeros tres objetos mokepon y agregamos sus correspondientes ataques.
let hipodoge = new Mokepon('Hipodoge', 'Agua', './assets/Hipodoge.png', 5)
let capipepo = new Mokepon('Capipepo', 'Tierra', './assets/Capipepo.png', 5)
let ratigueya = new Mokepon('Ratigueya', 'Fuego', './assets/Ratigueya.png', 5)

hipodoge.ataques.push(
    {nombre: 'Agua 💧',   elemento: 'Agua',   id: 'hidrobomba'},
    {nombre: 'Agua 💧',   elemento: 'Agua',   id: 'chorrodeagua'},
    {nombre: 'Agua 💧',   elemento: 'Agua',   id: 'tsunami'},
    {nombre: 'Fuego 🔥',  elemento: 'Fuego',  id: 'lluviatermal'},
    {nombre: 'Tierra 🌱', elemento: 'Tierra', id: 'trampadelodo'},
)
capipepo.ataques.push(
    {nombre: 'Tierra 🌱', elemento: 'Tierra', id: 'sismo'},
    {nombre: 'Tierra 🌱', elemento: 'Tierra', id: 'golpederoca'},
    {nombre: 'Tierra 🌱', elemento: 'Tierra', id: 'derrumbe'},
    {nombre: 'Agua 💧',   elemento: 'Agua',   id: 'boladearcilla'},
    {nombre: 'Fuego 🔥',  elemento: 'Fuego',  id: 'rocaignea'},
)
ratigueya.ataques.push(
    {nombre: 'Fuego 🔥',  elemento: 'Fuego',  id: 'lanzallamas'},
    {nombre: 'Fuego 🔥',  elemento: 'Fuego',  id: 'boladefuego'},
    {nombre: 'Fuego 🔥',  elemento: 'Fuego',  id: 'incineración'},
    {nombre: 'Agua 💧',   elemento: 'Agua',   id: 'vapordeagua'},
    {nombre: 'Tierra 🌱', elemento: 'Tierra', id: 'magma'},
)

mokepones.push(hipodoge, capipepo, ratigueya)   // Agrupamos los objetos mokepon en un arreglo

// Por cada "mokepon" en el arreglo mokepones => inserte las tarjetas mokepon en el HTML
mokepones.forEach((mokepon)=>{
    tarjetasMokepon = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon ${mokepon.elemento}" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
    </label>
    `

    contenedorTarjetas.innerHTML += tarjetasMokepon
})

// ----------------------------------- Inicio -----------------------------------------

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionHistorial.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador() {
    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    
    if (inputHipodoge.checked) {
        mascotaJugador = hipodoge
    } else if (inputCapipepo.checked) {
        mascotaJugador = capipepo
    } else if (inputRatigueya.checked) {
        mascotaJugador = ratigueya
    } else {
        alert('Selecciona una mascota')
        reiniciarJuego()
    }

    spanMascotaJugador.innerHTML = mascotaJugador.nombre
    imgMascotaJugador.src = mascotaJugador.foto
    ataquesMascotaJugador = mascotaJugador.ataques

    mostrarAtaques(ataquesMascotaJugador)
    seleccionarMascotaEnemigo()
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        botonesAtaquesMokepon = `
        <button id=${ataque.id} class="btnAtaque ${ataque.elemento}">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += botonesAtaquesMokepon
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)
    mascotaEnemigo = mokepones[mascotaAleatoria]
    
    spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre
    imgMascotaEnemigo.src = mascotaEnemigo.foto
    ataquesMascotaEnemigo = mascotaEnemigo.ataques
    secuenciaAtaque()
}

function secuenciaAtaque() {

    sectionSeleccionarMascota.style.display = 'none'
    //sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'flex'
    
    iniciarMapa()

    botones = document.querySelectorAll('.btnAtaque')

    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === 'Fuego 🔥') {
                secuenciaAtaquesJugador.push('Fuego 🔥')
            } else if (e.target.textContent === 'Agua 💧') {
                secuenciaAtaquesJugador.push('Agua 💧') 
            } else {
                secuenciaAtaquesJugador.push('Tierra 🌱')
            }
            boton.style.background = '#112f58'
            boton.disabled = 'true'
            ataqueAleatorioEnemigo()
            combate(secuenciaAtaquesJugador.length -1)
        })
    })
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMascotaEnemigo.length -1)

    secuenciaAtaquesEnemigo.push(ataquesMascotaEnemigo[ataqueAleatorio].nombre)
    ataquesMascotaEnemigo.splice(ataqueAleatorio,1)
}


function combate(i) {
    
    if(secuenciaAtaquesJugador[i] == secuenciaAtaquesEnemigo[i]) {
        crearMensaje("Empate")
    } else if(secuenciaAtaquesJugador[i] == 'Fuego 🔥' && secuenciaAtaquesEnemigo[i] == 'Tierra 🌱') {
        crearMensaje("Ganaste")
        victoriasJugador++
        spanvictoriasJugador.innerHTML = victoriasJugador
    } else if(secuenciaAtaquesJugador[i] == 'Agua 💧' && secuenciaAtaquesEnemigo[i] == 'Fuego 🔥') {
        crearMensaje("Ganaste")
        victoriasJugador++
        spanvictoriasJugador.innerHTML = victoriasJugador
    } else if(secuenciaAtaquesJugador[i] == 'Tierra 🌱' && secuenciaAtaquesEnemigo[i] == 'Agua 💧') {
        crearMensaje("Ganaste")
        victoriasJugador++
        spanvictoriasJugador.innerHTML = victoriasJugador
    } else {
        crearMensaje("Perdiste")
        victoriasEnemigo++
        spanvictoriasEnemigo.innerHTML = victoriasEnemigo
    }

    sectionHistorial.style.display = 'flex'
    
    if (ataquesMascotaEnemigo == 0) {
        revisarVidas()
    }
}

function revisarVidas() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("WOW! ha sido un EMPATE <br>Reinicia y juega otra vez!")

    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("✨ FELICITACIONES ✨<br>Ganaste la batalla Mokepón!")
        imgMascotaEnemigo.style.filter = 'grayscale(1)'
    } else {
        crearMensajeFinal('PERDISTE 😔<br>Mejor suerte para la próxima')
        imgMascotaJugador.style.filter = 'grayscale(1)'
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    let nuevoResultadoAtaque = document.createElement('p')

    nuevoAtaqueDelJugador.innerHTML = secuenciaAtaquesJugador[secuenciaAtaquesJugador.length -1]
    nuevoAtaqueDelEnemigo.innerHTML = secuenciaAtaquesEnemigo[secuenciaAtaquesEnemigo.length -1]
    nuevoResultadoAtaque.innerHTML = resultado

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    resultadosDeLosAtaques.appendChild(nuevoResultadoAtaque)
}

function crearMensajeFinal(resultadoFinal) {
    mensajeFinal.innerHTML = resultadoFinal
    subtitulo.style.display = 'none'
    contenedorAtaques.style.display = 'none'
    sectionReiniciar.style.display = 'flex'
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function iniciarMapa() {
    mapa.width = 400
    mapa.height = 300
    intervalo = setInterval(pintarCanvas, 50) // la función pintarCanvas() se va a ejecutar constantemente en intervalos de 50 ms

    window.addEventListener('keydown', iniciarMovimiento)
    window.addEventListener('keyup', detenerMovimiento)
}

function pintarCanvas() {
    mascotaJugador.x = mascotaJugador.x + mascotaJugador.velocidadX
    mascotaJugador.y = mascotaJugador.y + mascotaJugador.velocidadY

    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(mapaBackground,0,0,mapa.width,mapa.height)
    lienzo.drawImage(mokebola,mokebolaPosiciónX,mokebolaPosiciónY,50,50)
    lienzo.drawImage(
        mascotaJugador.mapaFoto,
        mascotaJugador.x,
        mascotaJugador.y,
        mascotaJugador.ancho,
        mascotaJugador.alto
    )
    
    if (mascotaJugador.velocidadX !== 0 || mascotaJugador.velocidadY !== 0) {
        revisarColision()
    }
}

function iniciarMovimiento(e) {
    switch (e.key) {
        case 'w': mascotaJugador.velocidadY = -5; break
        case 'a': mascotaJugador.velocidadX = -5; break
        case 's': mascotaJugador.velocidadY = 5; break
        case 'd': mascotaJugador.velocidadX = 5; break
        default: break
    }
}

function detenerMovimiento() {
    mascotaJugador.velocidadX = 0
    mascotaJugador.velocidadY = 0
}

function revisarColision() {
    const mokebolaUp = mokebolaPosiciónY
    const mokebolaDown = mokebolaPosiciónY + 50
    const mokebolaLeft = mokebolaPosiciónX
    const mokebolaRight = mokebolaPosiciónX + 50

    const mokeponUp = mascotaJugador.y
    const mokeponDown = mascotaJugador.y + mascotaJugador.alto
    const mokeponLeft = mascotaJugador.x
    const mokeponRight = mascotaJugador.x + mascotaJugador.ancho

    if (
        mokeponDown < mokebolaUp ||     //AbajoMokepon menor que ArribaMokebola
        mokeponUp > mokebolaDown ||     //ArribaMokepon mayor que AbajoMokebola
        mokeponRight < mokebolaLeft ||  //DerechaMokepon menor que IzquierdaMokebola
        mokeponLeft > mokebolaRight     //IzquierdaMokepon mayor que DerechaMokebola
        ) {
        return                          // Sí alguna condición es verdadera no hay colisión
    }

    detenerMovimiento()
}

window.addEventListener('load', iniciarJuego)
