class Movie {
    constructor(tittle, cast, genre, duration, img, img2, description) {
        this.tittle = tittle;
        this.cast = cast;
        this.genre = genre;
        this.duration = duration;
        this.imgDesktop = img;
        this.imgMobile = img2;
        this.description = description;
    }
}

const thor = new Movie(
    "Thor: Love and Thunder",
    ["Chris Hemsworth", "Christian Bale", "Natalie Portman"],
    "Accion",
    "1h 59m",
    "https://www.themoviedb.org/t/p/original/rnayDLXLWF1q8gn2wpQRMwrjtn6.jpg",
    "https://www.themoviedb.org/t/p/original/kf9Bib75eduxt0QiVJO4pawfd9p.jpg",
    "Cuarta película sobre Thor del MCU, en la que el Dios del trueno contará con Lady Thor como acompañante, personaje que interpretará Natalie Portman."
);
const topGun = new Movie(
    "Top Gun: Maverick",
    ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    "Accion",
    "2h 11m",
    "https://www.themoviedb.org/t/p/original/jALOpRgEjKLWn5ZD01pGecHdCNt.jpg",
    "https://www.themoviedb.org/t/p/original/AlWpEpQq0RgZIXVHAHZtFhEvRgd.jpg",
    "Maverick, quien lleva 30 años de servicio, es ahora instructor de pilotos militares. Una última misión, un sacrificio final, obliga a este maestro de los cielos a enfrentar las heridas abiertas del pasado y sus temores más profundos."
);
const interstelar = new Movie(
    "Interestelar",
    ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    "Ciencia Ficcion",
    "2h 49m",
    "https://www.themoviedb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    "https://www.themoviedb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí."
);

const predator = new Movie(
    "Predator: La presa",
    ["Amber Midthunder", "Dakota Beavers", "Dane DiLiegro"],
    "Terror",
    "1h 40m",
    "https://www.themoviedb.org/t/p/original/7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg",
    "https://www.themoviedb.org/t/p/original/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg",
    "En 1719, una habilidosa guerrera comanche protege a su tribu de un depredador alienígena altamente evolucionado que caza humanos por deporte."
);

const bladeRunner = new Movie(
    "Blade Runner 2049",
    ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    "Ciencia Ficcion",
    "2h 44m",
    "https://www.themoviedb.org/t/p/original/7wlKwjIJoYSlwCClOr91EycJTw5.jpg",
    "https://www.themoviedb.org/t/p/original/aBvDBfqCHs0sCXoun7giyHeClb1.jpg",
    "Tras la rebelión de los replicantes creados por bioingeniería para ser utilizados como mano de obra esclava y la prohibición a Tyrell Corporation de seguir con su fabricación, el empresario Niander Wallace adquirió lo que quedaba de Tyrell Corp. y creó una nueva línea de replicantes mucho más obedientes."
);

const spiderman = new Movie(
    "Spider-Man: No Way Home",
    ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    "Accion",
    "2h 28m",
    "https://www.themoviedb.org/t/p/original/cgEhsQWCq16yxeoHP15Ay9VdU0s.jpg",
    "https://www.themoviedb.org/t/p/original/miZFgV81xG324rpUknQX8dtXuBl.jpg",
    "Tras descubrirse la identidad secreta de Peter Parker como Spider-Man, la vida del joven se vuelve una locura. Peter le pide ayuda al Doctor Strange para recuperar su vida, pero algo sale mal y provoca una fractura en el multiverso."
);
