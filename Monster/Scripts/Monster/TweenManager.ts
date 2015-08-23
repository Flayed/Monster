module Monster {
    export class Tween implements eg.IUpdateable {
        private Shape: eg.Graphics.Graphic2d;
        private Tween: eg.Tweening.Vector2dTween;
        public IsFinished: boolean;
        private HasStarted: boolean;
        constructor(shape: eg.Graphics.Graphic2d, tween: eg.Tweening.Vector2dTween, delayStart: eg.TimeSpan = null) {
            this.Shape = shape;
            this.Tween = tween;
            this.HasStarted = false;
            this.IsFinished = false;
            setTimeout(() => {
                console.log(this.Tween);
                this.Tween.Play();
                this.HasStarted = true;
            }, (delayStart != null ? delayStart.Milliseconds : 0));
        }

        public Update(gameTime: eg.GameTime): void {
            if (!this.HasStarted) return;
            this.Tween.Update(gameTime);
            this.Shape.Position = this.Tween.Current;
            if (this.HasStarted && !this.Tween.IsPlaying()) this.IsFinished = true;
        }
    }
    export class TweenManager implements eg.IUpdateable {        
        private ActiveTweens: Array<Monster.Tween>;

        constructor() {
            this.ActiveTweens = new Array<Monster.Tween>();
        }

        public Add(shape: eg.Graphics.Graphic2d, toPosition: eg.Vector2d, duration: eg.TimeSpan, delay: eg.TimeSpan = null) {
            this.ActiveTweens.push(new Tween(shape, new eg.Tweening.Vector2dTween(shape.Position, toPosition, duration, eg.Tweening.Functions.Linear.EaseNone), delay));
        }

        public Update(gameTime: eg.GameTime): void {
            for (var tween in this.ActiveTweens) {
                console.log(tween);
                this.ActiveTweens[tween].Update(gameTime);
                if (this.ActiveTweens[tween].IsFinished)
                    this.ActiveTweens.splice(tween, 1);
            }
        }

        public HasTweens(): boolean {
            return this.ActiveTweens.length > 0;
        }
    }

}