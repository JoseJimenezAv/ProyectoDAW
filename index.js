document.addEventListener("DOMContentLoaded", function () {
// 1. LÓGICA DEL CARRUSEL DE VIAJES
    const slides = document.querySelectorAll(".carrusel-slide");
    const puntos = document.querySelectorAll(".punto");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    if (slides.length > 0) {
        let indiceActual = 0;
        const totalSlides = slides.length;

        function mostrarSlide(indice) {
            if (indice < 0) {
                indiceActual = totalSlides - 1;
            } else if (indice >= totalSlides) {
                indiceActual = 0;
            } else {
                indiceActual = indice;
            }
            slides.forEach(slide => slide.classList.remove("active"));
            puntos.forEach(punto => punto.classList.remove("activo"));
            slides[indiceActual].classList.add("active");
            puntos[indiceActual].classList.add("activo");
        }

        if (btnNext) {
            btnNext.addEventListener("click", () => mostrarSlide(indiceActual + 1));
        }
        if (btnPrev) {
            btnPrev.addEventListener("click", () => mostrarSlide(indiceActual - 1));
        }

        puntos.forEach(punto => {
            punto.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                mostrarSlide(index);
            });
        });

        let intervaloCarrusel = setInterval(function () {
            mostrarSlide(indiceActual + 1);
        }, 3000); 
        const contenedorCarrusel = document.querySelector(".carrusel-seccion");

        if (contenedorCarrusel) {
            contenedorCarrusel.addEventListener("mouseenter", function () {
                clearInterval(intervaloCarrusel);
            });
            contenedorCarrusel.addEventListener("mouseleave", function () {
                intervaloCarrusel = setInterval(function () {
                    mostrarSlide(indiceActual + 1);
                }, 3000);
            });
        }
    }

});