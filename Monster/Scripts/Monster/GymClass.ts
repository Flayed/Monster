/// <reference path="../endgate-0.2.1.d.ts" />
module Monster {
    export class GymClass {
        private Screen: eg.Rendering.Scene2d;
        private Content: eg.Content.ContentManager;
        private TweenManager: Monster.TweenManager;
        private TalkBubbleManager: Monster.TalkBubbleManager;
        private KeyboardHandler: eg.Input.KeyboardHandler;
        private DDR: Monster.ItsBasicallyDanceDanceRevolution;
        private Background: eg.Graphics.Sprite2d;
        private Rope: eg.Graphics.Sprite2d;
        private Cheerleader: eg.Graphics.Sprite2d;
        private Dawn: eg.Graphics.Sprite2d;
        private Dexter: eg.Graphics.Sprite2d;
        private Elmo: eg.Graphics.Sprite2d;
        private GymCoach: eg.Graphics.Sprite2d;
        private Jerry: eg.Graphics.Sprite2d;
        private TheBully: eg.Graphics.Sprite2d;
        private TheGirl: eg.Graphics.Sprite2d;
        private TheGuy: eg.Graphics.Sprite2d;
        private Chen: eg.Graphics.Sprite2d; 
        public MouseClick: any;        
        public Unload: any;
        public IsFinished: boolean;
        private State: number;
        constructor(screen: eg.Rendering.Scene2d, content: eg.Content.ContentManager, tweenManager: Monster.TweenManager, talkBubbleManager: Monster.TalkBubbleManager, keyboardHandler: eg.Input.KeyboardHandler) {
            var self = this;
            self.Screen = screen;
            self.Content = content;
            self.TweenManager = tweenManager;
            self.KeyboardHandler = keyboardHandler;
            self.TalkBubbleManager = talkBubbleManager;
            self.Background = new eg.Graphics.Sprite2d(400, 300, self.Content.GetImage("FreshmanBackground"));
            self.Background.Opacity = 0;

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

            for (var x = 0; x < 15; x = x + 1) {
                self.Screen.Add(new eg.Graphics.Rectangle(0, 0, 1, 1));
            }     

            self.MouseClick = (event: eg.Input.IMouseClickEvent) => {
                
            }

            self.Unload = () => {
                self.Dispose();
            }
        }

        public Update(gameTime: eg.GameTime): void {
            var self = this;
            switch (self.State) {
                case 0:
                    self.Background.Opacity += gameTime.Elapsed.Seconds * .25;
                    if (self.Background.Opacity > 1) {
                        self.Background.Opacity = 1;
                        self.State++;
                        self.TweenManager.Add(self.Rope, new eg.Vector2d(400, 225), new eg.TimeSpan(1500), new eg.TimeSpan(500));
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
                        self.TalkBubbleManager.Add(self.GymCoach.Position, "THIS IS A TALK BUBBLE, LOL", 5000);
                        self.DDR = new Monster.ItsBasicallyDanceDanceRevolution(self.Screen, self.Content, self.TweenManager, self.KeyboardHandler, self.Content.GetAudio("Theme").BuildClip());
                    }
                    break;
                case 2:
                    self.DDR.Update(gameTime);
                    break;
            };
        }

        private LoadCharacter(name: string, x: number, y: number, scale: number = 1): eg.Graphics.Sprite2d {
            var sprite = new eg.Graphics.Sprite2d(x, y, this.Content.GetImage(name));
            if (scale != 1)
                sprite.Scale(scale);
            return sprite;
        };

        private Dispose(): void {
            var self = this;
        }
    }
}