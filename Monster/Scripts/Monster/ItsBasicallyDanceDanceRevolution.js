/// <reference path="../typings/underscore/underscore.d.ts" />
/// <reference path="../endgate-0.2.1.d.ts" />
var Monster;
(function (Monster) {
    var DanceDanceRevolutionArrow = (function () {
        function DanceDanceRevolutionArrow(screen, content, tweenManager, direction, rate) {
            this.Screen = screen;
            this.Content = content;
            this.Rate = rate;
            switch (direction) {
                case ArrowDirection.Up:
                    this.Arrow = new eg.Graphics.Sprite2d(ArrowDirection.Up, 700, this.Content.GetImage("UpArrow"));
                    break;
                case ArrowDirection.Down:
                    this.Arrow = new eg.Graphics.Sprite2d(ArrowDirection.Down, 700, this.Content.GetImage("DownArrow"));
                    break;
                case ArrowDirection.Left:
                    this.Arrow = new eg.Graphics.Sprite2d(ArrowDirection.Left, 700, this.Content.GetImage("LeftArrow"));
                    break;
                case ArrowDirection.Right:
                    this.Arrow = new eg.Graphics.Sprite2d(ArrowDirection.Right, 700, this.Content.GetImage("RightArrow"));
                    break;
            }
            this.Screen.Add(this.Arrow);
            tweenManager.Add(this.Arrow, new eg.Vector2d(direction, -100), new eg.TimeSpan(this.Rate));
            this.IsFinished = false;
        }
        DanceDanceRevolutionArrow.prototype.Update = function (gameTime) {
            if (this.Arrow.Position.Y <= -100) {
                this.IsFinished = true;
                this.Dispose();
            }
        };
        DanceDanceRevolutionArrow.prototype.Dispose = function () {
            this.Arrow.Visible = false;
            this.Screen.Remove(this.Arrow);
        };
        return DanceDanceRevolutionArrow;
    })();
    Monster.DanceDanceRevolutionArrow = DanceDanceRevolutionArrow;
    var ArrowDirection;
    (function (ArrowDirection) {
        ArrowDirection[ArrowDirection["Up"] = 315] = "Up";
        ArrowDirection[ArrowDirection["Down"] = 475] = "Down";
        ArrowDirection[ArrowDirection["Left"] = 160] = "Left";
        ArrowDirection[ArrowDirection["Right"] = 645] = "Right";
    })(ArrowDirection || (ArrowDirection = {}));
    var ItsBasicallyDanceDanceRevolution = (function () {
        function ItsBasicallyDanceDanceRevolution(screen, content, tweenManager, music) {
            this.Screen = screen;
            this.Content = content;
            this.TweenManager = tweenManager;
            this.Music = music;
            this.BPM = 60000 / 120;
            this.UpArrowOutline = new eg.Graphics.Sprite2d(ArrowDirection.Up, 60, this.Content.GetImage("UpArrowOutline"));
            this.UpArrowOutline.Opacity = 0;
            this.DownArrowOutline = new eg.Graphics.Sprite2d(ArrowDirection.Down, 60, this.Content.GetImage("DownArrowOutline"));
            this.DownArrowOutline.Opacity = 0;
            this.LeftArrowOutline = new eg.Graphics.Sprite2d(ArrowDirection.Left, 60, this.Content.GetImage("LeftArrowOutline"));
            this.LeftArrowOutline.Opacity = 0;
            this.RightArrowOutline = new eg.Graphics.Sprite2d(ArrowDirection.Right, 60, this.Content.GetImage("RightArrowOutline"));
            this.RightArrowOutline.Opacity = 0;
            this.Screen.Add(this.UpArrowOutline);
            this.Screen.Add(this.DownArrowOutline);
            this.Screen.Add(this.LeftArrowOutline);
            this.Screen.Add(this.RightArrowOutline);
            this.State = 0;
            this.Arrows = new Array();
        }
        ItsBasicallyDanceDanceRevolution.prototype.Update = function (gameTime) {
            var self = this;
            switch (self.State) {
                case 0:
                    if ((Monster.Fader.FadeIn(gameTime, self.UpArrowOutline, .5) +
                        Monster.Fader.FadeIn(gameTime, self.DownArrowOutline, .5) +
                        Monster.Fader.FadeIn(gameTime, self.LeftArrowOutline, .5) +
                        Monster.Fader.FadeIn(gameTime, self.RightArrowOutline, .5)) == 0) {
                        self.State++;
                        self.LastArrow = gameTime.Now;
                        self.Ival = setInterval(function () {
                            var doit = Math.random() * 3;
                            if (doit > 1)
                                return;
                            var rnd = Math.ceil((Math.random() * 4));
                            var rate = (self.BPM * 6);
                            switch (rnd) {
                                case 1:
                                    self.Arrows.push(new DanceDanceRevolutionArrow(self.Screen, self.Content, self.TweenManager, ArrowDirection.Up, rate));
                                    break;
                                case 2:
                                    self.Arrows.push(new DanceDanceRevolutionArrow(self.Screen, self.Content, self.TweenManager, ArrowDirection.Down, rate));
                                    break;
                                case 3:
                                    self.Arrows.push(new DanceDanceRevolutionArrow(self.Screen, self.Content, self.TweenManager, ArrowDirection.Left, rate));
                                    break;
                                case 4:
                                    self.Arrows.push(new DanceDanceRevolutionArrow(self.Screen, self.Content, self.TweenManager, ArrowDirection.Right, rate));
                                    break;
                            }
                            ;
                        }, self.BPM / 2);
                    }
                    break;
                case 1:
                    self.Arrows.forEach(function (arrow) { arrow.Update(gameTime); });
                    self.Arrows = _.reject(self.Arrows, function (arrow) {
                        return arrow.IsFinished;
                    });
                    break;
            }
            ;
        };
        ItsBasicallyDanceDanceRevolution.prototype.Dispose = function () {
            this.Music.Stop();
            this.Music.Dispose();
        };
        return ItsBasicallyDanceDanceRevolution;
    })();
    Monster.ItsBasicallyDanceDanceRevolution = ItsBasicallyDanceDanceRevolution;
})(Monster || (Monster = {}));
//# sourceMappingURL=ItsBasicallyDanceDanceRevolution.js.map