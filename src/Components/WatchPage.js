import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/toggleSlice";
import { useParams, useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
const WatchPage = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <div className="flex flex-col justify-center my-10">
      <div className="flex">
        <div>
          <iframe
            width="1000"
            height="523"
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            title="sdsad"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullscreen
          ></iframe>
        </div>
        <div className="w-full">{/* <LiveChat /> */}</div>
      </div>
      <CommentsContainer />
    </div>
  );
};

export default WatchPage;
