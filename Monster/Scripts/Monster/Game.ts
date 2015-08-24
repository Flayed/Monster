﻿/// <reference path="../endgate-0.2.1.d.ts" />
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
        private Lunchroom: Monster.Lunchroom;      
        private Credits: Monster.Credits;
        constructor(private _canvas: HTMLCanvasElement) {
            super(_canvas);
            var self = this;

            self.GameState = -1;
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
                    }
                    break;     
                case 1:
                    if (!self.Backstory) {
                        self.Backstory = new Monster.Backstory(self.Scene);
                        self.Input.Mouse.OnClick.Bind(self.Backstory.MouseClick);
                        self.Backstory.Music = self.Content.GetAudio("Backstory").BuildClip();
                    }
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
                    if (self.GymClass.IsFinished) {
                        self.GameState++;
                        self.GymClass.Unload();
                        self.Input.Mouse.OnClick.Unbind(self.GymClass.MouseClick);
                    }
                    break;
                case 3:
                    if (!self.Lunchroom) {
                        self.Lunchroom = new Monster.Lunchroom(self.Scene, self.Content, self.TalkBubbleManager, true);
                    }
                    self.Lunchroom.Update(gameTime);
                    if (self.Lunchroom.IsFinished) {
                        self.GameState++;
                        self.Lunchroom.Unload();
                    }
                    break;
                case 4:
                    if (!self.Credits) {
                        self.Credits = new Monster.Credits(self.Scene, self.Content, self.TweenManager);
                    }
                    self.Credits.Update(gameTime);
                    break;
            };
        }

        public MouseClick(event: eg.Input.IMouseClickEvent) {

        }

        public LoadContent(): void {
            this.Content.LoadAudio("Theme", ["./Content/Audio/MonsterTheme.ogg", "./Content/Audio/MonsterTheme.mp3"]);
            this.Content.LoadAudio("Backstory", ["./Content/Audio/MonsterBackstory.ogg", "./Content/Audio/MonsterBackstory.mp3"]);
            this.Content.LoadAudio("ClimbTheRope", ["./Content/Audio/ClimbTheRope.ogg", "./Content/Audio/ClimbTheRope.mp3"]);
            this.Content.LoadAudio("LunchroomVictory", ["./Content/Audio/LunchroomVictory.ogg", "./Content/Audio/LunchroomVictory.mp3"]);
            this.Content.LoadAudio("ItsOnlyYou", ["./Content/Audio/ItsOnlyYou.ogg", "./Content/Audio/ItsOnlyYou.mp3"]);
            this.Content.LoadAudio("EverybodysFavorite", "./Content/Audio/EverybodysFavorite.mp3");
            this.Content.LoadAudio("CoachTheRope", "./Content/Audio/TheRope.mp3");
            this.Content.LoadAudio("YouGoFirst", "./Content/Audio/YouGoFirst.mp3");
            this.Content.LoadAudio("ListenCarefully", "./Content/Audio/ListenCarefully.mp3");
            this.Content.LoadAudio("FirstExplanation", "./Content/Audio/FirstExplanation.mp3");
            this.Content.LoadAudio("SecondExplanation", "./Content/Audio/SecondExplanation.mp3");
            this.Content.LoadAudio("ThirdExplanation", "./Content/Audio/ThirdExplanation.mp3");
            this.Content.LoadAudio("FourthExplanation", "./Content/Audio/FourthExplanation.mp3");
            this.Content.LoadAudio("HaveFun", "./Content/Audio/HaveFun.mp3");

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
            this.Content.LoadImage("Lunchroom", "./Content/Img/LunchroomBackground.png", 800, 600);
            this.Content.LoadImage("LunchroomTable", "./Content/Img/LunchroomTable.png", 400, 80);
            this.Content.LoadImage("LunchroomTray", "./Content/Img/LunchTray.png", 58, 17);

        }

    }

}