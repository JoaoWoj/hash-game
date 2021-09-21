const hash_game = {

    table: ['', '', '', '', '', '', '', '', ''],
    symbol: {
        player: ['O', 'X'],
        turn: 0,
        playerValidation: function() {
            this.turn = (this.turn === 0 ? 1 : 0);
        }
    },
    container_element: null,
    gameover: false,
    matrix: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],


    init(container) {
        this.container_element = container;
    },

    start(posicao) {
        if (this.gameover) return false;
        if (this.table[posicao] === '') {
            this.table[posicao] = this.symbol.player[this.symbol.turn];
            this.create_table();
            this.check(this.symbol.player[this.symbol.turn]);
            let count = 0;
            this.table.forEach(function(i) {
                if(i === 'X' || i === 'O'){
                    count++;
                }
            });
            if(count === 9){
                this.end_game();
            } else {
                this.symbol.playerValidation();
            }
            return true;
        } else {
            return false;
        }
    },

    check(symbol) {
       this.matrix.forEach(function(x) {
            var count = 0;
            x.forEach(function(y) {
                var position = document.querySelector('.game').children[y];
            if (position && position.innerText === symbol)
                count++;
            });
            if (count == 3) {
                var person = symbol;
                alert('Parabéns ' + person + '!!! você ganhou!!!');
                location.reload();
            }
        });
    },

    end_game() {
        alert('O jogo acabou em empate! Ninguém ganhou!!!');
        location.reload();
    },
	
	 restart() {
        this.table.fill('');
        this.create_table();
        this.gameover = false;
    },

    create_table() {
        let content = '';

        for (i in this.table) {
            content += '<div onclick="hash_game.start(' + i + ')">' + this.table[i] + '</div>';
        };

        this.container_element.innerHTML = content;
    },
};