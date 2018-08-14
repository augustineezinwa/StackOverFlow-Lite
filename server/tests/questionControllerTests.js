import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { questions } from '../dummydata/dummydata';

chai.use(chaiHttp);
const should = chai.should();

describe('Testing get all questions', () => {
  it('should get all questions', (done) => {
    chai.request(app).get('/api/v1/questions')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.eql(200);
        res.body.status.should.be.eql('success');
        res.body.data.questions.should.be.an('array');
        res.body.data.questions.length.should.be.eql(2);
        res.body.data.questions.should.be.eql(questions);
        done();
      });
  });
  it('should return error if no questions was found', (done) => {
    questions.length = 0;
    chai.request(app).get('/api/v1/questions')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.eql(404);
        res.body.data.questions.should.be.eql('No questions were found!');
        done();
      });
  });
});
