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
        tituloPeliculas.innerText = "Peliculas: ";
    }
}

// Permite crear cards solo para un genero especifico de peliculas
// Esta funcion esta pensada para ser llamada desde el un enlace en el nav
function mostrarPeliculasGenero(genero) {
    containerPeliculas.innerHTML = "";
    crearCards(filtrarPorGenero(genero));
    tituloPeliculas.innerText = genero + ":";
    containerPeliculas.id = genero;
}

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

// Buscador
// Modifica el container de peliculas con aquellas que coincidan con el texto ingresado
function busqueda() {
    containerPeliculas.innerHTML = "";
    tituloPeliculas.innerText = "Resultados de busqueda:";

    const texto = searchInput.value.toLowerCase();
    // Filtro solo las peliculas que coincidan
    const resultado = peliculas.filter((pelicula) => coincide(pelicula, texto));

    if (resultado.length != 0) {
        crearCards(resultado);
        titulo.innerText = "Resultados de busqueda:";
    } else {
        containerPeliculas.innerHTML += `<h1 style="color:white">Ninguna pelicula coincide con la busqueda</h1>`;
    }
}

// Indica si hay alguna coincidencia entre una pelicula y un texto
function coincide(pelicula, texto) {
    // Aplico la funcion map al cast para convertir todos los actores a minusculas
    let actores = pelicula.cast.map((actor) => actor.toLowerCase());
    // Filtro solo aquellos actores que coincidan con el texto
    actores = actores.filter((actor) => actor.startsWith(texto));
    // Devuelvo si el titulo o al menos 1 actor coincide con el texto ingresado
    return pelicula.tittle.toLowerCase().startsWith(texto) || actores.length != 0;
}

// Ejercuta la funcion busqueda() al pulsar la tecla enter en el input
searchInput.addEventListener("keydown", (ev) => {
    if (ev.key == "Enter" && searchInput.value != 0) {
        busqueda();
    }
});

// Carrousel de peliculas

// Permite crear los elementos del carrousel de imagenes de manera dinamica
function crearElementoCarrousel(pelicula, divPadre) {
    const indice = peliculasDestacadas.indexOf(pelicula);
    const codigo = `    <div class="img-overlay">
                            <!-- Imagen Principal -->
                            <img src=${pelicula.imgDesktop} class="d-none d-sm-block w-100" alt="..." />
                            <!-- Imagen Mobile -->
                            <img src=${pelicula.imgMobile} class="d-block d-sm-none w-100"/>
                        </div>
                        <div class="carousel-caption container">
                            <div class="row w-50">
                                <h2 class="text-start titulo-carrousel">${pelicula.tittle}</h2>
                                <p class="text-start subtitulo-carrousel">
                                    ${pelicula.description}
                                </p>
                            </div>
                            <!-- Botones Carrousel -->
                            <div class="btns">
                                <button type="button" class="btn" id=btnCarrouselAgregar${indice}><i class="fa-solid fa-plus"></i>Agregar a mi lista</button>
                                <button type="button" class="btn">Mas información</button>
                            </div>
                        </div>`;
    divPadre.innerHTML += codigo;
    agregarFuncionalidadSlide(pelicula, indice);
}

// Permite que funcionen los botones de un slide del carrousel
// Recibe la pelicula a la que corresponde el slide y el indice de dicha pelicula en el array
function agregarFuncionalidadSlide(pelicula, index) {
    const btn = document.querySelector("#btnCarrouselAgregar" + index);
    btn.addEventListener("click", () => {
        if (JSON.parse(localStorage.getItem("usuario")) != null) {
            user.agregarAMiLista(pelicula);
            if (tituloPeliculas.innerText == "Mi Lista:") {
                mostrarMiLista();
            }
        } else {
            // alert("Debe iniciar sesion antes de poder agregar peliculas");
            // Violation: "click" handler took 951ms
        }
    });
}

// Permite crear las slides para el carrousel
function crearSlidesCarrousel() {
    // Una coleccion html con todos los elementos hijos del container
    const hijos = containerElementos.children;

    for (let i = 0; i < hijos.length; i++) {
        crearElementoCarrousel(peliculasDestacadas[i], hijos[i]);
    }
}

crearCards(peliculas);
crearSlidesCarrousel();

// Permite que el fondo del navbar cambie al realizar un scroll
window.addEventListener("scroll", () => {
    const top = window.scrollY;
    if (top >= 120) {
        header.classList.add("bg-dark");
        navbar.classList.add("bg-dark");
    } else if (!navbarMenu.classList.contains("show")) {
        header.classList.remove("bg-dark");
        navbar.classList.remove("bg-dark");
    }
});

// Permite que el fondo del nav se oscurezca al pulsar el boton en modo mobile
const botonNav = document.querySelector(".navbar-toggler");
botonNav.addEventListener("click", () => {
    const top = window.scrollY;
    if (top < 120) {
        header.classList.toggle("bg-dark");
        navbar.classList.toggle("bg-dark");
    }
});

// Mi Lista

