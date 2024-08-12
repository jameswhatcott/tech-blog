const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    // Fetch the posts of the logged-in user
    const postData = await Post.findAll({
      where: { userId: req.session.userId },
      attributes: ['id', 'title', 'content', 'createdAt'],
    });

    // Serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard with the user's posts
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/new', (req, res) => {
    res.render('new-post', {
      loggedIn: req.session.loggedIn,
    });
  });
  
  router.post('/new', async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.session.userId,
      });
  
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  

  router.get('/edit/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      const post = postData.get({ plain: true });
  
      res.render('edit-post', {
        post,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  router.put('/edit/:id', async (req, res) => {
    try {
      const updatedPost = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: { id: req.params.id },
        }
      );
  
      if (!updatedPost) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  

module.exports = router;
