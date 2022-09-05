// Funcion para filtrar peliculas por genero
function filtrarPorGenero(genero) {
    let resultado = [];
    for (let i = 0; i < peliculas.length; i++) {
        // Operador AND
        peliculas[i].genre == genero && resultado.push(peliculas[i]);
    }
    return resultado;
}

// Devuelve el codigo para una card de una pelicula
function crearCard(pelicula) {
    const indice = peliculas.indexOf(pelicula);
    let codigoCard = `  <div class="col-6 col-sm-2 p-2">
                            <div class="movie">
                                <div class="card cardPelicula cardPelicula${indice} position-relative" id=${pelicula.id}>
                                    <img src=${pelicula.imgMobile} class="card-img-top" alt="..." draggable="false">
                                    <button class="btn ${validarPeliculaBoton(
                                        pelicula
                                    )} d-none position-absolute top-50 start-50 translate-middle rounded-circle" style="background: #141619cf;" id="${
        pelicula.id
    }">
                                        ${validarPeliculaIcono(pelicula)}
                                        
                                    </button>
                                </div>
                                <h6 style='font-family: "Poppins", sans-serif;' class="text-white">${pelicula.tittle}</h6>
                            </div>
                        </div>`;
    return codigoCard;
}

// Indica si el usuario existe y posee dicha pelicula en su lista
function validarUsuarioYPelicula(pelicula) {
    return user != "" && user.estaEnLaLista(pelicula);
}

// Modifica la clase del boton dependiendo de si la pelicula esta o no en la lista del usuario
function validarPeliculaBoton(pelicula) {
    // Operador Ternario
    return validarUsuarioYPelicula(pelicula) ? "btn-card-quitar" : "btn-card-agregar";
}

// Crea un icono para el boton dependiendo de si la pelicula esta o no en la lista del usuario
function validarPeliculaIcono(pelicula) {
    return validarUsuarioYPelicula(pelicula)
        ? `<i class="fa-solid fa-minus" style="color: #fff;"></i>`
        : `<i class="fa-solid fa-plus"  style="color: #fff;"></i>`;
}

// Crea una card para cada pelicula del array en el container dado
function crearCards(peliculas, container) {
    for (const pelicula of peliculas) {
        container.innerHTML += crearCard(pelicula);
    }
    // agregarFuncionalidadCards(); Si llamo a crear cards mas de 1 vez le agrego el evento varias veces
}

// Agrega los eventos a los botones de las cards para agregar o quitar peliculas
function agregarFuncionalidadCards() {
    // Seleciono todas las cards
    let cards = document.querySelectorAll(".cardPelicula");

    // Si el user es vacio solo devuelvo un toast
    if (user != "") {
        // Recorro las cards
        for (let i = 0; i < cards.length; i++) {
            // Seleciono el boton de cada card
            let botonCard = cards[i].children[1];
            botonCard.addEventListener("click", (ev) => {
                // Busco la pelicula a la que corresponde la card
                // EL ID del boton es igual al ID de la pelicula
                let idBtn = ev.currentTarget.id;
                let pelicula = peliculas.find((pel) => pel.id == idBtn);

                if (!user.estaEnLaLista(pelicula)) {
                    user.agregarAMiLista(pelicula);
                    modificarBotonAgregarCard(botonCard);
                } else {
                    user.borrarDeMiLista(pelicula);
                    modificarBotonEliminarCard(botonCard);
                }
            });
        }
    } else {
        for (let card of cards) {
            card.addEventListener("click", toastIniciarSesion);
        }
    }
}

// Modifica el icono del boton agregar
function modificarBotonAgregarCard(boton) {
    boton.classList.replace("btn-card-agregar", "btn-card-quitar");
    boton.children[0].classList.replace("fa-plus", "fa-minus");
}

// Modifica el icono del boton eliminar
function modificarBotonEliminarCard(boton) {
    boton.classList.replace("btn-card-quitar", "btn-card-agregar");
    boton.children[0].classList.replace("fa-minus", "fa-plus");
}

