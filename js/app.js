class Movie {
    constructor(tittle, cast, genre, duration) {
        this.tittle = tittle;
        this.cast = cast;
        this.genre = genre;
        this.duration = duration;
    }
}

// Ejemplos para poder testear
const pelicula1 = new Movie("Thor: Love and Thunder", ["Chris Hemsworth", "Christian Bale", "Natalie Portman"], "Accion", "1h 59m");
const pelicula2 = new Movie("Top Gun: Maverick", ["Tom Cruise", "Miles Teller", "Jennifer Connelly"], "Accion", "2h 11m");
const pelicula3 = new Movie("Interestelar", ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"], "Ciencia Ficcion", "2h 49m");

const peliculas = [];
peliculas.push(pelicula1, pelicula2, pelicula3);

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

ejecutarBusqueda();

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

// Usuario de prueba
const usuario = new User("Pedro");

// Muestro la lista vacia del usuario
// console.log("Lista inicial del usuario " + usuario.username);
// console.log(usuario.myList);

// // Agrego 3 peliculas a la lista
// usuario.agregarAMiLista(pelicula1); // Thor
// usuario.agregarAMiLista(pelicula2); // Top Gun
// usuario.agregarAMiLista(pelicula3); // Interstellar

// // Muestro la lista con elementos
// console.log("Lista despues de agregar elementos: ");
// console.log(usuario.myList);
// console.log(usuario.myList[0]);
// console.log(usuario.myList[1]);
// console.log(usuario.myList[2]);

// // Elimino 2 peliculas
// usuario.borrarDeMiLista(pelicula1); // Thor
// usuario.borrarDeMiLista(pelicula3); // Interstellar

// // Muestro la lista con solo 1 elemento
// console.log("Lista despues de eliminar elementos: ");
// console.log(usuario.myList);
// console.log(usuario.myList[0]);
