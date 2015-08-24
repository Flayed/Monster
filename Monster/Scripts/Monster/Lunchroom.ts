/// <reference path="../endgate-0.2.1.d.ts" />
module Monster {
    export class Lunchroom {
        private Screen: eg.Rendering.Scene2d;
        private Content: eg.Content.ContentManager;
        private TalkBubbleManager: Monster.TalkBubbleManager;
        private Music: eg.Sound.AudioClip;
        public Background: eg.Graphics.Sprite2d;
        public PopularLunchroomTable: eg.Graphics.Sprite2d;
        public UnpopularLunchroomTable: eg.Graphics.Sprite2d;    
        public PopularLunchtrays: Array<eg.Graphics.Sprite2d>; 
        public UnpopularLunchTray: eg.Graphics.Sprite2d;

        private Dawn: eg.Graphics.Sprite2d;
        private Dexter: eg.Graphics.Sprite2d;
        private Elmo: eg.Graphics.Sprite2d;
        private Jerry: eg.Graphics.Sprite2d;
        private TheBully: eg.Graphics.Sprite2d;
        private TheGirl: eg.Graphics.Sprite2d;
        private TheGuy: eg.Graphics.Sprite2d;
        private Chen: eg.Graphics.Sprite2d; 

        private Victory: boolean;

        public IsFinished: boolean;
        public Unload: any;
        private State: number;
        constructor(screen: eg.Rendering.Scene2d, content: eg.Content.ContentManager, talkBubbleManager: Monster.TalkBubbleManager, victory: boolean) {
            var self = this;
            self.Screen = screen;
            self.Content = content;
            self.TalkBubbleManager = talkBubbleManager;
            self.Victory = victory;
            self.PopularLunchtrays = new Array<eg.Graphics.Sprite2d>();
            for (var x = 0; x < 300; x = x + 1) {
                self.Screen.Add(new eg.Graphics.Rectangle(0, 0, 1, 1));
            } 
            self.Background = new eg.Graphics.Sprite2d(400, 300, self.Content.GetImage("Lunchroom"));
            self.Background.Opacity = 0;
            self.Screen.Add(self.Background);

            self.Dawn = new eg.Graphics.Sprite2d(0, 0, self.Content.GetImage("Dawn"));
            self.Dawn.Visible = false;
            self.Dawn.Scale(1.15);
            self.Dawn.Opacity = 0;
            self.Dexter = new eg.Graphics.Sprite2d(0, 0, self.Content.GetImage("Dexter"));
            self.Dexter.Visible = false;
            self.Dexter.Opacity = 0;
            self.Elmo = new eg.Graphics.Sprite2d(0, 0, self.Content.GetImage("Elmo"));
            self.Elmo.Visible = false;
            self.Elmo.Opacity = 0;
            self.Jerry = new eg.Graphics.Sprite2d(0, 0, self.Content.GetImage("Jerry"));
            self.Jerry.Visible = false;
            self.Jerry.Opacity = 0;
            self.TheBully = new eg.Graphics.Sprite2d(0, 0, self.Content.GetImage("TheBully"));
            self.TheBully.Visible = false;
            self.TheBully.Opacity = 0;
            self.TheGirl = new eg.Graphics.Sprite2d(0, 0, self.Content.GetImage("TheGirl"));
            self.TheGirl.Visible = false;
            self.TheGirl.Opacity = 0;
            self.TheGuy = new eg.Graphics.Sprite2d(0, 0, self.Content.GetImage("TheGuy"));
            self.TheGuy.Visible = false;
            self.TheGuy.Opacity = 0;
            self.Chen = new eg.Graphics.Sprite2d(0, 0, self.Content.GetImage("Chen"));
            self.Chen.Visible = false;
            self.Chen.Opacity = 0;

            self.Dawn.Position = new eg.Vector2d(45, 360);
            self.Dawn.Visible = true;
            self.TheGirl.Position = new eg.Vector2d(120, 355);
            self.TheGirl.Visible = true;
            self.Jerry.Position = new eg.Vector2d(270, 355);
            self.Jerry.Visible = true;
            self.Chen.Position = new eg.Vector2d(345, 355);
            self.Chen.Visible = true;

            if (self.Victory) {
                self.TheGuy.Position = new eg.Vector2d(195, 355);
                self.TheGuy.Visible = true;
                self.Dexter.Position = new eg.Vector2d(660, 355);
                self.Dexter.Visible = true;
            }
            else {
                self.TheGuy.Position = new eg.Vector2d(660, 355);
                self.TheGuy.Visible = true;
                self.Dexter.Position = new eg.Vector2d(195, 355);
                self.Dexter.Visible = true;
            }

            self.Screen.Add(self.Dawn);
            self.Screen.Add(self.Dexter);
            self.Screen.Add(self.Elmo);
            self.Screen.Add(self.Jerry);
            self.Screen.Add(self.TheBully);
            self.Screen.Add(self.TheGirl);
            self.Screen.Add(self.TheGuy);
            self.Screen.Add(self.Chen);


            self.PopularLunchroomTable = new eg.Graphics.Sprite2d(195, 400, self.Content.GetImage("LunchroomTable"));
            self.PopularLunchroomTable.Opacity = 0;

            self.UnpopularLunchroomTable = new eg.Graphics.Sprite2d(645, 400, self.Content.GetImage("LunchroomTable"));
            self.UnpopularLunchroomTable.Opacity = 0;

            self.PopularLunchtrays.push(new eg.Graphics.Sprite2d(45, 355, self.Content.GetImage("LunchroomTray")));
            self.PopularLunchtrays.push(new eg.Graphics.Sprite2d(120, 355, self.Content.GetImage("LunchroomTray")));
            self.PopularLunchtrays.push(new eg.Graphics.Sprite2d(195, 355, self.Content.GetImage("LunchroomTray")));
            self.PopularLunchtrays.push(new eg.Graphics.Sprite2d(270, 355, self.Content.GetImage("LunchroomTray")));
            self.PopularLunchtrays.push(new eg.Graphics.Sprite2d(345, 355, self.Content.GetImage("LunchroomTray")));

            self.UnpopularLunchTray = new eg.Graphics.Sprite2d(660, 355, self.Content.GetImage("LunchroomTray"));
            self.UnpopularLunchTray.Opacity = 0;
                  
            self.Screen.Add(self.PopularLunchroomTable);
            self.Screen.Add(self.UnpopularLunchroomTable);
            self.PopularLunchtrays.forEach((lunchTray) => {
                lunchTray.Opacity = 0;
                self.Screen.Add(lunchTray);
            });
            self.Screen.Add(self.UnpopularLunchTray);     


            self.Music = content.GetAudio("LunchroomVictory").Play(new eg.Sound.AudioSettings(true));
            self.State = 0;

            self.Unload = () => {
                self.Dispose();
            }
        }

