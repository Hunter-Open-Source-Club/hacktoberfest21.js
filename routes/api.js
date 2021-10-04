const express = require('express');
const router = express.Router();
const Post = require('../models/posts');

router.get('/posts', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Post.find({}, 'action')
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/posts', (req, res, next) => {
  if (req.body.action) {
    Post.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

router.delete('/posts/:id', (req, res, next) => {
  Post.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;