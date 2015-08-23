/// <reference path="endgate-0.2.1.d.ts" />
var Monster;
(function (Monster) {
    var GymClass = (function () {
        function GymClass(screen) {
            var self = this;
            self.Screen = screen;
            self.Background = (new eg.Graphics.Sprite2d(400, 300, new eg.Graphics.ImageSource("./Content/Img/FreshmanBackground.png", 800, 600)));
            self.Background.Opacity = 0;
            self.State = 0;
            self.IsFinished = false;
            self.Screen.Add(self.Background);
            self.MouseClick = function (event) {
            };
            self.Unload = function () {
                self.Dispose();
            };
        }
        GymClass.prototype.Update = function (gameTime) {
            var self = this;
            switch (self.State) {
                case 0:
                    self.Background.Opacity += gameTime.Elapsed.Seconds * .25;
                    if (self.Background.Opacity > 1) {
                        self.Background.Opacity = 1;
                        self.State++;
                    }
                    break;
            }
            ;
        };
        GymClass.prototype.Dispose = function () {
            var self = this;
        };
        return GymClass;
    })();
    Monster.GymClass = GymClass;
})(Monster || (Monster = {}));
