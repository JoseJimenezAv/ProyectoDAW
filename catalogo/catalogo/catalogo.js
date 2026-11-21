const grilla = document.querySelector(".grilla-viajes");
const contador = document.querySelector(".barra-resultados p");
const selectOrden = document.querySelector(".barra-resultados select");
const buscador = document.querySelector('input[type="search"]');
const selectDuracion = document.getElementById("duracion");
const rango = document.querySelector('input[type="range"]');
const textoPrecio = document.querySelector(".fila-precio-titulo b");
const btnLimpiar = document.querySelector(".encabezado-filtros button");

const ICONO_MAPA = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map preview-icon"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>`;
const ICONO_ESTRELLA = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star preview-icon"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`;
const ICONOS_INCLUYE = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bus-front preview-icon"><path d="M4 6 2 7"/><path d="M10 6h4"/><path d="m22 7-2-1"/><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M8 15h.01"/><path d="M16 15h.01"/><path d="M6 19v2"/><path d="M18 21v-2"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bed preview-icon"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils preview-icon"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users preview-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>`;

function crearTarjeta(v){
    return `
    <article class="tarjeta">
        <div class="imagen">
            <img src="${v.imagen}" alt="${v.titulo}">
            <small>${v.dias} días / ${v.noches} noches</small>
        </div>
        <div class="contenido">
            <p>${v.empresa}</p>
            <h3>${v.titulo}</h3>
            <small>${ICONO_MAPA}${v.ubicacion}</small>
            <span>${ICONO_ESTRELLA}${v.calificacion}</span>
            <div class="incluye">
                <div>${ICONOS_INCLUYE}</div>
                <small>Todo incluido</small>
            </div>
            <div class="detalle">
                <span><b>$${v.precio}</b> por persona</span>
                <button onclick="location.href='../detalle/detalle.html?id=${v.id}'">Ver detalle</button>
            </div>
        </div>
    </article>`;
}

function pintarViajes(lista){
    if(lista.length === 0){
        grilla.innerHTML = `<p class="sin-resultados">No encontramos viajes con esos filtros. </p>`;
    } else{
        grilla.innerHTML = lista.map(crearTarjeta).join("");
    }
    contador.textContent = `${lista.length} viajes encontrados`;
}

function cumpleDuracion(dias, filtro) {
    if (filtro === "cualquiera") return true;
    if (filtro === "1") return dias === 1;
    if (filtro === "2-3") return dias >= 2 && dias <= 3;
    if (filtro === "4+") return dias >= 4;
}

function aplicarFiltros() {
    const texto = buscador.value.toLowerCase().trim();
    const region = document.querySelector('input[name="region"]:checked').value;
    const precioMax = Number(rango.value);

    const resultado = viajes.filter(v =>
        (v.titulo.toLowerCase().includes(texto) ||
            v.ubicacion.toLowerCase().includes(texto) ||
            v.empresa.toLowerCase().includes(texto)) &&
        (region === "todas" || v.region === region) &&
        cumpleDuracion(v.dias, selectDuracion.value) &&
        v.precio <= precioMax
    );

    if (selectOrden.value === "menor-precio") resultado.sort((a, b) => a.precio - b.precio);
    if (selectOrden.value === "mejor-calificados") resultado.sort((a, b) => b.calificacion - a.calificacion);

    textoPrecio.textContent = `$${precioMax}`;
    pintarViajes(resultado);
}

buscador.addEventListener("input", aplicarFiltros);
rango.addEventListener("input", aplicarFiltros);
selectDuracion.addEventListener("change", aplicarFiltros);
selectOrden.addEventListener("change", aplicarFiltros);
document.querySelectorAll('input[name="region"]').forEach(r =>
    r.addEventListener("change", aplicarFiltros)
);

btnLimpiar.addEventListener("click", () => {
    buscador.value = "";
    document.querySelector('input[name="region"][value="todas"]').checked = true;
    selectDuracion.value = "cualquiera";
    rango.value = rango.max;
    selectOrden.value = "recomendados";
    aplicarFiltros();
});

aplicarFiltros();