import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../utils/toggleSlice";
import { useState } from "react";
import { useEffect } from "react";
import {
  ADDITION,
  YOTUBE_VIDEO_KEYWORD,
  YOUTUBR_SEARCH_API,
} from "../utils/constant";
import { cacheResults } from "../utils/searchSlice";
import { click, isClick, query } from "../utils/keywordSearchSlice";

const Head = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSeqrchQuery] = useState("");
  const [suggestions, setSuggestions] = useState();
  const [showSuggestion, setShowSuggestion] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const click = useSelector((store) => store.keyword.isClick);
  /**
   * {
   * searchCache = {
   *    "iphone":["iphone 11","iphone 14"]
   * }
   *
   *
   */
  // console.log(searchQuery);
  // console.log("scroll", window.scrollY);
  //Whenever we scrool down after typing in the search box then the search box hides
  const controlDropDown = () => {
    if (window.scrollY > 1) {
      setShowSuggestion(false);
    } else {
      setShowSuggestion(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", controlDropDown);
    // make an api call after every key press
    // but if the difference between 2 API calls is less than 200ms
    // decline the API call
    console.log("render");
    const timer = setTimeout(() => getSeachSuggestion(), 200);
    if (searchCache[searchQuery]) {
      setSuggestions(searchCache[searchQuery]);
    } else {
      getSeachSuggestion();
    }
    return () => {
      window.removeEventListener("scroll", controlDropDown);
      clearTimeout(timer);
    };
  }, [searchQuery]);

  /* 
    key i - press
    render() the component
    useEffect() = get call to the API
    start timeer => make api call after 200 ms

  key - ip
  -destroy the component(useEffect return method)
  -re-render the component
  -useEffect()
  -start timer => make an api call after 200ms

  setTimeout(200) -make an API call 
  */

  const getSeachSuggestion = async () => {
    const data = await fetch(YOUTUBR_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(searchQuery);
    setSuggestions(json[1]);

    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };
  const toggleMenuHandler = () => {
    dispatch(toggle());
  };

  const handleClickDropDown = (data) => {
    setSeqrchQuery(data);
    dispatch(isClick(true));
    dispatch(query(data));
  };

  return (
    <div className="grid grid-flow-col p-2 m-2 shadow-lg ">
      <div className="flex col-span-1">
        <img
          className="h-10 cursor-pointer"
          src="hamburger.png"
          alt="menu"
          onClick={() => toggleMenuHandler()}
        />
        <img
          className="h-7 mx-2 cursor-pointer my-2"
          alt="youtube"
          src="https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png"
        />
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="w-1/2  border border-gray-600 rounded-l-xl p-1 px-8"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSeqrchQuery(e.target.value);
            }}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => {
              if (click === false) setShowSuggestion(false);
            }}
          />
          <button className="border border-gray-400 px-4 rounded-r-xl h-9">
            🔍
          </button>
        </div>
        {/* {console.log("suggestions", suggestions)} */}
        {showSuggestion && (
          <div className=" fixed bg-white py-2 px-5 w-[32rem] rounded-lg shadow-lg top-18 ">
            <ul>
              {suggestions.map((data) => {
                return (
                  <li
                    className="py-2 shadow-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleClickDropDown(data)}
                  >
                    🔍 {data}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div>
        <img className="h-14 col-span-1" src="images.png" alt="user" />
      </div>
    </div>
  );
};

export default Head;
