/// <reference path="../typings/underscore/underscore.d.ts" />
/// <reference path="../endgate-0.2.1.d.ts" />
var Monster;
(function (Monster) {
    var DanceDanceRevolutionArrow = (function () {
        function DanceDanceRevolutionArrow(screen, content, tweenManager, direction, rate) {
            this.Screen = screen;
            this.Content = content;
            this.TweenManager = tweenManager;
            this.Rate = rate;
            this.Direction = direction;
            var spriteName;
            switch (direction) {
                case ArrowDirection.Up:
                    spriteName = "UpArrow";
                    break;
                case ArrowDirection.Down:
                    spriteName = "DownArrow";
                    break;
                case ArrowDirection.Left:
                    spriteName = "LeftArrow";
                    break;
                case ArrowDirection.Right:
                    spriteName = "RightArrow";
                    break;
            }
            this.Arrow = new eg.Graphics.Sprite2d(this.Direction, 700, this.Content.GetImage(spriteName));
            this.Arrow.ZIndex = 9999;
            this.Screen.Add(this.Arrow);
            this.TweenManager.Add(this.Arrow, new eg.Vector2d(direction, -100), new eg.TimeSpan(this.Rate));
            this.IsFinished = false;
            this.IsFinishing = false;
        }
        DanceDanceRevolutionArrow.prototype.Position = function () {
            return this.Arrow.Position;
        };
        ;
        DanceDanceRevolutionArrow.prototype.Finish = function (wasScored, good) {
            if (wasScored === void 0) { wasScored = false; }
            if (good === void 0) { good = false; }
            this.WasScored = wasScored;
            this.IsFinishing = true;
            this.Rect = new eg.Graphics.Rectangle(this.Arrow.Position.X, this.Arrow.Position.Y, 102, 102, eg.Graphics.Color.Transparent);
            if (good) {
                this.Rect.Border(6, eg.Graphics.Color.LimeGreen);
                this.Rect.Shadow(0, 0, eg.Graphics.Color.LimeGreen, 30);
            }
            else {
                this.Rect.Border(6, eg.Graphics.Color.FireBrick);
                this.Rect.Shadow(0, 0, eg.Graphics.Color.FireBrick, 30);
            }
            this.TweenManager.Add(this.Rect, new eg.Vector2d(this.Rect.Position.X, this.Rect.Position.Y - 400), new eg.TimeSpan(2000));
            this.Screen.Add(this.Rect);
        };
        DanceDanceRevolutionArrow.prototype.Update = function (gameTime) {
            if (this.IsFinishing) {
                if (!Monster.Fader.FadeOutSprite(gameTime, this.Arrow, 2) &&
                    (this.Rect && !Monster.Fader.FadeOutShape(gameTime, this.Rect, 1))) {
                    this.IsFinished = true;
                    this.Dispose();
                }
            }
            if (this.Arrow.Position.Y <= 0) {
                this.IsFinished = true;
                this.Dispose();
            }
        };
        DanceDanceRevolutionArrow.prototype.Dispose = function () {
            this.Arrow.Visible = false;
            this.Screen.Remove(this.Arrow);
            if (this.Rect) {
                this.Rect.Visible = false;
                this.Screen.Remove(this.Rect);
            }
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
        function ItsBasicallyDanceDanceRevolution(screen, content, tweenManager, keyboardHandler, music) {
            var _this = this;
            this.Screen = screen;
            this.Content = content;
            this.TweenManager = tweenManager;
            this.KeyboardHandler = keyboardHandler;
            this.Music = music;
            this.Notes = [411, 1133, 2153, 2608, 3130, 3600, 4145, 5068, 6081, 6552, 7089, 7594, 8123, 9061, 10083, 10564, 11093, 11613, 12112, 13042, 14042, 14548, 15069, 15582, 16092, 17052, 18107, 18574, 19075, 19570, 20071, 21052, 22040, 22513, 23029, 23557, 24082, 25059, 26061, 26563, 27081, 27561, 28089, 29031, 30001, 30516, 31047, 31557, 32063, 33089, 34072, 34565, 35055, 35578, 36094, 37051, 38017, 38535, 39069, 39586, 40100, 41083, 42034, 42550, 43076, 43572, 44090, 45010, 46021, 46536, 47052, 47556, 48067, 49072, 50032, 50568, 51090, 51586, 52114, 53052, 54027, 54542, 55069, 55580];
            this.BPM = 60000 / 120;
            this.UpArrowOutline = new eg.Graphics.Sprite2d(ArrowDirection.Up, 60, this.Content.GetImage("UpArrowOutline"));
            this.UpArrowOutline.Opacity = 0;
            this.DownArrowOutline = new eg.Graphics.Sprite2d(ArrowDirection.Down, 60, this.Content.GetImage("DownArrowOutline"));
            this.DownArrowOutline.Opacity = 0;
            this.LeftArrowOutline = new eg.Graphics.Sprite2d(ArrowDirection.Left, 60, this.Content.GetImage("LeftArrowOutline"));
            this.LeftArrowOutline.Opacity = 0;
            this.RightArrowOutline = new eg.Graphics.Sprite2d(ArrowDirection.Right, 60, this.Content.GetImage("RightArrowOutline"));
            this.RightArrowOutline.Opacity = 0;
            this.ScoreBackground = new eg.Graphics.Rectangle(400, 575, 800, 50, eg.Graphics.Color.Black);
            this.ScoreBackground.Opacity = 0;
            this.ScoreLabel = new eg.Graphics.Text2d(30, 575, "Score:", eg.Graphics.Color.WhiteSmoke);
            this.ScoreLabel.Align = "left";
            this.ScoreLabel.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.ScoreLabel.FontSettings.FontSize = "30px";
            this.ScoreLabel.Opacity = 0;
            this.ScoreMultiplierLabel = new eg.Graphics.Text2d(750, 575, "x", eg.Graphics.Color.WhiteSmoke);
            this.ScoreMultiplierLabel.Align = "left";
            this.ScoreMultiplierLabel.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.ScoreMultiplierLabel.FontSettings.FontSize = "30px";
            this.ScoreMultiplierLabel.Opacity = 0;
            this.ScoreText = new eg.Graphics.Text2d(130, 575, "0", eg.Graphics.Color.WhiteSmoke);
            this.ScoreText.Align = "left";
            this.ScoreText.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.ScoreText.FontSettings.FontSize = "30px";
            this.ScoreText.Opacity = 0;
            this.ScoreMultiplierText = new eg.Graphics.Text2d(775, 575, "1", eg.Graphics.Color.WhiteSmoke);
            this.ScoreText.Align = "left";
            this.ScoreMultiplierText.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.ScoreMultiplierText.FontSettings.FontWeight = "bold";
            this.ScoreMultiplierText.FontSettings.FontSize = "30px";
            this.ScoreMultiplierText.Opacity = 0;
            this.Screen.Add(this.UpArrowOutline);
            this.Screen.Add(this.DownArrowOutline);
            this.Screen.Add(this.LeftArrowOutline);
            this.Screen.Add(this.RightArrowOutline);
            this.Screen.Add(this.ScoreBackground);
            this.Screen.Add(this.ScoreLabel);
            this.Screen.Add(this.ScoreMultiplierLabel);
            this.Screen.Add(this.ScoreText);
            this.Screen.Add(this.ScoreMultiplierText);
            this.State = 0;
            this.Score = 0;
            this.Multiplier = 1;
            this.Chain = 0;
            this.LongestChain = 0;
            this.Arrows = new Array();
            this.HandledArrows = new Array();
            this.KeyDown = function (event) {
                if (event.Key === "up" || event.Key === "w") {
                    _this.HandleKeypress(ArrowDirection.Up);
                }
                else if (event.Key === "down" || event.Key === "s") {
                    _this.HandleKeypress(ArrowDirection.Down);
                }
                else if (event.Key === "left" || event.Key === "a") {
                    _this.HandleKeypress(ArrowDirection.Left);
                }
                else if (event.Key === "right" || event.Key === "d") {
                    _this.HandleKeypress(ArrowDirection.Right);
                }
                else if (event.Key === "q") {
                    console.log(Date.now().valueOf() - _this.MusicStart);
                }
            };
            this.KeyboardHandler.OnKeyDown.Bind(this.KeyDown);
        }
        ItsBasicallyDanceDanceRevolution.prototype.Update = function (gameTime) {
            var self = this;
            switch (self.State) {
                case 0:
                    if ((Monster.Fader.FadeInSprite(gameTime, self.UpArrowOutline, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.DownArrowOutline, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.LeftArrowOutline, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.RightArrowOutline, .5) +
                        Monster.Fader.FadeInShape(gameTime, self.ScoreBackground, .5, .66) +
                        Monster.Fader.FadeInShape(gameTime, self.ScoreLabel, .5) +
                        Monster.Fader.FadeInShape(gameTime, self.ScoreText, .5) +
                        Monster.Fader.FadeInShape(gameTime, self.ScoreMultiplierLabel, .5) +
                        Monster.Fader.FadeInShape(gameTime, self.ScoreMultiplierText, .5)) == 0) {
                        self.State++;
                        self.MusicStart = gameTime.Now.valueOf();
                        setTimeout(function () {
                            self.Music.Play();
                        }, self.BPM * 5);
                    }
                    break;
                case 1:
                    if (self.Notes.length > 0) {
                        var note = self.Notes[0];
                        if ((gameTime.Now.valueOf() - self.MusicStart) >= note) {
                            self.CreateArrow();
                            self.Notes.splice(0, 1);
                        }
                    }
                    self.Arrows.forEach(function (arrow) { arrow.Update(gameTime); });
                    self.Arrows = _.reject(self.Arrows, function (arrow) {
                        if (arrow.IsFinished && !arrow.WasScored) {
                            self.ResetMultiplier();
                        }
                        return arrow.IsFinished;
                    });
                    self.HandledArrows.forEach(function (arrow) { arrow.Update(gameTime); });
                    self.HandledArrows = _.reject(self.HandledArrows, function (arrow) {
                        return arrow.IsFinished;
                    });
                    break;
            }
            ;
        };
        ItsBasicallyDanceDanceRevolution.prototype.Dispose = function () {
            this.Music.Stop();
            this.Music.Dispose();
            this.KeyboardHandler.OnKeyDown.Unbind(this.KeyDown);
        };
        ItsBasicallyDanceDanceRevolution.prototype.HandleKeypress = function (direction) {
            var self = this;
            var topArrow = self.Arrows[0];
            if (!topArrow)
                return;
            var isGood = false;
            if (topArrow.Direction === direction) {
                var outlineVector;
                switch (direction) {
                    case ArrowDirection.Up:
                        outlineVector = self.UpArrowOutline.Position;
                        break;
                    case ArrowDirection.Down:
                        outlineVector = self.DownArrowOutline.Position;
                        break;
                    case ArrowDirection.Left:
                        outlineVector = self.LeftArrowOutline.Position;
                        break;
                    case ArrowDirection.Right:
                        outlineVector = self.RightArrowOutline.Position;
                        break;
                }
                var baseScore = 100 - outlineVector.Distance(topArrow.Position()).Abs().Y;
                if (baseScore > 0) {
                    this.Score += Math.floor((baseScore * this.Multiplier));
                    this.Chain++;
                    switch (this.Multiplier) {
                        case 1:
                            if (this.Chain === 8) {
                                this.Multiplier++;
                                this.ScoreMultiplierText.Text = this.Multiplier.toString();
                                this.ScoreMultiplierText.Border(2, eg.Graphics.Color.FromRGB(75, 0, 0));
                            }
                            break;
                        case 2:
                            if (this.Chain === 24) {
                                this.Multiplier++;
                                this.ScoreMultiplierText.Text = this.Multiplier.toString();
                                this.ScoreMultiplierText.Border(2, eg.Graphics.Color.FromRGB(150, 0, 0));
                            }
                            break;
                        case 3:
                            if (this.Chain === 64) {
                                this.Multiplier++;
                                this.ScoreMultiplierText.Text = this.Multiplier.toString();
                                this.ScoreMultiplierText.Border(2, eg.Graphics.Color.FromRGB(225, 0, 0));
                            }
                            break;
                        case 4:
                            if (this.Chain === 200) {
                                this.Multiplier++;
                                this.ScoreMultiplierText.Text = this.Multiplier.toString();
                                this.ScoreMultiplierText.Border(2, eg.Graphics.Color.FromRGB(255, 0, 0));
                            }
                            break;
                    }
                    if (this.LongestChain < this.Chain)
                        this.LongestChain = this.Chain;
                    this.ScoreText.Text = this.Score.toString();
                    isGood = true;
                }
                else {
                    this.ResetMultiplier();
                }
            }
            topArrow.Finish(true, isGood);
            this.HandledArrows.push(topArrow);
            this.Arrows.splice(0, 1);
        };
        ItsBasicallyDanceDanceRevolution.prototype.CreateArrow = function () {
            var self = this;
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
        };
        ItsBasicallyDanceDanceRevolution.prototype.ResetMultiplier = function () {
            this.Chain = 0;
            this.Multiplier = 1;
            this.ScoreMultiplierText.Text = this.Multiplier.toString();
            this.ScoreMultiplierText.Border(0, eg.Graphics.Color.Transparent);
            this.ScoreMultiplierText.Shadow(0, 0, eg.Graphics.Color.FromRGB(0, 0, 0), 0);
        };
        return ItsBasicallyDanceDanceRevolution;
    })();
    Monster.ItsBasicallyDanceDanceRevolution = ItsBasicallyDanceDanceRevolution;
})(Monster || (Monster = {}));
