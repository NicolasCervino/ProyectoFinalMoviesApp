class Movie {
    constructor(tittle, cast, genre, duration, img, img2, description, id, releaseDate, director, videoKey) {
        this.tittle = tittle;
        this.cast = cast;
        this.genre = genre;
        this.duration = duration;
        this.imgDesktop = img;
        this.imgMobile = img2;
        this.description = description;
        this.id = id;
        this.releaseDate = releaseDate;
        this.director = director;
        this.videoKey = videoKey;
    }
    getRandomImgDesktop() {
        // Math.random() * (max - min) + min;
        let indice = Math.floor(Math.random() * (this.imgDesktop.length - 0) + 0);
        return this.imgDesktop[indice];
    }
}
