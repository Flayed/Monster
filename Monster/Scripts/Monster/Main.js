/// <reference path="Game.ts" />
/// <reference path="../endgate-0.2.1.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
(function ($, window) {
    // Create game
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), game;
    canvas.width = 800;
    canvas.height = 600;
    holder.append(canvas);
    game = new Monster.Game(canvas);
    holder.focus();
})($, window);
