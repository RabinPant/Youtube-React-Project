import React from "react";

const commentsData = [
  {
    name: "rabin",
    text: "tero bau muji",
    replies: [],
  },
  {
    name: "rabin",
    text: "tero bau muji",
    replies: [
      {
        name: "rabin",
        text: "tero bau muji",
        replies: [
          {
            name: "rabin",
            text: "tero bau muji",
            replies: [
              {
                name: "rabin",
                text: "tero bau muji",
                replies: [
                  {
                    name: "rabin",
                    text: "tero bau muji",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "rabin",
    text: "tero bau muji",
    replies: [],
  },
  {
    name: "rabin",
    text: "tero bau muji",
    replies: [],
  },
  {
    name: "rabin",
    text: "tero bau muji",
    replies: [],
  },
];

const Comments = ({ data }) => {
  const { name, text, replies } = data;

  return (
    <div className="flex shadow-sm bg-gray-100 rounded-2xl w-6/12 m-2">
      <img src="images.png" alt="user" className="w-12 h-12" />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div>
      <Comments key={index} data={comment} />
      <div className="pl-5 border border-l-black ml-5">
        <CommentList comments={comment.replies} />
      </div>
    </div>
  ));
};
const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="font-bold text-2xl">Comments</h1>
      <CommentList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
