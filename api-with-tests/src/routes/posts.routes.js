const express = require('express');
const router = express.Router();
const Posts = require('../models/posts.models');

router.route('/posts')
  .get((req, res) => {
    Posts.find({})
      .then(posts => {
        res.json({ data: posts })
      });
  })
  .post((req, res, next) => {
    new Posts(req.body).save()
      .then(post => {
        res.status(201).json({ data: post });
      })
      .catch(err => {
        next(err);
      });
  });

router.route('/posts/:id')
  .get((req, res, next) => {
    Posts.findById(req.params.id)
      .then(post => {
        res.json({ data: post });
      })
      .catch(err => {
        next(err);
      });
  })
  .put((req, res, next) => {
    Posts.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(post => {
        res.json({ data: post });
      })
      .catch(err => {
        next(err);
      });
  })
  .delete((req, res) => {
    Posts.findByIdAndRemove(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        next(err);
      })
  });

module.exports = router;

