document.addEventListener("DOMContentLoaded", function () {
    var tabuleiro;
    var board;
    var aviso;
    var jogador;
    var lin, col;
    var movimentos;

    function inicia() {
        tabuleiro = new Array(3);
        board = document.getElementById('board');
        aviso = document.getElementById('aviso');
        jogador = 1;
        movimentos = 0;

        for (let i = 0; i < 3; i++)
            tabuleiro[i] = new Array(3);

        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                tabuleiro[i][j] = 0;
        exibe();
    }

    function exibe() {
        HTML = '<table cellpadding="10" border="1">';
        for (let i = 0; i < 3; i++) {
            HTML += '<tr>';
            for (let j = 0; j < 3; j++) {
                HTML += '<td class="cell" id="cell-' + i + '-' + j + '">';

                if (tabuleiro[i][j] == 1)
                    HTML += '<span class="x">X</span>';
                else if (tabuleiro[i][j] == -1)
                    HTML += '<span class="o">O</span>';
                else
                    HTML += '__';

                HTML += '</td>';
            }
            HTML += '</tr>';
        }
        HTML += '</table><br />';
        board.innerHTML = HTML;

        var cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', function () {
                var cellId = cells[i].getAttribute('id');
                var coordinates = cellId.split('-');
                lin = parseInt(coordinates[1]);
                col = parseInt(coordinates[2]);
                jogar();
            });
        }
    }

    function jogar() {
        console.log("Função jogar() foi chamada."); 
        aviso.innerHTML = 'Vez do jogador: ' + ((jogador) % 2 + 1);

        if (tabuleiro[lin][col] == 0) {
            if (jogador % 2)
                tabuleiro[lin][col] = 1;
            else
                tabuleiro[lin][col] = -1;
        } else {
            aviso.innerHTML = 'Campo já foi marcado!'
            return;
        }

        jogador++;
        movimentos++;
        exibe();
        checa();
    }

    function checa() {
        var soma;

        for (let i = 0; i < 3; i++) {
            soma = 0;
            soma = tabuleiro[i][0] + tabuleiro[i][1] + tabuleiro[i][2];

            if (soma == 3 || soma == -3) {
                aviso.innerHTML = "Jogador " + ((jogador) % 2 + 1) + " ganhou! Linha " + (i + 1) + " preenchida!";
                return;
            }
        }

        for (let i = 0; i < 3; i++) {
            soma = 0;
            soma = tabuleiro[0][i] + tabuleiro[1][i] + tabuleiro[2][i];

            if (soma == 3 || soma == -3) {
                aviso.innerHTML = "Jogador " + ((jogador) % 2 + 1) + " ganhou! Coluna " + (i + 1) + " preenchida!";
                return;
            }
        }

        soma = 0;
        soma = tabuleiro[0][0] + tabuleiro[1][1] + tabuleiro[2][2];
        if (soma == 3 || soma == -3) {
            aviso.innerHTML = "Jogador " + ((jogador) % 2 + 1) + " ganhou! Diagonal preenchida!";
            return;
        }

        soma = 0;
        soma = tabuleiro[0][2] + tabuleiro[1][1] + tabuleiro[2][0];
        if (soma == 3 || soma == -3) {
            aviso.innerHTML = "Jogador " + ((jogador) % 2 + 1) + " ganhou! Diagonal preenchida!";
            return;
        }

        if (movimentos === 9) {
            aviso.innerHTML = "Empate! O jogo acabou sem vencedor.";
            return;
        }
    }

    inicia();
});


