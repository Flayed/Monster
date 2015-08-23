/// <reference path="../typings/underscore/underscore.d.ts" />
/// <reference path="../endgate-0.2.1.d.ts" />
module Monster {
    export class DanceDanceRevolutionArrow implements eg.IUpdateable, eg.IDisposable {
        private Screen: eg.Rendering.Scene2d;
        private Content: eg.Content.ContentManager;
        private Arrow: eg.Graphics.Sprite2d;     
        private Rate: number;
        public IsFinished: boolean;   
        constructor(screen: eg.Rendering.Scene2d, content: eg.Content.ContentManager, tweenManager: Monster.TweenManager, direction: ArrowDirection, rate: number) {
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

        public Update(gameTime: eg.GameTime): void {
            if (this.Arrow.Position.Y <= -100) {
                this.IsFinished = true;
                this.Dispose();
            }         
        }

        public Dispose(): void {
            this.Arrow.Visible = false;
            this.Screen.Remove(this.Arrow);
        }
    }

    enum ArrowDirection {
        Up = 315,
        Down = 475,
        Left = 160,
        Right = 645
    }

    export class ItsBasicallyDanceDanceRevolution implements eg.IUpdateable, eg.IDisposable {
        private Screen: eg.Rendering.Scene2d;
        private Content: eg.Content.ContentManager;
        private TweenManager: Monster.TweenManager;
        private Music: eg.Sound.AudioClip;
        private BPM: number;

        private UpArrowOutline: eg.Graphics.Sprite2d;
        private DownArrowOutline: eg.Graphics.Sprite2d;
        private LeftArrowOutline: eg.Graphics.Sprite2d;
        private RightArrowOutline: eg.Graphics.Sprite2d;

        private Arrows: Array<DanceDanceRevolutionArrow>;
        private LastArrow: Date;

        private Ival: any;

        private State: number;

        constructor(screen: eg.Rendering.Scene2d, content: eg.Content.ContentManager, tweenManager: Monster.TweenManager, music: eg.Sound.AudioClip) {
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
            this.Arrows = new Array<DanceDanceRevolutionArrow>();
        }

        public Update(gameTime: eg.GameTime): void {
            var self = this;
            switch (self.State) {            
                case 0:
                    if ((Monster.Fader.FadeIn(gameTime, self.UpArrowOutline, .5) +
                        Monster.Fader.FadeIn(gameTime, self.DownArrowOutline, .5) +
                        Monster.Fader.FadeIn(gameTime, self.LeftArrowOutline, .5) +
                        Monster.Fader.FadeIn(gameTime, self.RightArrowOutline, .5)) == 0) {
                        self.State++;
                        self.LastArrow = gameTime.Now;
                        self.Ival = setInterval(() => {
                            var doit = Math.random() * 3;
                            if (doit > 1) return;
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
                            };
                        }, self.BPM / 2);
                    }
                    break;
                case 1:
                    self.Arrows.forEach((arrow) => { arrow.Update(gameTime); });
                    self.Arrows = _.reject(self.Arrows, (arrow) => {
                        return arrow.IsFinished;
                    });                  
                    break;
            };
        }

        public Dispose(): void {
            this.Music.Stop();
            this.Music.Dispose();
        }
    }
}