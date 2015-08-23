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
                    this.Arrow = new eg.Graphics.Sprite2d(ArrowDirection.Up, 900, this.Content.GetImage("UpArrow"));
                    break;
                case ArrowDirection.Down:
                    this.Arrow = new eg.Graphics.Sprite2d(ArrowDirection.Down, 900, this.Content.GetImage("DownArrow"));
                    break;
                case ArrowDirection.Left:
                    this.Arrow = new eg.Graphics.Sprite2d(ArrowDirection.Left, 900, this.Content.GetImage("LeftArrow"));
                    break;
                case ArrowDirection.Right:
                    this.Arrow = new eg.Graphics.Sprite2d(ArrowDirection.Down, 900, this.Content.GetImage("RightArrow"));
                    break;
            }
            this.Screen.Add(this.Arrow);
            tweenManager.Add(this.Arrow, new eg.Vector2d(direction, -300), new eg.TimeSpan(this.Rate));
            this.IsFinished = false;
        }
        DanceDanceRevolutionArrow.prototype.Update = function (gameTime) {
            if (this.Arrow.Position.Y == -300)
                this.IsFinished = true;
        };
        DanceDanceRevolutionArrow.prototype.Dispose = function () {
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
        function ItsBasicallyDanceDanceRevolution(screen, content, music) {
            this.Screen = screen;
            this.Content = content;
            this.Music = music;
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
        }
        ItsBasicallyDanceDanceRevolution.prototype.Update = function (gameTime) {
            switch (this.State) {
                case 0:
                    if ((Monster.Fader.FadeIn(gameTime, this.UpArrowOutline, .5) +
                        Monster.Fader.FadeIn(gameTime, this.DownArrowOutline, .5) +
                        Monster.Fader.FadeIn(gameTime, this.LeftArrowOutline, .5) +
                        Monster.Fader.FadeIn(gameTime, this.RightArrowOutline, .5)) == 0) {
                        this.State++;
                        this.StartTime = Date.now();
                    }
                    break;
                case 1:
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