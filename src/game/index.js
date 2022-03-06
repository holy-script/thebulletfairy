import Phaser from "phaser";
import { createPlayerAnimations } from "./player";
import { createExplosion } from "./player";
import { bulletTime } from "./player";
import { createEnemyAnimations } from "./enemy";
import { createEnemies } from "./enemy";
import levelOneTileset from "../assets/tileset/tiles_out_extruded.png";
import levelOneTileMap from "./levels/level1.json";
import playerSpriteSheet from "../assets/sprites/Player.png";
import wormSpriteSheet from "../assets/sprites/Worm.png";
import wormBulletSpriteSheet from "../assets/sprites/WormBullet.png";
import enemyARSpriteSheet from "../assets/sprites/ARMob.png";
import enemyRPGSpritesheet from "../assets/sprites/RPGmob.png";
import enemySniperSpritesheet from "../assets/sprites/SniperMob.png";
import arBullet from "../assets/sprites/AR_Bullet.png";
import rpgBullet from "../assets/sprites/RPG_Bullet.png";
import sniperBullet from "../assets/sprites/Sniper_Bullet.png";
import explosionRPG from "../assets/sprites/RPG_Explosion.png";
import wormExplosion from "../assets/sprites/WormExplosion.png";
import colorBackground from "../assets/bg/nuvens_3.png";
import cloudBackground from "../assets/bg/nuvens_2.png";
import cloudForeground from "../assets/bg/nuvens_1.png";
import rpgExpOgg from "../assets/audio/Explosion 42.ogg";
import rpgExpMp3 from "../assets/audio/Explosion 42.mp3";
import bgMusic1Ogg from "../assets/audio/Clement Panchout _ 80s Zombies Movie _ 2018.ogg";
import bgMusic1Mp3 from "../assets/audio/Clement Panchout _ 80s Zombies Movie _ 2018.mp3";
import playerShootOgg from "../assets/audio/Explosion 9 (1).ogg";
import playerShootMp3 from "../assets/audio/Explosion 9 (1).mp3";
import arShootOgg from "../assets/audio/Explosion 9 (2).ogg";
import arShootMp3 from "../assets/audio/Explosion 9 (2).mp3";
import sniperShootOgg from "../assets/audio/Explosion 9 (3).ogg";
import sniperShootMp3 from "../assets/audio/Explosion 9 (3).mp3";
import rpgShootOgg from "../assets/audio/Explosion 9.ogg";
import rpgShootMp3 from "../assets/audio/Explosion 9.mp3";
import wormShootOgg from "../assets/audio/Random 164.ogg";
import wormShootMp3 from "../assets/audio/Random 164.mp3";

