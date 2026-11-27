const grid = document.getElementById("gridGuias");
const filtros = document.getElementById("filtros");

const guias = JSON.parse(localStorage.getItem("guias")) || [];

const nombreIdioma = {
    espanol: "Español",
    ingles: "Inglés",
    kichwa: "kichwa"
};

let idiomaActivo = "todos";

function esc(texto){
    const div = document.createElement("div");
    div.textContent = texto ?? "";
    return div.innerHTML;
}

function listaIdiomas(g){
    return g.idiomas ? g.idiomas.split(", ").filter(Boolean) : [];
}

function crearTarjeta(g){
    const idiomas = listaIdiomas(g);

    return `
    <article class="tarjeta-guia">
        <div class="tarjeta-avatar">${esc(g.nombre.charAt(0).toUpperCase())}</div>
        <div class="tarjeta-cuerpo">
            <h3>${esc(g.nombre.toUpperCase())}</h3>
            <p class="especialidad">${esc(g.especialidad)}</p>

            <div class="tags">
                ${idiomas.map(i => `<span class="tag">${esc(nombreIdioma[i] || i)}</span>`).join("")}
            </div>
        </div>
    </article>`;
}

function mostrarGuias(){
    const lista = idiomaActivo === "todos" ? guias : guias.filter(g => listaIdiomas(g).includes(idiomaActivo));

    if(lista.length === 0){
        grid.innerHTML = `<p class="sin-resultados">No hay guías disponibles.</p>`;
        return;
    }

    grid.innerHTML = lista.map(crearTarjeta).join("");
}

filtros.addEventListener("click", e =>{
    const btn = e.target.closest(".filtro");
    if (!btn) return;

    filtros.querySelector(".active").classList.remove("active");
    btn.classList.add("active");

    idiomaActivo = btn.dataset.idioma;
    mostrarGuias();
});

mostrarGuias();