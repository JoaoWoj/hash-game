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
        this.container_element.style.width = "600px";
        this.container_element.style.height = "600px";
        this.container_element.style.margin = "0 auto";
        this.container_element.style.backgroundColor = "#2b2b2b";
        this.container_element.style.color = "#fff";
        this.container_element.style.order = "6px solid #2c3e50";
        this.container_element.style.borderradius = "10px";
        this.container_element.style.display = "grid";
        this.container_element.style.gridTemplate = "repeat(3, 1fr) / repeat(3, 1fr)";
    },

    start(posicao) {
        if (this.gameover) return false;
        if (this.table[posicao] === '') {
            this.table[posicao] = this.symbol.player[this.symbol.turn];
            this.create_table();
            this.check(this.symbol.player[this.symbol.turn]);
            let count = 0;
            if(this.gameover === true){
                location.reload();
                return true;
            }
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
        for (var i = 0; i <  this.matrix.length; ++i) {
            var x =  this.matrix[i];
            var count = 0;
            x.forEach(function(y) {
                var position = document.querySelector('.game').children[y];
            if (position && position.innerText === symbol)
                count++;
            });
            if (count == 3) {
                var person = symbol;
                alert('Parab??ns ' + person + '!!! voc?? ganhou!!!');
                this.gameover = true;
                break;
            }
        };
    },

    end_game() {
        alert('O jogo acabou em empate! Ningu??m ganhou!!!');
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
        this.container_element.childNodes.forEach(function(x) {
            x.style.border = "6px solid #2c3e50";
            x.style.borderRadius = "2px";
            x.style.fontFamily = "Helvetica";
            x.style.fontWeight = "bold";
            x.style.fontSize = "4em";
            x.style.display= "flex";
            x.style.justifyContent = "center";
            x.style.alignItems = "center";
        });
    },

};