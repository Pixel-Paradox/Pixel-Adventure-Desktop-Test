const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let playerSpeed = 2;

let base = "map1";



function animate() {
    window.requestAnimationFrame(animate);

    let moving = true;
    
    c.clearRect(0, 0, canvas.width, canvas.height);

    if(base === "map1") {
        backgroundMap.draw();
        player.sprite.draw();
        foregroundMap1.draw();

        mapOfCollisionsAll.forEach(mapOfCollisionAll => {
            mapOfCollisionAll.draw()
        });
        mapOfCollisions1.forEach(mapOfCollision1 => {
            mapOfCollision1.draw()
        });

        mapOfWFront1.forEach(mapOfwFront1 => {
            mapOfwFront1.draw()
        });

        collisions.length = 0;
        collisions.push(...mapOfCollisionsAll)
        collisions.push(...mapOfCollisions1)

        test = false;
    } else if(base === "map2") {
        backgroundMap.draw();
        player.sprite.draw();
        foregroundMap2.draw();

        mapOfCollisionsAll.forEach(mapOfCollisionAll => {
            mapOfCollisionAll.draw()
        });

        mapOfCollisions2.forEach(mapOfCollision2 => {
            mapOfCollision2.draw()
        });

        mapOfWFront1.forEach(mapOfwFront1 => {
            mapOfwFront1.draw()
        });

        collisions.length = 0;
        collisions.push(...mapOfCollisionsAll)
        collisions.push(...mapOfCollisions2)
    }




        
    player.sprite.moving = false;
        
        if(!menuKeys) {
            if (keys.w.pressed && lastKey === "w") {

                player.sprite.moving = true;
                player.sprite.image = player.sprite.sprites.up;

                for (let i = 0; i < collisions.length; i++) {
                    const boundary = collisions[i];
                
                    if (
                        rectangularCollision({
                            rectangle1: player.sprite,
                            rectangle2: {
                                ...boundary,
                                position: {
                                    x: boundary.position.x,
                                    y: boundary.position.y + 2
                                }
                            }
                        })
                    ) {
                        moving = false;
                        player.sprite.moving = false;
                        break;
                    }
                }

                for (let i = 0; i < mapOfWFront1.length; i++) {
                    const boundary = mapOfWFront1[i];
                
                    if (
                        rectangularCollision({
                            rectangle1: player.sprite,
                            rectangle2: {
                                ...boundary,
                                position: {
                                    x: boundary.position.x,
                                    y: boundary.position.y + 2
                                }
                            }
                        })
                    ) {
                        base = "map2";
                        break;
                    }
                }

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.y += playerSpeed;
                    })
                }
            }

            else if (keys.s.pressed && lastKey === "s") {

                player.sprite.moving = true;
                player.sprite.image = player.sprite.sprites.down;

                // Collision

                    for (let i = 0; i < collisions.length; i++) {
                        const boundary = collisions[i];
                        if(
                            rectangularCollision({
                                rectangle1: player.sprite,
                                rectangle2: {...boundary, position: {
                                    x: boundary.position.x,
                                    y: boundary.position.y - 2
                                }}
                            })
                        ){
                            moving = false;
                            player.sprite.moving = false;
                            break;
                        }
                    }


                    for (let i = 0; i < mapOfWFront1.length; i++) {
                        const boundary = mapOfWFront1[i];
                    
                        if (
                            rectangularCollision({
                                rectangle1: player.sprite,
                                rectangle2: {
                                    ...boundary,
                                    position: {
                                        x: boundary.position.x,
                                        y: boundary.position.y - 2
                                    }
                                }
                            })
                        ) {
                            base = "map1";
                            break;
                        }
                    }

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.y -= playerSpeed;
                    })
                }
            }

            else if (keys.a.pressed && lastKey === "a") {

                player.sprite.moving = true;
                player.sprite.image = player.sprite.sprites.left;

                //Collision

                    for (let i = 0; i < collisions.length; i++) {
                        const boundary = collisions[i];
                        if(
                            rectangularCollision({
                                rectangle1: player.sprite,
                                rectangle2: {...boundary, position: {
                                    x: boundary.position.x + 2,
                                    y: boundary.position.y
                                }}
                            })
                        ){
                            moving = false;
                            player.sprite.moving = false;
                            break;
                        }
                    }

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.x += playerSpeed;
                    })
                }
            }

            else if (keys.d.pressed && lastKey === "d") {

                player.sprite.moving = true;
                player.sprite.image = player.sprite.sprites.right;

                // Collision

                    for (let i = 0; i < collisions.length; i++) {
                        const boundary = collisions[i];
                        if(
                            rectangularCollision({
                                rectangle1: player.sprite,
                                rectangle2: {...boundary, position: {
                                    x: boundary.position.x - 2,
                                    y: boundary.position.y
                                }}
                            })
                        ){
                            moving = false;
                            player.sprite.moving = false;
                            break;
                        }
                    }

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.x -= playerSpeed;
                    })
                }
            }
        }
    }
animate()

let lastKey = "";

window.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            lastKey = "w";
            break;
        case "a":
            keys.a.pressed = true;
            lastKey = "a";
            break;
        case "s":
            keys.s.pressed = true;
            lastKey = "s";
            break;
        case "d":
            keys.d.pressed = true;
            lastKey = "d";
            break;        
    }
});

window.addEventListener("keyup", function(e) {
    switch (e.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;        
    }
});

window.addEventListener("blur", function() {
    keys.w.pressed = false;
    keys.a.pressed = false;
    keys.s.pressed = false;
    keys.d.pressed = false;
    lastKey = "";
});

window.addEventListener("focus", function() {
    lastKey = "";
});