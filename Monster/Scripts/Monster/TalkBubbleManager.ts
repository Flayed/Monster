/// <reference path="../endgate-0.2.1.d.ts" />
module Monster {
    export class TalkBubble implements eg.IUpdateable, eg.IDisposable {
        private Screen: eg.Rendering.Scene2d;
        private Bubble: eg.Graphics.Rectangle;
        private Text: eg.Graphics.Text2d;
        private Audio: eg.Sound.AudioClip;
        private State: number;
        private GoTime: number;
        private Duration: number;
        public IsFinished: boolean;
        constructor(screen: eg.Rendering.Scene2d, source: eg.Vector2d, message: string, audio: eg.Sound.AudioClip, duration: number) {
            this.Screen = screen;
            this.Duration = duration;
            this.Audio = audio;

            this.Text = new eg.Graphics.Text2d(source.X, source.Y - 100, message);
            this.Text.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.Text.FontSettings.FontSize = "18px";
            this.Text.Opacity = 0;
            this.Text.ZIndex = 999;

            
            this.Bubble = new eg.Graphics.Rectangle(source.X, source.Y - 100, message.length * 10, 35, eg.Graphics.Color.WhiteSmoke);
            this.Bubble.Border(2, eg.Graphics.Color.Black);
            this.Bubble.Opacity = 0;
            this.Bubble.ZIndex = 998;

            this.Screen.Add(this.Bubble);
            this.Screen.Add(this.Text);
            this.GoTime = Date.now().valueOf();
            this.IsFinished = false;
            this.State = 0;
            if (this.Audio)
                this.Audio.Play();
        }

        public Update(gameTime: eg.GameTime): void {
            var self = this;
            switch (self.State) {
                case 0:
                    if ((
                        Monster.Fader.FadeInShape(gameTime, this.Bubble, 2) +
                        Monster.Fader.FadeInShape(gameTime, this.Text, 2))
                        === 0) {
                        self.State++;
                    }
                    break;
                case 1:
                    if ((gameTime.Now.valueOf() - self.GoTime) >= self.Duration) {
                        self.State++;
                    }
                    break;
                case 2:
                    if ((
                        Monster.Fader.FadeOutShape(gameTime, this.Bubble, 2) +
                        Monster.Fader.FadeOutShape(gameTime, this.Text, 2)
                        ) === 0) {
                        self.State++;
                        self.IsFinished = true;
                    }
            }
        }

        public Dispose(): void {
            if (this.Audio) {
                this.Audio.Stop();
                this.Audio.Dispose();
            }
            this.Screen.Remove(this.Text);
            this.Screen.Remove(this.Bubble);
        }
    }

    export class TalkBubbleManager implements eg.IUpdateable {
        private ActiveTalkBubbles: Array<TalkBubble>;
        private Screen: eg.Rendering.Scene2d;
        constructor(screen: eg.Rendering.Scene2d) {
            this.Screen = screen;
            this.ActiveTalkBubbles = new Array<Monster.TalkBubble>();
        }

        public Add(source: eg.Vector2d, message: string, sound: eg.Sound.AudioClip, duration: number) {
            this.ActiveTalkBubbles.push(new TalkBubble(this.Screen, source, message, sound, duration));
        }

        public Update(gameTime: eg.GameTime): void {
            for (var talkBubble in this.ActiveTalkBubbles) {
                this.ActiveTalkBubbles[talkBubble].Update(gameTime);
                if (this.ActiveTalkBubbles[talkBubble].IsFinished) {
                    this.ActiveTalkBubbles[talkBubble].Dispose();
                    this.ActiveTalkBubbles.splice(talkBubble, 1);
                }
            }
        }

        public HasActiveTalkBubbles(): boolean {
            return this.ActiveTalkBubbles.length > 0;
        }
    }
}