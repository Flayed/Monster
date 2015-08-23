/// <reference path="../endgate-0.2.1.d.ts" />
var Monster;
(function (Monster) {
    var Fader = (function () {
        function Fader() {
        }
        Fader.FadeIn = function (gameTime, sprite, rate) {
            if (sprite.Opacity === 1)
                return 0;
            sprite.Opacity += gameTime.Elapsed.Seconds * rate;
            if (sprite.Opacity > 1) {
                sprite.Opacity = 1;
                return 0;
            }
            return 1;
        };
        Fader.FadeOut = function (gameTime, sprite, rate) {
            if (sprite.Opacity === 0)
                return 0;
            sprite.Opacity -= gameTime.Elapsed.Seconds * rate;
            if (sprite.Opacity < 0) {
                sprite.Opacity = 0;
                return 0;
            }
            return 1;
        };
        return Fader;
    })();
    Monster.Fader = Fader;
})(Monster || (Monster = {}));
//# sourceMappingURL=Fader.js.map