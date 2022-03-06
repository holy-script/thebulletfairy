const createEnemyAnimations = (ctx) => {
    ctx.anims.create({
        key: "ar-idle",
        frameRate: 8,
        frames: ctx.anims.generateFrameNumbers("badAR", {
            start: 0,
            end: 0,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "ar-shoot",
        frameRate: 8,
        frames: ctx.anims.generateFrameNumbers("badAR", {
            start: 1,
            end: 4,
        }),
        repeat: 0,
    });
    ctx.anims.create({
        key: "ar-lookup-shoot",
        frameRate: 8,
        frames: ctx.anims.generateFrameNumbers("badAR", {
            start: 5,
            end: 7,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "ar-lookdown-shoot",
        frameRate: 8,
        frames: ctx.anims.generateFrameNumbers("badAR", {
            start: 8,
            end: 10,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "ar-run",
        frameRate: 8,
        frames: ctx.anims.generateFrameNumbers("badAR", {
            start: 11,
            end: 18,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "ar-die",
        frameRate: 5,
        frames: ctx.anims.generateFrameNumbers("badAR", {
            start: 19,
            end: 21,
        }),
        repeat: 0,
    });
    ctx.anims.create({
        key: "rpg-idle",
        frameRate: 8,
        frames: ctx.anims.generateFrameNumbers("badRPG", {
            start: 0,
            end: 0,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "rpg-shoot",
        frameRate: 8,
        frames: ctx.anims.generateFrameNumbers("badRPG", {
            start: 1,
            end: 5,
        }),
        repeat: -1,
        repeatDelay: 1500,
    });
    ctx.anims.create({
        key: "rpg-die",
        frameRate: 5,
        frames: ctx.anims.generateFrameNumbers("badRPG", {
            start: 6,
            end: 9,
        }),
        repeat: 0,
    });
    ctx.anims.create({
        key: "sniper-idle",
        frameRate: 8,
        frames: ctx.anims.generateFrameNumbers("badSniper", {
            start: 0,
            end: 0,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "sniper-shoot",
        frameRate: 8,
        frames: ctx.anims.generateFrameNumbers("badSniper", {
            start: 1,
            end: 8,
        }),
        repeat: 0,
    });
    ctx.anims.create({
        key: "sniper-die",
        frameRate: 5,
        frames: ctx.anims.generateFrameNumbers("badSniper", {
            start: 9,
            end: 12,
        }),
        repeat: 0,
    });
    ctx.anims.create({
        key: "worm-idle",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("badWorm", {
            start: 0,
            end: 8,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "worm-walk",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("badWorm", {
            start: 9,
            end: 17,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "worm-shoot",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("badWorm", {
            start: 18,
            end: 33,
        }),
        repeat: 0,
    });
    ctx.anims.create({
        key: "worm-hurt",
        frameRate: 5,
        frames: ctx.anims.generateFrameNumbers("badWorm", {
            start: 34,
            end: 36,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "worm-die",
        frameRate: 5,
        frames: ctx.anims.generateFrameNumbers("badWorm", {
            start: 37,
            end: 44,
        }),
        repeat: 0,
    });
    ctx.anims.create({
        key: "worm-bullet",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("wormBullet", {
            start: 0,
            end: 5,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "worm-explosion",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("wormExplosion", {
            start: 0,
            end: 6,
        }),
        repeat: 0,
    });
    ctx.anims.create({
        key: "rpg-explosion",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("rpgExplosion", {
            start: 0,
            end: 8,
        }),
        repeat: 0,
    });
};
const createEnemies = (ctx, map, mapKey, spriteKey, bodyMeasures, arr) => {
    map.filterObjects("Spawns", (obj) => obj.name === mapKey).forEach(
        (enemy) => {
            let isFlipped = enemy.properties[1].value;
            let id = enemy.properties[0].value;
            enemy = ctx.physics.add
                .sprite(enemy.x * 2, enemy.y * 2, spriteKey)
                .setScale(2)
                .setMaxVelocity(275);
            enemy.flipX = isFlipped;
            ctx.physics.add.collider(enemy, ctx.ground);
            enemy.body.setSize(bodyMeasures[0], bodyMeasures[1]);
            enemy.body.setOffset(
                isFlipped ? bodyMeasures[2] : bodyMeasures[4],
                isFlipped ? bodyMeasures[3] : bodyMeasures[5]
            );
            let animKey = spriteKey.replace("bad", "").toLowerCase();
            enemy.play(`${animKey}-idle`, true);
            enemy.name = animKey;
            enemy.on(
                Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +
                `${animKey}-die`,
                () => {
                    console.log(`${animKey.toUpperCase()} dead!`);
                }
            );
            enemy.on(Phaser.Animations.Events.ANIMATION_START, (anim) => {
                if (
                    anim.key == `${animKey}-shoot` &&
                    (animKey == "ar" || animKey == "sniper" || animKey == "rpg")
                ) {
                    const bullet = ctx.physics.add
                        .sprite(enemy.x, enemy.y, `${animKey}Bullet`)
                        .setScale(2)
                        .setVelocityX(enemy.flipX ? -500 : 500);
                    bullet.flipX = enemy.flipX ? true : false;
                    bullet.body.allowGravity = false;
                    switch (enemy.name) {
                        case "ar":
                            bullet.setY(bullet.y + 5);
                            bullet.body.setSize(2, 2);
                            bullet.body.setOffset(
                                enemy.flipX ? 15 : 16,
                                enemy.flipX ? 15 : 15
                            );
                            break;
                        case "sniper":
                            bullet.body.setSize(7, 3);
                            bullet.body.setOffset(
                                enemy.flipX ? 23 : 15,
                                enemy.flipX ? 22 : 22
                            );
                            break;
                        case "rpg":
                            bullet.body.allowGravity = true;
                            bullet.body.gravity.y = -500;
                            bullet.setMaxVelocity(800);
                            let bombSpeed =
                                Math.abs(enemy.x - ctx.hero.x) /
                                Math.sqrt(
                                    (2 * Math.abs(enemy.y - ctx.hero.y)) / 500
                                );
                            bullet.setVelocityX(
                                bullet.flipX ? -bombSpeed : bombSpeed
                            );
                            bullet.body.setSize(7, 3);
                            bullet.body.setOffset(
                                enemy.flipX ? 19 : 19,
                                enemy.flipX ? 22 : 22
                            );
                    }
                    bullet.body.collideWorldBounds = true;
                    bullet.body.onWorldBounds = true;
                    ctx.physics.add.collider(bullet, ctx.ground, (obj) => {
                        if (enemy.name == "rpg")
                            ctx.createExplosion(ctx, obj, enemy.name);
                        obj.destroy();
                    });
                    ctx.physics.add.overlap(bullet, ctx.hero, (obj) => {
                        if (enemy.name == "rpg")
                            ctx.createExplosion(ctx, obj, enemy.name);
                        obj.destroy();
                    });
                }
            });
            enemy.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key == `${animKey}-shoot` && animKey == "worm") {
                    const bullet = ctx.physics.add
                        .sprite(enemy.x, enemy.y, `${animKey}Bullet`)
                        .setScale(2)
                        .setVelocityX(enemy.flipX ? -500 : 500);
                    bullet.flipX = enemy.flipX ? true : false;
                    bullet.body.allowGravity = false;
                    bullet.setY(bullet.y - 15);
                    bullet.setX(bullet.flipX ? bullet.x - 50 : bullet.x + 50);
                    bullet.body.setSize(10, 10);
                    bullet.body.setOffset(
                        enemy.flipX ? 15 : 20,
                        enemy.flipX ? 20 : 20
                    );
                    bullet.play("worm-bullet", true);
                    bullet.body.collideWorldBounds = true;
                    bullet.body.onWorldBounds = true;
                    ctx.physics.add.collider(bullet, ctx.ground, (obj) => {
                        ctx.createExplosion(ctx, obj, enemy.name);
                        obj.destroy();
                    });
                    ctx.physics.add.overlap(bullet, ctx.hero, (obj) => {
                        ctx.createExplosion(ctx, obj, enemy.name);
                        obj.destroy();
                    });
                }
            });
            enemy.on(Phaser.Animations.Events.ANIMATION_REPEAT, (anim) => {
                if (anim.key == `${animKey}-shoot` && animKey == "rpg") {
                    const bullet = ctx.physics.add
                        .sprite(enemy.x, enemy.y, `${animKey}Bullet`)
                        .setScale(2)
                        .setVelocityX(enemy.flipX ? -500 : 500);
                    bullet.flipX = enemy.flipX ? true : false;
                    bullet.body.setSize(7, 3);
                    bullet.body.setOffset(
                        enemy.flipX ? 19 : 19,
                        enemy.flipX ? 22 : 22
                    );
                    bullet.body.allowGravity = true;
                    bullet.body.gravity.y = -500;
                    bullet.setMaxVelocity(800);
                    let bombSpeed =
                        Math.abs(enemy.x - ctx.hero.x) /
                        Math.sqrt((2 * Math.abs(enemy.y - ctx.hero.y)) / 500);
                    bullet.setVelocityX(bullet.flipX ? -bombSpeed : bombSpeed);
                    bullet.body.collideWorldBounds = true;
                    bullet.body.onWorldBounds = true;
                    ctx.physics.add.collider(bullet, ctx.ground, (obj) => {
                        ctx.createExplosion(ctx, obj, enemy.name);
                        obj.destroy();
                    });
                    ctx.physics.add.overlap(bullet, ctx.hero, (obj) => {
                        ctx.createExplosion(ctx, obj, enemy.name);
                        obj.destroy();
                    });
                }
            });
            arr[id] = enemy;
        }
    );
};
export { createEnemyAnimations };
export { createEnemies };