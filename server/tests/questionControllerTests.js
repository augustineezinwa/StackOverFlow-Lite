import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { questions } from '../dummydata/dummydata';

chai.use(chaiHttp);
const should = chai.should();

describe('Testing get a question', () => {
  it('should return an error message if question of specified id doesnt exist', (done) => {
    chai.request(app).get('/api/v1/questions/5')
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(404);
        response.body.data.question.should.be.eql('question with id 5 cant be found!');
        done();
      });
  });
  it('should return a particular question if the question of the specified id exists', (done) => {
    chai.request(app).get('/api/v1/questions/2')
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.data.question.should.be.eql(questions[1]);
        done();
      });
  });
});

describe('Testing get all questions', () => {
  it('should get all questions', (done) => {
    chai.request(app).get('/api/v1/questions')
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.data.questions.should.be.an('array');
        response.body.data.questions.length.should.be.eql(2);
        response.body.data.questions.should.be.eql(questions);
        done();
      });
  });
  it('should return error if no questions was found', (done) => {
    questions.length = 0;
    chai.request(app).get('/api/v1/questions')
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(404);
        response.body.data.questions.should.be.eql('No questions were found!');
        done();
      });
  });
  it('should add a question if user enters all input data correctly', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({
        questionTitle: 'how do I fix my arduino?',
        questionDescription: 'My arduino is having problem, please how do I get it fixed?'
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(201);
        response.body.status.should.be.eql('success');
        response.body.data.newQuestion.questionTitle.should.be.eql('how do I fix my arduino?');
        response.body.data.newQuestion.questionDescription.should.be
          .eql('My arduino is having problem, please how do I get it fixed?');
        questions.length.should.be.eql(1);
        done();
      });
  });
});
