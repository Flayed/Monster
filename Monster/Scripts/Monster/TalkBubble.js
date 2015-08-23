/// <reference path="../endgate-0.2.1.d.ts" />
var Monster;
(function (Monster) {
    var TalkBubble = (function () {
        function TalkBubble(screen, source, message) {
            this.Screen = screen;
            this.Bubble = new eg.Graphics.Rectangle(source.X, source.Y - 100, message.length * 12, 35, eg.Graphics.Color.WhiteSmoke);
            this.Bubble.Border(2, eg.Graphics.Color.Black);
            this.Text = new eg.Graphics.Text2d(source.X, source.Y - 100, message);
            this.Text.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.Text.FontSettings.FontSize = "18px";
            this.Screen.Add(this.Bubble);
            this.Screen.Add(this.Text);
        }
        TalkBubble.prototype.Update = function (gameTime) {
        };
        TalkBubble.prototype.Dispose = function () {
            this.Screen.Remove(this.Text);
            this.Screen.Remove(this.Bubble);
        };
        return TalkBubble;
    })();
    Monster.TalkBubble = TalkBubble;
})(Monster || (Monster = {}));
