const tela1 = document.getElementById('tela-1');
const btnSim1 = document.getElementById('btn-sim-1');
const btnNao1 = document.getElementById('btn-nao-1');

const tela2 = document.getElementById('tela-2');
const btnSim2 = document.getElementById('btn-sim-2');
const btnNao2 = document.getElementById('btn-nao-2');

const tela3 = document.getElementById('tela-3');
const tituloTela3 = document.getElementById('titulo-tela-3');
const gridOpcoes = document.getElementById('grid-opcoes');
const botoesOpcao = document.querySelectorAll('.btn-opcao:not(#btn-outra-ideia)'); 

const btnOutraIdeia = document.getElementById('btn-outra-ideia');
const caixaOutraIdeia = document.getElementById('caixa-outra-ideia');
const btnConfirmarIdeia = document.getElementById('btn-confirmar-ideia');
const inputOutraIdeia = document.getElementById('input-outra-ideia');

const tela4 = document.getElementById('tela-4');
const btnConfirmarData = document.getElementById('btn-confirmar-data');
const inputData = document.getElementById('data-date');
const inputHora = document.getElementById('hora-date');

const tela5 = document.getElementById('tela-5');
const btnAgenda = document.getElementById('btn-agenda');

let dateEscolhido = '';

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
    tela2.classList.add('escondido');
    tela3.classList.remove('escondido');
});

function irParaTela4() {
    tela3.classList.add('escondido');
    tela4.classList.remove('escondido');
    
    const hoje = new Date().toISOString().split('T')[0];
    inputData.setAttribute('min', hoje);
}

botoesOpcao.forEach(botao => {
    botao.addEventListener('click', () => {
        dateEscolhido = botao.getAttribute('data-opcao');
        irParaTela4();
    });
});

btnOutraIdeia.addEventListener('click', () => {
    gridOpcoes.classList.add('escondido');
    caixaOutraIdeia.classList.remove('escondido');
    tituloTela3.innerText = "Qual é o date dos seus sonhos? 😍";
});

btnConfirmarIdeia.addEventListener('click', () => {
    if(!inputOutraIdeia.value.trim()) {
        alert("Escreve alguma coisinha pra gente fazer juntinhos! 🥺");
        return;
    }
    dateEscolhido = inputOutraIdeia.value;
    irParaTela4();
});

btnConfirmarData.addEventListener('click', () => {
    if(!inputData.value || !inputHora.value) {
        alert("Por favor, preenche a data e a hora do nosso date! 🥺");
        return;
    }
    tela4.classList.add('escondido');
    tela5.classList.remove('escondido');
});

btnAgenda.addEventListener('click', () => {
    const dataVal = inputData.value;
    const horaVal = inputHora.value;
    
    const dataInicio = new Date(`${dataVal}T${horaVal}`);
    const dataFim = new Date(dataInicio.getTime() + (2 * 60 * 60 * 1000));
    
    const formataDataGCal = (data) => {
        return data.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const strInicio = formataDataGCal(dataInicio);
    const strFim = formataDataGCal(dataFim);

    const titulo = encodeURIComponent(`Date Especial: ${dateEscolhido} ❤️`);
    const detalhes = encodeURIComponent(`Nosso date maravilhoso está marcado!\n\nEstilo: ${dateEscolhido}\n\nTe amo!`);
    
    const meuEmail = "kelwinkaran@gmail.com"; 

    const urlGCal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${strInicio}/${strFim}&details=${detalhes}&add=${meuEmail}`;
    
    window.open(urlGCal, '_blank');
});