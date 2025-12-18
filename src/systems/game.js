import { PriorityQueue } from 'skvr-priority-queue';

import updateSystem from './update.js';
import drawSystem from './draw.js';
import resizeSystem from './resize.js';
import pointerSystem from './pointer.js';
import dataSystem from './data.js';

/*if (document.monetization) {*/
    /*document.monetization.addEventListener(*/
        /*'monetizationstart',*/
        /*_ => {*/
            /*dataSystem.save('payed', true);*/
        /*}*/
    /*);*/
/*}*/

// if you pay peanuts, you get monkeys
dataSystem.save('payed', true);

const solver = new Worker('http://localhost:8000/test.html')

let setup = (entities) => {
    let game = entities.game;
    let ctx;
    let canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    let parent = document.querySelector(
        game.canvas.parentSelector
    );
    resizeSystem.resize(game, canvas);
    parent.appendChild(canvas);
    pointerSystem.add(game, canvas);
    let timer = 0;
    let delta = 0;
    let renderHelpMenu = false;
    let onF = time => {
        delta = time - timer;
        timer = time;
        //console.log(delta);

        resizeSystem.resize(game, canvas);

        let wasPointing = game.pointer.pointing;
        game.pointer.pointing = false;

        let updates = [];
        let draws = [];

        game.statemachine.active.forEach(id => {
            let entity = entities[id];
            if (entity.state === undefined) {
                return;
            }
            updates = [...updates, ...entity.state.updates];
            draws = [...draws, ...entity.state.draws];
        });
        
        let y = entities.game.pointer.y - (entities.game.canvas.gH - entities.game.canvas.tH) / 2;
        let x = entities.game.pointer.x - (entities.game.canvas.gW - entities.game.canvas.tW) / 2;
        if (y > 15 && y < 40 && x > 125 && x < 175 && !renderHelpMenu) {
            game.pointer.pointing = true;
            if (entities.game.pointer.justDown) {
                renderHelpMenu = true
                var grid = []
                for (let key in entities) {
                    if (key.includes("piece")) {
                        if (entities[key].hasOwnProperty('arrowdown')) {
                            grid.push(6)
                        } else if (entities[key].hasOwnProperty('arrowright')) {
                            grid.push(5)
                        } else if (entities[key].hasOwnProperty('neutronstar')) {
                            grid.push(8)
                        } else if (entities[key].hasOwnProperty('arrowleft')) {
                            grid.push(7)
                        } else if (entities[key].hasOwnProperty('blanksquare')) {
                            grid.push(2)
                        } else if (entities[key].hasOwnProperty('xsquare')) {
                            grid.push(3)
                        } else if (entities[key].hasOwnProperty('arrowup')) {
                            grid.push(4)
                        } else if (entities[key].hasOwnProperty('blackhole')) {
                            grid.push(1)
                        } else {
                            grid.push(0)
                        }
                    }
                }

                // for (let i = 0; i < 6; i++) {
                //     let string = ""
                //     for (let j = 0; j < 6; j++) {
                //         string += grid[i * 6 + j]
                //     }
                //     console.log(string)
                // }
                // console.log(entities)

                let taps = entities[entities.game.levels.sequence[entities.game.levels.current]].puzzle.taps

                solver.postMessage({grid, taps})
            }
        } else if (renderHelpMenu) {
            if (y > 15 && y < 40 && x > 145 && x < 170) {
                game.pointer.pointing = true;
                if (entities.game.pointer.justDown) {
                    renderHelpMenu = false
                }
            }
        }

        updateSystem.process(entities, updates, time, delta);

        // reset pointer
        game.pointer.justDown = false;
        game.pointer.justUp = false;

        if (wasPointing && !game.pointer.pointing) {
            canvas.style.cursor = 'default';
        } else if (!wasPointing && game.pointer.pointing) {
            canvas.style.cursor = 'pointer';
        }

        

        // clear canvas
        ctx.clearRect(0, 0, game.canvas.w, game.canvas.h);

        // draw stuff
        drawSystem.process(entities, draws, ctx, time, delta);

        if (!renderHelpMenu) {
            // Background of Button
            {            
            ctx.save();
            ctx.scale(
                entities.game.canvas.zoom,
                entities.game.canvas.zoom
            );
            ctx.translate(
                125 + entities.game.canvas.oX,
                15 + entities.game.canvas.oY
            );
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#4b8495";
            ctx.roundRect(0, 0, 50, 25, 5);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.restore();
            }
            // Button Text
            {
            ctx.save();
            ctx.scale(
                entities.game.canvas.zoom,
                entities.game.canvas.zoom
            );
            ctx.translate(
                135 + entities.game.canvas.oX,
                32 + entities.game.canvas.oY
            );
            let fontSize = 14;
            ctx.font = fontSize + 'px monospace';
            ctx.fillStyle = "#F2F7F6";
            ctx.fillText("Help", 0, 0);
            ctx.restore();
            }
        } else {
            // Background Fill
            {
            ctx.save();
            ctx.scale(
                entities.game.canvas.zoom,
                entities.game.canvas.zoom
            );
            ctx.translate(
                13 + entities.game.canvas.oX,
                60 + entities.game.canvas.oY
            );
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.fillStyle = "#1f363d";
            ctx.roundRect(0, 0, 295, 300, 5);
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.restore();
            }
            // Background Outline
            {
            ctx.save();
            ctx.scale(
                entities.game.canvas.zoom,
                entities.game.canvas.zoom
            );
            ctx.translate(
                13 + entities.game.canvas.oX,
                60 + entities.game.canvas.oY
            );
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#4b8495";
            ctx.roundRect(0, 0, 295, 300, 5);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.restore();
            }
            // Exit Button Outline
            {
                ctx.save();
                ctx.scale(
                    entities.game.canvas.zoom,
                    entities.game.canvas.zoom
                );
                ctx.translate(
                    145 + entities.game.canvas.oX,
                    15 + entities.game.canvas.oY
                );
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#4b8495";
                ctx.roundRect(0, 0, 25, 25, 5);
                ctx.stroke();
                ctx.lineWidth = 1;
                ctx.restore();  
            }
            // Exit Button Text
            {
            ctx.save();
            ctx.scale(
                entities.game.canvas.zoom,
                entities.game.canvas.zoom
            );
            ctx.translate(
                153 + entities.game.canvas.oX,
                32 + entities.game.canvas.oY
            );
            let fontSize = 14;
            ctx.font = fontSize + 'px monospace';
            ctx.fillStyle = "#F2F7F6";
            ctx.fillText("X", 0, 0);
            ctx.restore();
            }
        }


        // request next frame
        requestAnimationFrame(onF);
    };
    onF(0);
    return;
};

export default Object.freeze({
    setup
});
