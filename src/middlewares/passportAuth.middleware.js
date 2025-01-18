import passport from "passport";

export default (req, res, next) => {
    passport.authenticate("local", {
        successMessage: true,
        failureRedirect: "/session/new",
        failureFlash: true,
        successFlash: true,
      })(req, res, next);
}