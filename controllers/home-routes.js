const router = require('express').Router();
const { Post, User } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Sign Up

router.get('/signup', (req, res) => {
  res.render('signup');
});


router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Dashboard route with route-level auth check
router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }

  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Single post route
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }],
    });
    const post = postData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
