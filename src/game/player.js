const createPlayerAnimations = (ctx) => {
    ctx.anims.create({
        key: "crouch-shoot",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 0,
            end: 1,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "crouch",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 2,
            end: 2,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "die",
        frameRate: 5,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 3,
            end: 7,
        }),
        repeat: 0,
    });
    ctx.anims.create({
        key: "idle-shoot-up",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 8,
            end: 9,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "idle-shoot",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 10,
            end: 11,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "idle",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 12,
            end: 17,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "jump-shoot-down",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 18,
            end: 19,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "jump-shoot-up",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 20,
            end: 21,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "jump-shoot",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 22,
            end: 23,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "jump",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 24,
            end: 24,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "run-shoot-up",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 25,
            end: 32,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "run-shoot",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 33,
            end: 40,
        }),
        repeat: -1,
    });
    ctx.anims.create({
        key: "run",
        frameRate: 10,
        frames: ctx.anims.generateFrameNumbers("hero", {
            start: 41,
            end: 48,
        }),
        repeat: -1,
    });
};
const createExplosion = async(ctx, bullet, key) => {
    const explode = ctx.physics.add
        .sprite(bullet.x, bullet.y, `${key}Explosion`)
        .setScale(2);
    explode.body.allowGravity = false;
    explode.play(`${key}-explosion`);
    ctx.rpgExplosion.play();
    explode.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        explode.destroy();
    });
};
const bulletTime = async(ctx, key) => {
    if (key) {
        ctx.physics.world.timeScale = 3.0;
        ctx.physics.world.setFPS(180);
        ctx.player.anims.msPerFrame = 125;
        for (let enemy of ctx.objArray) enemy.anims.msPerFrame = 200;
    } else {
        ctx.physics.world.timeScale = 1.0;
        ctx.physics.world.setFPS(60);
        ctx.player.anims.msPerFrame = 100;
        for (let enemy of ctx.objArray) enemy.anims.msPerFrame = 100;
    }
};
export { createPlayerAnimations };
export { createExplosion };
export { bulletTime };