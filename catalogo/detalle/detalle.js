// const viajes = JSON.parse(localStorage.getItem("viajes"));
const id = Number(new URLSearchParams(location.search).get("id"));
const viaje = viajes.find(v => v.id === id);

const $ = sel => document.querySelector(sel);
let viajeros = 1

function pintarViaje(){
    document.title = viaje.titulo;
    $("#miga").textContent = viaje.titulo;
    $("#titulo").textContent = viaje.titulo;
    $("#ubicacion").textContent = viaje.ubicacion;
    $("#empresa").textContent = viaje.empresa;
    $("#calificacion").textContent = viaje.calificacion;
    $("#resenas").textContent = `${viaje.resenas} reseñas`;
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

    const guia = viaje.guia || {};
    $("#guia-nombre").textContent = guia.nombre || "Por asignar";
    $("#guia-rol").textContent = guia.rol || "";
    $("#guia-idiomas").innerHTML = (guia.idiomas || []).map(i => `<span>${i}</span>`).join("");
    $("#guia-calificacion").textContent = guia.calificacion ? `★ ${guia.calificacion}` : "";
}

function calcularTotal(){
    $("#viajeros").textContent = viajeros;
    $("#total").textContent = `$${viaje.precio * viajeros}`;
}

function iniciarFecha() {
    const hoy = new Date();
    const sugerida = new Date();
    sugerida.setDate(hoy.getDate() + 14);
    $("#fecha").min = hoy.toISOString().split("T")[0];
    $("#fecha").value = sugerida.toISOString().split("T")[0];
}

$("#menos").addEventListener("click", () =>{
    if(viajeros > 1) viajeros --;
    calcularTotal();
});

$("#mas").addEventListener("click", () =>{
    if(viajeros < 20) viajeros++;
    calcularTotal();
})

$("#btn-reservar").addEventListener("click", () =>{
    const fecha = $("#fecha").value;
    if(!fecha){
        alert("Elige una fecha de salida.");
        return;
    }
    location.href = `../reserva/reserva.html?id=${viaje.id}&fecha=${fecha}&personas=${viajeros}`;
});

if(!viaje){
    $("#no-encontrado").hidden = false;
} else{
    $("#contenido").hidden = false;
    pintarViaje();
    iniciarFecha();
    calcularTotal();
}