/// <reference path="../endgate-0.2.1.d.ts" />
module Monster {
    export class TalkBubble implements eg.IUpdateable, eg.IDisposable {
        private Screen: eg.Rendering.Scene2d;
        private Bubble: eg.Graphics.Rectangle;
        private Text: eg.Graphics.Text2d;
        constructor(screen: eg.Rendering.Scene2d, source: eg.Vector2d, message: string) {
            this.Screen = screen;
            this.Bubble = new eg.Graphics.Rectangle(source.X, source.Y - 100, message.length * 12, 35, eg.Graphics.Color.WhiteSmoke);
            this.Bubble.Border(2, eg.Graphics.Color.Black);
            this.Text = new eg.Graphics.Text2d(source.X, source.Y - 100, message);
            this.Text.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Helvetica;
            this.Text.FontSettings.FontSize = "18px";

            this.Screen.Add(this.Bubble);
            this.Screen.Add(this.Text);
        }

        public Update(gameTime: eg.GameTime): void {
            
        }

        public Dispose(): void {
            this.Screen.Remove(this.Text);
            this.Screen.Remove(this.Bubble);
        }
    }
}