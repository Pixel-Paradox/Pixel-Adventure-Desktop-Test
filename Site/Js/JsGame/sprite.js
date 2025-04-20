function createVillagerTest(path1, path2, path3, path4, path5, x, y) {
    const villagerTestImage1 = new Image();
    villagerTestImage1.src = path1;
    const villagerTestImage2 = new Image();
    villagerTestImage2.src = path2;
    const villagerTestImage3 = new Image();
    villagerTestImage3.src = path3;
    const villagerTestImage4 = new Image();
    villagerTestImage4.src = path4;
    const villagerTestImage5 = new Image();
    villagerTestImage5.src = path5;
    
    return {
        sprite: new Sprite({
            position: {
                x: canvas.width / 2 + x,
                y: canvas.height / 2 + y
            },
            frames: {
                max: 4
            },
            image: villagerTestImage5,
            sprites: {
                up: villagerTestImage2,
                down: villagerTestImage1,
                left: villagerTestImage4,
                right: villagerTestImage3
            }
        })
    };
}

// Player

const player = createVillagerTest('./Site/ImageGame/Sprites/player1.png', './Site/ImageGame/Sprites/player2.png', './Site/ImageGame/Sprites/player3.png', './Site/ImageGame/Sprites/player4.png', './Site/ImageGame/Sprites/player1.png', -10, -16.1);

function createBg(path) {
    const bgImage = new Image();
    bgImage.src = path;
    
    return new Sprite ({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: bgImage
    });
}

// Background

const backgroundMap = createBg('./Site/ImageGame/map.png');

const foregroundMap1 = createBg('./Site/ImageGame/mapForeground1.png');
const foregroundMap2 = createBg('./Site/ImageGame/mapForeground2.png');

const collisions = [
    ...mapOfCollisionsAll,
    ...mapOfCollisions1
];

const movable = [
    backgroundMap, 
    foregroundMap1,
    foregroundMap2,
    ...mapOfCollisionsAll,
    ...mapOfCollisions1,
    ...mapOfCollisions2,
    ...mapOfWFront1
];