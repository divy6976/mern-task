const express = require('express');
const Post = require('../model/postModel');
const authMiddleware = require('../middleware/authMiddleware');

const postRouter = express.Router();

// Create post
postRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'content required' });
    }

    const post = await Post.create({
      author: req.userId,
      content,
    });

    return res.status(201).json({ message: 'post created', post });
  } catch (error) {
    console.error('Create post error', error);
    return res.status(500).json({ message: 'internal server error' });
  }
});

// Read all posts
postRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .populate('comments.user', 'username email')
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    console.error('Get posts error', error);
    return res.status(500).json({ message: 'internal server error' });
  }
});

// Read single post
postRouter.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email')
      .populate('comments.user', 'username email');

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error('Get post error', error);
    return res.status(500).json({ message: 'internal server error' });
  }
});

// Update post
postRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'not allowed to edit' });
    }

    if (content) {
      post.content = content;
    }

    await post.save();

    return res.status(200).json({ message: 'post updated', post });
  } catch (error) {
    console.error('Update post error', error);
    return res.status(500).json({ message: 'internal server error' });
  }
});

// Delete post
postRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'not allowed to delete' });
    }

    await post.deleteOne();

    return res.status(200).json({ message: 'post deleted' });
  } catch (error) {
    console.error('Delete post error', error);
    return res.status(500).json({ message: 'internal server error' });
  }
});

// Like/unlike post
postRouter.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    const userId = req.userId;
    const index = post.likes.findIndex(
      (like) => like.toString() === userId
    );

    let message = 'post liked';

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
      message = 'post unliked';
    }

    await post.save();

    return res.status(200).json({ message, likesCount: post.likes.length });
  } catch (error) {
    console.error('Like post error', error);
    return res.status(500).json({ message: 'internal server error' });
  }
});

// Add comment
postRouter.post('/:id/comment', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'comment text required' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    post.comments.push({
      user: req.userId,
      text,
    });

    await post.save();

    return res.status(201).json({ message: 'comment added', comments: post.comments });
  } catch (error) {
    console.error('Comment post error', error);
    return res.status(500).json({ message: 'internal server error' });
  }
});

module.exports = postRouter;

