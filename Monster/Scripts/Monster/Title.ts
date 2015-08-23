/// <reference path="../endgate-0.2.1.d.ts" />
module Monster {

    export class Title {
        public Background: eg.Graphics.Sprite2d;
        public TheGuy: eg.Graphics.Sprite2d;
        public TitleText: eg.Graphics.Text2d;
        public Music: eg.Sound.AudioClip;
        public StartButton: eg.Graphics.Rectangle;
        public StartButtonText: eg.Graphics.Text2d;
        public MouseClick: any;
        public MouseMove: any;
        public Unload: any;
        private Screen: eg.Rendering.Scene2d;
        private IsStarting: boolean;
        private IsLoading: boolean;
        private IsOverButton: boolean;
        public IsFinished: boolean;

        constructor(screen: eg.Rendering.Scene2d) {
            var self = this;
            self.Screen = screen;

            self.Background = (new eg.Graphics.Sprite2d(400, 300, new eg.Graphics.ImageSource("./Content/Img/TitleBackground.png", 800, 600)));
            self.Background.Opacity = 0;

            self.TheGuy = (new eg.Graphics.Sprite2d(400, 500, new eg.Graphics.ImageSource("./Content/Img/TheGuy.png", 75, 140)));
            self.TheGuy.Scale(1);
            self.TheGuy.Opacity = 0;

            self.TitleText = new eg.Graphics.Text2d(400, 200, "You Are The Monster", eg.Graphics.Color.WhiteSmoke);
            self.TitleText.FontSettings.FontSize = "75px";
            self.TitleText.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            self.TitleText.Shadow(0,0, eg.Graphics.Color.WhiteSmoke, 1);
            self.TitleText.Opacity = 0;

            self.StartButton = new eg.Graphics.Rectangle(400, 350, 100, 40, eg.Graphics.Color.FromHex("1a0072"));          
            self.StartButton.Border(2, eg.Graphics.Color.WhiteSmoke);
            self.StartButton.Opacity = 0;

            self.StartButtonText = new eg.Graphics.Text2d(400, 350, "Start", eg.Graphics.Color.WhiteSmoke);
            self.StartButtonText.FontSettings.FontSize = "30px";
            self.StartButtonText.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            self.StartButtonText.Opacity = 0;

            self.Screen.Add(self.Background);
            self.Screen.Add(self.TheGuy);
            self.Screen.Add(self.TitleText);
            self.Screen.Add(self.StartButton);
            self.Screen.Add(self.StartButtonText);

            self.IsLoading = true;
            self.IsStarting = false;
            self.IsFinished = false;

            self.MouseClick = (event: eg.Input.IMouseClickEvent)=>{
                var self = this;

                if (event.Button != "Left") return;
                if (self.IsLoading) {
                    self.Background.Opacity = 1;
                    self.TheGuy.Opacity = 1;
                    self.TitleText.Opacity = 1;
                    self.StartButton.Opacity = 1;
                    self.StartButtonText.Opacity = 1;
                    self.IsLoading = false;
                }
                if (self.StartButton.Opacity > 0.5) {
                    if (self.StartButton.GetDrawBounds().ContainsPoint(event.Position)) {
                        self.IsStarting = true;
                        self.StartButton.Visible = false;
                        self.StartButtonText.Visible = false;
                    }
                }
            }

            self.MouseMove = (event: eg.Input.IMouseEvent) => {
                if (self.StartButton.Opacity > 0.5) {
                    if (self.StartButton.GetDrawBounds().ContainsPoint(event.Position)) {
                        if (!self.IsOverButton) {
                            self.StartButton.Color = eg.Graphics.Color.WhiteSmoke;
                            self.StartButtonText.Color = eg.Graphics.Color.Black;
                            self.IsOverButton = true;
                        }
                    }
                    else if (self.IsOverButton) {
                        self.IsOverButton = false;
                        self.StartButton.Color = eg.Graphics.Color.FromHex("1a0072");
                        self.StartButtonText.Color = eg.Graphics.Color.WhiteSmoke;
                    }                    
                }
            }

            self.Unload = () => {
                self.Dispose();
            }
        }

        public Update(gameTime: eg.GameTime): void {
            var self = this;
            if (!self.IsStarting) {
                if (self.Background.Opacity < 1) {
                    self.Background.Opacity += gameTime.Elapsed.Seconds * .125;
                }
                else if (self.TheGuy.Opacity < 1) {
                    self.TheGuy.Opacity += gameTime.Elapsed.Seconds * .125;
                }
                else if (self.TitleText.Opacity < 1) {
                    self.TitleText.Opacity += gameTime.Elapsed.Seconds * .15;
                }
                else if (self.StartButtonText.Opacity < 1) {
                    self.StartButtonText.Opacity += gameTime.Elapsed.Seconds * .35;
                    self.StartButton.Opacity += gameTime.Elapsed.Seconds * .35;
                }
                else if (self.TitleText.ShadowBlur < 15) {
                    self.TitleText.ShadowBlur += gameTime.Elapsed.Seconds;
                }
                else {
                    self.IsLoading = false;
                }
            }
            else {
                self.Music.Volume -= gameTime.Elapsed.Seconds * 15;
                if (self.Music.Volume < 0) self.Music.Volume = 0;
                self.StartButton.Opacity -= gameTime.Elapsed.Seconds * .25;
                if (self.StartButton.Opacity < 0) self.StartButton.Opacity = 0;
                self.StartButtonText.Opacity -= gameTime.Elapsed.Seconds * .25;
                if (self.StartButtonText.Opacity < 0) self.StartButtonText.Opacity = 0;
                self.TitleText.Opacity -= gameTime.Elapsed.Seconds * .25;
                if (self.TitleText.Opacity < 0) self.TitleText.Opacity = 0;
                self.TheGuy.Opacity -= gameTime.Elapsed.Seconds * .25;
                if (self.TheGuy.Opacity < 0) self.TheGuy.Opacity = 0;
                self.Background.Opacity -= gameTime.Elapsed.Seconds * .125;
                if (self.Background.Opacity < 0) {
                    self.Background.Opacity = 0;
                    self.IsFinished = true;
                }
            }
        }

        private Dispose(): void {
            var self = this;
            self.Screen.Remove(self.StartButton);
            self.Screen.Remove(self.StartButtonText);
            self.Screen.Remove(self.TheGuy);
            self.Screen.Remove(self.Background);
            self.Screen.Remove(self.TitleText);
            self.Music.Stop();
            self.Music.Dispose();
        }
    }

}