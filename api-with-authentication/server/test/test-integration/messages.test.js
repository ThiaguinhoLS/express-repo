const Messages = require("../../src/models/messages.models");
const Users = require("../../src/models/users.models");
const fakeUser = {
  username: "aegon",
  password: "aegontargaryen",
  email: "aegon@mail.com"
};
let fake;
let author;
let token;

before(done => {
  Users.create(fakeUser)
    .then(user => {
      author = user;
      const { username, password } = fakeUser;
      request
        .post("/authenticate/login")
        .send({ username, password })
        .end((err, res) => {
          if (err) done(err);
          token = res.body.token;
          done();
        })
    })
    .catch(err => done(err));
});

after(done => {
  Messages.deleteMany({})
    .then(() => done())
})

describe("messages routes test integration", () => {


  beforeEach(done => {
    Messages.create({ author: author._id, content: "Content of post" })
      .then(message => {
        fake = message;
        done();
      })
      .catch(err => done(err));
  })

  it("get all messages", done => {
    request
      .get("/messages")
      .set("x-access-token", token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.a("array");
        done();
      })
  });

  it("create a message", done => {
    request
      .post("/messages")
      .set("x-access-token", token)
      .send({
        author: author._id,
        content: "Content of created post"
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data.content).to.equal("Content of created post");
        expect(res.body.data.author).to.equal(author._id.toString());
        done();
      });
  });

  it("update a message", done => {
    const content = "Content changed";
    request
      .put(`/messages/${fake._id}`)
      .send({ content })
      .set("x-access-token", token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body.data.content).to.equal(content);
        done();
      });
  });

  it("delete a message", done => {
    request
      .delete(`/messages/${fake._id}`)
      .set("x-access-token", token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(204);
        done();
      });
  });

});
