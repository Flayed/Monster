/// <reference path="../endgate-0.2.1.d.ts" />
module Monster {
    export class Fader {
        public static FadeInSprite(gameTime: eg.GameTime, sprite: eg.Graphics.Sprite2d, rate: number, targetOpacity: number = 1) : number{
            if (targetOpacity > 1) targetOpacity = 1;
            if (sprite.Opacity === targetOpacity) return 0;
            sprite.Opacity += gameTime.Elapsed.Seconds * rate;
            if (sprite.Opacity > targetOpacity) {
                sprite.Opacity = targetOpacity;
                return 0;
            }
            return 1;
        }
        public static FadeInShape(gameTime: eg.GameTime, shape: eg.Graphics.Shape, rate: number, targetOpacity: number = 1): number {
            if (targetOpacity > 1) targetOpacity = 1;
            if (shape.Opacity === targetOpacity) return 0;
            shape.Opacity += gameTime.Elapsed.Seconds * rate;
            if (shape.Opacity > targetOpacity) {
                shape.Opacity = targetOpacity;
                return 0;
            }
            return 1;
        }
        public static FadeOutSprite(gameTime: eg.GameTime, sprite: eg.Graphics.Sprite2d, rate: number) : number {
            if (sprite.Opacity === 0) return 0;
            sprite.Opacity -= gameTime.Elapsed.Seconds * rate;
            if (sprite.Opacity < 0) {
                sprite.Opacity = 0;
                return 0;
            }
            return 1;
        }
        public static FadeOutShape(gameTime: eg.GameTime, shape: eg.Graphics.Shape, rate: number): number {
            if (shape.Opacity === 0) return 0;
            shape.Opacity -= gameTime.Elapsed.Seconds * rate;
            if (shape.Opacity < 0) {
                shape.Opacity = 0;
                return 0;
            }
            return 1;
        }
    }
}