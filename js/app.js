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

// Permite realizar una busqueda
function ejecutarBusqueda() {
    let confirmar = true;

    while (confirmar) {
        let busqueda = prompt("Ingrese el genero que desea buscar (por ahora solo Accion, Terror o Ciencia Ficcion");

        if (esGeneroValido(busqueda)) {
            alert("Revisa la consola para ver los resultados");
            console.log("Resultados de busqueda: ");
            mostrarResultados(filtrarPorGenero(busqueda));
            confirmar = false;
        } else {
            alert("No es un genero valido");
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

// Clase usuario, por ahora solo posee un nombre y una lista de peliculas
class User {
    constructor(username) {
        this.username = username;
        this.myList = [];
    }
    // Metodo que permite agregar una pelicula a la lista del usuario
    agregarAMiLista(pelicula) {
        this.myList.push(pelicula);
    }
    // Metodo que permite eliminar una pelicula de la lista del usuario
    borrarDeMiLista(pelicula) {
        let indice = this.myList.indexOf(pelicula);
        if (indice != -1) {
            this.myList.splice(indice, 1);
        }
    }
}

// Usuario de prueba
const usuario = new User("Pedro");

// Muestro la lista vacia del usuario
console.log("Lista inicial del usuario " + usuario.username);
console.log(usuario.myList);

// Agrego 3 peliculas a la lista
usuario.agregarAMiLista(pelicula1); // Thor
usuario.agregarAMiLista(pelicula2); // Top Gun
usuario.agregarAMiLista(pelicula3); // Interstellar

// Muestro la lista con elementos
console.log("Lista despues de agregar elementos: ");
console.log(usuario.myList);
console.log(usuario.myList[0]);
console.log(usuario.myList[1]);
console.log(usuario.myList[2]);

// Elimino 2 peliculas
usuario.borrarDeMiLista(pelicula1); // Thor
usuario.borrarDeMiLista(pelicula3); // Interstellar

// Muestro la lista con solo 1 elemento
console.log("Lista despues de eliminar elementos: ");
console.log(usuario.myList);
console.log(usuario.myList[0]);
