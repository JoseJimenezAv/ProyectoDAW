const $ = sel => document.querySelector(sel);

const params = new URLSearchParams(location.search);
const id = Number(params.get("id"));
const viaje = viajes.find(v => v.id === id);

function fechaISO(dias){
    const d = new Date();
    d.setDate(d.getDate() + dias);
    return d.toISOString().split("T")[0];
}

function mostrarError(input, mensaje){
    input.classList.toggle("invalido", mensaje !== "");
    input.parentElement.querySelector(".error").textContent = mensaje;
    return mensaje === "";
}

function validar(){
    const personas = Number($("#personas").value);
    const resultados = [
        mostrarError($("#nombre"), $("#nombre").value.trim().split(" ").length < 2 ? "Escribe tu nombre y apellido." : ""),
        mostrarError($("#correo"), /^\S+@\S+\.\S+$/.test($("#correo").value) ? "" : "Escribe un correo válido."),
        mostrarError($("#telefono"), $("#telefono").value.replace(/\D/g, "").length < 9 ? "Escribe al menos 9 dígitos." : ""),
        mostrarError($("#fecha"), $("#fecha").value < $("#fecha").min ? "Elige una fecha válida." : ""),
        mostrarError($("#personas"), personas >= 1 && personas <= 20 ? "" : "Indica de 1 a 20 personas.")
    ];
    return !resultados.includes(false);
}

$("#formulario").addEventListener("submit", e => {
    e.preventDefault();
    if(!validar()) return;

    const idViaje = Number($("#viaje").value);
    const elegido = viajes.find(v => v.id === idViaje);
    const personas = Number($("#personas").value);
    const total = elegido.precio * personas;
    const codigo = "VEC-" + Math.random().toString(36).slice(2, 8).toUpperCase();

    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    reservas.push({
        codigo: codigo,
        idViaje: idViaje,
        nombre: $("#nombre").value.trim(),
        correo: $("#correo").value.trim(),
        telefono: $("#telefono").value.trim(),
        fecha: $("#fecha").value,
        personas: personas,
        total: total
    });
    localStorage.setItem("reservas", JSON.stringify(reservas));

    alert(`¡Reserva confirmada!\nCódigo: ${codigo}\n${elegido.titulo}\nTotal estimado: $${total}`);
    location.href = "../catalogo/catalogo.html";
});

if(!viaje){
    $("#no-encontrado").hidden = false;
} else {
    $("#contenido").hidden = false;
    $("#viaje").innerHTML = viajes.map(v => `<option value="${v.id}">${v.titulo}</option>`).join("");
    $("#viaje").value = viaje.id;
    $("#fecha").min = fechaISO(0);
    $("#fecha").value = params.get("fecha") || fechaISO(14);
    $("#personas").value = Number(params.get("personas")) || 1;
}