// Modifica la card de una pelicula, se ejecuta cuando el usuario agrega o quita una pelicula de la lista
function actualizarCard(pelicula, accion) {
    let idPelicula = pelicula.id;

    // Busco todas las cards que coincidan con el id de la pelicula
    const cards = document.querySelectorAll(`.cardPelicula${idPelicula}`);

    // Puede haber mas de una card para la misma pelicula
    for (let i = 0; i < cards.length; i++) {
        switch (accion) {
            case "agregar":
                modificarBotonAgregarCard(cards[i].children[1]);
                break;

            case "quitar":
                modificarBotonEliminarCard(cards[i].children[1]);
                break;
        }
    }

    // Swiper-slides de una pelicula
    const swipes = document.querySelectorAll(`.swipe-card${idPelicula}`);

    // Puede haber mas de un swiper-slide para la misma pelicula
    for (let i = 0; i < swipes.length; i++) {
        switch (accion) {
            case "agregar":
                modificarBotonAgregarCard(swipes[i].nextElementSibling);
                break;

            case "quitar":
                modificarBotonEliminarCard(swipes[i].nextElementSibling);
                break;
        }
    }
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
    // Realizo la busqueda
    const texto = searchInput.value.toLowerCase();
    const resultado = peliculas.filter((pelicula) => coincide(pelicula, texto));

    if (resultado.length != 0) {
        containerBusqueda.innerHTML = "";
        containerBusqueda.innerHTML += `<h1 style="color:white">Resultados de busqueda: </h1>`;
        crearCards(resultado, containerBusqueda);
        agregarFuncionalidadCards();
    } else {
        containerBusqueda.innerHTML = "";
        containerBusqueda.innerHTML += `<h1 style="color:white">Ninguna pelicula coincide con la busqueda</h1>`;
    }
    mostrarResultadosDeBusqueda();
}

