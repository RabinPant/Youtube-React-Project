import React from "react";
import ChatMessage from "./ChatMessage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { useState } from "react";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.message);
  useEffect(() => {
    const i = setInterval(() => {
      //API polling
      console.log("API polling");

      dispatch(
        addMessage({
          name: "rabin pant",
          message: "Hello buddy how are you?",
        })
      );
    }, 2000);
  }, []);

  return (
    <div>
      <div className="w-full h-[523px] bg-slate-100 rounded-lg ml-1 p-2 border border-black overflow-y-scroll flex flex-col-reverse">
        {chatMessages.map((c, i) => (
          <ChatMessage key={i} name={c.name} message={c.message} />
        ))}
      </div>
      <form
        className="w-full p-2 ml-1 mt-2 shadow-lg border border-black rounded-lg"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "rabin",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="border border-black rounded-md px-3"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button className="mx-2  px-1 border border-black bg-green-100 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
