/// <reference path="../endgate-0.2.1.d.ts" />
var Monster;
(function (Monster) {
    var Fader = (function () {
        function Fader() {
        }
        Fader.FadeInSprite = function (gameTime, sprite, rate, targetOpacity) {
            if (targetOpacity === void 0) { targetOpacity = 1; }
            if (targetOpacity > 1)
                targetOpacity = 1;
            if (sprite.Opacity === targetOpacity)
                return 0;
            sprite.Opacity += gameTime.Elapsed.Seconds * rate;
            if (sprite.Opacity > targetOpacity) {
                sprite.Opacity = targetOpacity;
                return 0;
            }
            return 1;
        };
        Fader.FadeInShape = function (gameTime, shape, rate, targetOpacity) {
            if (targetOpacity === void 0) { targetOpacity = 1; }
            if (targetOpacity > 1)
                targetOpacity = 1;
            if (shape.Opacity === targetOpacity)
                return 0;
            shape.Opacity += gameTime.Elapsed.Seconds * rate;
            if (shape.Opacity > targetOpacity) {
                shape.Opacity = targetOpacity;
                return 0;
            }
            return 1;
        };
        Fader.FadeOutSprite = function (gameTime, sprite, rate) {
            if (sprite.Opacity === 0)
                return 0;
            sprite.Opacity -= gameTime.Elapsed.Seconds * rate;
            if (sprite.Opacity < 0) {
                sprite.Opacity = 0;
                return 0;
            }
            return 1;
        };
        Fader.FadeOutShape = function (gameTime, shape, rate) {
            if (shape.Opacity === 0)
                return 0;
            shape.Opacity -= gameTime.Elapsed.Seconds * rate;
            if (shape.Opacity < 0) {
                shape.Opacity = 0;
                return 0;
            }
            return 1;
        };
        return Fader;
    })();
    Monster.Fader = Fader;
})(Monster || (Monster = {}));
