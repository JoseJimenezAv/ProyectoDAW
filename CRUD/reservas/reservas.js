const btnCerrarSesion = document.getElementById("btnCerrarSesion");

btnCerrarSesion.addEventListener("click", function() {
    if(confirm("¿Deseas cerrar sesión?")){
        localStorage.removeItem("sesion");
        window.location.href = "../../index.html"
    }
})