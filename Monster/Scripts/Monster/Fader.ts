/// <reference path="../endgate-0.2.1.d.ts" />
module Monster {
    export class Fader {
        public static FadeIn(gameTime: eg.GameTime, sprite: eg.Graphics.Sprite2d, rate: number) : number{
            if (sprite.Opacity === 1) return 0;
            sprite.Opacity += gameTime.Elapsed.Seconds * rate;
            if (sprite.Opacity > 1) {
                sprite.Opacity = 1;
                return 0;
            }
            return 1;
        }
        public static FadeOut(gameTime: eg.GameTime, sprite: eg.Graphics.Sprite2d, rate: number) : number {
            if (sprite.Opacity === 0) return 0;
            sprite.Opacity -= gameTime.Elapsed.Seconds * rate;
            if (sprite.Opacity < 0) {
                sprite.Opacity = 0;
                return 0;
            }
            return 1;
        }
    }
}