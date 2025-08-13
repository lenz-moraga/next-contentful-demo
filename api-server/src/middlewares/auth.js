import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function authorize(roles = []) {
  return (req, res, next) => {
    const userRoles = req.user?.roles || [];
    const hasRoles = roles.some((role) => userRoles.includes(role));

    if (roles.length && !hasRoles) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}
