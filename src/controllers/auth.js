import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Permission from "../models/Permission";
import UserPermission from "../models/UserPermission";

/* for login routes */
const login = async (req, res) => {
  const errors = [];

  const { username, password } = req.body;
  const credentials = { username, password };

  await validateCredentials(credentials, errors);

  if (errors.length) return res.status(400).json({ errors });

  const user = await User.findOne({ where: { username } });
  const token = genToken(credentials);

  res.json({ user, token });
};

/* authorization middleware in routes involving reading/creating/updating/deleting data */
const loginRequired = async (req, res, next) => {
  const errors = [];
  const { authorization } = req.headers;

  if (!authorization) {
    errors.push({
      title: "Unauthorized Access",
      message: "An authorization token in the headers is required to access this resource.",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const { username, password } = jwt.verify(token, process.env.TOKEN_SECRET);
    const credentials = { username, password };

    await validateCredentials(credentials, errors);

    if (errors.length) return res.status(400).json({ errors });

    next();
  } catch (e) {
    return res.status(400).json({
      errors: [
        {
          title: "Unauthorized Access",
          message: "Invalid authorization token",
        },
      ],
    });
  }
};

/* authorization middleware in routes involving creating/updating/deleting data */
const adminRequired = async (req, res, next) => {
  const errors = [];
  const { authorization } = req.headers;

  if (!authorization) {
    errors.push({
      title: "Unauthorized Access",
      message: "An authorization token in the headers is required to access this resource.",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const { username, password } = jwt.verify(token, process.env.TOKEN_SECRET);
    const credentials = { username, password };

    await validateCredentials(credentials, errors);
    if (errors.length) return res.status(400).json({ errors });

    const user = await User.findOne({ where: { username } });

    await isAdmin(user, errors);
    if (errors.length) return res.status(400).json({ errors });

    next();
  } catch (e) {
    return res.status(400).json({
      errors: [
        {
          title: "Unauthorized Access",
          message: "Invalid authorization token",
        },
      ],
    });
  }
};

async function validateCredentials(credentials, errors) {
  const { username, password } = credentials;
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return errors.push({
      title: "Invalid Credentials",
      message: "The provided credentials are invalid. Please try again.",
    });
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return errors.push({
      title: "Invalid Credentials",
      message: "The provided credentials are invalid. Please try again.",
    });
  }
}

async function isAdmin(user, errors) {
  const adminPermission = await Permission.findOne({ where: { name: "Admin" } });
  const userPermission = await UserPermission.findOne({ where: { userId: user.id } });

  if (!(userPermission.permissionId === adminPermission.id)) {
    errors.push({
      title: "Unauthorized Access",
      message: "Only allowed users can access this resource.",
    });
  }
}

function genToken(userCredentials) {
  const token = jwt.sign(userCredentials, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return token;
}

export default { login, loginRequired, adminRequired };
