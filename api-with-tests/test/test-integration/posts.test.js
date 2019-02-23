const Posts = require('../../src/models/posts.models');
let fake;

describe('test integration in posts routes', () => {

  beforeEach(done => {
    Posts.deleteMany({})
      .then(() => {
        new Posts({
          title: 'Post title',
          content: 'Post content'
        }).save()
          .then(post => {
            fake = post;
            done();
          })
          .catch(err => done(err));
      })

  });

  it('/posts with GET method', done => {
    request
      .get('/posts')
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).to.have.property('title');
        expect(res.body.data[0]).to.have.property('content');
        done();
      });
  });

  it('/posts with POST method', done => {
    request
      .post('/posts')
      .send({ title: 'Post title', content: 'Post content' })
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('title');
        expect(res.body.data).to.have.property('content');
        expect(res.body.data.title).to.equal('Post title');
        expect(res.body.data.content).to.equal('Post content');
        done();
      })
  });

  it('/posts/:id with GET method', done => {
    request
      .get(`/posts/${fake.id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('title');
        expect(res.body.data).to.have.property('content');
        done();
      });
  });

  it('/posts/:id with PUT method', done => {
    request
      .put(`/posts/${fake.id}`)
      .send({ title: 'Change title' })
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('title');
        expect(res.body.data).to.have.property('content');
        expect(res.body.data.title).to.equal('Change title');
        done();
      });
  });

  it('/posts/:id with DELETE method', done => {
    request
      .delete(`/posts/${fake.id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(204);
        Posts.find({})
          .then(posts => {
            expect(posts).to.be.a('array');
            expect(posts.length).to.equal(0);
            done();
          })
      });
  });

});

