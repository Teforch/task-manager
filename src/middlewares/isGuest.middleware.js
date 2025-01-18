export default (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.isGuest = true;
    return next();
  }
  req.isGuest = false;
  next();
};

