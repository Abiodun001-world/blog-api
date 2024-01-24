// test/blogPost.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const BlogPost = require('../models/blogPost');
const User = require('../models/user');
const mongoose = require('mongoose');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Blog Post API', () => {
  beforeEach(async () => {
    // Clear the database before each test
    await BlogPost.deleteMany({});
    await User.deleteMany({});
  });

  describe('GET /blog-posts', () => {
    it('should get all blog posts', async () => {
      // Create a user
      const user = new User({ username: 'testuser', password: 'testpassword' });
      await user.save();

      // Create a blog post
      const blogPost = new BlogPost({ title: 'Test Post', content: 'This is a test post.', author: user._id });
      await blogPost.save();

      const res = await chai.request(app).get('/blog-posts');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0]).to.have.property('title').to.equal('Test Post');
      expect(res.body[0]).to.have.property('content').to.equal('This is a test post.');
    });
  });

  describe('POST /blog-posts', () => {
    it('should create a new blog post', async () => {
      // Create a user
      const user = new User({ username: 'testuser', password: 'testpassword' });
      await user.save();

      const res = await chai
        .request(app)
        .post('/blog-posts')
        .set('Authorization', `Bearer ${generateTestToken(user)}`)
        .send({ title: 'Test Post', content: 'This is a test post.' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('title').to.equal('Test Post');
      expect(res.body).to.have.property('content').to.equal('This is a test post.');
    });
  });

  describe('PUT /blog-posts/:postId', () => {
    it('should update an existing blog post', async () => {
      // Create a user
      const user = new User({ username: 'testuser', password: 'testpassword' });
      await user.save();

      // Create a blog post
      const blogPost = new BlogPost({ title: 'Test Post', content: 'This is a test post.', author: user._id });
      await blogPost.save();

      const res = await chai
        .request(app)
        .put(`/blog-posts/${blogPost._id}`)
        .set('Authorization', `Bearer ${generateTestToken(user)}`)
        .send({ title: 'Updated Post', content: 'This post has been updated.' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('title').to.equal('Updated Post');
      expect(res.body).to.have.property('content').to.equal('This post has been updated.');
    });
  });

  describe('DELETE /blog-posts/:postId', () => {
    it('should delete an existing blog post', async () => {
      // Create a user
      const user = new User({ username: 'testuser', password: 'testpassword' });
      await user.save();

      // Create a blog post
      const blogPost = new BlogPost({ title: 'Test Post', content: 'This is a test post.', author: user._id });
      await blogPost.save();

      const res = await chai
        .request(app)
        .delete(`/blog-posts/${blogPost._id}`)
        .set('Authorization', `Bearer ${generateTestToken(user)}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.equal('Blog post deleted successfully');
    });
  });
});

function generateTestToken(user) {
  return jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}
