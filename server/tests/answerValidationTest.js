import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const should = chai.should();

describe('Testing validations on answer', () => {
  it('should throw an error if user submits an empty answer', (done) => {
    chai.request(app).post('/api/v1/questions/1/answers')
      .send({
        answer: '',
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.eql(400);
        res.body.status.should.be.eql('fail');
        res.body.data.answer.should.be.eql('answer cant be empty or invalid');
        done();
      });
  });
  it('should throw an error if user answer entry is too short', (done) => {
    chai.request(app).post('/api/v1/questions/2/answers')
      .send({
        answer: 'ef',
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.eql(422);
        res.body.status.should.be.eql('fail');
        res.body.data.answer.should.be.eql('answer cant be too short');
        done();
      });
  });
  it('should throw an error if answer entered contains invalid syntax', (done) => {
    chai.request(app).post('/api/v1/questions/1/answers')
      .send({
        answer: 'ef///3$#$#$$#$',
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.eql(400);
        res.body.status.should.be.eql('fail');
        res.body.data.answer.should.be.eql('answer contains invalid syntax or spaces');
        done();
      });
  });
});
