const viajes = JSON.parse(localStorage.getItem("viajes")) || [];
const resenas = JSON.parse(localStorage.getItem("resenas")) || [];
const guias = JSON.parse(localStorage.getItem("guias")) || [];
const NOMBRES_IDIOMA = { espanol: "Español", ingles: "Inglés", kichwa: "Kichwa" };
const id = Number(new URLSearchParams(location.search).get("id"));
const viaje = viajes.find(v => v.id === id);

const resenasDelViaje = resenas.filter(r => r.idViaje === id);
const promedio = resenasDelViaje.length
    ? resenasDelViaje.reduce((acc, r) => acc + Number(r.calificacion), 0) / resenasDelViaje.length
    : null;

const $ = sel => document.querySelector(sel);
let viajeros = 1

function pintarViaje(){
    document.title = viaje.titulo;
    $("#miga").textContent = viaje.titulo;
    $("#titulo").textContent = viaje.titulo;
    $("#ubicacion").textContent = viaje.ubicacion;
    $("#empresa").textContent = viaje.empresa;
    $("#calificacion").textContent = promedio != null ? `${promedio.toFixed(1)}` : "Nuevo";
    $("#resenas").textContent = resenasDelViaje.length ? `${resenasDelViaje.length} reseñas` : "Aún sin reseñas";
    $("#duracion").textContent = `${viaje.dias} días / ${viaje.noches} noches`;
    $("#precio").textContent = `$${viaje.precio}`;
    $("#subtitulo").textContent = viaje.subtitulo || "Sobre este viaje";
    $("#descripcion").textContent = viaje.descripcion || "";

    const fotos = viaje.imagenes || [];
    for(let i = 0; i < 4; i++){
        const img = $("#foto" + (i+1));
        img.src = fotos[i] || viaje.imagen;
        img.alt = viaje.titulo;
    }

    $("#actividades").innerHTML = (viaje.actividades || []).map(a => `<div>${a}</div>`).join("");

    const punto = viaje.puntoEncuentro || {};
    $("#lugar").textContent = punto.lugar || "Por confirmar";
    $("#detalle-lugar").textContent = punto.detalle || "";

    const guiaReg = guias.find(g => g.id === viaje.guiaId);
    const guia = guiaReg
    ? {
        nombre: guiaReg.nombre,
        rol: guiaReg.especialidad,
        idiomas: (guiaReg.idiomas || "")
            .split(", ")
            .filter(Boolean)
            .map(i => NOMBRES_IDIOMA[i] || i)
      }
    : (viaje.guia || {});
    $("#guia-nombre").textContent = guia.nombre || "Por asignar";
    $("#guia-rol").textContent = guia.rol || "";
    $("#guia-idiomas").innerHTML = (guia.idiomas || []).map(i => `<span>${i}</span>`).join("");
    $("#guia-calificacion").textContent = guia.calificacion ? `★ ${guia.calificacion}` : "";
}

function calcularTotal(){
    $("#viajeros").textContent = viajeros;
    $("#total").textContent = `$${viaje.precio * viajeros}`;
}

function aFechaLocal(d){
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mes}-${dia}`;
}

function iniciarFecha() {
    const hoy = new Date();
    const sugerida = new Date();
    sugerida.setDate(hoy.getDate() + 14);
    $("#fecha").min = aFechaLocal(hoy);
    $("#fecha").value = aFechaLocal(sugerida)
}

$("#menos").addEventListener("click", () =>{
    if(viajeros > 1) viajeros --;
    calcularTotal();
});

$("#mas").addEventListener("click", () =>{
    if(viajeros < 20) viajeros++;
    calcularTotal();
})

if(!viaje){
    $("#no-encontrado").hidden = false;
} else{
    $("#contenido").hidden = false;
    pintarViaje();
    iniciarFecha();
    calcularTotal();
}