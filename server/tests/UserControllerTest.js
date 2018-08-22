import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const should = chai.should();

describe('testing signup feature', () => {
  it('should successfully signup a user that enters all required fields correctly', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55591a@gmail.com',
      password: '5654545qa',
      confirmPassword: '5654545qa',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.data.should.have.property('message').eql('Augustine, you signed up successfully.');
        res.body.data.should.have.property('token');
        done();
      });
  });
});
