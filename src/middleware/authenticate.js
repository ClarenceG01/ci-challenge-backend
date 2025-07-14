import jwt from "jsonwebtoken";
export function authenticate(req, res, next) {
  const authCookie = req.cookies["token"];
  if (authCookie === null) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(authCookie, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
}
export function isAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
	return res.status(403).json({ message: "Access denied" });
  }
  next();
}