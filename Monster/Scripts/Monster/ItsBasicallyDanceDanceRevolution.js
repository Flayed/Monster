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
        function ItsBasicallyDanceDanceRevolution(screen, content, tweenManager, keyboardHandler, music, bpm) {
            var _this = this;
            this.Screen = screen;
            this.Content = content;
            this.TweenManager = tweenManager;
            this.KeyboardHandler = keyboardHandler;
            this.Music = music;
            this.Notes = [2737, 3454, 4168, 4835, 5528, 6234, 6918, 7626, 8257, 8991, 9653, 10319, 11074, 11285, 11602, 11921, 12255, 12628, 12978, 13322, 13679, 14423, 15211, 15888, 16593, 16793, 17135, 17469, 17808, 18286, 18641, 18833, 19022, 19376, 20072, 20717, 21405, 22163, 22337, 22680, 23279, 23853, 24222, 24400, 24770, 25530, 26313, 26979, 27550, 27744, 28021, 28316, 28628, 28960, 29124, 29416, 29752, 29930, 30108, 30438, 30612, 30800, 31351, 32138, 32906, 33306, 33470, 33793, 34395, 34873, 35316, 35509, 35892, 36670, 37427, 38110, 38768, 39033, 39336, 39826, 40111, 40558, 40902, 41253, 41443, 42212, 42982, 43660, 44287, 44484, 44649, 44926, 45228, 45559, 46048, 46233, 46417, 46598, 47001, 47761, 48515, 49251, 49766, 49934, 50222, 50395, 50704, 51097, 51309, 51626, 51990, 52344, 52672, 52847, 53028, 53448, 54091, 54770, 55383, 55596, 55857, 56145, 56500, 56838, 57175, 57350, 57713, 58039, 58850, 59598, 60304, 60838, 61028, 61197, 61524, 61945, 62329, 62753, 62931, 63103, 63262, 63610, 64280, 65091, 65795, 66567, 68498, 68891, 69289, 69814, 70312, 70975, 72142, 72863, 73540, 74205, 74552, 74908, 75386, 75892, 77671, 78025, 78389, 78742, 79078, 79399, 79753, 80054, 80403, 80930, 81424, 82089, 83200, 83543, 83898, 84265, 84636, 85322, 85652, 86004, 86489, 86990, 88808, 90750, 91099, 91483, 92005, 92506, 93220, 94268, 94622, 94973, 95326, 95746, 96084, 96448, 96759, 97123, 97604, 98113, 99831, 100031, 100224, 100389, 100574, 100751, 101112, 101584, 101967, 102150, 102526, 103323, 104080, 104765, 105252, 105517, 105680, 105845, 106030, 106247, 106718, 106881, 107171, 107511, 107692, 107842, 108200, 108376, 108573, 109312, 109954, 110663, 111023, 111365, 111728, 112045, 112372, 112703, 113070, 113378, 113737, 114257, 114739, 115416, 116544, 118535, 118927, 119280, 119777, 120292, 122034, 124061, 124410, 124760, 125257, 125779, 126478, 127602, 129639, 130011, 130372, 130881, 131387];
            this.BPM = 60000 / bpm;
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
            this.ScoreBackground.ZIndex = 998;
            this.ScoreLabel = new eg.Graphics.Text2d(30, 575, "Score:", eg.Graphics.Color.WhiteSmoke);
            this.ScoreLabel.Align = "left";
            this.ScoreLabel.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.ScoreLabel.FontSettings.FontSize = "30px";
            this.ScoreLabel.Opacity = 0;
            this.ScoreLabel.ZIndex = 999;
            this.ScoreMultiplierLabel = new eg.Graphics.Text2d(750, 575, "x", eg.Graphics.Color.WhiteSmoke);
            this.ScoreMultiplierLabel.Align = "left";
            this.ScoreMultiplierLabel.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.ScoreMultiplierLabel.FontSettings.FontSize = "30px";
            this.ScoreMultiplierLabel.Opacity = 0;
            this.ScoreMultiplierLabel.ZIndex = 999;
            this.ScoreText = new eg.Graphics.Text2d(130, 575, "0", eg.Graphics.Color.WhiteSmoke);
            this.ScoreText.Align = "left";
            this.ScoreText.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.ScoreText.FontSettings.FontSize = "30px";
            this.ScoreText.Opacity = 0;
            this.ScoreText.ZIndex = 999;
            this.ScoreMultiplierText = new eg.Graphics.Text2d(775, 575, "1", eg.Graphics.Color.WhiteSmoke);
            this.ScoreText.Align = "left";
            this.ScoreMultiplierText.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.ScoreMultiplierText.FontSettings.FontWeight = "bold";
            this.ScoreMultiplierText.FontSettings.FontSize = "30px";
            this.ScoreMultiplierText.Opacity = 0;
            this.ScoreMultiplierText.ZIndex = 999;
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
            this.IsFinished = false;
            this.Unload = function () {
                _this.Dispose();
            };
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
                    else {
                        self.State++;
                        setTimeout(function () { self.State++; }, 5000);
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
                case 2:
                    break;
                case 3:
                    self.IsFinished = true;
                    break;
            }
            ;
        };
        ItsBasicallyDanceDanceRevolution.prototype.Dispose = function () {
            if (this.Music) {
                this.Music.Stop();
                this.Music.Dispose();
            }
            this.Screen.Remove(this.UpArrowOutline);
            this.Screen.Remove(this.DownArrowOutline);
            this.Screen.Remove(this.LeftArrowOutline);
            this.Screen.Remove(this.RightArrowOutline);
            this.Screen.Remove(this.ScoreBackground);
            this.Screen.Remove(this.ScoreLabel);
            this.Screen.Remove(this.ScoreMultiplierLabel);
            this.Screen.Remove(this.ScoreText);
            this.Screen.Remove(this.ScoreMultiplierText);
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
