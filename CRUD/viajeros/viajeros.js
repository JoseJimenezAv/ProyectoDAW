const form = document.getElementById("formViajero");
const tabla = document.getElementById("tablaViajeros");
const buscador = document.getElementById("buscador");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnCancelar = document.getElementById("btnCancelar");
const btnGuardar = document.getElementById("btnGuardar");
const tituloForm = document.getElementById("tituloForm");
const subtituloForm = document.getElementById("subtituloForm");
const campoId = document.getElementById("idViajero");
const campoNombre = document.getElementById("nombre");
const campoDocumento = document.getElementById("documento");
const campoCorreo = document.getElementById("correo");
const campoTelefono = document.getElementById("telefono");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

let viajeros = JSON.parse(localStorage.getItem("viajeros")) || [];

function guardarEnStorage(){
    localStorage.setItem("viajeros", JSON.stringify(viajeros));
}

function formatearId(id){
    return "#" + String(id).padStart(3, "0");
}

function mostrarTabla(){
    const texto = buscador.value.toLowerCase();

    const lista = viajeros.filter(v =>
        v.nombre.toLowerCase().includes(texto) ||
        v.documento.toLowerCase().includes(texto) ||
        v.correo.toLowerCase().includes(texto) ||
        v.telefono.toLowerCase().includes(texto)
    );

    if(lista.length === 0){
        tabla.innerHTML = `<tr><td colspan="6" class="sin-datos">No hay registros</td></tr>`;
        return;
    }

    tabla.innerHTML = lista.map(v => `
        <tr>
            <td class="id">${formatearId(v.id)}</td>
            <td>${v.nombre}</td> 
            <td>${v.documento}</td> 
            <td>${v.correo}</td> 
            <td>${v.telefono}</td> 
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

    const datos = {
        nombre: campoNombre.value.trim(),
        documento: campoDocumento.value.trim(),
        correo: campoCorreo.value.trim(),
        telefono: campoTelefono.value.trim()
    };

    if(campoId.value){
        const v = viajeros.find(item => item.id == campoId.value);
        Object.assign(v, datos);
    } else{
        const nuevoId = viajeros.length ? Math.max(...viajeros.map(v => v.id)) + 1 : 1;
        viajeros.push({ id:nuevoId, ...datos });
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

function editar(id) {
    const v = viajeros.find(item => item.id === id);

    campoId.value = v.id;
    campoNombre.value = v.nombre;
    campoDocumento.value = v.documento;
    campoCorreo.value = v.correo;
    campoTelefono.value = v.telefono;

    tituloForm.textContent = "Editar viajero";
    subtituloForm.textContent = "Modificando registro " + formatearId(v.id);
    btnGuardar.textContent = "Actualizar";
    btnCancelar.hidden = false;
}

function eliminar(id){
    if(confirm("¿Seguro que deseas eliminar este registro?")){
        viajeros = viajeros.filter(v => v.id !== id);
        guardarEnStorage();
        mostrarTabla();
        limpiarFormulario();
    }
}

function limpiarFormulario(){
    form.reset();
    campoId.value = "";
    tituloForm.textContent = "Nuevo viajero";
    subtituloForm.textContent = "Completa todos los campos requeridos.";
    btnGuardar.textContent = "Guardar";
    btnCancelar.hidden = true;
}



btnLimpiar.addEventListener("click", limpiarFormulario);
btnCancelar.addEventListener("click", limpiarFormulario);
buscador.addEventListener("input", mostrarTabla);

mostrarTabla();
