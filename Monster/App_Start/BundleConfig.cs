using System.Web;
using System.Web.Optimization;

namespace Monster
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/game").Include(
                "~/Scripts/endgate-{version}.js",
                "~/Scripts/underscore.js",
                "~/Scripts/Monster/TweenManager.js",
                "~/Scripts/Monster/TalkBubbleManager.js",
                "~/Scripts/Monster/Fader.js",
                "~/Scripts/Monster/ItsBasicallyDanceDanceRevolution.js",
                "~/Scripts/Monster/Title.js",
                "~/Scripts/Monster/Backstory.js",
                "~/Scripts/Monster/GymClass.js",
                "~/Scripts/Monster/Game.js",
                "~/Scripts/Monster/Main.js"));
        }
    }
}
