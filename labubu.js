const img = document.getElementById('img');
const pausa = 1000;

function aparecerImagem() {
    const x = Math.random() * (window.innerWidth - img.width);
    const y = Math.random() * (window.innerHeight - img.height);
    const rotacao = Math.random() * 360;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = `rotate(${rotacao}deg)`;
    img.style.opacity = 0.5;

    setTimeout(() => {
        img.style.opacity = 0;
    }, pausa);

    const proximoTempo = Math.random() * 10000;
    setTimeout(aparecerImagem, proximoTempo);
}

setTimeout(aparecerImagem, Math.random() * 10000);