// Muestra el container donde se guardan las cards con las busquedas
function mostrarResultadosDeBusqueda() {
    if (containerBusqueda.classList.contains("d-none")) {
        containerBusqueda.classList.replace("d-none", "d-flex");
    }
    let containerPrincipal = document.querySelector(".container-principal");
    containerPrincipal.classList.add("d-none");
    containerLista.classList.add("d-none");
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
                            <div class="btns btns-${peliculasDestacadas.indexOf(pelicula)}">
                                ${validarBotonSlide(pelicula)}
                                <button type="button" class="btn"><span>Mas información</span></button>
                            </div>
                        </div>`;
    divPadre.innerHTML += codigo;
}

// Crea el boton de un slide dependiendo de si la pelicula esta o no en la lista del usuario
function validarBotonSlide(pelicula) {
    // OPERADOR TERNARIO
    return validarUsuarioYPelicula(pelicula)
        ? `<button type="button" class="btn btn-slide btn-slide-remove">
                    <i class="fa-solid fa-check"></i>
                    <span> En mi lista</span>
                </button>`
        : `<button type="button" class="btn btn-slide btn-slide-add">
                    <i class="fa-solid fa-plus"></i>
                    <span>Agregar a mi lista</span>
                </button>`;
}

// Permite crear las slides para el carrousel
function crearSlidesCarrousel() {
    // Una coleccion html con todos los elementos hijos del container
    const hijos = containerElementos.children;

    for (let i = 0; i < hijos.length; i++) {
        hijos[i].innerHTML = "";
        crearElementoCarrousel(peliculasDestacadas[i], hijos[i]);
    }
    agregarFuncionalidadSlides();
}

// Hace funcionales los botones del carrousel para todas las slides
function agregarFuncionalidadSlides() {
    const botones = document.querySelectorAll(".btns .btn-slide");
    if (user != "") {
        for (let i = 0; i < botones.length; i++) {
            // Evento click
            botones[i].addEventListener("click", () => {
                // OPERADOR TERNARIO
                botones[i].classList.contains("btn-slide-add")
                    ? user.agregarAMiLista(peliculasDestacadas[i])
                    : user.borrarDeMiLista(peliculasDestacadas[i]);
            });

            // Eventos hover
            botones[i].addEventListener("mouseenter", () => {
                if (botones[i].classList.contains("btn-slide-remove")) {
                    botones[i].children[0].classList.replace("fa-check", "fa-minus");
                    botones[i].children[1].innerText = " Eliminar de mi lista";
                }
            });

            botones[i].addEventListener("mouseleave", () => {
                if (botones[i].classList.contains("btn-slide-remove")) {
                    botones[i].children[0].classList.replace("fa-minus", "fa-check");
                    botones[i].children[1].innerText = " En mi lista";
                }
            });
        }
    } else {
        for (let i = 0; i < botones.length; i++) {
            botones[i].addEventListener("click", toastIniciarSesion);
        }
    }
}

// Cambia el aspecto del boton de un slide
// Se ejecuta siempre que el usuario agregue o quite una pelicula a la lista
function actualizarSlide(pelicula, accion) {
    //let indice = peliculasDestacadas.indexOf(pelicula); // Esto no siempre funciona al recargar la pagina
    let indice = peliculasDestacadas.indexOf(peliculasDestacadas.find((pel) => pel.tittle == pelicula.tittle));
    const botones = document.querySelector(`.btns-${indice}`);
    if (botones && indice != -1) {
        switch (accion) {
            case "agregar":
                botones.firstElementChild.children[0].classList.replace("fa-plus", "fa-check");
                botones.firstElementChild.children[1].innerText = "En mi lista";
                botones.firstElementChild.classList.replace("btn-slide-add", "btn-slide-remove");
                break;

            case "quitar":
                // Esta linea tira ERROR al agregar una pelicula, actualizar la pagina y luego intentar borrarla
                // desde la seccion de mi lista. Si se hace desde la pagina principal no da problemas
                // Cannot read properties of null (reading 'firstElementChild')
                // SE ARREGLO CAMBIANDO EL INDICE
                botones.firstElementChild.children[0].classList.replace("fa-minus", "fa-plus");
                botones.firstElementChild.children[1].innerText = "Agregar a mi lista";
                botones.firstElementChild.classList.replace("btn-slide-remove", "btn-slide-add");
                break;
        }
    }
}

// Crea la lista en local storage en caso de que no exista,
// sirve para cuando se abre la pagina en un navegador por primera vez
localStorage.getItem("listaPeliculas") || localStorage.setItem("listaPeliculas", JSON.stringify([]));

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
const botonMiListaNav = document.querySelector(".nav-link-MiLista");

botonMiListaNav.addEventListener("click", () => {
    if (user) {
        if (!containerLista.classList.contains("d-none")) {
            mostrarMiLista();
        } else {
            crearVentanaMiLista();
            mostrarMiLista();
        }
    } else {
        toastIniciarSesion();
    }
});

// Permite mostrar las cards de las peliculas que el usuario agrega a su lista
function mostrarMiLista() {
    let containerPrincipal = document.querySelector(".container-principal");
    // Muestro el container con la lista
    if (containerLista.classList.contains("d-none")) {
        containerLista.classList.replace("d-none", "d-flex");
    }
    // Oculto el resto
    if (!containerPrincipal.classList.contains("d-none")) {
        containerPrincipal.classList.add("d-none");
    }
    if (!containerBusqueda.classList.contains("d-none")) {
        containerBusqueda.classList.add("d-none");
    }
}

// Permite crear la ventana para mostrar la lista del usuario
function crearVentanaMiLista() {
    let containerPrincipal = document.querySelector(".container-principal");
    if (user) {
        if (user.myList.length == 0) {
            containerLista.innerHTML = `<h1 style="color:white">La lista esta vacia</h1>`;
        } else {
            containerLista.innerHTML = "";
            containerLista.innerHTML = `<h1 style="color:white">Mi Lista:`;

            crearCards(user.myList, containerLista);
            agregarFuncionalidadCards();
            containerLista.classList.replace("d-none", "d-flex");
            containerPrincipal.classList.add("d-none");
        }
    } else {
        toastIniciarSesion();
    }
}

// Usuarios

// Modifica el modal de login para mostrar el panel de usuario
function crearModalUsuario() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const codigo = `  <div class="container p-4">
                            <div class="row">
                                <div class="col-12">
                                    <h1 class="titulo-modal" style='font-family: "Bebas Neue", cursive;'>Usuario: ${usuario.username}</h1>
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
        location.reload();
    });
}

