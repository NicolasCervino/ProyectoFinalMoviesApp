class Movie {
    constructor(tittle, cast, genre, duration, img) {
        this.tittle = tittle;
        this.cast = cast;
        this.genre = genre;
        this.duration = duration;
        this.img = img;
    }
}

// Ejemplos para poder testear
const thor = new Movie(
    "Thor: Love and Thunder",
    ["Chris Hemsworth", "Christian Bale", "Natalie Portman"],
    "Accion",
    "1h 59m",
    "https://www.themoviedb.org/t/p/original/rnayDLXLWF1q8gn2wpQRMwrjtn6.jpg"
);
const topGun = new Movie(
    "Top Gun: Maverick",
    ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    "Accion",
    "2h 11m",
    "https://www.themoviedb.org/t/p/original/jALOpRgEjKLWn5ZD01pGecHdCNt.jpg"
);
const interstelar = new Movie(
    "Interestelar",
    ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    "Ciencia Ficcion",
    "2h 49m",
    "https://www.themoviedb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg"
);

const peliculas = [];
peliculas.push(thor, topGun, interstelar);

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
const container = document.getElementById("peliculas");

// Crea una card para cada pelicula del array
function crearCards(peliculas) {
    container.innerHTML = "";
    for (const pelicula of peliculas) {
        let codigoCard = `  <div class="col-sm-3">
                                <div class="card">
                                    <img src=${pelicula.img} class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${pelicula.tittle}</h5>
                                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    </div>
                                </div>
                            </div>`;
        container.innerHTML += codigoCard;
    }
}
crearCards(peliculas);

// Permite crear cards solo para un genero especifico de peliculas
// Esta funcion esta pensada para ser llamada desde el un enlace
function mostrarPeliculasGenero(genero) {
    container.innerHTML = "";
    crearCards(filtrarPorGenero(genero));
}
