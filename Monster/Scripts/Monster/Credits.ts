/// <reference path="../endgate-0.2.1.d.ts" />
module Monster {
    export class Credits implements eg.IUpdateable {
        private Screen: eg.Rendering.Scene2d;    
        private Content: eg.Content.ContentManager;
        private TweenManager: Monster.TweenManager;    
        public Music: eg.Sound.AudioClip;
        public IsFinished: boolean;
        private State: number;
        private CreditState: number;
        private CreditList: Array<string>;

        private Background: eg.Graphics.Rectangle;
        private FirstLine: eg.Graphics.Text2d;
        private SecondLine: eg.Graphics.Text2d;
        private ThirdLine: eg.Graphics.Text2d;
        private FourthLine: eg.Graphics.Text2d;

        constructor(screen: eg.Rendering.Scene2d, content: eg.Content.ContentManager, tweenManager: Monster.TweenManager) {
            var self = this;
            self.Screen = screen;
            self.TweenManager = tweenManager;
            self.Content = content;

            self.FirstLine = new eg.Graphics.Text2d(400, 200, "", eg.Graphics.Color.WhiteSmoke);
            self.FirstLine.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            self.FirstLine.FontSettings.FontSize = "40px";
            self.FirstLine.Opacity = 0;
            self.SecondLine = new eg.Graphics.Text2d(400, 250, "", eg.Graphics.Color.WhiteSmoke);
            self.SecondLine.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            self.SecondLine.FontSettings.FontSize = "40px";
            self.SecondLine.Opacity = 0;
            self.ThirdLine = new eg.Graphics.Text2d(400, 300, "", eg.Graphics.Color.WhiteSmoke);
            self.ThirdLine.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            self.ThirdLine.FontSettings.FontSize = "40px";
            self.ThirdLine.Opacity = 0;
            self.FourthLine = new eg.Graphics.Text2d(400, 350, "", eg.Graphics.Color.WhiteSmoke);
            self.FourthLine.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            self.FourthLine.FontSettings.FontSize = "40px";
            self.FourthLine.Opacity = 0;

            self.Background = new eg.Graphics.Rectangle(400, 300, 795, 595, eg.Graphics.Color.Black);
            self.Background.Border(5, eg.Graphics.Color.FromHex("1a0072"));
            self.Background.Shadow(0, 0, eg.Graphics.Color.FromHex("1a0072"), 25);
            self.Background.Opacity = 0;

            self.Screen.Add(self.Background);
            self.Screen.Add(self.FirstLine);
            self.Screen.Add(self.SecondLine);
            self.Screen.Add(self.ThirdLine);
            self.Screen.Add(self.FourthLine);

            self.CreditList = ["Produced By",
                "Directed By",
                "Approved By",
                "Editted By",
                "Senior Principal Programmer",
                "Principal Programmer",
                "Lead Programmer",
                "Senior Programmer",
                "Programmer",
                "Junior Programmer",
                "Programming Intern",
                "Principal Architect",
                "Senior Architect",
                "Scenario",
                "Engine Design",
                "Radiator Design",
                "Wheel Design",
                "Airconditioner on Top of School Design",
                "Tools",
                "Lead Artist",
                "Concept Art",
                "Inconceivable Art",
                "Character Design",
                "Background Design",
                "Lead Sound Engineer",
                "Sound Mixing",
                "Sound Recording",
                "Sound Editing",
                "Voice Overs",
                "Original Songs By",
                "Vocalist"
            ]
            self.State = -1;
            self.IsFinished = false;

            self.Music = self.Content.GetAudio("ItsOnlyYou").Play(new eg.Sound.AudioSettings(false));
            
        }

        public Update(gameTime: eg.GameTime): void {
            var self = this;
            switch (self.State) {
                case -1: 
                    if (Monster.Fader.FadeInShape(gameTime, self.Background, .5) == 0) {
                        self.State++;
                        self.CreditState = 3;
                    }                 
                    break;
                case 0:
                    if (self.CreditList.length == 0) {
                        self.State++;
                        self.FirstLine.Text = "Special Thanks";
                        self.SecondLine.Text = "Jennifer Darchuk, for pushing me";
                        self.ThirdLine.Text = "Eric Benson, for believing in me";
                        self.FourthLine.Text = "Robert P. Darchuk.  Duh.";
                    }
                    else {
                        switch (self.CreditState) {
                            case 0:
                                if ((Monster.Fader.FadeInShape(gameTime, self.FirstLine, 1) +
                                    Monster.Fader.FadeInShape(gameTime, self.ThirdLine, 1)) === 0) {
                                    self.CreditState++;
                                    self.TweenManager.Add(self.FirstLine, self.FirstLine.Position, new eg.TimeSpan(1000));
                                }
                                break;
                            case 1:
                                if (!self.TweenManager.HasTweens()) {
                                    self.CreditState++;
                                }
                                break;
                            case 2:
                                if ((Monster.Fader.FadeOutShape(gameTime, self.FirstLine, 1) +
                                    Monster.Fader.FadeOutShape(gameTime, self.ThirdLine, 1)) === 0) {
                                    self.CreditState++;
                                }
                                break;
                            case 3: {
                                self.FirstLine.Text = self.CreditList[0];
                                self.ThirdLine.Text = "Robert P. Darchuk";
                                self.CreditList.splice(0, 1);                                
                                self.CreditState = 0;
                            }
                        }
                    }
                    break;
                case 1:
                    if ((Monster.Fader.FadeInShape(gameTime, self.FirstLine, 1) +
                        Monster.Fader.FadeInShape(gameTime, self.SecondLine, 1) +
                        Monster.Fader.FadeInShape(gameTime, self.ThirdLine, 1) +
                        Monster.Fader.FadeInShape(gameTime, self.FourthLine, 1)) === 0) {
                        self.State++;
                    }
                    break;
                case 2:
                    self.State++;
                    setTimeout(() => { self.State++ }, 2000);
                    break;
                case 3:
                    break;
                case 4:
                    if ((Monster.Fader.FadeOutShape(gameTime, self.FirstLine, 1) +
                        Monster.Fader.FadeOutShape(gameTime, self.SecondLine, 1) +
                        Monster.Fader.FadeOutShape(gameTime, self.ThirdLine, 1) +
                        Monster.Fader.FadeOutShape(gameTime, self.FourthLine, 1)) === 0) {
                        self.State++;
                        self.SecondLine.Text = "©2015 Robert P. Darchuk";
                        self.FourthLine.Text = "For Ludum Dare Compo 33";
                    }
                    break;
                case 5:
                    Monster.Fader.FadeInShape(gameTime, self.SecondLine, 1);
                    Monster.Fader.FadeInShape(gameTime, self.FourthLine, 1);
                    break;
            };
        }        

        private Dispose(): void {
            var self = this;
            if (self.Music) {
                self.Music.Stop();
                self.Music.Dispose();
            }
        }
    }
}