function launch(containerId, store) {
    class MyGame extends Phaser.Scene {
        constructor() {
            super({
                key: "MyGame",
            });
        }

        preload() {
            this.load.image("tileset", levelOneTileset);
            this.load.tilemapTiledJSON("tilemap", levelOneTileMap);
            this.load.spritesheet("hero", playerSpriteSheet, {
                frameWidth: 45,
                frameHeight: 45,
            });
            this.load.spritesheet("badAR", enemyARSpriteSheet, {
                frameWidth: 32,
                frameHeight: 38,
            });
            this.load.spritesheet("badRPG", enemyRPGSpritesheet, {
                frameWidth: 44,
                frameHeight: 44,
            });
            this.load.spritesheet("badSniper", enemySniperSpritesheet, {
                frameWidth: 44,
                frameHeight: 44,
            });
            this.load.spritesheet("arBullet", arBullet, {
                frameWidth: 32,
                frameHeight: 38,
            });
            this.load.spritesheet("rpgBullet", rpgBullet, {
                frameWidth: 44,
                frameHeight: 44,
            });
            this.load.spritesheet("sniperBullet", sniperBullet, {
                frameWidth: 44,
                frameHeight: 44,
            });
            this.load.spritesheet("rpgExplosion", explosionRPG, {
                frameWidth: 32,
                frameHeight: 32,
            });
            this.load.spritesheet("wormExplosion", wormExplosion, {
                frameWidth: 46,
                frameHeight: 46,
            });
            this.load.spritesheet("badWorm", wormSpriteSheet, {
                frameWidth: 90,
                frameHeight: 90,
            });
            this.load.spritesheet("wormBullet", wormBulletSpriteSheet, {
                frameWidth: 46,
                frameHeight: 46,
            });
            this.load.image("colorBg", colorBackground);
            this.load.image("cloudBg", cloudBackground);
            this.load.image("cloudFg", cloudForeground);
            this.load.audio("rpgExplosion", [rpgExpOgg, rpgExpMp3]);
            this.load.audio("bgMusic1", [bgMusic1Ogg, bgMusic1Mp3]);
            this.load.audio("playerShoot", [playerShootOgg, playerShootMp3]);
            this.load.audio("arShoot", [arShootOgg, arShootMp3]);
            this.load.audio("sniperShoot", [sniperShootOgg, sniperShootMp3]);
            this.load.audio("rpgShoot", [rpgShootOgg, rpgShootMp3]);
            this.load.audio("wormShoot", [wormShootOgg, wormShootMp3]);
        }

        create() {
            this.playerHP = 2000;
            this.rpgExplosion = this.sound.add("rpgExplosion");
            this.bgMusic1 = this.sound.add("bgMusic1");
            this.bgMusic1.play({
                mute: false,
                volume: 0.1,
                loop: true,
            });
            this.playerShoot = this.sound.add("playerShoot");
            this.arShoot = this.sound.add("arShoot");
            this.sniperShoot = this.sound.add("sniperShoot");
            this.rpgShoot = this.sound.add("rpgShoot");
            this.wormShoot = this.sound.add("wormShoot");
            const cloudWidth = this.textures
                .get("cloudFg")
                .getSourceImage().width;
            const cloudHeight = this.textures
                .get("cloudFg")
                .getSourceImage().height;

            const map = this.make.tilemap({ key: "tilemap" });
            const mapWidth = map.widthInPixels * 2;
            const mapHeight = map.heightInPixels * 2;

            const tileset = map.addTilesetImage(
                "tiles_out_extruded",
                "tileset"
            );
            this.add
                .image(0, 0, "colorBg")
                .setOrigin(0, 0)
                .setScale(mapWidth / cloudWidth, mapHeight / cloudHeight)
                .setScrollFactor(0);
            for (
                let i = 0; i <
                Math.ceil(
                    (mapWidth / ((mapHeight / cloudHeight) * cloudWidth)) * 1.04
                ); i++
            ) {
                this.add
                    .image(
                        i * cloudWidth * (mapHeight / cloudHeight),
                        0,
                        "cloudBg"
                    )
                    .setOrigin(0, 0)
                    .setScale(mapHeight / cloudHeight, mapHeight / cloudHeight)
                    .setScrollFactor(1.04, 1);
            }
            for (
                let i = 0; i <
                Math.ceil(
                    (mapWidth / ((mapHeight / cloudHeight) * cloudWidth)) * 1.1
                ); i++
            ) {
                this.add
                    .image(
                        i * cloudWidth * (mapHeight / cloudHeight),
                        0,
                        "cloudFg"
                    )
                    .setOrigin(0, 0)
                    .setScale(mapHeight / cloudHeight, mapHeight / cloudHeight)
                    .setScrollFactor(1.1, 1);
            }
            map.createLayer("Behind", tileset).setScale(2, 2);
            map.createLayer("Above", tileset).setScale(2, 2).setDepth(1);
            const ground = map.createLayer("Ground", tileset);
            ground
                .setCollisionByProperty({
                    collides: true,
                })
                .setScale(2, 2);

            this.ground = ground;

            // const debugGraphics = this.add.graphics().setAlpha(0.75);
            // ground.renderDebug(debugGraphics, {
            //     tileColor: null, // Color of non-colliding tiles
            //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            // });
            // this.physics.world.createDebugGraphic();

            const spawnPlayer = map.findObject(
                "Spawns",
                (obj) => obj.name === "Player"
            );

            this.waterArea = map.findObject(
                "Spawns",
                (obj) => obj.name === "Water"
            );

            const hero = this.physics.add
                .sprite(spawnPlayer.x * 2, spawnPlayer.y * 2, "hero")
                .setScale(2)
                .setMaxVelocity(275, 400);

            this.createExplosion = createExplosion;
            createEnemyAnimations(this);

            this.areas = map
                .filterObjects("Spawns", (obj) => obj.name == "WatchArea")
                .map((area) => {
                    let rect = new Phaser.Geom.Rectangle(
                        area.x * 2,
                        area.y * 2,
                        area.width * 2,
                        area.height * 2
                    );
                    return [area.properties[0].value, rect];
                });

            const objArray = new Array(this.areas.length);
            const healths = new Array(this.areas.length);

            createEnemies(
                this,
                map,
                "EnemyAR",
                "badAR", [14, 28, 10, 10, 8, 10],
                objArray,
                healths
            );
            createEnemies(
                this,
                map,
                "EnemyRPG",
                "badRPG", [16, 25, 15, 19, 13, 19],
                objArray,
                healths
            );
            createEnemies(
                this,
                map,
                "EnemySniper",
                "badSniper", [13, 18, 20, 24, 10, 24],
                objArray,
                healths
            );
            createEnemies(
                this,
                map,
                "EnemyMiniBoss",
                "badWorm", [20, 30, 25, 25, 45, 25],
                objArray,
                healths
            );

            this.physics.add.collider(hero, ground);
            this.enemies = this.physics.add.group(objArray);

            this.enemies.on("found", (id) => {
                for (let [index, enemy] of objArray.entries()) {
                    if (index == id) {
                        let center = enemy.getCenter();
                        enemy.flipX = center.x > hero.x;
                        switch (enemy.name) {
                            case "ar":
                                enemy.body.setOffset(
                                    enemy.flipX ? 8 : 10,
                                    enemy.flipX ? 10 : 10
                                );
                                break;
                            case "sniper":
                                enemy.body.setOffset(
                                    enemy.flipX ? 20 : 10,
                                    enemy.flipX ? 24 : 24
                                );
                                break;
                            case "rpg":
                                enemy.body.setOffset(
                                    enemy.flipX ? 15 : 13,
                                    enemy.flipX ? 19 : 19
                                );
                                break;
                            case "worm":
                                enemy.body.setOffset(
                                    enemy.flipX ? 25 : 45,
                                    enemy.flipX ? 25 : 25
                                );
                                break;
                        }
                        if (enemy.visible) {
                            enemy.play(`${enemy.name}-shoot`, true);
                        }
                    }
                }
            });
            this.enemies.on("gone", (id) => {
                let enemy = objArray[id];
                enemy.play(`${enemy.name}-idle`, true);
            });
            this.enemies.on("death", (id) => {
                let enemy = objArray[id];
                enemy.visible = false;
            });

            hero.body.setSize(16, 30);
            hero.body.setOffset(15, 15);
            this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
            hero.setCollideWorldBounds(true);

            createPlayerAnimations(this);

            hero.play("idle", true);
            hero.on(
                Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "die",
                () => {
                    this.scene.pause();
                    alert("Game Over!\nPlease refresh page to try again.");
                }
            );
            hero.on("shooting", () => {
                const bullet = this.physics.add
                    .sprite(
                        hero.x,
                        hero.anims.currentAnim.key == "crouch-shoot" ?
                        hero.y + 15 :
                        hero.y + 1,
                        "sniperBullet"
                    )
                    .setScale(2)
                    .setVelocityX(hero.flipX ? -700 : 700);
                this.playerShoot.play({
                    volume: 0.3,
                });
                bullet.flipX = hero.flipX ? true : false;
                bullet.body.allowGravity = false;
                bullet.body.setSize(7, 3);
                bullet.body.setOffset(hero.flipX ? 23 : 15, 22);
                bullet.body.collideWorldBounds = true;
                bullet.body.onWorldBounds = true;
                this.physics.add.collider(bullet, ground, (obj) => {
                    obj.destroy();
                });
                this.physics.add.overlap(bullet, this.enemies, (obj, enemy) => {
                    healths[enemy.data] -= 350;
                    if (enemy.visible) obj.destroy();
                });
            });

            this.physics.world.on("worldbounds", (ctx) => {
                ctx.gameObject.destroy();
            });

            const camera = this.cameras.main;
            camera.startFollow(hero);
            camera.setBounds(0, 0, mapWidth, mapHeight);
            this.player = hero;
            this.cursors = this.input.keyboard.createCursorKeys();
            this.isDead = false;
            this.enter = this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.ENTER
            );
            this.engaged = -1;
            this.objArray = objArray;
            this.hero = hero;
            this.healthArray = healths;
        }

        async watchAreas(areas, x, y) {
            for (let area of areas) {
                if (area[1].contains(x, y)) this.enemies.emit("found", area[0]);
                else this.enemies.emit("gone", area[0]);
            }
        }
        async watchHealths(enemies, healths) {
            for (let enemy of enemies) {
                if (healths[enemy.data] <= 0) {
                    console.log(enemy.data);
                    console.log(healths);
                    this.enemies.emit("death", enemy.data);
                }
            }
        }

        update(time, delta) {
            this.watchAreas(this.areas, this.player.x, this.player.y);
            this.watchHealths(this.objArray, this.healthArray);
            if (!store.state.paused) {
                bulletTime(this, this.cursors.shift.isDown);
                const onGround = this.player.body.blocked.down;

                const isMoving =
                    this.cursors.left.isDown || this.cursors.right.isDown;
                const isJumping = this.cursors.up.isDown && onGround;
                const isCrouching = this.cursors.down.isDown;
                const isShooting = this.enter.isDown;

                // const view = this.cameras.main.worldView;
                // store.commit("cam", { x: view.x, y: view.y });

                const speed = onGround ? 275 : 200;

                this.player.setVelocityX(0);

                this.isDead = this.playerHP <= 0;

                const isDrowning =
                    this.player.x >= this.waterArea.x * 2 &&
                    this.player.x <=
                    this.waterArea.x * 2 + this.waterArea.width * 2 &&
                    this.player.y >= this.waterArea.y * 2;

                if (!this.isDead) {
                    if (this.cursors.left.isDown) {
                        this.player.flipX = true;
                        this.player.setVelocityX(-speed);
                    }
                    if (this.cursors.right.isDown) {
                        this.player.flipX = false;
                        this.player.setVelocityX(speed);
                    }
                    if (isJumping && onGround && !isCrouching) {
                        this.player.setVelocityX(0);
                        this.time.delayedCall(175, () => {
                            this.player.setVelocityY(-550);
                        });
                    }
                    if (isCrouching) {
                        this.player.setVelocityX(0);
                    }

                    if (!onGround) {
                        if (isShooting) this.player.play("jump-shoot", true);
                        else this.player.play("jump", true);
                        this.player.body.checkCollision.up = false;
                    } else {
                        if (isJumping) {
                            this.player.play("crouch");
                        } else if (isCrouching) {
                            if (isShooting)
                                this.player.play("crouch-shoot", true);
                            else this.player.play("crouch", true);
                        } else if (isMoving) {
                            if (isShooting) this.player.play("run-shoot", true);
                            else this.player.play("run", true);
                        } else {
                            if (isShooting)
                                this.player.play("idle-shoot", true);
                            else this.player.play("idle", true);
                        }
                        this.player.body.checkCollision.up = true;
                    }
                } else {
                    this.player.play("die", true);
                }

                let frame = this.player.anims.currentFrame.frame.name;
                let shootingFrame =
                    frame == 0 ||
                    frame == 8 ||
                    frame == 10 ||
                    frame == 18 ||
                    frame == 20 ||
                    frame == 22 ||
                    frame == 25 ||
                    frame == 27 ||
                    frame == 29 ||
                    frame == 31 ||
                    frame == 33 ||
                    frame == 35 ||
                    frame == 37 ||
                    frame == 39;
                if (shootingFrame) this.engaged++;
                else this.engaged = -1;
                if (this.engaged === 0) {
                    this.player.emit("shooting");
                }

                // Update the animation last and give left/right animations precedence over up/down animations
                // if (store.state.lookLeft) {
                //     this.player.flipX = true;
                // } else this.player.flipX = false;
                // if (store.state.moving) {
                //     this.player.play("run", true);
                // } else if (this.cursors.space.isDown) {
                //     this.player.play("hurt", true);
                // } else {
                //     this.player.play("idle", true);
                // }
            } else {
                this.player.stop();
                for (enemy of this.enemies) {
                    enemy.stop();
                }
            }
        }
    }

    class TitleScreen extends Phaser.Scene {
        constructor() {
            super({
                key: "Title",
            });
        }
        create() {
            // store.commit("Title");
            this.scene.start("MyGame");
        }
        update() {
            // if (store.state.start == true) {
            //     this.scene.start("MyGame");
            // }
        }
    }

    return new Phaser.Game({
        type: Phaser.AUTO,
        parent: containerId,
        width: window.innerWidth,
        height: window.innerHeight,
        scene: [TitleScreen, MyGame],
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 1000 },
            },
        },
    });
}

export default launch;
export { launch };