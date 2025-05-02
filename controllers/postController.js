const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, userId: req.user.userId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.userId });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
