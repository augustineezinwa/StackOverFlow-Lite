import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { questions } from '../dummydata/dummydata';

chai.use(chaiHttp);
const should = chai.should();

describe('Testing get a question', () => {
  it('should return an error message if question of specified id doesnt exist', (done) => {
    chai.request(app).get('/api/v1/questions/5')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.eql(404);
        res.body.data.question.should.be.eql('question with id 5 cant be found!');
        done();
      });
  });
  it('should return a particular question if the question of the specified id exists', (done) => {
    chai.request(app).get('/api/v1/questions/2')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.eql(200);
        res.body.data.question.should.be.eql(questions[1]);
        done();
      });
  });
});

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
