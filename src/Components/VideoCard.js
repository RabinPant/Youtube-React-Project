import React from "react";
const VideoCard = ({ data }) => {
  const { title, publishedAt, channelTitle, thumbnails } = data.snippet;

  return (
    <div className="m-5 p-2 shadow-lg w-72">
      <img src={thumbnails.medium.url} alt="thumbnail" className="rounded-lg" />
      <ul className="py-2">
        <li className="font-bold">{title}</li>
        <li>{channelTitle}</li>
        <li>{publishedAt}</li>
      </ul>
    </div>
  );
};

export default VideoCard;