// Permite mostrar las cards de las peliculas que el usuario agrega a su lista
function mostrarMiLista() {
    // Obtengo la lista del local storage y compruebo que exista
    tituloPeliculas.innerText = "Mi Lista: ";
    if (JSON.parse(localStorage.getItem("usuario")) != null) {
        // Operador ternario
        user.myList.length > 0
            ? crearCards(user.myList)
            : (containerPeliculas.innerHTML = `<h1 style="color:white">La lista esta vacia</h1>`);
        tituloPeliculas.innerText = "Mi Lista: ";
    } else {
        containerPeliculas.innerHTML = `<h1 style="color:white">Debe iniciar sesion para ver su lista de peliculas</h1>`;
    }
}

// Usuarios

// Modifica el modal de login para mostrar el panel de usuario
function crearModalUsuario() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const codigo = `  <div class="container p-4">
                            <div class="row">
                                <div class="col-12">
                                    <h1 class="titulo-modal" style="font-family: Bebas, cursive;">Usuario: ${usuario.username}</h1>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 d-flex justify-content-center py-4">
                                    <i class="fas fa-user-circle" style="font-size:8.5rem;"></i>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <button class="btn btn-danger w-100 btn-cerrarSesion" id="cerrarSesion" data-bs-dismiss="modal">Cerrar Sesión</button>
                                </div>
                            </div>
                        </div>`;
    contenidoModal.innerHTML = codigo;
    const botonCerrarSesion = document.querySelector(".btn-cerrarSesion");
    agregarFuncionalidadModal(botonCerrarSesion);
}

// Permite que funcione el boton de cerrar sesion
function agregarFuncionalidadModal(boton) {
    boton.addEventListener("click", () => {
        user = ""; // Elimino al usuario actual
        localStorage.setItem("listaPeliculas", JSON.stringify([])); // Elimino la lista de peliculas del local storage
        localStorage.removeItem("usuario");
        crearModalLogin();
        crearCards(peliculas);
    });
}

function crearModalLogin() {
    const codigo = `<div class="container p-4">
                        <!-- Texto -->
                        <div class="row">
                            <div class="col-12">
                                <h1 class="titulo-modal" style="font-family: Bebas, cursive;">Iniciar Sesion</h1>
                                <p>Ingrese su usuario y contraseña!</p>
                            </div>
                        </div>

                        <form class="row" id="loginForm" action="">
                            <!-- Input Username -->
                            <div class="col-12">
                                <div class="form-outline">
                                    <input type="text" id="inputUsername" class="form-control form-control-sm"
                                        required />
                                    <label class="form-label" for="inputUsername">Username</label>
                                </div>
                            </div>
                            <!-- Input Password -->
                            <div class="col-12">
                                <div class="form-outline">
                                    <input type="password" id="inputPassword" class="form-control form-control-sm"
                                        required />
                                    <label class="form-label" for="inputPassword">Password</label>
                                </div>
                            </div>
                            <!-- LOGIN BUTTON -->
                            <div class="col-12">
                                <button type="submit" class="btn btn-danger btn-sm px-4" data-bs-dismiss=""
                                    id="loginSubmit">Login</button>
                            </div>
                        </form>
                        <!-- SIGN UP -->
                        <div class="col-12">
                            <p class="subtitulo-registro mb-0">No tienes una cuenta? <a href="#!"
                                    class="text-white-50 fw-bold">Regístrate</a>
                            </p>
                        </div>
                    </div>`;
    contenidoModal.innerHTML = codigo;
    const formularioLogin = document.querySelector("#loginForm");

    agregarFuncionalidadModalLogin(formularioLogin);
}
// Permite iniciar sesion
function agregarFuncionalidadModalLogin(formulario) {
    const inputLogin = document.querySelector("#inputUsername");
    const inputPassword = document.querySelector("#inputPassword");
    const botonSubmit = document.querySelector("#loginSubmit");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        user = new User(inputLogin.value, inputPassword.value);
        // Almaceno al usuario en el local storage
        localStorage.setItem("usuario", JSON.stringify(user));
        crearModalUsuario();
        // if (tituloPeliculas.innerText == "Mi lista:") {
        //     mostrarMiLista();
        // }
    });
    formulario.addEventListener("change", () => {
        // Permite que el boton de submit cierre el modal
        if (inputLogin.value != "" && inputPassword.value != "") {
            botonSubmit.dataset.bsDismiss = "modal";
        }
    });
}

window.addEventListener("load", () => {
    if (JSON.parse(localStorage.getItem("usuario")) == null) {
        crearModalLogin();
    } else {
        // AL recargar la pagina necesito volver a crear al usuario con los datos guardados
        const usuarioAlmacenado = JSON.parse(localStorage.getItem("usuario"));
        const listaAlmacenada = JSON.parse(localStorage.getItem("listaPeliculas"));

        user = new User(usuarioAlmacenado.username, usuarioAlmacenado.password);
        user.myList = listaAlmacenada || []; // Uso la lista que esta guardada o una vacia en caso de que no exista
        crearModalUsuario();
    }
});
