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

// Clase usuario, por ahora solo posee un nombre y una lista de peliculas
class User {
    constructor(username) {
        this.username = username;
        this.myList = [];
        // Guardo la lista al inicializar el usuario en el localStorage
        localStorage.setItem("listaPeliculas", JSON.stringify(this.myList));
    }
    // Metodo que permite agregar una pelicula a la lista del usuario
    agregarAMiLista(pelicula) {
        if (!this.myList.includes(pelicula)) {
            this.myList.push(pelicula);
            // Agrega la pelicula al local storage
            localStorage.setItem("listaPeliculas", JSON.stringify(this.myList));
        }
    }
    // Metodo que permite eliminar una pelicula de la lista del usuario
    borrarDeMiLista(pelicula) {
        let indice = this.myList.indexOf(pelicula);
        if (indice != -1) {
            this.myList.splice(indice, 1);
            // Actualizo la lista en el local storage
            localStorage.setItem("listaPeliculas", JSON.stringify(this.myList));
        }
    }
}

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
        tituloPeliculas.innerText = "Peliculas: ";
    }
}

// Permite crear cards solo para un genero especifico de peliculas
// Esta funcion esta pensada para ser llamada desde el un enlace en el nav
function mostrarPeliculasGenero(genero) {
    containerPeliculas.innerHTML = "";
    crearCards(filtrarPorGenero(genero));
    tituloPeliculas.innerText = genero + ":";
    containerPeliculas.id = genero;
}

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

// Buscador
// Modifica el container de peliculas con aquellas que coincidan con el texto ingresado
function busqueda() {
    containerPeliculas.innerHTML = "";
    tituloPeliculas.innerText = "Resultados de busqueda:";

    const texto = searchInput.value.toLowerCase();
    // Filtro solo las peliculas que coincidan
    const resultado = peliculas.filter((pelicula) => coincide(pelicula, texto));

    if (resultado.length != 0) {
        crearCards(resultado);
        titulo.innerText = "Resultados de busqueda:";
    } else {
        containerPeliculas.innerHTML += `<h1 style="color:white">Ninguna pelicula coincide con la busqueda</h1>`;
    }
}

// Indica si hay alguna coincidencia entre una pelicula y un texto
function coincide(pelicula, texto) {
    // Aplico la funcion map al cast para convertir todos los actores a minusculas
    let actores = pelicula.cast.map((actor) => actor.toLowerCase());
    // Filtro solo aquellos actores que coincidan con el texto
    actores = actores.filter((actor) => actor.startsWith(texto));
    // Devuelvo si el titulo o al menos 1 actor coincide con el texto ingresado
    return pelicula.tittle.toLowerCase().startsWith(texto) || actores.length != 0;
}

// Ejercuta la funcion busqueda() al pulsar la tecla enter en el input
searchInput.addEventListener("keydown", (ev) => {
    if (ev.key == "Enter" && searchInput.value != 0) {
        busqueda();
    }
});

// Carrousel de peliculas

// Permite crear los elementos del carrousel de imagenes de manera dinamica
function crearElementoCarrousel(pelicula, divPadre) {
    const indice = peliculasDestacadas.indexOf(pelicula);
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
                                <button type="button" class="btn" id=btnCarrouselAgregar${indice}><i class="fa-solid fa-plus"></i>Agregar a mi lista</button>
                                <button type="button" class="btn">Mas información</button>
                            </div>
                        </div>`;
    divPadre.innerHTML += codigo;
    agregarFuncionalidadSlide(pelicula, indice);
}

// Permite que funcionen los botones de un slide del carrousel
// Recibe la pelicula a la que corresponde el slide y el indice de dicha pelicula en el array
function agregarFuncionalidadSlide(pelicula, index) {
    const btn = document.querySelector("#btnCarrouselAgregar" + index);
    btn.addEventListener("click", () => {
        user.agregarAMiLista(pelicula);
    });
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

// Permite que el fondo del navbar cambie al realizar un scroll
window.addEventListener("scroll", () => {
    const top = window.scrollY;
    if (top >= 120) {
        header.classList.add("bg-dark");
        navbar.classList.add("bg-dark");
    } else if (!navbarMenu.classList.contains("show")) {
        header.classList.remove("bg-dark");
        navbar.classList.remove("bg-dark");
    }
});

// Permite que el fondo del nav se oscurezca al pulsar el boton en modo mobile
const botonNav = document.querySelector(".navbar-toggler");
botonNav.addEventListener("click", () => {
    const top = window.scrollY;
    if (top < 120) {
        header.classList.toggle("bg-dark");
        navbar.classList.toggle("bg-dark");
    }
});

// Mi Lista

// Permite mostrar las cards de las peliculas que el usuario agrega a su lista
function mostrarMiLista() {
    tituloPeliculas.innerText = "Mi Lista: ";
    // Obtengo la lista del local storage
    crearCards(JSON.parse(localStorage.getItem("listaPeliculas")));
}
