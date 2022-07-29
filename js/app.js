class Movie {
    constructor(tittle, cast, genre, duration) {
        this.tittle = tittle;
        this.cast = cast;
        this.genre = genre;
        this.duration = duration;
    }
}

// Ejemplos para poder testear
const pelicula1 = new Movie("Thor: Love and Thunder", [], "Accion", "1h 59m");
const pelicula2 = new Movie("Top Gun: Maverick", [], "Accion", "2h 11m");
const pelicula3 = new Movie("Interestelar", [], "Ciencia Ficcion", "2h 49m");

const peliculas = [];
peliculas.push(pelicula1, pelicula2, pelicula3);

console.log("Todas las peliculas: ");
// Obtengo el nombre de todas las peliculas del array
for (let i = 0; i < peliculas.length; i++) {
    console.log(peliculas[i].tittle);
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

let busqueda = prompt("Ingrese el genero que desea buscar (por ahora solo Accion, Terror o Ciencia Ficcion");

if (esGeneroValido(busqueda)) {
    alert("Revisa la consola para ver los resultados");
    console.log("Resultados de busqueda: ");
    mostrarResultados(filtrarPorGenero(busqueda));
} else {
    alert("No es un genero valido");
}

// Indica si el genero que ingreso el usuario es alguno de los generos validos
function esGeneroValido(busqueda) {
    return busqueda === "Terror" || busqueda === "Accion" || busqueda === "Ciencia Ficcion";
}

// Se encarga de mostrar solo el titulo de las peliculas de un resultado de busqueda
function mostrarResultados(resultado) {
    if (resultado.length == 0) {
        console.log("No hay ninguna pelicula de ese genero");
    } else
        for (let i = 0; i < resultado.length; i++) {
            console.log(resultado[i].tittle);
        }
}
