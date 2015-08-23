/// <reference path="../endgate-0.2.1.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />


// Wrap in module to keep code out of global scope
module Monster {

    export class Game extends eg.Game {
        private GameState: number;
        private TweenManager: Monster.TweenManager;
        private TalkBubbleManager: Monster.TalkBubbleManager;
        private TitleScreen: Monster.Title;
        private Backstory: Monster.Backstory;
        private GymClass: Monster.GymClass;      
        constructor(private _canvas: HTMLCanvasElement) {
            super(_canvas);
            var self = this;

            self.GameState = 2;
            self.TweenManager = new Monster.TweenManager();
            self.TalkBubbleManager = new Monster.TalkBubbleManager(self.Scene);
        }

        public Update(gameTime: eg.GameTime): void {
            var self = this;
            self.TweenManager.Update(gameTime);
            self.TalkBubbleManager.Update(gameTime);
            // Move the circle to the right at 200 pixels per second
            switch (self.GameState) {
                case -1:
                    self.TitleScreen = new Monster.Title(self.Scene);
                    self.TitleScreen.Music = self.Content.GetAudio("Theme").Play(new eg.Sound.AudioSettings(true, 100));

                    this.Input.Mouse.OnClick.Bind(self.TitleScreen.MouseClick);
                    this.Input.Mouse.OnMove.Bind(self.TitleScreen.MouseMove);
                    self.GameState++;
                    break;
                case 0:
                    self.TitleScreen.Update(gameTime);
                    if (self.TitleScreen.IsFinished) {
                        self.GameState++;
                        self.TitleScreen.Unload();
                        self.Input.Mouse.OnClick.Unbind(self.TitleScreen.MouseClick);
                        this.Input.Mouse.OnMove.Unbind(self.TitleScreen.MouseMove);
                        self.Backstory = new Monster.Backstory(self.Scene);
                        self.Input.Mouse.OnClick.Bind(self.Backstory.MouseClick);
                        self.Backstory.Music = self.Content.GetAudio("Backstory").BuildClip();
                    }
                    break;     
                case 1:
                    self.Backstory.Update(gameTime);
                    if (self.Backstory.IsFinished) {
                        self.GameState++;
                        self.Backstory.Unload();
                        self.Input.Mouse.OnClick.Unbind(self.Backstory.MouseClick);
                    }
                    break;               
                case 2:
                    if (!self.GymClass) {
                        self.GymClass = new Monster.GymClass(self.Scene, self.Content, self.TweenManager, self.TalkBubbleManager, self.Input.Keyboard);
                        self.Input.Mouse.OnClick.Bind(self.GymClass.MouseClick);
                    }
                    self.GymClass.Update(gameTime);
                    break;
            };
        }

        public MouseClick(event: eg.Input.IMouseClickEvent) {

        }

        public LoadContent(): void {
            this.Content.LoadAudio("Theme", ["./Content/Audio/MonsterTheme.ogg", "./Content/Audio/MonsterTheme.mp3"]);
            this.Content.LoadAudio("Backstory", ["./Content/Audio/MonsterBackstory.ogg", "./Content/Audio/MonsterBackstory.mp3"]);
            this.Content.LoadImage("TitleBackground", "./Content/Img/TitleBackground.png", 800, 600);
            this.Content.LoadImage("School", "./Content/Img/School.png", 800, 600);
            this.Content.LoadImage("FreshmanBackground", "./Content/Img/FreshmanBackground.png", 800, 600);
            this.Content.LoadImage("Cheerleader", "./Content/Img/Cheerleader.png", 100, 140);
            this.Content.LoadImage("Chen", "./Content/Img/Chen.png", 75, 140);
            this.Content.LoadImage("Dawn", "./Content/Img/Dawn.png", 75, 140);
            this.Content.LoadImage("Dexter", "./Content/Img/Dexter.png", 75, 140);
            this.Content.LoadImage("Elmo", "./Content/Img/Elmo.png", 75, 140);
            this.Content.LoadImage("GymCoach", "./Content/Img/GymCoach.png", 75, 140);
            this.Content.LoadImage("Jerry", "./Content/Img/Jerry.png", 75, 140);
            this.Content.LoadImage("TheBully", "./Content/Img/TheBully.png", 75, 140);
            this.Content.LoadImage("TheGirl", "./Content/Img/TheGirl.png", 75, 140);
            this.Content.LoadImage("TheGuy", "./Content/Img/TheGuy.png", 75, 140);
            this.Content.LoadImage("TheRope", "./Content/Img/TheRope.png", 75, 400);
            this.Content.LoadImage("null", "./Content/Img/null.png", 1, 1);
            this.Content.LoadImage("UpArrow", "./Content/Img/UpArrow.png", 102, 102);
            this.Content.LoadImage("UpArrowOutline", "./Content/Img/UpArrowOutline.png", 102, 102);
            this.Content.LoadImage("DownArrow", "./Content/Img/DownArrow.png", 102, 102);
            this.Content.LoadImage("DownArrowOutline", "./Content/Img/DownArrowOutline.png", 102, 102);
            this.Content.LoadImage("LeftArrow", "./Content/Img/LeftArrow.png", 102, 102);
            this.Content.LoadImage("LeftArrowOutline", "./Content/Img/LeftArrowOutline.png", 102, 102);
            this.Content.LoadImage("RightArrow", "./Content/Img/RightArrow.png", 102, 102);
            this.Content.LoadImage("RightArrowOutline", "./Content/Img/RightArrowOutline.png", 102, 102);

        }

    }

}