function crearModalLogin() {
    const codigo = `<div class="container p-4">
                        <!-- Texto -->
                        <div class="row">
                            <div class="col-12">
                                <h1 class="titulo-modal" style='font-family: "Bebas Neue", cursive;'>Iniciar Sesion</h1>
                                <p>Ingrese su usuario y contraseña!</p>
                            </div>
                        </div>

                        <form class="row" id="loginForm" action="">
                            <!-- Input Username -->
                            <div class="col-12">
                                <div class="form-outline">
                                    <input type="text" id="inputUsername" autocomplete="off" class="form-control form-control-sm"
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
        location.reload();
    });
    formulario.addEventListener("change", () => {
        // Permite que el boton de submit cierre el modal
        if (inputLogin.value != "" && inputPassword.value != "") {
            botonSubmit.dataset.bsDismiss = "modal";
        }
    });
}

// FUNCION FLECHA
// Crea un toast para cuando se intenta agregar una pelicula sin haber iniciado sesion
const toastIniciarSesion = () => {
    Swal.fire({
        toast: true,
        position: "top-end",
        text: "Debe Iniciar Sesion para poder agregar peliculas",
        showConfirmButton: false,
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
    });
};

// Crea un toast para cuando se agrega una pelicula a la lista
const toastPeliculaAgregada = (pelicula) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        text: `Se agrego ${pelicula.tittle} a la lista`,
        showConfirmButton: false,
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
    });
};

// Crea un toast para cuando se elimina una pelicula de la lista
const toastPeliculaQuitada = (pelicula) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        text: `Se elimino ${pelicula.tittle} de la lista`,
        showConfirmButton: false,
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
    });
};

// SWIPER
const swiperPeliculas = new Swiper(".swiperPeliculas", {
    // Optional parameters
    spaceBetween: 10,
    slidesPerView: 6,
    loop: false,
    freemode: true,
    loopAdditionalSlides: 1,
    speed: 500,
    mousewheelControl: true,
    mousewheel: {
        invert: false,
    },

    // Navigation arrows
    navigation: {
        nextEl: ".btn-next-swiperPeliculas",
        prevEl: ".btn-prev-swiperPeliculas",
    },
    allowSlidePrev: true,
    allowSlideNext: true,

    // Media Queries
    breakpoints: {
        "@0.00": {
            slidesPerView: 2,
        },
        "@0.75": {
            slidesPerView: 2,
        },
        "@1.00": {
            slidesPerView: 4,
        },
        "@1.50": {
            slidesPerView: 5,
        },
    },
});

// Devuelve el codigo HTML para crear una card de una pelicula dentro de un Slide de Swiper
const crearSlideSwiper = (pelicula, img) => {
    let image = "";
    switch (img) {
        case "imgDesktop":
            image = pelicula.imgDesktop;
            break;
        case "imgMobile":
            image = pelicula.imgMobile;
            break;
    }
    let codigoSwipe = ` <div class="swiper-slide position relative">
                                <img src=${image} class="mw-100 h-auto overflow-hidden swipe-card${
        pelicula.id
    }" alt="..." draggable="false">
                                <button class="btn ${validarPeliculaBoton(
                                    pelicula
                                )} d-none position-absolute top-50 start-50 translate-middle rounded-circle" style="background: #141619cf;">
                                    ${validarPeliculaIcono(pelicula)}
                                </button>
                            </div>
                            <h6 style='font-family: "Poppins", sans-serif;' class="text-white">${pelicula.tittle}</h6>`;
    return codigoSwipe;
};

// Permite crear slides para un array de peliculas en el carrousel dado
const crearSlidesSwiper = (peliculas, carrousel, img) => {
    for (let i = 0; i < peliculas.length; i++) {
        slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = crearSlideSwiper(peliculas[i], img);
        carrousel.appendSlide(slide);
    }
    agregarFuncionalidadSlideSwiper();
};

const agregarFuncionalidadSlideSwiper = () => {
    let botones = document.querySelectorAll(".swiper-slide .btn");
    if (user != "") {
        for (let i = 0; i < botones.length; i++) {
            botones[i].addEventListener("click", () => {
                if (botones[i].classList.contains("btn-card-agregar")) {
                    user.agregarAMiLista(peliculas[i]);
                    modificarBotonAgregarCard(botones[i]);
                } else {
                    user.borrarDeMiLista(peliculas[i]);
                    modificarBotonEliminarCard(botones[i]);
                }
            });
        }
    } else {
        for (let i = 0; i < botones.length; i++) {
            botones[i].addEventListener("click", toastIniciarSesion);
        }
    }
};

// Permite que la ventana principal sea visible
function mostrarVentanaPrincipal() {
    let containerPrincipal = document.querySelector(".container-principal");
    if (containerPrincipal.classList.contains("d-none")) {
        containerPrincipal.classList.remove("d-none");
    }
    containerLista.classList.replace("d-flex", "d-none");
    containerBusqueda.classList.replace("d-flex", "d-none");
}

// Crea la venta principal con el slider de ultimos estrenos y las secciones por genero
function crearVentanaPrincipal() {
    crearSlidesSwiper(peliculas, swiperPeliculas, "imgMobile");

    document.getElementById("Accion").innerHTML = "";
    document.getElementById("CienciaFiccion").innerHTML = "";
    document.getElementById("Terror").innerHTML = "";

    crearCards(filtrarPorGenero("Acción"), document.getElementById("Accion"));
    crearCards(filtrarPorGenero("Ciencia ficción"), document.getElementById("CienciaFiccion"));
    crearCards(filtrarPorGenero("Terror"), document.getElementById("Terror"));
    agregarFuncionalidadCards();
}

window.addEventListener("load", () => {
    obtenerPeliculasPopulares();
    if (JSON.parse(localStorage.getItem("usuario")) == null) {
        crearModalLogin();
    } else {
        // AL recargar la pagina necesito volver a crear al usuario con los datos guardados
        const usuarioAlmacenado = JSON.parse(localStorage.getItem("usuario"));
        const listaAlmacenada = JSON.parse(localStorage.getItem("listaPeliculas")) || [];

        user = new User(usuarioAlmacenado.username, usuarioAlmacenado.password);
        user.myList = crearListaPeliculas(listaAlmacenada);
        crearModalUsuario();
    }
    crearSlidesCarrousel();
    //crearVentanaPrincipal();
    mostrarVentanaPrincipal();
});
// Permite crear una lista de objetos Pelicula a partir de la lista guardada en local storage
function crearListaPeliculas(lista) {
    let nuevaLista = [];
    if (lista.length > 0) {
        for (let i = 0; i < lista.length; i++) {
            let elem = lista[i];
            let movie = new Movie(elem.tittle, elem.cast, elem.genre, elem.duration, elem.imgDesktop, elem.imgMobile, elem.description);
            movie.id = elem.id;
            nuevaLista.push(movie);
        }
    }
    return nuevaLista;
}

// Realiza una peticion a la API de TheMovieDB para obtener datos sobre las peliculas populares
const obtenerPeliculasPopulares = async () => {
    try {
        // Obtiene las peliculas populares de la base de datos
        const respuestaPopulares = await fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=f3b242b5857fe6135b2f4c0420e0ba0b&language=es-ARG"
        );
        // Si la respuesta es correcta
        if (respuestaPopulares.status === 200) {
            let ids = [];
            const datos = await respuestaPopulares.json();
            datos.results.forEach((pelicula) => {
                ids.push(pelicula.id);
            });
            // Nececito otra peticion para obtener datos extras de cada pelicula
            return obtenerInfoPeliculas(ids);
        }
        // Posibles Errores
        else if (respuesta.status === 401) {
            console.log("La API KEY es invalida");
        } else if (respuesta.status === 404) {
            console.log("La pelicula no existe");
        } else {
            console.log("Hubo un error inesperado");
        }
    } catch (error) {
        console.log(error);
    }
};

// Recibe un array con ids de peliculas de las cuales necesito obtener informacion extra
const obtenerInfoPeliculas = async (idsPeliculasPopulares) => {
    try {
        console.log(idsPeliculasPopulares);
        const infoPeliculas = [];
        // Necesito hacer una peticion para cada id del array
        for (const id of idsPeliculasPopulares) {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=f3b242b5857fe6135b2f4c0420e0ba0b&language=es-ARG&append_to_response=credits`
            );
            const json = await res.json();
            const pelicula = construirPelicula(json);
            peliculas.push(pelicula);
        }
        crearVentanaPrincipal();
        return peliculas;
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
};

// Construye un objeto pelicula a partir de los datos json obtenidos de la API
function construirPelicula(json) {
    let imgDesktop = `https://image.tmdb.org/t/p/original/${json.backdrop_path}`;
    let imgMobile = `https://image.tmdb.org/t/p/w500/${json.poster_path}`;
    let cast = json.credits.cast.map((actor) => actor.name);
    let generos = json.genres.map((genero) => genero.name);

    return new Movie(json.title, cast, generos[0], json.runtime, imgDesktop, imgMobile, json.overview, json.id);
}
