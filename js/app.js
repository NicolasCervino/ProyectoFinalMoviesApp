// Contiene a todas las peliculas
const peliculas = [];
peliculas.push(thor, topGun, interstelar, predator, bladeRunner, spiderman);

// Contiene solo las peliculas destacadas que van en el carrousel (solo 3 peliculas)
// IMPORTANTE: el tamaño de este array no puede ser menor a la cantidad de slides
const peliculasDestacadas = [];
peliculasDestacadas.push(spiderman, bladeRunner, predator);

// Funcion para filtrar peliculas por genero
function filtrarPorGenero(genero) {
    let resultado = [];
    for (let i = 0; i < peliculas.length; i++) {
        if (peliculas[i].genre == genero) {
            resultado.push(peliculas[i]);
        }
    }
    return resultado;
}

// Funcion para filtrar peliculas por actor/actriz
function filtrarPorActor(actor) {
    return peliculas.filter((pelicula) => pelicula.cast.includes(actor));
}

// Clase usuario, por ahora solo posee un nombre y una lista de peliculas
class User {
    constructor(username) {
        this.username = username;
        this.myList = [];
    }
    // Metodo que permite agregar una pelicula a la lista del usuario
    agregarAMiLista(pelicula) {
        if (!this.myList.includes(pelicula)) {
            this.myList.push(pelicula);
        }
    }
    // Metodo que permite eliminar una pelicula de la lista del usuario
    borrarDeMiLista(pelicula) {
        let indice = this.myList.indexOf(pelicula);
        if (indice != -1) {
            this.myList.splice(indice, 1);
        }
    }
}

// Container donde van las cards de peliculas
const containerPeliculas = document.getElementById("peliculas");

// Permite crear una card para una pelicula
function crearCard(pelicula) {
    let codigoCard = `  <div class="col-6 col-sm-2 p-2">
                                <div class="card">
                                    <img src=${pelicula.imgMobile} class="card-img-top" alt="...">
                                </div>
                            </div>`;
    containerPeliculas.innerHTML += codigoCard;
    containerPeliculas.id = "peliculas";
}

// Crea una card para cada pelicula del array
function crearCards(peliculas) {
    containerPeliculas.innerHTML = "";
    for (const pelicula of peliculas) {
        crearCard(pelicula);
    }
}
//crearCards(peliculas);

// Permite crear cards solo para un genero especifico de peliculas
// Esta funcion esta pensada para ser llamada desde el un enlace
function mostrarPeliculasGenero(genero) {
    containerPeliculas.innerHTML = "";
    crearCards(filtrarPorGenero(genero));
    containerPeliculas.id = genero;
}

// Eventos del boton de busqueda
const icon = document.querySelector(".icon");
const search = document.querySelector(".search");
const clear = document.querySelector(".clear");
const searchInput = document.querySelector("#mySearch");

// Esto es para que se muestre o se oculte la barra al pulsar el icono
icon.addEventListener("click", () => {
    search.classList.toggle("active");
    clear.classList.toggle("d-none");
    searchInput.classList.toggle("d-none");
});

// Esto es para que el boton clear elimine el valor del input
clear.addEventListener("click", () => {
    document.querySelector("#mySearch").value = "";
});

// Esto es para que se oculte la barra al quitar el focus del input
searchInput.addEventListener("blur", () => {
    search.classList.toggle("active");
    clear.classList.toggle("d-none");
    searchInput.classList.toggle("d-none");
});

// Distintas versiones de la funcion de busqueda
function busqueda() {
    containerPeliculas.innerHTML = "";
    const texto = searchInput.value.toLowerCase();

    for (let pelicula of peliculas) {
        let titulo = pelicula.tittle.toLowerCase();
        if (titulo.indexOf(texto) !== -1) {
            crearCard(pelicula);
        }
    }
    if (containerPeliculas.innerHTML === "") {
        containerPeliculas.innerHTML += `<h1 style="color:white">Pelicula no encontrada</h1>`;
    }
}

// Selecciona las peliculas que contengan el texto ingresado
function busquedaV2() {
    containerPeliculas.innerHTML = "";
    const texto = searchInput.value.toLowerCase();
    const resultado = peliculas.filter((pelicula) => pelicula.tittle.toLowerCase().includes(texto));
    crearCards(resultado);
}

// Solo selecciona las peliculas que comienzen con el texto ingresado
function busquedaV3() {
    containerPeliculas.innerHTML = "";
    const texto = searchInput.value.toLowerCase();
    const resultado = peliculas.filter((pelicula) => pelicula.tittle.toLowerCase().startsWith(texto));
    crearCards(resultado);
}

searchInput.addEventListener("keyup", busquedaV3);

// El div padre de todos los elementos del carrousel
const containerElementos = document.querySelector(".carousel-inner");

// Permite crear los elementos del carrousel de imagenes de manera dinamica
function crearElementoCarrousel(pelicula, divPadre) {
    const codigo = `    <div class="img-overlay">
                            <!-- Imagen Principal -->
                            <img src=${pelicula.imgDesktop} class="d-none d-sm-block w-100" alt="..." />
                            <!-- Imagen Mobile -->
                            <img src=${pelicula.imgMobile} class="d-block d-sm-none w-100"/>
                        </div>
                        <div class="carousel-caption container">
                            <div class="row w-50">
                                <h2 class="text-start titulo-carrousel">${pelicula.tittle}</h2>
                                <p class="text-start subtitulo-carrousel">
                                    ${pelicula.description}
                                </p>
                            </div>
                            <!-- Botones Carrousel -->
                            <div class="btns">
                                <button type="button" class="btn"><i class="fa-solid fa-plus"></i>Agregar a mi lista</button>
                                <button type="button" class="btn">Mas información</button>
                            </div>
                        </div>`;
    divPadre.innerHTML += codigo;
}

// Permite crear las slides para el carrousel
function crearSlidesCarrousel() {
    // Una coleccion html con todos los elementos hijos del container
    const hijos = containerElementos.children;

    for (let i = 0; i < hijos.length; i++) {
        crearElementoCarrousel(peliculasDestacadas[i], hijos[i]);
    }
}

crearCards(peliculas);
crearSlidesCarrousel();

const header = document.querySelector("header");
const navbar = document.querySelector("nav");

// Permite que el fondo del navbar cambie al realizar un scroll
window.onscroll = function () {
    const top = window.scrollY;
    if (top >= 120) {
        header.classList.add("bg-dark");
        navbar.classList.add("bg-dark");
    } else {
        header.classList.remove("bg-dark");
        navbar.classList.remove("bg-dark");
    }
};
