import _ from 'lodash'
import * as PIXI from 'pixi.js'
import { pipeline } from 'stream';

let loader = PIXI.loader,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;

let app = new PIXI.Application({
    width: 512,
    height: 512,
    antialias: true,
    transparent: false,
    resolution: true
})

app.renderer.backgroundColor = 0x061639;
app.ticker.add(delta => gameLoop(delta));

document.body.appendChild(app.view);
let rocket;

loader
    .add('images/tileset.png')
    .load(() => {
        let texture = TextureCache["images/tileset.png"];
        let rectangle = new PIXI.Rectangle(192, 128, 64, 64);
        texture.frame = rectangle;
        rocket = new Sprite(texture);

        rocket.position.set(32, 32);

        app.stage.addChild(rocket);
        app.renderer.render(app.stage);

        app.ticker.add(delta => gameLoop(delta));
    });

function gameLoop(delta) {
    // move the rocket
    rocket.x += 1;

    if (rocket.x > app.renderer.width) {
        rocket.x = -rocket.width;
    }
}
  