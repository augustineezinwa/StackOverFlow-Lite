import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import dbConnect from '../connections/dbConnect';
import { checkEmail } from '../helper/sqlHelper';

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
      .send(newUser).end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('success');
        response.body.data.should.have.property('message').eql('Augustine, you signed up successfully.');
        response.body.data.should.have.property('token');
        done();
      });
  });

  it('should check to see if user details is actually in database', (done) => {
    dbConnect.query(checkEmail('jet55591a@gmail.com'))
      .then((data) => {
        data.rows[0].email.should.be.eql('jet55591a@gmail.com');
        data.rows[0].firstname.should.be.eql('Augustine');
        data.rows[0].lastname.should.be.eql('ezinwa');
        done();
      });
  });
});
