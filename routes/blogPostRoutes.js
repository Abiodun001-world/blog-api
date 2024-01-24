// routes/blogPostRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const BlogPost = require('../models/blogPost');
const authorization = require('../middleware/authorization');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const blogPosts = await BlogPost.find().populate('author', 'username');
    res.json(blogPosts);
  } catch (error) {
    next(error);
  }
});

router.post('/', authorization, async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // Validate request
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required for creating a blog post' });
    }

    // Create a new blog post
    const newBlogPost = new BlogPost({ title, content, author: req.user.id });
    await newBlogPost.save();

    res.status(200).json(newBlogPost);
  } catch (error) {
    next(error);
  }
});

router.put('/:postId', authorization, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const postId = req.params.postId;

    // Validate request
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required for updating a blog post' });
    }

    // Update the blog post
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedBlogPost);
  } catch (error) {
    next(error);
  }
});

router.delete('/:postId', authorization, async (req, res, next) => {
  try {
    const postId = req.params.postId;

    // Delete the blog post
    await BlogPost.findByIdAndDelete(postId);

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
