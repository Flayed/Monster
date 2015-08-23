/// <reference path="endgate-0.2.1.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var Monster;
(function (Monster) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(_canvas) {
            _super.call(this, _canvas);
            this._canvas = _canvas;
            var self = this;
            self.GameState = 0;
            self.TitleScreen = new Monster.Title(self.Scene);
            self.TitleScreen.Music = self.Content.GetAudio("theme").Play(new eg.Sound.AudioSettings(true, 100));
            this.Input.Mouse.OnClick.Bind(self.TitleScreen.MouseClick);
            //self.characters = new Array<eg.Graphics.Sprite2d>();
            //self.Scene.Add(new eg.Graphics.Sprite2d(400, 300, new eg.Graphics.ImageSource("./Content/Img/FreshmanBackground.png", 800, 600)));
            //self.Scene.Add(new eg.Graphics.Sprite2d(400, 250, new eg.Graphics.ImageSource("./Content/Img/TheRope.png", 75, 400)));            
            //self.Scene.Add(LoadCharacter("Cheerleader", 120, 430, 0.8, 100, 140));
            //self.Scene.Add(LoadCharacter("Dawn", 170, 440, 0.8));
            //self.Scene.Add(LoadCharacter("Dexter", 685, 460, 0.8));
            //self.Scene.Add(LoadCharacter("Elmo", 62, 370, 0.8));
            //self.Scene.Add(LoadCharacter("null", 0, 0);
            //self.Scene.Add(LoadCharacter("GymCoach", 450, 400));
            //self.Scene.Add(LoadCharacter("Jerry", 250, 400, 0.8));
            //self.Scene.Add(LoadCharacter("TheBully", 520, 420, 0.8));
            //self.Scene.Add(LoadCharacter("TheGirl", 650, 400, 0.8));
            //self.Scene.Add(LoadCharacter("TheGuy", 350, 400, 0.8));
            //self.Scene.Add(LoadCharacter("Chen", 600, 450, 0.8));
            function LoadCharacter(name, x, y, scale, imgX, imgY) {
                if (scale === void 0) { scale = 1; }
                if (imgX === void 0) { imgX = 75; }
                if (imgY === void 0) { imgY = 140; }
                var img = new eg.Graphics.ImageSource("./Content/Img/" + name + ".png", imgX, imgY);
                var sprite = new eg.Graphics.Sprite2d(x, y, img);
                if (scale != 1)
                    sprite.Scale(scale);
                return sprite;
            }
            ;
        }
        Game.prototype.Update = function (gameTime) {
            var self = this;
            // Move the circle to the right at 200 pixels per second
            switch (self.GameState) {
                case 0:
                    self.TitleScreen.Update(gameTime);
                    if (self.TitleScreen.IsFinished) {
                        self.GameState++;
                        self.TitleScreen.Unload();
                        self.Backstory = new Monster.Backstory(self.Scene);
                    }
                    break;
                case 1:
                    self.Backstory.Update(gameTime);
                    break;
            }
            ;
        };
        Game.prototype.MouseClick = function (event) {
        };
        Game.prototype.LoadContent = function () {
            this.Content.LoadAudio("theme", ["./Content/Audio/MonsterTheme.ogg", "./Content/Audio/MonsterTheme.mp3"]);
            this.Content.LoadAudio("backstory", ["./Content/Audio/MonsterBackstory.ogg", "./Content/Audio/MonsterBackstory.mp3"]);
        };
        return Game;
    })(eg.Game);
    Monster.Game = Game;
})(Monster || (Monster = {}));
