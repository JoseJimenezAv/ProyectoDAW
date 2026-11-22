const $ = sel => document.querySelector(sel);
const USUARIO = "admin";
const CLAVE = "admin123";

$("#mostrar").addEventListener("click", () =>{
    const oculta = $("#clave").type === "password";
    $("#clave").type = oculta ? "text" : "password";
    $("#mostrar").textContent = oculta ? "Ocultar" : "Mostrar";
});

$("#formulario").addEventListener("submit", e => {
    e.preventDefault();

    if($("#usuario").value === USUARIO && $("#clave").value === CLAVE){
        sessionStorage.setItem("admin", "si");
        location.href = "admin.html";
    } else{
        $("#error").textContent = "Usuario o contraseña incorrectos.";
    }
})