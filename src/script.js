const tela1 = document.getElementById('tela-1');
const btnSim1 = document.getElementById('btn-sim-1');
const btnNao1 = document.getElementById('btn-nao-1');

const tela2 = document.getElementById('tela-2');
const btnSim2 = document.getElementById('btn-sim-2');
const btnNao2 = document.getElementById('btn-nao-2');

function repelirBotao(e, botao) {
    const rect = botao.getBoundingClientRect();
    
    if (botao.style.position !== 'fixed') {
        botao.style.transition = 'none';
        
        const fantasma = document.createElement('div');
        fantasma.style.width = `${rect.width}px`;
        fantasma.style.height = `${rect.height}px`;
        fantasma.style.display = 'inline-block';
        botao.parentNode.insertBefore(fantasma, botao);

        botao.style.left = `${rect.left}px`;
        botao.style.top = `${rect.top}px`;
        botao.style.position = 'fixed';
        botao.offsetHeight; 
        botao.style.transition = 'left 0.8s ease-out, top 0.8s ease-out';
    }

    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distX = btnX - mouseX;
    const distY = btnY - mouseY;
    const distancia = Math.sqrt(distX * distX + distY * distY);

    const raioRepulsao = 70;
    
    if (distancia < raioRepulsao) {
        const forca = 25;
        const angulo = Math.atan2(distY, distX); 
        
        let atualLeft = parseFloat(botao.style.left) || rect.left;
        let atualTop = parseFloat(botao.style.top) || rect.top;

        let novoLeft = atualLeft + Math.cos(angulo) * forca;
        let novoTop = atualTop + Math.sin(angulo) * forca;

        const maxLeft = window.innerWidth - rect.width - 20;
        const maxTop = window.innerHeight - rect.height - 20;

        novoLeft = Math.max(20, Math.min(novoLeft, maxLeft));
        novoTop = Math.max(20, Math.min(novoTop, maxTop));

        botao.style.left = `${novoLeft}px`;
        botao.style.top = `${novoTop}px`;
    }
}

document.addEventListener('mousemove', (e) => {
    if (!tela1.classList.contains('escondido')) repelirBotao(e, btnNao1);
    if (!tela2.classList.contains('escondido')) repelirBotao(e, btnNao2);
});

// --- LÓGICA DO CELULAR ---

function puloMobile(botao) {
    if (botao.style.position !== 'fixed') {
        const rect = botao.getBoundingClientRect();
        const fantasma = document.createElement('div');
        fantasma.style.width = `${rect.width}px`;
        fantasma.style.height = `${rect.height}px`;
        fantasma.style.display = 'inline-block';
        botao.parentNode.insertBefore(fantasma, botao);
        botao.style.position = 'fixed';
        botao.style.transition = 'left 0.8s ease-out, top 0.8s ease-out';
    }
    const xAleatorio = Math.random() * (window.innerWidth - 150);
    const yAleatorio = Math.random() * (window.innerHeight - 100);
    botao.style.left = `${Math.max(20, xAleatorio)}px`;
    botao.style.top = `${Math.max(20, yAleatorio)}px`;
}

btnNao1.addEventListener('touchstart', (e) => { e.preventDefault(); puloMobile(btnNao1); });
btnNao2.addEventListener('touchstart', (e) => { e.preventDefault(); puloMobile(btnNao2); });

btnSim1.addEventListener('click', () => {
    tela1.classList.add('escondido');
    tela2.classList.remove('escondido');
});

btnSim2.addEventListener('click', () => {
    alert("Perfeito! Agora vamos programar a data e hora.");
});