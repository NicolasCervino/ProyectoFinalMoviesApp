// Clase usuario, posee un nombre, contraseña y una lista de peliculas
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password; // Probablemente no sea muy seguro guardar la contraseña de esta forma ._.
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
