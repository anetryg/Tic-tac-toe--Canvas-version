"use strict"
window.onload = function () {
        let canvas = document.getElementById("canvas");
        let canvas_ctx = canvas.getContext("2d");
        let field = [0, 0, 0,
                    0, 0, 0,
                    0, 0, 0];
        let blank = 0, X = 1, O = -1;
        let mouse = {x:-1, y:-1};
        let count = 0;
        let startPlayer = 1;
        let end = false;
        let cellSize = 150;


        canvas.addEventListener("mousemove", mouseXY);

        canvas.addEventListener("click", play);


        function playgame(cell){
            while (end == false){
                if(field[cell] != blank){
                return;
            }
            field[cell] = startPlayer;
            controlPlayers();
            checkTie(startPlayer);
            checkWin(startPlayer);
            startPlayer *= -1;
            }

        };


        function checkWin(XO) {
            if (((field[0] == XO) && (field[1] == XO) && (field[2] == XO)) ||
                ((field[3] == XO) && (field[4] == XO) && (field[5] == XO)) ||
                ((field[6] == XO) && (field[7] == XO) && (field[8] == XO)) ||
                ((field[0] == XO) && (field[4] == XO) && (field[8] == XO)) ||
                ((field[2] == XO) && (field[4] == XO) && (field[6] == XO)) ||
                ((field[0] == XO) && (field[3] == XO) && (field[6] == XO)) ||
                ((field[1] == XO) && (field[4] == XO) && (field[7] == XO)) ||
                ((field[2] == XO) && (field[5] == XO) && (field[8] == XO))){
                    if (XO == 1){
                            win.innerHTML = "X's wins!";
                            win.style.padding = "40px";
                            win.style.boxShadow = "0 0 0 20px #d4d26e";
                        }else{
                            win.innerHTML = "O's wins!";
                            win.style.padding = "40px";
                            win.style.boxShadow = "0 0 0 20px #d4d26e";
                        }
                    end = true;
                }
            return;
        };


        function checkTie(player) {
            if (field.indexOf(blank) == -1){
                win.innerHTML = "It's a tie!";
                win.style.padding = "40px";
                win.style.boxShadow = "0 0 0 20px #d4d26e";
                return;
            }
            
        };


        function drawField() {
            canvas_ctx.clearRect(0, 0, cellSize * 3, cellSize * 3);
            
            //first vertical line
            canvas_ctx.strokeStyle = '#545454';
            canvas_ctx.lineWidth = 15;
            canvas_ctx.beginPath();
            canvas_ctx.moveTo(cellSize, 0);
            canvas_ctx.lineTo(cellSize, cellSize * 3);
            canvas_ctx.stroke();

            //second vertical line
            canvas_ctx.strokeStyle = '#545454';
            canvas_ctx.lineWidth = 15;
            canvas_ctx.beginPath();
            canvas_ctx.moveTo(cellSize * 2, 0);
            canvas_ctx.lineTo(cellSize * 2, cellSize * 3);
            canvas_ctx.stroke();

            //first horizontal line
            canvas_ctx.strokeStyle = '#545454';
            canvas_ctx.lineWidth = 15;
            canvas_ctx.beginPath();
            canvas_ctx.moveTo(0, cellSize);
            canvas_ctx.lineTo(cellSize * 3, cellSize);
            canvas_ctx.stroke();

            //second horizontal line
            canvas_ctx.strokeStyle = '#545454';
            canvas_ctx.lineWidth = 15;
            canvas_ctx.beginPath();
            canvas_ctx.moveTo(0, cellSize * 2);
            canvas_ctx.lineTo(cellSize * 3, cellSize * 2);
            canvas_ctx.stroke();

        }


        function coordinatesXY (cell){
            let xx = (cell % 3) * cellSize;
            let yy = Math.floor(cell / 3) * cellSize;
            return {
                "x": xx, "y": yy,
            };
        }


        function drawXO(){
            for (let i = 0; i < field.length; i++) {
                let XY = coordinatesXY(i);
                canvas_ctx.save();
                canvas_ctx.translate(XY.x + cellSize/2,
                                    XY.y + cellSize/2);
                if (field[i] == X) {
                    canvas_ctx.strokeStyle = '#b86e9f';
                    canvas_ctx.lineWidth = 15;
                    canvas_ctx.beginPath();
                    canvas_ctx.moveTo(-cellSize/3, -cellSize/3);
                    canvas_ctx.lineTo(cellSize/3, cellSize/3);
                    canvas_ctx.moveTo(cellSize/3, -cellSize/3);
                    canvas_ctx.lineTo(-cellSize/3, cellSize/3);
                    canvas_ctx.stroke();
                } else if (field[i] == O) {
                    canvas_ctx.strokeStyle = '#32a2a8';
                    canvas_ctx.lineWidth = 15;
                    canvas_ctx.beginPath();
                    canvas_ctx.arc(0,0, cellSize/3, 7, 0,Math.PI);
                    canvas_ctx.stroke();
                }
                canvas_ctx.restore();
            }
            requestAnimationFrame(drawXO);
        }


        function mouseXY(a) {
            let x = a.pageX - canvas.offsetLeft;
            let y = a.pageY - canvas.offsetTop;
            mouse.x = x;
            mouse.y = y;
            
        }
        

        function controlPlayers(){
                count += 1;
                let turn = document.getElementById("turn");
                if (count % 2 == 0) {
                    turn.innerHTML = "Next turn: X" 
                } else {
                    turn.innerHTML = "Next turn: O"
                }
                return count;
            }


        function play(a){
            playgame(getCellByCoords(mouse.x, mouse.y));
        };


        function getCellByCoords (x, y) {
                let x1 = (Math.floor(x / cellSize) % 3);
                let x2 = (Math.floor(y / cellSize) * 3);
                return (x1 + x2);
            };
    

        drawField();
        drawXO();
}