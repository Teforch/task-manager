import passport from "passport";

class SessionController {
  loginPage(req, res) {
    res.render("login", { isGuest: req.isGuest });
  }

  deleteSession(req, res) {
    req.logout(req.user, (err) => {
      if (err) return next(err);
    });
    res.redirect("/");
  }

  createSession(req, res) {
    req.flash("success_msg", "You are logged in");
    res.redirect("/");
  }
}

export default new SessionController();
