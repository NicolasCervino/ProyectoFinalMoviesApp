// Clase usuario, posee un nombre, contraseña y una lista de peliculas
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password; // Probablemente no sea muy seguro guardar la contraseña de esta forma ._.
        this.myList = [];
    }
    // Metodo que permite agregar una pelicula a la lista del usuario
    agregarAMiLista(pelicula) {
        // if (!this.myList.includes(pelicula)) {
        // Si uso includes al recargar la pagina da error porque la pelicula que agrego desde localstorage
        // no es igual a la pelicula que el usuario tenia originalmente

        if (!this.estaEnLaLista(pelicula.tittle)) {
            this.myList.push(pelicula);
            // Agrega la pelicula al local storage
            localStorage.setItem("listaPeliculas", JSON.stringify(this.myList));
            if (tituloPeliculas.innerText == "Mi Lista:") {
                mostrarMiLista();
            }
        }
    }
    // Metodo que permite eliminar una pelicula de la lista del usuario
    borrarDeMiLista(pelicula) {
        this.myList = this.myList.filter((pel) => pel.tittle != pelicula.tittle);
        // Actualizo la lista en el local storage
        localStorage.setItem("listaPeliculas", JSON.stringify(this.myList));
        if (tituloPeliculas.innerText == "Mi Lista:") {
            mostrarMiLista();
        }
    }

    // Permite saber si el usuario tiene una pelicula en su lista con dicho titulo
    estaEnLaLista(tituloPelicula) {
        return this.myList.find((pel) => pel.tittle == tituloPelicula) != undefined;
    }
}
