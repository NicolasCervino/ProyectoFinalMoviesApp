// Almacena todas las varibles globales

// Contiene a todas las peliculas
const peliculas = [];
peliculas.push(thor, topGun, interstelar, predator, bladeRunner, spiderman);

// Contiene solo las peliculas destacadas que van en el carrousel (solo 3 peliculas)
// IMPORTANTE: el tamaño de este array no puede ser menor a la cantidad de slides
const peliculasDestacadas = [];
peliculasDestacadas.push(spiderman, bladeRunner, predator);

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
