// test/user.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');
const mongoose = require('mongoose');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
  beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({});
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const res = await chai
        .request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.equal('User registered successfully');
    });
  });

  describe('POST /auth/login', () => {
    it('should login an existing user', async () => {
      // Register a user first
      await chai
        .request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpassword' });

      const res = await chai
        .request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
    });
  });
});

