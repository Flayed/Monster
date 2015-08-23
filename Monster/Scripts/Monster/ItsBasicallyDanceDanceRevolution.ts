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

        public Update(gameTime: eg.GameTime): void {
            if (this.Arrow.Position.Y == -300) this.IsFinished = true;                
        }

        public Dispose(): void {
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
        private Music: eg.Sound.AudioClip;

        private UpArrowOutline: eg.Graphics.Sprite2d;
        private DownArrowOutline: eg.Graphics.Sprite2d;
        private LeftArrowOutline: eg.Graphics.Sprite2d;
        private RightArrowOutline: eg.Graphics.Sprite2d;

        private StartTime: number;

        private State: number;

        constructor(screen: eg.Rendering.Scene2d, content: eg.Content.ContentManager, music: eg.Sound.AudioClip) {
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

        public Update(gameTime: eg.GameTime): void {
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
            };
        }

        public Dispose(): void {
            this.Music.Stop();
            this.Music.Dispose();
        }
    }
}