        public Update(gameTime: eg.GameTime): void {
            var self = this;
            switch (self.State) {               
                case 0:
                    var lunchTrayOpacity = 0;
                    self.PopularLunchtrays.forEach((lunchTray) => {
                        lunchTrayOpacity += Monster.Fader.FadeInSprite(gameTime, lunchTray, .5);
                    });
                    if ((
                        lunchTrayOpacity +
                        Monster.Fader.FadeInSprite(gameTime, self.Dawn, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.Dexter, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.Elmo, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.Jerry, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.TheBully, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.TheGirl, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.TheGuy, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.Chen, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.UnpopularLunchTray, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.Background, .5) +
                        Monster.Fader.FadeInSprite(gameTime, self.PopularLunchroomTable, .5) + 
                        Monster.Fader.FadeInSprite(gameTime, self.UnpopularLunchroomTable, .5)) == 0) {
                        self.State++;                        
                        setTimeout(() => {
                            self.TalkBubbleManager.Add(self.TheGuy.Position, "Now I have friends!", null, 5000);
                            setTimeout(() => { self.State++ }, 15000);  
                        }, 15000);
                      
                    }
                    break;
                case 1:

                    break;
                case 2:
                    self.Music.Volume -= gameTime.Elapsed.Seconds * 10;
                    if (self.Music.Volume <= 0) {
                        self.Music.Stop();
                        self.State++;
                    }
                    self.PopularLunchtrays.forEach((lunchTray) => {
                        Monster.Fader.FadeOutSprite(gameTime, lunchTray, .5);
                    });
                    Monster.Fader.FadeOutSprite(gameTime, self.Dawn, .5);
                    Monster.Fader.FadeOutSprite(gameTime, self.Dexter, .5);
                    Monster.Fader.FadeOutSprite(gameTime, self.Elmo, .5);
                    Monster.Fader.FadeOutSprite(gameTime, self.Jerry, .5);
                    Monster.Fader.FadeOutSprite(gameTime, self.TheBully, .5);
                    Monster.Fader.FadeOutSprite(gameTime, self.TheGirl, .5);
                    Monster.Fader.FadeOutSprite(gameTime, self.TheGuy, .5);
                    Monster.Fader.FadeOutSprite(gameTime, self.Chen, .5);
                    Monster.Fader.FadeOutSprite(gameTime, self.UnpopularLunchTray, .5);
                    Monster.Fader.FadeOutSprite(gameTime, self.Background, .5);
                    Monster.Fader.FadeOutSprite(gameTime, self.PopularLunchroomTable, .5);
                    Monster.Fader.FadeOutSprite(gameTime, self.UnpopularLunchroomTable, .5);

                    break;
                case 3:
                    self.IsFinished = true;
                    break;

            };
        }
        
        private Dispose(): void {
            var self = this;
            self.Screen.Remove(self.Background);
            self.Screen.Remove(self.Dawn);
            self.Screen.Remove(self.Dexter);
            self.Screen.Remove(self.Elmo);
            self.Screen.Remove(self.Jerry);
            self.Screen.Remove(self.TheBully);
            self.Screen.Remove(self.TheGirl);
            self.Screen.Remove(self.TheGuy);
            self.Screen.Remove(self.Chen);
            self.PopularLunchtrays.forEach((lunchTray) => {
                self.Screen.Remove(lunchTray);
            });
            self.Screen.Remove(self.UnpopularLunchTray);
            if (self.Music) {
                self.Music.Stop();
                self.Music.Dispose();
            }
        }
    }
}