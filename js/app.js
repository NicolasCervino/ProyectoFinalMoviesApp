class Movie {
    constructor(tittle, cast, genre, duration, img, img2) {
        this.tittle = tittle;
        this.cast = cast;
        this.genre = genre;
        this.duration = duration;
        this.imgDesktop = img;
        this.imgMobile = img2;
    }
}

// Ejemplos para poder testear
const thor = new Movie(
    "Thor: Love and Thunder",
    ["Chris Hemsworth", "Christian Bale", "Natalie Portman"],
    "Accion",
    "1h 59m",
    "https://www.themoviedb.org/t/p/original/rnayDLXLWF1q8gn2wpQRMwrjtn6.jpg",
    "https://www.themoviedb.org/t/p/original/kf9Bib75eduxt0QiVJO4pawfd9p.jpg"
);
const topGun = new Movie(
    "Top Gun: Maverick",
    ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    "Accion",
    "2h 11m",
    "https://www.themoviedb.org/t/p/original/jALOpRgEjKLWn5ZD01pGecHdCNt.jpg",
    "https://www.themoviedb.org/t/p/original/AlWpEpQq0RgZIXVHAHZtFhEvRgd.jpg"
);
const interstelar = new Movie(
    "Interestelar",
    ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    "Ciencia Ficcion",
    "2h 49m",
    "https://www.themoviedb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    "https://www.themoviedb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
);

const peliculas = [];
peliculas.push(thor, topGun, interstelar, thor, thor, thor);

// Permite ejecutar una busqueda
function ejecutarBusqueda() {
    console.log("Todas las peliculas: ");
    console.table(peliculas); // Esto es para ayudar a visualizar mejor el resultado

    let confirmar = true;

    while (confirmar) {
        let tipoDeBusqueda = parseInt(prompt("Que tipo de busqueda desea realizar? 1. Buscar por Genero 2. Buscar por Actor"));
        switch (tipoDeBusqueda) {
            case 1:
                let genero = prompt("Ingrese el genero que desea buscar (por ahora solo Accion, Terror o Ciencia Ficcion");
                alert("Revisa la consola para ver los resultados");
                mostrarResultados(filtrarPorGenero(genero));
                confirmar = false;
                break;
            case 2:
                let actor = prompt("Ingrese el nombre de un actor o actiz para ver sus peliculas");
                alert("Revisa la consola para ver los resultados");
                mostrarResultados(filtrarPorActor(actor));
                confirmar = false;
                break;
            default:
                alert("El tipo de busqueda es invalido, debe ingresar un numero para seleccionar una opcion");
                break;
        }
    }
}

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

// Se encarga de mostrar correctamente las peliculas de un resultado de busqueda
function mostrarResultados(resultado) {
    if (resultado.length == 0) {
        console.log("Ninguna pelicula coincide con ese criterio de busqueda");
    } else {
        console.log("Resultados de busqueda");
        resultado = resultado.map((movie) => {
            return {
                Titulo: movie.tittle,
                Genero: movie.genre,
                Reparto: movie.cast,
            };
        });
        console.table(resultado);
    }
}

//ejecutarBusqueda();

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
