const { okResponse, badRequestError, to } = require("../../global_functions");
const Post = require("../../models/homepage/postModel");
const Like = require("../../models/homepage/likeModel");
const Comment = require("../../models/homepage/commentModel");
const Reply = require("../../models/homepage/replyModel");
const teacher = require("../../models/Teacher/teacherModel");

//Adding Post from Homepage

const AddPost = async (req, res) => {
  let { teacherID, postContent,isAnonymous } = req.body;

  const [unsaved, saved] = await to(
    Post.query()
      .insert({ teacherID, postContent ,isAnonymous })
      .returning("*")
      .withGraphFetched("teacher(Select)")
      .modifiers({
        Select(builder) {
          builder.select("username", "profileImageUrl","isAnonymous");
        },
      })
  );
  console.log(unsaved);
  if (unsaved) return badRequestError(res, "unable to save post");
  return okResponse(res, saved, "post saved successfully");
};

//adds or removes LIKE on a post

const UpVote = async (req, res) => {
  let { postId, teacherID, username } = req.body;

  //If user clicks on Already Liked post
  //then removing it from post table

  const [not_exists, deleted] = await to(
    Like.query()
      .where("postId", postId)
      .andWhere("teacherId", teacherId)
      .first()
      .delete()
      .throwIfNotFound()
  );
  if (deleted) {
    return okResponse(res, deleted, "Like removed");
  }
  //if user clicks on a new post for Liking it

  const [error, like_inserted] = await to(
    Like.query()
      .where("postId", postId)
      .andWhere("teacherId", teacherId)
      .insert({ postId, teacherId, username, isLike: true })
      .returning("teacherId")
  );
  if (error) {
    console.log(error);
    return badRequestError(res, "like not stored");
  }
  return okResponse(res, like_inserted, "Liked by user");
};

//Adds a comment on a post
const AddComment = async (req, res) => {
  let { postId, teacherId, commentText, username } = req.body;

  const [unsaved, saved] = await to(
    Comment.query()
      .insert({ teacherId, postId, commentText, username })
      .returning("*")
      .withGraphFetched("user(Select)")
      .modifiers({
        Select(builder) {
          builder.select("profileImageUrl");
        },
      })
  );

  if (unsaved) return badRequestError(res, "unable to save comment");

  return okResponse(res, saved, "comment saved successfully");
};

//Adds a replies on a comment

const AddReply = async (req, res) => {
  let { postId, commentId, teacherID, username, replyText } = req.body;

  const [unsaved, saved] = await to(
    Reply.query()
      .insert({ postId, teacherID, username, commentId, replyText })
      .returning("*")
      .withGraphFetched("user(Select)")
      .modifiers({
        Select(builder) {
          builder.select("profileImageUrl");
        },
      })
  );

  if (unsaved) {
    console.log(unsaved);
    return badRequestError(res, "unable to save reply");
  }

  return okResponse(res, saved, "reply saved successfully");
};

//deleting comment from a post
const DeleteComment = async (req, res) => {
  let { id, teacherID } = req.body;

  const [error, deleted] = await to(
    Comment.query()
      .where("id", id)
      .andWhere("teacherID", teacherID)
      .first()
      .delete()
      .throwIfNotFound()
  );

  if (error) return badRequestError(res, "comment id not found");
  return okResponse(res, deleted, "comment deleted successfully");
};

//deleting a reply

const DeleteReply = async (req, res) => {
  let { id, teacherID } = req.body;

  const [error, deleted] = await to(
    Reply.query()
      .where("id", id)
      .andWhere("teacherID", teacherID)
      .first()
      .delete()
      .throwIfNotFound()
  );

  if (error) {
    console.log(error);
    return badRequestError(res, "reply id not found");
  }
  return okResponse(res, deleted, "reply deleted successfully");
};
//Deleting a Post

const DeletePost = async (req, res) => {
  let { teacherID, id } = req.body;

  let [not_found, deleted] = await to(
    Post.query()
      .where("id", id)
      .andWhere("teacherID", teacherID)
      .first()
      .delete()
      .throwIfNotFound()
  );

  if (not_found) return badRequestError(not_found, "Post id not found");
  return okResponse(res, deleted, "Post deleted");
};

//Fetching posts
const GetPost = async (req, res) => {
  let teacherID = req.body.teacherID;
  let username = req.body.username;
  console.log("user name is ", username);
  let [error, posts] = await to(
    Post.query()
      .orderBy("created_at", "desc")
      .withGraphFetched(
        "[user(Selectusername),like(SelectUser) as currentUserLike,like(LikeCount) as like,comment(Select).[reply(SelectReply).user(UserDetails),user(UserDetails)]]"
      )
      .modifiers({
        Selectusername(builder) {
          builder.select("username", "profileImageUrl");
        },
        SelectUser(builder) {
          builder.select("username").where("teacherID", teacherID);
        },
        LikeCount(builder) {
          builder.groupBy("postId").count("isLike");
        },

        Select(builder) {
          builder.select("id", "commentText").orderBy("created_at", "desc");
        },
        UserDetails(builder) {
          builder.select("profileImageUrl", "username");
        },
        SelectReply(builder) {
          builder
            .select("id", "postId", "commentId", "replyText")
            .orderBy("created_at", "desc");
        },
      })

      .throwIfNotFound()
  );

  if (error) {
    console.log(error);
    return badRequestError(res, "unable to get posts");
  }

  return okResponse(res, posts, "get succeed !!");
};

module.exports = {
  AddPost,
  AddComment,
  AddReply,
  UpVote,
  DeleteReply,
  DeleteComment,
  DeletePost,
  GetPost,
};
