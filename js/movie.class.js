class Movie {
    constructor(tittle, cast, genre, duration, img, img2, description) {
        this.tittle = tittle;
        this.cast = cast;
        this.genre = genre;
        this.duration = duration;
        this.imgDesktop = img;
        this.imgMobile = img2;
        this.description = description;
        this.id = nextId++;
    }
}
