const btnTema = document.getElementById('btn-luna');
const cuerpoPagina = document.body;
const iconoLuna = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`;
const iconoSol = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;

if (localStorage.getItem('tema') === 'oscuro') {
    cuerpoPagina.classList.add('dark-mode');
    btnTema.innerHTML = iconoSol;
}

btnTema.addEventListener('click', () => {
    cuerpoPagina.classList.toggle('dark-mode');
    if (cuerpoPagina.classList.contains('dark-mode')) {
        btnTema.innerHTML = iconoSol;
        localStorage.setItem('tema', 'oscuro');
    } else {
        btnTema.innerHTML = iconoLuna;
        localStorage.setItem('tema', 'claro');
    }
});