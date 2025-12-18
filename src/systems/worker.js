import { PriorityQueue } from 'skvr-priority-queue';

class nullnum {

};

function moveUp(grid, index) {
    if (index > 5) {
        let tileAheadToCheck = 1;
        let finished = false;

        while (!finished) {
            if (index - (6 * tileAheadToCheck) <= 35 && index - (6 * tileAheadToCheck) >= 0 && grid[index - (6 * tileAheadToCheck)] != 0 && grid[index - (6 * tileAheadToCheck)] != 1) {
                tileAheadToCheck++;
            } else if (index - (6 * tileAheadToCheck) <= 35 && index - (6 * tileAheadToCheck) >= 0) {
                if (grid[index - (6 * tileAheadToCheck)] == 0) {
                    for (let i = tileAheadToCheck; i > 0; i--) {
                        grid[index - (6 * i)] = grid[index - (6 * (i - 1))];
                        grid[index - (6 * (i - 1))] = 0;
                    }
                    finished = true;
                } else if (grid[index - (6 * tileAheadToCheck)] == 1) {
                    for (let i = tileAheadToCheck; i > 0; i--) {
                        if (grid[index - (6 * i)] != 1)
                            grid[index - (6 * i)] = grid[index - (6 * (i - 1))];
                        grid[index - (6 * (i - 1))] = 0;
                    }

                    if (tileAheadToCheck == 1) {
                        grid[index] = 0;
                    }
                    finished = true;
                }
            } else {
                finished = true;
            }
        }
    }
}

function moveRight(grid, index) {
    if (index != 5 && index != 11 && index != 17 && index != 23 && index != 29 && index != 35) {
        let tileAheadToCheck = 1;
        let finished = false;

        while (!finished) {
            if (index + tileAheadToCheck <= 35 && index + tileAheadToCheck >= 0 && grid[index + tileAheadToCheck] != 0 && grid[index + tileAheadToCheck] != 1) {
                tileAheadToCheck++;
            } else if (index + tileAheadToCheck <= 35 && index + tileAheadToCheck >= 0) {
                if (grid[index + tileAheadToCheck] == 0) {
                    for (let i = tileAheadToCheck; i > 0; i--) {
                        grid[index + i] = grid[index + i - 1];
                        grid[index + i - 1] = 0;
                    }
                    finished = true;
                } else if (grid[index + tileAheadToCheck] == 1) {
                    for (let i = tileAheadToCheck; i > 0; i--) {
                        if (grid[index + i] != 1)
                            grid[index + i] = grid[index + i - 1];
                        grid[index + i - 1] = 0;
                    }

                    if (tileAheadToCheck == 1) {
                        grid[index] = 0;    
                    }
                    finished = true;
                }
            } else {
                finished = true;
            }
        }
    }
}

function moveDown(grid, index) {
    if (index < 30) {
        let tileAheadToCheck = 1;
        let finished = false;

        while (!finished) {
            if (index + (6 * tileAheadToCheck) <= 35 && index + (6 * tileAheadToCheck) >= 0 && grid[index + (6 * tileAheadToCheck)] != 0 && grid[index + (6 * tileAheadToCheck)] != 1) {
                tileAheadToCheck++;
            } else if (index + (6 * tileAheadToCheck) <= 35 && index + (6 * tileAheadToCheck) >= 0) {
                if (grid[index + (6 * tileAheadToCheck)] == 0) {
                    for (let i = tileAheadToCheck; i > 0; i--) {
                        grid[index + (6 * i)] = grid[index + (6 * (i - 1))];
                        grid[index + (6 * (i - 1))] = 0;
                    }
                    finished = true;
                } else if (grid[index + (6 * tileAheadToCheck)] == 1) {
                    for (let i = tileAheadToCheck; i > 0; i--) {
                        if (grid[index + (6 * i)] != 1)
                            grid[index + (6 * i)] = grid[index + (6 * (i - 1))];
                        grid[index + (6 * (i - 1))] = 0;
                    }

                    if (tileAheadToCheck == 1) {
                        grid[index] = 0;    
                    }
                    finished = true;
                }
            } else {
                finished = true;
            }
        }
    }
}

