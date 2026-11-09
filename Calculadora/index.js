const resultado = document.getElementById('resultado');
const historico = document.getElementById('historico');
let expressao = '';
let acabouDeCalcular = false;

function atualizar() {
    resultado.textContent = expressao === '' ? '0' : expressao;
}

function fatorial(n) {
    if (!Number.isInteger(n) || n < 0) throw new Error('Inválido');
    if (n > 170) return Infinity;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
}

function calcular() {
    if (expressao === '') return;
    try {
        // Troca cada "número!" pelo fatorial correspondente
        const comFatorial = expressao.replace(/(\d+)!/g, (_, n) => fatorial(Number(n)));
        if (/!/.test(comFatorial) || /[^0-9+\-*/.e]/.test(comFatorial)) throw new Error('Inválido');
        const valor = Function('"use strict"; return (' + comFatorial + ')')();
        if (!isFinite(valor)) throw new Error('Inválido');
        historico.textContent = expressao + ' =';
        expressao = String(Math.round(valor * 1e10) / 1e10);
        acabouDeCalcular = true;
    } catch {
        historico.textContent = expressao;
        expressao = '';
        resultado.textContent = 'Erro';
        acabouDeCalcular = false;
        return;
    }
    atualizar();
}

function adicionar(valor) {
    const ehOperador = ['+', '-', '*', '/'].includes(valor);

    if (acabouDeCalcular) {
        // Se digitar número, começa do zero; se operador, continua o resultado
        if (!ehOperador && valor !== '!') expressao = '';
        acabouDeCalcular = false;
    }

    const ultimo = expressao.slice(-1);

    if (valor === '!') {
        if (!/\d/.test(ultimo)) return; // fatorial só depois de um número
    }
    if (ehOperador) {
        if (expressao === '' && valor !== '-') return;
        if (['+', '-', '*', '/'].includes(ultimo)) {
            expressao = expressao.slice(0, -1); // troca o operador anterior
        }
    }
    if (/\d/.test(valor) && ultimo === '!') return; // não permite 5!3

    expressao += valor;
    atualizar();
}

document.querySelector('.teclas').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const { valor, acao } = btn.dataset;

    if (valor) adicionar(valor);
    else if (acao === 'igual') calcular();
    else if (acao === 'limpar') { expressao = ''; historico.textContent = ''; atualizar(); }
    else if (acao === 'apagar') { expressao = expressao.slice(0, -1); atualizar(); }
});

// Suporte ao teclado
document.addEventListener('keydown', (e) => {
    if (/^[0-9]$/.test(e.key) || ['+', '-', '*', '/', '!'].includes(e.key)) adicionar(e.key);
    else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); calcular(); }
    else if (e.key === 'Backspace') { expressao = expressao.slice(0, -1); atualizar(); }
    else if (e.key === 'Escape') { expressao = ''; historico.textContent = ''; atualizar(); }
});