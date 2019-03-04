const Users = require("../../src/models/users.models");
let fake;

describe("users routes test integration", () => {

  const fakeUser = {
    username: "jon",
    password: "jonsnoworaegon",
    email: "jon@mail.com"
  };

  beforeEach(done => {
    Users.deleteMany({})
      .then(() => {
        Users.create(fakeUser)
          .then(user => {
            fake = user;
            done();
          });
      });
  });

  it("get all users", done => {
    request
      .get("/users")
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.a("array");
        done();
    });
  });

  it("create a user", done => {
    request
      .post("/users")
      .send(fakeUser)
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data.username).to.equal("jon");
        done();
      });
  });
/*
  it("get a user with id", done => {
    request
      .get(`/users/${fake.id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("username");
        done();
      });
  });
*/
  it("get a user with username", done => {
    request
      .get(`/users/${fake.username}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.a("object");
        done();
      })
  });

  it("update a user", done => {
    const email = "aegon@mail.com";
    request
      .put(`/users/${fake.id}`)
      .send({ email })
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data.email).to.equal(email);
        done();
      });
  });


  it("delete a user", done => {
    request
      .delete(`/users/${fake.id}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(204);
        done();
      })
  });

});
