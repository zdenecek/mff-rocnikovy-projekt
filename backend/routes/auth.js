


const passport = require("passport");
const router = require("express").Router();

module.exports = router;

const registerUser = require("../src/auth").registerUser;

router.post('/login/password',
  passport.authenticate("local", { failWithError: true }),
  function (req, res, next) {
    const user = req.user;
    return res.json({ success: true, user });
  },
  function (err, req, res, next) {
    console.error(err);
    const status = err.status || 500;
    return res.status(status).json({ success: false, error: err });
  });

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.json({ success: true });
  });
});

router.post("/change-password", async (req, res) => {
  const { password, username, oldPassword } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, message: "Not logged in", code: "not-logged-in" });
  }

  if (user.username !== username) {
    return res.status(401).json({ success: false, message: "Not logged in", code: "not-logged-in" });
  }

  if (! await user.isValidPassword(oldPassword)) {
    return res.status(401).json({ success: false, message: "Invalid password", code: "invalid-password" });
  }

  try {
    await user.setPassword(password)
    user.save(function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err });
      }
      return res.json({ success: true });
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err });
  }
});


router.post('/signup', (req, res) => {
  const { username, password, name } = req.body;

  registerUser(username, password, name, (err, user) => {
    if (err) {
      console.error(err);
      res.status(409).json({ success: false, message: err });
    }
    else res.json({ success: true, user });
  });
});