var Monster;
(function (Monster) {
    var Tween = (function () {
        function Tween(shape, tween, delayStart) {
            var _this = this;
            if (delayStart === void 0) { delayStart = null; }
            this.Shape = shape;
            this.Tween = tween;
            this.HasStarted = false;
            this.IsFinished = false;
            setTimeout(function () {
                console.log(_this.Tween);
                _this.Tween.Play();
                _this.HasStarted = true;
            }, (delayStart != null ? delayStart.Milliseconds : 0));
        }
        Tween.prototype.Update = function (gameTime) {
            if (!this.HasStarted)
                return;
            this.Tween.Update(gameTime);
            this.Shape.Position = this.Tween.Current;
            if (this.HasStarted && !this.Tween.IsPlaying())
                this.IsFinished = true;
        };
        return Tween;
    })();
    Monster.Tween = Tween;
    var TweenManager = (function () {
        function TweenManager() {
            this.ActiveTweens = new Array();
        }
        TweenManager.prototype.Add = function (shape, toPosition, duration, delay) {
            if (delay === void 0) { delay = null; }
            this.ActiveTweens.push(new Tween(shape, new eg.Tweening.Vector2dTween(shape.Position, toPosition, duration, eg.Tweening.Functions.Linear.EaseNone), delay));
        };
        TweenManager.prototype.Update = function (gameTime) {
            for (var tween in this.ActiveTweens) {
                console.log(tween);
                this.ActiveTweens[tween].Update(gameTime);
                if (this.ActiveTweens[tween].IsFinished)
                    this.ActiveTweens.splice(tween, 1);
            }
        };
        TweenManager.prototype.HasTweens = function () {
            return this.ActiveTweens.length > 0;
        };
        return TweenManager;
    })();
    Monster.TweenManager = TweenManager;
})(Monster || (Monster = {}));
