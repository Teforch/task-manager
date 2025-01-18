export default (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error_msg", "You are not logged in");
        return res.redirect("/");
    }
    
    if (req.user.id != req.params.id) {
        req.flash("error_msg", "You cannot perform actions on other users.");
        return res.redirect("/users");
    }
    next();
}