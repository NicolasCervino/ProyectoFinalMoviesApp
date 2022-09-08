// Almacena todas las varibles globales

const interstelar = new Movie(
    "Interestelar",
    ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    "Ciencia ficción",
    "2h 49m",
    "https://www.themoviedb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    "https://www.themoviedb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí.",
    0,
    new Date("2014-11-05"),
    "Christopher Nolan",
    "1TfbWbTBSHo"
);

const bladeRunner = new Movie(
    "Blade Runner 2049",
    ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    "Ciencia ficción",
    "2h 44m",
    "https://www.themoviedb.org/t/p/original/7wlKwjIJoYSlwCClOr91EycJTw5.jpg",
    "https://www.themoviedb.org/t/p/original/aBvDBfqCHs0sCXoun7giyHeClb1.jpg",
    "Tras la rebelión de los replicantes creados por bioingeniería para ser utilizados como mano de obra esclava y la prohibición a Tyrell Corporation de seguir con su fabricación, el empresario Niander Wallace adquirió lo que quedaba de Tyrell Corp. y creó una nueva línea de replicantes mucho más obedientes.",
    1,
    new Date("2017-10-04"),
    "Denis Villeneuve",
    "K8MLo5MO3Hg"
);

// const spiderman = new Movie(
//     "Spider-Man: No Way Home",
//     ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
//     "Acción",
//     "2h 28m",
//     "https://www.themoviedb.org/t/p/original/cgEhsQWCq16yxeoHP15Ay9VdU0s.jpg",
//     "https://www.themoviedb.org/t/p/original/miZFgV81xG324rpUknQX8dtXuBl.jpg",
//     "Tras descubrirse la identidad secreta de Peter Parker como Spider-Man, la vida del joven se vuelve una locura. Peter le pide ayuda al Doctor Strange para recuperar su vida, pero algo sale mal y provoca una fractura en el multiverso.",
//     634649,
//     new Date("2021-12-15"),
//     "Jon Watts",
//     "xnhGsKgt0Sg"
// );

// Contiene a todas las peliculas
let peliculas = [];
peliculas.push(interstelar, bladeRunner);

// Contiene solo las peliculas destacadas que van en el carrousel (solo 3 peliculas)
// IMPORTANTE: el tamaño de este array no puede ser menor a la cantidad de slides
const peliculasDestacadas = [];
//peliculasDestacadas.push(spiderman, bladeRunner, interstelar);

// EL Container con la lista de peliculas del usuario
const containerLista = document.querySelector(".container-lista");

// El container donde se almacenan las busquedas
const containerBusqueda = document.querySelector(".container-busqueda");

// Almacena al usuario actual de la sesion
let user = "";

// Container donde van las cards de peliculas
const containerPeliculas = document.getElementById("peliculas");

// El titulo del div de las peliculas
const tituloPeliculas = document.querySelector(".titulo-peliculas h3");

// Eventos del boton de busqueda
const icon = document.querySelector(".icon");
const search = document.querySelector(".search");
const clear = document.querySelector(".clear");
const searchInput = document.querySelector("#mySearch");

// Carrousel de peliculas
// El div padre de todos los elementos del carrousel
const containerElementos = document.querySelector(".carousel-inner");

// NAVBAR
const header = document.querySelector("header");
const navbar = document.querySelector("nav");

const navbarMenu = document.querySelector("#navbarNavDropdown");

// MODAL
const loginModal = document.querySelector("#loginModal");
const contenidoModal = document.querySelector(".modal-content");
const tituloModal = document.querySelector(".titulo-modal");
const registro = document.querySelector(".subtitulo-registro");

// Modal Peliculas
const contenidoModalPeliculas = document.querySelector(".modal-pelicula");
