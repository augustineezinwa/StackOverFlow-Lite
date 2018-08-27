import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { getAUserAnswer } from '../../helper/sqlHelper';
import dbConnect from '../../connections/dbConnect';

const should = chai.should();

describe('TESTING UPVOTING ANSWERS', () => {
  it('user should not upvote his or her answer', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}/upvote`)
      .send({
        token: process.env.USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(403);
        response.body.status.should.be.eql('fail');
        response.body.data.message.should.be.eql('Action forbidden!, you cannot upvote your answer!');
        done();
      });
  });
  it('user should upvote another answer', (done) => {
    chai.request(app)
      .put(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}/upvote`)
      .send({
        token: process.env.SECOND_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.data.message.should.be.eql('You have successfully upvoted this answer');
        done();
      });
  });
  it('user should get an answer with all upvotes answer', (done) => {
    chai.request(app)
      .get(`/api/v1/questions/${process.env.QUESTION_ID}/answers/${process.env.ANSWER_ID}`)
      .send({
        token: process.env.SECOND_USER_TOKEN
      })
      .end((error, response) => {
        should.not.exist(error);
        response.status.should.be.eql(200);
        response.body.status.should.be.eql('success');
        response.body.data.answer.upvotes.should.be.eql(1);
        done();
      });
  });
  it('check to see if comment was actually added to the database', (done) => {
    dbConnect.query(getAUserAnswer(process.env.ANSWER_ID, process.env.USER_ID))
      .then((data) => {
        data.rows[0].userid.should.be.eql(1);
        done();
      });
  });
});
