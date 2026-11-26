const form = document.getElementById("formCatalogo");
const tabla = document.getElementById("tablaCatalogo");
const buscador = document.getElementById("buscador");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnCancelar = document.getElementById("btnCancelar");
const btnGuardar = document.getElementById("btnGuardar");
const tituloForm = document.getElementById("tituloForm");
const subtituloForm = document.getElementById("subtituloForm");
const campoId = document.getElementById("idViaje");

const campoTitulo = document.getElementById("titulo");
const campoEmpresa = document.getElementById("empresa");
const campoUbicacion = document.getElementById("ubicacion");
const campoRegion = document.getElementById("region");
const campoDias = document.getElementById("dias");
const campoPrecio = document.getElementById("precio");
const campoImagen = document.getElementById("imagen");
const campoImagenes = document.getElementById("imagenes");
const campoSubtitulo = document.getElementById("subtitulo");
const campoDescripcion = document.getElementById("descripcion");
const campoActividades = document.getElementById("actividades");
const campoLugarEncuentro = document.getElementById("lugarEncuentro");
const campoDetalleEncuentro = document.getElementById("detalleEncuentro");
const campoGuiaNombre = document.getElementById("guiaNombre");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

let viajes = JSON.parse(localStorage.getItem("viajes")) || [];

function guardarEnStorage(){
    localStorage.setItem("viajes", JSON.stringify(viajes));
}

function formatearId(id){
    return "#" + String(id).padStart(3, "0");
}

function mostrarTabla(){
    const texto = buscador.value.toLowerCase();

    const lista = viajes.filter(v =>
        v.titulo.toLowerCase().includes(texto) ||
        v.ubicacion.toLowerCase().includes(texto) ||
        v.empresa.toLowerCase().includes(texto) ||
        v.region.toLowerCase().includes(texto)
    );

    if(lista.length === 0){
        tabla.innerHTML = `<tr><td colspan="8" class="sin-datos">No hay registros</td></tr>`;
        return;
    }

    tabla.innerHTML = lista.map(v => `
        <tr>
            <td class="id">${formatearId(v.id)}</td>
            <td><img src="${v.imagen}" alt="Miniatura" class="miniatura-img"></td>
            <td>${v.titulo}</td> 
            <td>${v.ubicacion}</td> 
            <td>${v.empresa}</td> 
            <td>$${Number(v.precio).toFixed(2)}</td> 
            <td>${v.dias} días</td> 
            <td>
                <div class="acciones">
                    <button type="button" onclick="editar(${v.id})" title="Editar">✏️</button>
                    <button type="button" onclick="eliminar(${v.id})" title="Eliminar">🗑️</button>
                </div>
            </td>
        </tr>`).join("");
}

form.addEventListener("submit", function (e){
    e.preventDefault();

    const diasVal = parseInt(campoDias.value);
    const nochesVal = Math.max(0, diasVal - 1);

    const imagenesArray = campoImagenes.value
        .split("\n")
        .map(url => url.trim())
        .filter(url => url.length > 0);

    const actividadesArray = campoActividades.value
        .split(",")
        .map(act => act.trim())
        .filter(act => act.length > 0);

    const guiaObj = {
        nombre: campoGuiaNombre.value,
        rol: "Guía nacional certificado",
        idiomas: ["Español", "Inglés"],
        calificacion: 4.9
    };

    const datosViaje = {
        titulo: campoTitulo.value.trim(),
        empresa: campoEmpresa.value,
        ubicacion: campoUbicacion.value.trim(),
        region: campoRegion.value,
        dias: diasVal,
        noches: nochesVal,
        precio: parseFloat(campoPrecio.value),
        imagen: campoImagen.value.trim(),
        imagenes: imagenesArray.length > 0 ? imagenesArray : [campoImagen.value.trim()],
        subtitulo: campoSubtitulo.value.trim(),
        descripcion: campoDescripcion.value.trim(),
        actividades: actividadesArray,
        puntoEncuentro: {
            lugar: campoLugarEncuentro.value.trim(),
            detalle: campoDetalleEncuentro.value.trim()
        },
        guia: guiaObj
    };

    if(campoId.value){
        const v = viajes.find(item => item.id == campoId.value);
        Object.assign(v, datosViaje);
    } else{
        const nuevoId = viajes.length ? Math.max(...viajes.map(v => v.id)) + 1 : 1;
        viajes.push({ id: nuevoId, ...datosViaje });
    }

    guardarEnStorage();
    mostrarTabla();
    limpiarFormulario();
});

btnCerrarSesion.addEventListener("click", function() {
    if(confirm("¿Deseas cerrar sesión?")){
        localStorage.removeItem("sesion");
        window.location.href = "../../index.html";
    }
});

function editar(id) {
    const v = viajes.find(item => item.id === id);

    campoId.value = v.id;
    campoTitulo.value = v.titulo;
    campoEmpresa.value = v.empresa;
    campoUbicacion.value = v.ubicacion;
    campoRegion.value = v.region;
    campoDias.value = v.dias;
    campoPrecio.value = v.precio;
    campoImagen.value = v.imagen;
    campoImagenes.value = v.imagenes.join("\n");
    campoSubtitulo.value = v.subtitulo;
    campoDescripcion.value = v.descripcion;
    campoActividades.value = v.actividades.join(", ");
    campoLugarEncuentro.value = v.puntoEncuentro.lugar;
    campoDetalleEncuentro.value = v.puntoEncuentro.detalle;
    campoGuiaNombre.value = v.guia.nombre;

    tituloForm.textContent = "Editar viaje";
    subtituloForm.textContent = "Modificando registro " + formatearId(v.id);
    btnGuardar.textContent = "Actualizar";
    btnCancelar.hidden = false;
}

function eliminar(id){
    if(confirm("¿Seguro que deseas eliminar este registro?")){
        viajes = viajes.filter(v => v.id !== id);
        guardarEnStorage();
        mostrarTabla();
        limpiarFormulario();
    }
}

function limpiarFormulario(){
    form.reset();
    campoId.value = "";
    tituloForm.textContent = "Nuevo viaje";
    subtituloForm.textContent = "Completa todos los campos requeridos.";
    btnGuardar.textContent = "Guardar";
    btnCancelar.hidden = true;
}

btnLimpiar.addEventListener("click", limpiarFormulario);
btnCancelar.addEventListener("click", limpiarFormulario);
buscador.addEventListener("input", mostrarTabla);

mostrarTabla(); 