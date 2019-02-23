describe('test error handler', () => {

  it('returns messages not found endpoint', done => {
    request
      .get('/error-x')
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.equal('Not Found Endpoint');
        done();
      })
  });

});
