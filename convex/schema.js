import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    id: v.number(),
    firstname: v.string(),
    lastname: v.string(),
    email: v.string(),
    password: v.string(),
    jobrole: v.string(),
    company: v.string(),
    photo: v.string(),
    time: v.string(),
    date: v.string()
  })
    .index('by_legacy_id', ['id'])
    .index('by_email', ['email']),
  questions: defineTable({
    id: v.number(),
    questiontitle: v.string(),
    questiondescription: v.string(),
    imageurl: v.optional(v.string()),
    time: v.string(),
    date: v.string(),
    userid: v.number()
  })
    .index('by_legacy_id', ['id'])
    .index('by_userid', ['userid']),
  answers: defineTable({
    id: v.number(),
    answer: v.string(),
    upvotes: v.number(),
    downvotes: v.number(),
    approved: v.boolean(),
    imageurl: v.optional(v.string()),
    time: v.string(),
    date: v.string(),
    questionid: v.number(),
    userid: v.number()
  })
    .index('by_legacy_id', ['id'])
    .index('by_questionid', ['questionid'])
    .index('by_userid', ['userid']),
  comments: defineTable({
    id: v.number(),
    comment: v.string(),
    upvotes: v.number(),
    downvotes: v.number(),
    time: v.string(),
    date: v.string(),
    answerid: v.number(),
    questionid: v.number(),
    userid: v.number()
  })
    .index('by_legacy_id', ['id'])
    .index('by_answerid', ['answerid'])
    .index('by_questionid', ['questionid'])
    .index('by_userid', ['userid']),
  votes: defineTable({
    id: v.number(),
    vote: v.number(),
    time: v.string(),
    date: v.string(),
    answerid: v.number(),
    questionid: v.number(),
    userid: v.number()
  })
    .index('by_legacy_id', ['id'])
    .index('by_answerid', ['answerid'])
    .index('by_answerid_vote', ['answerid', 'vote'])
    .index('by_answerid_userid', ['answerid', 'userid'])
    .index('by_answerid_userid_vote', ['answerid', 'userid', 'vote']),
  meta: defineTable({
    key: v.string(),
    value: v.number()
  }).index('by_key', ['key'])
});
