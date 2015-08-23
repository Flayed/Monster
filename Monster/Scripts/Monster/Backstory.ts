/// <reference path="../endgate-0.2.1.d.ts" />
module Monster {
    export class Backstory {
        private Screen: eg.Rendering.Scene2d;
        public Background: eg.Graphics.Sprite2d;
        public CaptionText: eg.Graphics.Text2d;
        public CaptionRect: eg.Graphics.Rectangle;
        public Music: eg.Sound.AudioClip;
        public MouseClick: any;
        public Unload: any;
        public NeedsToUpdateLine: boolean;
        public IsFinished: boolean;
        private State: number;
        private StartTime: Date;
        constructor(screen: eg.Rendering.Scene2d) {
            var self = this;
            self.Screen = screen;
            self.Background = (new eg.Graphics.Sprite2d(400, 300, new eg.Graphics.ImageSource("./Content/Img/School.png", 800, 600)));
            self.Background.Opacity = 0;

            self.CaptionRect = new eg.Graphics.Rectangle(400, 550, 800, 50, eg.Graphics.Color.Black);
            self.CaptionRect.Opacity = 0.5
            self.CaptionRect.Visible = false;

            self.CaptionText = new eg.Graphics.Text2d(400, 550, "", eg.Graphics.Color.WhiteSmoke);
            self.CaptionText.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            self.CaptionText.FontSettings.FontSize = "30px";
            self.CaptionText.Opacity = 0;

            self.State = -1;
            self.IsFinished = false;

            self.Screen.Add(self.Background);
            self.Screen.Add(self.CaptionRect);
            self.Screen.Add(self.CaptionText);            

            self.MouseClick = (event: eg.Input.IMouseClickEvent) => {
                if (event.Button === "Left")
                    self.State = 9;
            }
            self.Unload = () => {
                self.Dispose();
            }
        }

        public Update(gameTime: eg.GameTime): void {
            var self = this;
            switch (self.State) {
                case -1:
                    self.Music.Play();
                    self.StartTime = gameTime.Now;
                    self.State++;
                    break;
                case 0:
                    if ((gameTime.Now.valueOf() - self.StartTime.valueOf()) > 1000) {
                        self.State++;
                        self.CaptionRect.Visible = true;
                        self.NeedsToUpdateLine = true;
                    }
                    break;
                case 1:
                    self.FadeText(gameTime, "My life is over", 2500, 3250, null, null);
                    break;
                case 2:
                    self.FadeText(gameTime, "I'm about to go into the ninth grade.", 5250, 5450, null, null);
                    break;
                case 3:
                    self.FadeText(gameTime, "High School.", 6600, 7200,
                        () => {
                            self.Background.Opacity += gameTime.Elapsed.Seconds * .5;
                            if (self.Background.Opacity > 1) self.Background.Opacity = 1;
                        },
                        () => {
                            self.Background.Opacity += gameTime.Elapsed.Seconds * .5;
                            if (self.Background.Opacity > 1) self.Background.Opacity = 1;
                        },
                        () => {
                            self.CaptionText.FontSettings.FontSize = "25px";
                        }
                        );
                    break;

                case 4:
                    self.FadeText(gameTime, "My parents decided we should move to this new town over the summer.", 10600, 11300, null, null,
                        () => {
                            self.CaptionText.FontSettings.FontSize = "30px";
                        }
                    );
                    break;
                case 5:
                    self.FadeText(gameTime, "I don't know anyone here.", 12750, 13150);
                    break;
                case 6:
                    self.FadeText(gameTime, "I have no friends here.", 14600, 15100);
                    break;
                case 7:
                    self.FadeText(gameTime, "How am I supposed to survive in a new school?", 17400, 18000);
                    break;
                case 8:
                    self.FadeText(gameTime, "Do my parents even realize how much this sucks?", 20600, 21000, null, null,
                        () => {
                            self.CaptionText.Visible = false;
                            self.CaptionRect.Visible = false;
                        }
                    );
                    break;
                case 9:
                    self.CaptionText.Visible = false;
                    self.CaptionRect.Visible = false;
                    self.Music.Volume -= gameTime.Elapsed.Seconds * 50;
                    if (self.Background.Opacity > 0) self.Background.Opacity -= gameTime.Elapsed.Seconds * .5;
                    if (self.Music.Volume < 0) {
                        self.Background.Opacity = 0;
                        self.State++;
                        self.IsFinished = true;
                        self.Music.Stop();
                    }
                    break;                    
            };
        }

        FadeText(gameTime: eg.GameTime, line: string, fadeOutTime: number, transitionTime: number, fadeInFunc: any = null, fadeOutFunc: any = null, transitionFunc: any = null): void {
            var self = this;
            if (self.NeedsToUpdateLine) {
                self.CaptionText.Text = line;
                self.NeedsToUpdateLine = false;
            }
            if ((gameTime.Now.valueOf() - self.StartTime.valueOf()) < fadeOutTime) {
                self.CaptionText.Opacity += gameTime.Elapsed.Seconds * 2;
                if (self.CaptionText.Opacity > 1) self.CaptionText.Opacity = 1;
                if (fadeInFunc != null) {
                    fadeInFunc();
                }
            }
            else {
                self.CaptionText.Opacity -= gameTime.Elapsed.Seconds * 2;
                if (self.CaptionText.Opacity < 0) self.CaptionText.Opacity = 0;
                if (fadeOutFunc != null) {
                    fadeOutFunc();
                }
            }
            if ((gameTime.Now.valueOf() - self.StartTime.valueOf()) > transitionTime) {
                self.State++;
                self.NeedsToUpdateLine = true;
                if (transitionFunc != null) {
                    transitionFunc();
                }
            }
        }

        private Dispose(): void {
            var self = this;
            self.Screen.Remove(self.Background);
            self.Screen.Remove(self.CaptionText);
            self.Screen.Remove(self.CaptionRect);
            if (self.Music) {
                self.Music.Stop();
                self.Music.Dispose();
            }
        }
    }
}