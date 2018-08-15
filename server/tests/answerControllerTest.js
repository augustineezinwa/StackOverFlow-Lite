import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { answers } from '../dummydata/dummydata';

chai.use(chaiHttp);
const should = chai.should();

describe('Testing operations on answer', () => {
  it('should return error if trying to post answers to a non-existent question', (done) => {
    chai.request(app).post('/api/v1/questions/5/answers')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.eql(404);
        res.body.data.message.should.be.eql('This question does not exist');
        done();
      });
  });
  it('should add an answer if user enters all input data correctly', (done) => {
    chai.request(app)
      .post('/api/v1/questions/1/answers')
      .send({
        answer: 'The answer to your question is that you have to fix n+9 =90',
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.eql(201);
        res.body.status.should.be.eql('success');
        res.body.data.newAnswer.answer.should.be.eql('The answer to your question is that you have to fix n+9 =90');
        answers.length.should.be.eql(2);
        done();
      });
  });
  it('should return error for undefined route', (done) => {
    chai.request(app).post('/api/v1/questions/5/answerq')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.eql(404);
        res.body.message.should.be.eql('This route is yet to be specified.');
        done();
      });
  });
});
