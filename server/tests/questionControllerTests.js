import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { questions } from '../dummydata/dummydata';
import dbConnect from '../connections/dbConnect';
import { getAUserQuestion } from '../helper/sqlHelper';

chai.use(chaiHttp);
const should = chai.should();

describe('Testing questions controller', () => {
  it('should not add question to database if user fails to provide token', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({
        questionTitle: 'how do I fix my arduino?',
        questionDescription: 'My arduino is having problem, please how do I get it fixed?',
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(401);
        response.body.should.have.property('status').eql('fail');
        response.body.data.should.have.property('message').eql('Unauthorized!, please sign up or login!');
        done();
      });
  });

  it('should not add question to database if user provides fake token', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({
        questionTitle: 'how do I fix my arduino?',
        questionDescription: 'My arduino is having problem, please how do I get it fixed?',
        token: '234%#$#$T$%$T$%$#%#$'
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(401);
        response.body.should.have.property('status').eql('fail');
        response.body.data.should.have.property('message').eql('Unauthorized!, please provide a valid token!');
        done();
      });
  });

  it('should successfully signup a user that enters all required fields correctly', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'austinezinwa@gmail.com',
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
        process.env.USER_TOKEN = response.body.data.token;
        done();
      });
  });
  it('should add a question if signed up or logged in user enters all input data correctly', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({
        questionTitle: 'how do I fix my arduino?',
        questionDescription: 'My arduino is having problem, please how do I get it fixed?',
        token: process.env.SECOND_USER_TOKEN,
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(201);
        response.body.status.should.be.eql('success');
        response.body.data.newQuestion.questionTitle.should.be.eql('how do I fix my arduino?');
        response.body.data.newQuestion.questionDescription.should.be
          .eql('My arduino is having problem, please how do I get it fixed?');
        response.body.data.newQuestion.should.have.property('userId');
        process.env.USER_ID = response.body.data.newQuestion.userId;
        process.env.questionId = response.body.data.newQuestion.id;
        done();
      });
  });

  it('should check to see question was actually added to database with the userId and questionId', (done) => {
    dbConnect.query(getAUserQuestion(process.env.USER_ID, process.env.questionId))
      .then((data) => {
        data.rows[0].questiontitle.should.be.eql('how do I fix my arduino?');
        data.rows[0].questiondescription.should.be.eql('My arduino is having problem, please how do I get it fixed?');
        data.rows[0].userid.should.be.eql(+process.env.USER_ID);
        data.rows[0].id.should.be.eql(+process.env.questionId);
        done();
      });
  });
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
});
