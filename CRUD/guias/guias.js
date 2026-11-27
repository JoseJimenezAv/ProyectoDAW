const form = document.getElementById("formGuia");
const tabla = document.getElementById("tablaGuia");
const buscador = document.getElementById("buscador");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnCancelar = document.getElementById("btnCancelar");
const btnGuardar = document.getElementById("btnGuardar");
const tituloForm = document.getElementById("tituloForm");
const subtituloForm = document.getElementById("subtituloForm");
const campoId = document.getElementById("idGuia");
const campoNombre = document.getElementById("nombre");
const campoDocumento = document.getElementById("documento");
const campoCorreo = document.getElementById("correo");
const campoEspecialidad = document.getElementById("especialidad");
const campoIdiomas = document.querySelectorAll('input[name="idiomas"]');
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

let guias = JSON.parse(localStorage.getItem("guias")) || [];

function guardarEnStorage(){
    localStorage.setItem("guias", JSON.stringify(guias));
}

function formatearId(id){
    return "#" + String(id).padStart(3, "0");
}

function mostrarTabla(){
    const texto = buscador.value.toLowerCase();

    const lista = guias.filter(g => 
        g.nombre.toLowerCase().includes(texto) ||
        g.documento.toLowerCase().includes(texto) ||
        g.correo.toLowerCase().includes(texto) ||
        g.especialidad.toLowerCase().includes(texto) ||
        g.idiomas.toLowerCase().includes(texto)
    );

    if(lista.length === 0){
        tabla.innerHTML = `<tr><td colspan="7" class="sin-datos">No hay registros</td></tr>`;
        return;
    }

    tabla.innerHTML = lista.map(g => `
        <tr>
            <td class="id">${formatearId(g.id)}</td>
            <td>${g.nombre}</td>
            <td>${g.documento}</td>
            <td>${g.correo}</td>
            <td>${g.especialidad}</td>
            <td>${g.idiomas}</td>
            <td>
                <div class="acciones">
                    <button type="button" onclick="editar(${g.id})" title="Editar">✏️</button>
                    <button type="button" onclick="eliminar(${g.id})" title="Eliminar">🗑️</button>
                </div>
            </td>
        </tr>`).join("");
}

form.addEventListener("submit", function (e){
    e.preventDefault();

    const datos = {
        nombre: campoNombre.value.trim(),
        documento: campoDocumento.value.trim(),
        correo: campoCorreo.value.trim(),
        especialidad: campoEspecialidad.value.trim(),
        idiomas: Array.from(campoIdiomas).filter(cb => cb.checked).map(cb => cb.value).join(", ")
    };

    if(campoId.value){
        const g = guias.find(item => item.id == campoId.value);
        Object.assign(g, datos);
    } else{
        const nuevoId = guias.length ? Math.max(...guias.map( g => g.id)) + 1 : 1;
        guias.push({ id:nuevoId, ...datos});
    }

    guardarEnStorage();
    mostrarTabla();
    limpiarFormulario();
});



btnCerrarSesion.addEventListener("click", function() {
    if(confirm("¿Deseas cerrar sesión?")){
        localStorage.removeItem("sesion");
        window.location.href = "../../index.html"
    }
})

function editar(id){
    const g = guias.find(item => item.id === id);

    campoId.value = g.id;
    campoNombre.value = g.nombre;
    campoDocumento.value = g.documento;
    campoCorreo.value = g.correo;
    campoEspecialidad.value = g.especialidad;
    const marcados = g.idiomas ? g.idiomas.split(", ") : [];
    campoIdiomas.forEach(cb => {
        cb.checked = marcados.includes(cb.value);
    });

    tituloForm.textContent = "Editar guía";
    subtituloForm.textContent = "Modificando registro " + formatearId(g.id);
    btnGuardar.textContent = "Actualizar";
    btnCancelar.hidden = false;
}

function eliminar(id){
    if(confirm("¿Seguro que deseas eliminar este registro?")){
        guias = guias.filter(g => g.id !== id);
        guardarEnStorage();
        mostrarTabla();
        limpiarFormulario();
    }
}

function limpiarFormulario(){
    form.reset();
    campoId.value = "";
    tituloForm.textContent = "Nuevo guía";
    subtituloForm.textContent = "Completa todos los campos requeridos.";
    btnGuardar.textContent = "Guardar";
    btnCancelar.hidden = true;
}

btnLimpiar.addEventListener("click", limpiarFormulario);
btnCancelar.addEventListener("click", limpiarFormulario);
buscador.addEventListener("input", mostrarTabla);

mostrarTabla();