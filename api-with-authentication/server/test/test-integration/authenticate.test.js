const Users = require("../../src/models/users.models");
const fakeUser = {
  username: "jon",
  password: "jonsnow",
  email: "jon@mail.com"
};
let fake;

before(done => {
  Users.create(fakeUser)
    .then(user => {
      fake = user
      done();
    })
    .catch(err => done(err));
});

after(done => {
  Users.deleteMany({})
    .then(() => {
      done();
    });
});

describe("authenticate users", () => {

  it("login success", done => {
    const { username, password } = fakeUser;
    request
      .post("/authenticate/login")
      .send({ username, password })
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.auth).to.equal(true);
        expect(res.body.token).to.be.a("string");
        done();
      });
  });

  it("logout success", done => {
    request
      .get("/authenticate/logout")
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.auth).to.equal(false);
        expect(res.body.token).to.equal(null);
        done();
      });
  });

});

