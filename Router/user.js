const express = require("express");
const router = new express.Router();
const User = require("../model/User.js");
const auth = require("../middleware/auth.js");

//for log in user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.genreateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});


//logout
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return req.token !== token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//lgout from all
router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});






module.exports = router;
