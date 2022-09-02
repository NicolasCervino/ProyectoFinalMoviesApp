// Clase usuario, posee un nombre, contraseña y una lista de peliculas
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password; // Probablemente no sea muy seguro guardar la contraseña de esta forma ._.
        this.myList = [];
    }
    // Metodo que permite agregar una pelicula a la lista del usuario
    agregarAMiLista(pelicula) {
        if (!this.estaEnLaLista(pelicula)) {
            this.myList.push(pelicula);
            localStorage.setItem("listaPeliculas", JSON.stringify(this.myList));
            actualizarSlide(pelicula, "agregar");
            actualizarCard(pelicula, "agregar");
            toastPeliculaAgregada(pelicula);
            if (!containerLista.classList.contains("d-none")) {
                crearVentanaMiLista();
            }
        }
    }
    // Metodo que permite eliminar una pelicula de la lista del usuario
    borrarDeMiLista(pelicula) {
        if (this.estaEnLaLista(pelicula) && this.myList.length > 0) {
            this.myList = this.myList.filter((pel) => pel.id != pelicula.id);
            // Actualizo la lista en el local storage
            localStorage.setItem("listaPeliculas", JSON.stringify(this.myList));
            actualizarSlide(pelicula, "quitar");
            actualizarCard(pelicula, "quitar");
            toastPeliculaQuitada(pelicula);
            if (!containerLista.classList.contains("d-none")) {
                crearVentanaMiLista();
            }
        }
    }

    // Permite saber si el usuario tiene una pelicula en su lista con dicho id
    estaEnLaLista(pelicula) {
        return this.myList.find((pel) => pel.id == pelicula.id) != undefined;
    }
}
