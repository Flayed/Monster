/// <reference path="../endgate-0.2.1.d.ts" />
var Monster;
(function (Monster) {
    var TalkBubble = (function () {
        function TalkBubble(screen, source, message, duration) {
            this.Screen = screen;
            this.Duration = duration;
            this.Bubble = new eg.Graphics.Rectangle(source.X, source.Y - 100, message.length * 12, 35, eg.Graphics.Color.WhiteSmoke);
            this.Bubble.Border(2, eg.Graphics.Color.Black);
            this.Bubble.Opacity = 0;
            this.Text = new eg.Graphics.Text2d(source.X, source.Y - 100, message);
            this.Text.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.Text.FontSettings.FontSize = "18px";
            this.Text.Opacity = 0;
            this.Screen.Add(this.Bubble);
            this.Screen.Add(this.Text);
            this.GoTime = Date.now().valueOf();
            this.IsFinished = false;
            this.State = 0;
        }
        TalkBubble.prototype.Update = function (gameTime) {
            var self = this;
            switch (self.State) {
                case 0:
                    if ((Monster.Fader.FadeInShape(gameTime, this.Bubble, 2) +
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
                    if ((Monster.Fader.FadeOutShape(gameTime, this.Bubble, 2) +
                        Monster.Fader.FadeOutShape(gameTime, this.Text, 2)) === 0) {
                        self.State++;
                        self.IsFinished = true;
                    }
            }
        };
        TalkBubble.prototype.Dispose = function () {
            this.Screen.Remove(this.Text);
            this.Screen.Remove(this.Bubble);
        };
        return TalkBubble;
    })();
    Monster.TalkBubble = TalkBubble;
    var TalkBubbleManager = (function () {
        function TalkBubbleManager(screen) {
            this.Screen = screen;
            this.ActiveTalkBubbles = new Array();
        }
        TalkBubbleManager.prototype.Add = function (source, message, duration) {
            this.ActiveTalkBubbles.push(new TalkBubble(this.Screen, source, message, duration));
        };
        TalkBubbleManager.prototype.Update = function (gameTime) {
            for (var talkBubble in this.ActiveTalkBubbles) {
                this.ActiveTalkBubbles[talkBubble].Update(gameTime);
                if (this.ActiveTalkBubbles[talkBubble].IsFinished) {
                    this.ActiveTalkBubbles[talkBubble].Dispose();
                    this.ActiveTalkBubbles.splice(talkBubble, 1);
                }
            }
        };
        TalkBubbleManager.prototype.HasActiveTalkBubbles = function () {
            return this.ActiveTalkBubbles.length > 0;
        };
        return TalkBubbleManager;
    })();
    Monster.TalkBubbleManager = TalkBubbleManager;
})(Monster || (Monster = {}));
