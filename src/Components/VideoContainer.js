import React, { useEffect, useState } from "react";
import {
  YOTUBE_VIDEO_API,
  YOTUBE_VIDEO_KEYWORD,
  ADDITION,
} from "../utils/constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isClick } from "../utils/keywordSearchSlice";
const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const click = useSelector((store) => store.keyword.isClick);
  const query = useSelector((store) => store.keyword.query);
  console.log("click, query", click, query);
  useEffect(() => {
    click === true ? callAPI() : getVideo();
  }, [query]);
  const getVideo = async () => {
    const videoList = await fetch(YOTUBE_VIDEO_API);
    const json = await videoList.json();
    console.log("Iam old API");
    setVideos(json.items);
  };
  const callAPI = async () => {
    const data = await fetch(YOTUBE_VIDEO_KEYWORD + query + ADDITION);
    const json = await data.json();
    console.log("searc", json);
    dispatch(isClick(false));
    setVideos(json.items);
  };
  return (
    <div className="flex flex-wrap">
      {videos.map((video) => {
        return (
          <Link to={"/watch?v=" + video.id.videoId}>
            <VideoCard data={video} key={video.id.videoId} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoContainer;
