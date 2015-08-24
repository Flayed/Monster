/// <reference path="../endgate-0.2.1.d.ts" />
var Monster;
(function (Monster) {
    var GymClass = (function () {
        function GymClass(screen, content, tweenManager, talkBubbleManager, keyboardHandler) {
            var self = this;
            self.Screen = screen;
            self.Content = content;
            self.TweenManager = tweenManager;
            self.KeyboardHandler = keyboardHandler;
            self.TalkBubbleManager = talkBubbleManager;
            self.Background = new eg.Graphics.Sprite2d(400, 300, self.Content.GetImage("FreshmanBackground"));
            self.Background.Opacity = 0;
            self.Blackout = new eg.Graphics.Rectangle(400, 300, 800, 600, eg.Graphics.Color.Black);
            self.Blackout.Opacity = 0;
            self.Blackout.ZIndex = 99999;
            self.Rope = new eg.Graphics.Sprite2d(400, -400, self.Content.GetImage("TheRope"));
            self.Cheerleader = self.LoadCharacter("Cheerleader", -75, 430, 0.8);
            self.Dawn = self.LoadCharacter("Dawn", -75, 440, 0.8);
            self.Dexter = self.LoadCharacter("Dexter", 875, 460, 0.8);
            self.Elmo = self.LoadCharacter("Elmo", -75, 370, 0.8);
            self.GymCoach = self.LoadCharacter("GymCoach", 875, 400);
            self.Jerry = self.LoadCharacter("Jerry", -75, 400, 0.8);
            self.TheBully = self.LoadCharacter("TheBully", 875, 420, 0.8);
            self.TheGirl = self.LoadCharacter("TheGirl", 875, 400, 0.8);
            self.TheGuy = self.LoadCharacter("TheGuy", -75, 400, 0.8);
            self.Chen = self.LoadCharacter("Chen", 875, 450, 0.8);
            self.State = 0;
            self.IsFinished = false;
            self.Screen.Add(self.Background);
            self.Screen.Add(self.Rope);
            self.Screen.Add(self.Elmo);
            self.Screen.Add(self.TheGuy);
            self.Screen.Add(self.Jerry);
            self.Screen.Add(self.TheGirl);
            self.Screen.Add(self.Cheerleader);
            self.Screen.Add(self.GymCoach);
            self.Screen.Add(self.Dawn);
            self.Screen.Add(self.TheBully);
            self.Screen.Add(self.Chen);
            self.Screen.Add(self.Dexter);
            self.Screen.Add(self.Blackout);
            for (var x = 0; x < 15; x = x + 1) {
                self.Screen.Add(new eg.Graphics.Rectangle(0, 0, 1, 1));
            }
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
                        self.TweenManager.Add(self.Cheerleader, new eg.Vector2d(120, 430), new eg.TimeSpan(800), new eg.TimeSpan(200));
                        self.TweenManager.Add(self.Dawn, new eg.Vector2d(170, 440), new eg.TimeSpan(1000), new eg.TimeSpan(0));
                        self.TweenManager.Add(self.Dexter, new eg.Vector2d(685, 460), new eg.TimeSpan(800), new eg.TimeSpan(500));
                        self.TweenManager.Add(self.Elmo, new eg.Vector2d(62, 370), new eg.TimeSpan(800), new eg.TimeSpan(2500));
                        self.TweenManager.Add(self.GymCoach, new eg.Vector2d(450, 400), new eg.TimeSpan(1500), new eg.TimeSpan(3000));
                        self.TweenManager.Add(self.Jerry, new eg.Vector2d(250, 400), new eg.TimeSpan(1500), new eg.TimeSpan(3500));
                        self.TweenManager.Add(self.TheBully, new eg.Vector2d(520, 420), new eg.TimeSpan(1500), new eg.TimeSpan(4000));
                        self.TweenManager.Add(self.TheGirl, new eg.Vector2d(650, 400), new eg.TimeSpan(800), new eg.TimeSpan(4500));
                        self.TweenManager.Add(self.TheGuy, new eg.Vector2d(200, 370), new eg.TimeSpan(1500), new eg.TimeSpan(5000));
                        self.TweenManager.Add(self.Chen, new eg.Vector2d(600, 450), new eg.TimeSpan(1500), new eg.TimeSpan(5500));
                    }
                    break;
                case 1:
                    if (!self.TweenManager.HasTweens()) {
                        self.State++;
                        self.TalkBubbleManager.Add(self.GymCoach.Position, "In today's gym class, we're gonna be doin' everybody's favorite...", self.Content.GetAudio("EverybodysFavorite").BuildClip(new eg.Sound.AudioSettings(false, 100)), 4250);
                    }
                    break;
                case 2:
                    if (!self.TalkBubbleManager.HasActiveTalkBubbles()) {
                        self.State++;
                        self.TalkBubbleManager.Add(self.GymCoach.Position, "The rope!", self.Content.GetAudio("CoachTheRope").BuildClip(new eg.Sound.AudioSettings(false, 100)), 1100);
                    }
                    break;
                case 3:
                    if (!self.TalkBubbleManager.HasActiveTalkBubbles()) {
                        self.State++;
                        self.TweenManager.Add(self.Rope, new eg.Vector2d(400, 225), new eg.TimeSpan(1500), new eg.TimeSpan(500));
                        self.TalkBubbleManager.Add(self.GymCoach.Position, "Hey, you there!  New kid!  Why don't you go first?", self.Content.GetAudio("YouGoFirst").BuildClip(new eg.Sound.AudioSettings(false, 100)), 4000);
                    }
                    break;
                case 4:
                    if (!self.TalkBubbleManager.HasActiveTalkBubbles()) {
                        self.State++;
                        self.TweenManager.Add(self.TheGuy, new eg.Vector2d(340, 435), new eg.TimeSpan(1500), new eg.TimeSpan(500));
                        self.TalkBubbleManager.Add(self.GymCoach.Position, "Now listen close why I carefully explain how to climb da rope.", self.Content.GetAudio("ListenCarefully").BuildClip(new eg.Sound.AudioSettings(false, 100)), 4100);
                    }
                    break;
                case 5:
                    if (!self.TalkBubbleManager.HasActiveTalkBubbles()) {
                        self.State++;
                        self.TalkBubbleManager.Add(self.GymCoach.Position, "First you get your fingers on the W, A, S, D or the arrow keys.", self.Content.GetAudio("FirstExplanation").BuildClip(new eg.Sound.AudioSettings(false, 100)), 6000);
                    }
                    break;
                case 6:
                    if (!self.TalkBubbleManager.HasActiveTalkBubbles()) {
                        self.State++;
                        self.TalkBubbleManager.Add(self.GymCoach.Position, "Next, these arrows will fly from the bottom of the screen.", self.Content.GetAudio("SecondExplanation").BuildClip(new eg.Sound.AudioSettings(false, 100)), 3550);
                    }
                    break;
                case 7:
                    if (!self.TalkBubbleManager.HasActiveTalkBubbles()) {
                        self.State++;
                        self.TalkBubbleManager.Add(self.GymCoach.Position, "It's important that you hit the corresponding key when it gets to the top", self.Content.GetAudio("ThirdExplanation").BuildClip(new eg.Sound.AudioSettings(false, 100)), 5000);
                    }
                    break;
                case 8:
                    if (!self.TalkBubbleManager.HasActiveTalkBubbles()) {
                        self.State++;
                        self.TalkBubbleManager.Add(self.GymCoach.Position, "Otherwise you're doing it wrong.", self.Content.GetAudio("FourthExplanation").BuildClip(new eg.Sound.AudioSettings(false, 100)), 2000);
                    }
                    break;
                case 9:
                    if (!self.TalkBubbleManager.HasActiveTalkBubbles()) {
                        self.State++;
                        self.TalkBubbleManager.Add(self.GymCoach.Position, "Have fun, new kid.", self.Content.GetAudio("HaveFun").BuildClip(new eg.Sound.AudioSettings(false, 100)), 1510);
                        self.TweenManager.Add(self.TheGuy, new eg.Vector2d(415, 130), new eg.TimeSpan(133000), new eg.TimeSpan(500));
                    }
                    break;
                case 10:
                    if (!self.DDR) {
                        self.DDR = new Monster.ItsBasicallyDanceDanceRevolution(self.Screen, self.Content, self.TweenManager, self.KeyboardHandler, self.Content.GetAudio("ClimbTheRope").BuildClip(), 173);
                    }
                    self.DDR.Update(gameTime);
                    if (self.DDR.IsFinished) {
                        self.State++;
                    }
                    break;
                case 11:
                    if (Monster.Fader.FadeInShape(gameTime, self.Blackout, .5) == 0) {
                        self.State++;
                    }
                    break;
                case 12:
                    self.IsFinished = true;
                    break;
            }
            ;
        };
        GymClass.prototype.LoadCharacter = function (name, x, y, scale) {
            if (scale === void 0) { scale = 1; }
            var sprite = new eg.Graphics.Sprite2d(x, y, this.Content.GetImage(name));
            if (scale != 1)
                sprite.Scale(scale);
            return sprite;
        };
        ;
        GymClass.prototype.Dispose = function () {
            var self = this;
            self.Screen.Remove(self.Background);
            self.Screen.Remove(self.Rope);
            self.Screen.Remove(self.Elmo);
            self.Screen.Remove(self.TheGuy);
            self.Screen.Remove(self.Jerry);
            self.Screen.Remove(self.TheGirl);
            self.Screen.Remove(self.Cheerleader);
            self.Screen.Remove(self.GymCoach);
            self.Screen.Remove(self.Dawn);
            self.Screen.Remove(self.TheBully);
            self.Screen.Remove(self.Chen);
            self.Screen.Remove(self.Dexter);
            self.Screen.Remove(self.Blackout);
            self.DDR.Unload();
            var self = this;
        };
        return GymClass;
    })();
    Monster.GymClass = GymClass;
})(Monster || (Monster = {}));