function moveLeft(grid, index) {
    if (index != 0 && index != 6 && index != 12 && index != 18 && index != 24 && index != 30) {
        let tileAheadToCheck = 1;
        let finished = false;

        while (!finished) {
            if (index - tileAheadToCheck <= 35 && index - tileAheadToCheck >= 0 && grid[index - tileAheadToCheck] != 0 && grid[index - tileAheadToCheck] != 1) {
                tileAheadToCheck++;
            } else if (index - tileAheadToCheck <= 35 && index - tileAheadToCheck >= 0) {
                if (grid[index - tileAheadToCheck] == 0) {
                    for (let i = tileAheadToCheck; i > 0; i--) {
                        grid[index - i] = grid[index - i + 1];
                        grid[index - i + 1] = 0;
                    }
                    finished = true;
                } else if (grid[index - tileAheadToCheck] == 1) {
                    for (let i = tileAheadToCheck; i > 0; i--) {
                        if (grid[index - i] != 1)
                            grid[index - i] = grid[index - i + 1];
                        grid[index - i + 1] = 0;
                    }

                    if (tileAheadToCheck == 1) {
                        grid[index] = 0;    
                    }
                    finished = true;
                }
            } else {
                finished = true;
            }
        }
    }
}


function clickTile(grid, index) {
    let tile = grid[index]

    switch (tile) {
        case 3:
            grid[index] = 0;
            break;
        case 4:
            moveUp(grid, index);
            break;
        case 5:
            moveRight(grid, index);
            break;
        case 6:
            moveDown(grid, index);
            break;
        case 7:
            moveLeft(grid, index);
            break;
        case 8:
            grid[index] = 1;
            break;
    }
}

function minHeapGrid(a, b) {
    return a.score < b.score
}

function getTilesRemaning(grid) {
    let tiles = 0;
    for (let i = 0; i < 36; i++) {
        if (grid[i] != 0 && grid[i] != 1) {
            tiles++;
        }
    }

    return tiles;
}

function encodeGrid(grid) {
    // grid is an array of 36 numbers (0–255)
    // join("") is fast and compact
    return grid.join("");
}

self.onmessage = ({ data: { grid, taps } }) => {
    console.time('myTask');
    let startSate = {
        grid: Array.from(grid),
        tileRemaining: getTilesRemaning(grid),
        movesPlayed: 0,
        score: getTilesRemaning(grid),
        path: []
    };
  
    let open = new PriorityQueue();
    open.setHeapFunc(minHeapGrid);
    open.push(startSate)
  
    let visited = new Set();
  
    while (!open.isEmpty()) {
        //console.log(open.data)
        var current = open.pop();

        if (!current) {
            console.log("unsolveable");
            console.timeEnd('myTask');
            break;
        }
        // for (let i = 0; i < 6; i++) {
        //     let string = ""
        //     for (let j = 0; j < 6; j++) {
        //         string += current.grid[i * 6 + j]
        //     }
        //     console.log(string)
        // }
        // console.log("------")
  
        if (getTilesRemaning(current.grid) == 0) {
            console.log("Solution found in " + current.path.length + " moves");
  
            for (let i = 0; i < current.path.length; i++) {
                console.log("Click Tile at (" + Math.floor(current.path[i] / 6) + ", " + Math.floor(current.path[i] % 6) + ")")
            }
            
            console.timeEnd('myTask');
            break;
        }
  
  
        if (visited.has(encodeGrid(current.grid)))
            continue;
  
        visited.add(encodeGrid(current.grid));
  
        //console.log("Possible")
        for (let i = 0; i < 36; i++) {
            if (current.grid[i] != 0 && current.grid[i] != 1 && current.grid[i] != 2) {
                let newGrid = Array.from(current.grid); 
                clickTile(newGrid, i);

                if (newGrid.join(",") === current.grid.join(","))
                    continue;
                              
                let newState = {
                    grid: newGrid,
                    tileRemaining: getTilesRemaning(newGrid),
                    movesPlayed: current.movesPlayed + 1,
                    score: getTilesRemaning(newGrid) + current.movesPlayed + 1,
                    path: Array.from(current.path)
                };
                newState.path.push(i);
  
                if (newState.movesPlayed > taps)
                    continue;
                              
  
                if (!visited.has(encodeGrid(newState.grid)))
                    open.push(newState);
            }
        }
    }
};