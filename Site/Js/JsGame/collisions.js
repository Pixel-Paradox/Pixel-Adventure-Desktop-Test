// Hang Tiled data

function splitArrayIntoChunks(array) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += 150) {
        chunkedArray.push(array.slice(i, 150 + i));
    }
    return chunkedArray;
}

const mapCollisionsAll = splitArrayIntoChunks(collisionsMapAll);
const mapCollisions1 = splitArrayIntoChunks(collisionsMap1);
const mapCollisions2 = splitArrayIntoChunks(collisionsMap2);

const mapWFront1 = splitArrayIntoChunks(wFrontMap1);

const offset = {
    x: -1350,
    y: -1400
};

const mapOfCollisionsAll = [];
const mapOfCollisions1 = [];
const mapOfCollisions2 = [];

const mapOfWFront1 = [];

function createBoundariesFromArray(array, boundaryList) {
    array.forEach(function(row, i) {
        row.forEach(function(symbol, j) {
            if (symbol !== 0) {
                boundaryList.push(new Boundary({position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }}));
            }
        });
    });
}

createBoundariesFromArray(mapCollisionsAll, mapOfCollisionsAll);
createBoundariesFromArray(mapCollisions1, mapOfCollisions1);
createBoundariesFromArray(mapCollisions2, mapOfCollisions2);

createBoundariesFromArray(mapWFront1, mapOfWFront1);

function rectangularCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}