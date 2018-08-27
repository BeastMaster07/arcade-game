let allEnemies = [];
let Engine = (function(global) {
    let doc = global.document, win = global.window, canvas = doc.createElement('canvas'), ctx = canvas.getContext('2d'), lastTime;
    canvas.width = 606;
    canvas.height = 600;
    doc.body.appendChild(canvas);
    function main() {
        let now = Date.now()
          , dt = (now - lastTime) / 1000.0;
        render();
        update(dt);
        lastTime = now;
        win.requestAnimationFrame(main);
    }
    function init() {
        lastTime = Date.now();
        main();
    }
    function update(dt) {
        updateEntities(dt);
    }
    function updateEntities(dt) {
        player.update();
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        stone.update();
    }
    function render() {
        let rowImages = ['images/water-block.png', 'images/stone-block.png', 'images/stone-block.png', 'images/stone-block.png', 'images/grass-block.png', 'images/grass-block.png', 'images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'], numRows = 7, numCols = 6, row, col;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (row = 0; row < numRows - 1; row++) {
            for (col = 1; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        let count = 0;
        for (let a = 6; a <= 10; a++) {
            ctx.drawImage(Resources.get(rowImages[a]), 0, count * 110);
            count++;
        }
        renderEntities();
    }
    let character1Height = (ctx.canvas.clientHeight + ctx.canvas.clientHeight * 0.25) / 5
      , otherCharacterHeight = (ctx.canvas.clientHeight - ctx.canvas.clientHeight * 0.1) / 5;
    function renderEntities() {
        player.render();
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        stone.render();
        star.render();
        heart.render();
    }
    Resources.load(['images/stone-block.png', 'images/water-block.png', 'images/grass-block.png', 'images/enemy-bug.png', 'images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png', 'images/Rock.png', 'images/Star.png', 'images/Heart.png']);
    Resources.onReady(init);
    global.ctx = ctx;
    function selectSprite() {
        let canvasArea = document.getElementsByTagName('canvas');
        canvasArea[0].onclick = function(event) {
            console.log(event);
            if (event.layerX < 110 && event.layerY > (character1Height + (otherCharacterHeight * 3))) {
                player.sprite = 'images/char-princess-girl.png';
            } else if (event.layerX < 110 && event.layerY > (character1Height + (otherCharacterHeight * 2))) {
                player.sprite = 'images/char-pink-girl.png';
            } else if (event.layerX < 110 && event.layerY > (character1Height + otherCharacterHeight)) {
                player.sprite = 'images/char-horn-girl.png';
            } else if (event.layerX < 110 && event.layerY > character1Height) {
                player.sprite = 'images/char-cat-girl.png';
            } else if (event.layerX < 110 && event.layerY < character1Height) {
                console.log('boy')
                player.sprite = 'images/char-boy.png';
            }
        }
        ;
    }
    selectSprite();
    let bodySelect = document.getElementsByTagName('body');
    let divNode = doc.createElement('DIV');
    divNode.setAttribute('id', 'score');
    bodySelect[0].appendChild(divNode);
    let divNode1 = doc.createElement('DIV');
    divNode1.setAttribute('id', 'leader');
    bodySelect[0].appendChild(divNode1);
}
)(this);
