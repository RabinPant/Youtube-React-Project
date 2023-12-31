# Youtube-React-Project

Basic header nav component is created using the tailwind css and react

# sidebar collapse:
To implement this feature we have to make use of redux toolkit? why because we'll be touching multiple components and we cant pass it as props.
we need to have a redux global store where we will have a state and change its value according to the button click and pass that state when rendering the sidebar <br>

1) Install react-redux <br>
npm i @reduxjs/toolkit <Br>
npm i react-redux <br>

2)create a store <br>
```
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({});
export default store;
```
### create a slice
```
import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    toggle: (state, action) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;
```
3)Add Toggle Slice into the store:
```
import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice";

const store = configureStore({
  reducer: {
    app: toggleSlice,
  },
});

export default store;
```
3) provide this store in the main app.js file:
```
   function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Head />
        <Body />
      </div>
    </Provider>
  );
}
```
4) Now to use that state which we created in the store is this:
     const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
and wherever we are rendering the sidemenu component we can render on the basis of this state
```
const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div className="grid grid-flow-col">
      {isMenuOpen && <SideBar />}
      <MainContainer />
    </div>
  );
};
```
The Whole flow of the react-redux works like this:<br>

whenever we have a click event or any other kinds of event then at that<br>
we dispatch an action<br>
That dispatch action calls a reducer function<br>
This reducer function will chnage the state of the property<br>
Afterwards, if we want to use that reducer then we have to make us of <b>Selector</b>
while suscribing to the store we have to suscribe to the right portion of the store<br>
```
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
```
In this code we are suscribing to the only one portion of the store i.e isMenuOpen<br>
I can get access to whole store just by removing the .app.isMenuOpen. if I do this then<br>
the whole store will render which will render usless data and slow our performance.<br>

In the earlier version of redux it used to say "NEVER MUTATE(change) the state"<br>
now in new version it says "MUTATE" the sate

# Calling the live API of youtube GET videos Method:

```
const API_KEY = "AIzaSyAsveZv68fS4WA2CozNbkV7VCVxql1EQBs";

export const YOTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=" +
  API_KEY;
```
```
import React, { useEffect, useState } from "react";
import { YOTUBE_VIDEO_API } from "../utils/constant";
import VideoCard from "./VideoCard";
const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideo();
  }, []);
  const getVideo = async () => {
    const videoList = await fetch(YOTUBE_VIDEO_API);
    const json = await videoList.json();
    console.log(json.items);
    setVideos(json.items);
  };
  return (
    <div className="flex flex-wrap">
      {videos.map((video) => {
        return <VideoCard data={video} />;
      })}
    </div>
  );
};

export default VideoContainer;
```
### Making the card component to render the data <br>
```
import React from "react";
const VideoCard = ({ data }) => {
  console.log("video", data);
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
```

# Setting Up the Watch Page After user Clicks on the card:

### Setting up the routing:
npm i react-router-dom
<br>
Now setting up the router to navigate to different pages:
```
const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainContainer />,
        },
        {
          path: "/watch",
          element: <WatchPage />,
        },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      <div className="App">
        <Head />
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
```
```
const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div className="grid grid-flow-col">
      {isMenuOpen && <SideBar />}
      <Outlet />
    </div>
  );
};
```
we have a page where header and sidebar shoudl be constant and only the main container should change according to the navigation<br>
First we created a WatchPage<br>

Then we want our body to change dynamically. when / then load main container when /watch load watch page:<br>

We have given <RouterProvider > in place of Body and this RouterProvider is loading accoding to the appRouter const obj<br>

Body has two part, one is main container and another is sidebar. we want sidebar all the time so main container has to be dynamic.<br>
Sometime main container has to load and watch page according to the url.<br>

In place of MainContainer we have put Outlet and given its childern in app.js file. <br>

Now if we test then /watch will change the body main container to watch page and / change to the main container.

# Search sugegstion API:

```
const [searchQuery, setSeqrchQuery] = useState("");

  console.log(searchQuery);

  useEffect(() => {
    // make an api call after every key press
    // but if the difference between 2 API calls is less than 200ms
    // decline the API call

    const timer = setTimeout(() => getSeachSuggestion(), 200);

    return () => {
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
    console.log(json[1]);
  };
  const toggleMenuHandler = () => {
    dispatch(toggle());
  };
  return (
    <div className="grid grid-flow-col p-2 m-2 shadow-lg">
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
      <div className="col-span-10 flex h-8 my-3 ml-6">
        <input
          className="w-1/2  border border-gray-600 rounded-l-xl p-1"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSeqrchQuery(e.target.value);
          }}
        />
```

# Get the drop down menu to hide when we scroll

```
const controlDropDown = () => {
    if (window.scrollY > 1) {
      setShowSuggestion(false);
    } else {
      setShowSuggestion(true);
    }
  };
```
- setShowSuggestion is the hook that display the data <br>
- Here in above code snippet the hook setShowSuggestion value will be true for the first time because the scroll value is less than 1 <br>
- As when we scroll the value of the scrollY will increase and the setSuggestion value will be set to false <br>

### we will have to call this code in the useEffect:
```
 useEffect(() => {
    window.addEventListener("scroll", controlDropDown);
```
### Every time component unmounts we'll have to clear this event from the useEffect:

```
 useEffect(() => {
    window.addEventListener("scroll", controlDropDown);
    
    return () => {
      window.removeEventListener("scroll", controlDropDown);
     
    };
  }, [searchQuery]);
```
# Cache feature for the search functionality:

- How does search functionlity works in youtube? <br>

  This is pretty simple, like in above code snippet. Every time when users type something in the search input box<br>
  then an API is called along with the value that was written in the input box<br>
  in our code we have made after every 200ms the API is called between the users key stroke.<br>

  ### To build the cache we have to make use of Redux store

  - first we have to create a slice <br>


  ```
  import { createSlice } from "@reduxjs/toolkit";
  const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});
export const { cacheResults } = searchSlice.actions;
export default searchSlice.reducer;
```
Now load this SLice into the store:

```
const store = configureStore({
  reducer: {
    app: toggleSlice,
    search: searchSlice,
  },
});

export default store;
```
To use the searchSlice store make use of useSelector:
```
const searchCache = useSelector((store) => store.search);
```
now if the data is already present in out searchCache then don't make an API call otherwise make an API call:
```
 useEffect(() => {
    
    if (searchCache[searchQuery]) {
      setSuggestions(searchCache[searchQuery]);
    } else {
      getSeachSuggestion();
    }
    return () => {
    
      clearTimeout(timer);
    };
  }, [searchQuery]);

```
```
const getSeachSuggestion = async () => {
    const data = await fetch(YOUTUBR_SEARCH_API + searchQuery);
    const json = await data.json();
    //console.log(json[1]);
    setSuggestions(json[1]);

    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };
```
if you see the above code of our slice there we have add the new object that we'll be sending from out dispatch action:<br>
```
reducers: {
    cacheResults: (state, action) => {
      state = Object.assign(state, action.payload);
    },
``
# Live Feature in youtube:

### Challenges:
Data Layer - Get Data Live <br>
UI Layer - Update the UI <br>

DATA - LIVE
- websockets : THere is no interval in the data fetching, everything happens in the real time. Another example is trading application.
- API polling example - Gmail, in Java earlier I have seen batch processing from microservice to AEM. There we're polling data in certain interval and sending the data.


# use Memo:
It is a hook that lets you cache the value between re-renders.<br>

Whenever there is heavy operation then between the re-renders of data, the UI may get froze and user screen may get hang at that time we can make use of useMemo<br>

In project we saw that, while calculating the nth prime number when there was large number and when we toggle from dark UI to light UI the screen froze.<br>
why?
Because we are first calculating the prime number which is heavy in itself and when we toggle from dark UI to light UI the state value change and <br>
re-render happens and with dark UI its calculating the prime number again.<br>

Why should we even calcuate the prime number again which was already calculated earlier??????<br>
This is the PROBLEM

we're solving this problem with the help of useMemo HOOK and that's why this hook was introduced

```
const prime = useMemo(()=>{
findPrime(text);
},[text])
```

The above code snippet is doing that untill and unless there is new data in the text, cache all the value.<br>
so now if I calculate large number value and use the toggle to dark and light UI then it will not re-render the value becuase it is already cached.<br>
we are chaching the result of the function. useMemo helps us to cache the result of the funtion.
```
mport { useMemo, useState } from "react";
import { findPrime } from "../utils/helper";

const Demo = () => {
  const [text, setText] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // const prime = findPrime(text);
  const prime = useMemo(() => findPrime(text), [text]);

  return (
    <div
      className={
        "m-4 p-2 w-96 h-96 border border-black " +
        (isDarkTheme && "bg-gray-900 text-white")
      }
    >
      <div>
        <button
          className="m-10 p-2 bg-green-200"
          onClick={() => setIsDarkTheme(!isDarkTheme)}
        >
          Toggle
        </button>
      </div>
      <div>
        <input
          className="border border-black w-72 px-2"
          type="number"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <h1 className="mt-4 font-bold text-xl">nth Prime : {prime}</h1>
      </div>
    </div>
  );
};
export default Demo;
```


### useCallBack

With the help of useCallBack hook we cache the whole function.<br>

### useRef
- lets you refrence a value that is not needed for rendering<br>
simple language if you want a value to persist during the render cycle then you'll need the useRef.

<br>
For example there is a simple let variable and a state varibale.
<br>
if we increase the let variable when click on the button then it will increase in the background but doesn't render in the UI.
<br>
if we have a state variable and we increase the variable then it will persist and re-render the UI everytime the state value change, it will also display that change in the UI<br>
but in every re-render the let variable will loose its persistance and initialize to zero.<br>


### Here comes the use of useRef:
```
const ref = useRef(initialValue);
```
```
import { useState, useRef, useEffect } from "react";

const Demo2 = () => {
  const [y, setY] = useState(0);
  let x = 0;

  const ref = useRef(0);
  /** not like => ref = 0
   * ref = { current: 0 }
   *
   *
   * */

  console.log("Rendering....");

  const i = useRef(null);
  // let i = {
  //   current: null,
  // };
  useEffect(() => {
    if (i.current) return;
    i.current = setInterval(() => {
      //console.log("Namaste React", Math.random());
    }, 1000);
  }, []);

  return (
    <div className="m-4 p-2 bg-slate-50 border border-black w-96 h-96">
      <div>
        <button
          className="bg-green-100 p-2 m-4"
          onClick={() => {
            x = x + 1;
            console.log("x=" + x);
          }}
        >
          Increase x
        </button>
        <span className="font-bold text-xl">Let = {x}</span>
      </div>
      <div>
        <button
          className="bg-green-100 p-2 m-4"
          onClick={() => {
            setY(y + 1);
          }}
        >
          Increase Y
        </button>
        <span className="font-bold text-xl">State = {y}</span>
      </div>
      <div>
        <button
          className="bg-green-100 p-2 m-4"
          onClick={() => {
            ref.current = ref.current + 1;
            console.log("ref=", ref.current);
          }}
        >
          Increase Ref
        </button>
        <span className="font-bold text-xl">Ref = {ref.current}</span>
      </div>
      <button
        className="bg-red-900 p-4 m-4 text-white font-bold rounded-lg"
        onClick={() => {
          clearInterval(i.current);
        }}
      >
        Stop Printing
      </button>
    </div>
  );
};
export default Demo2;
```
useRef will not render the value but it will keep on increasing in the background and once the page is re-render by somehow, in above case if we click on increase Y button then <br>
it will re-render the component and at that time only the value of ref will be shown.<br>

- first useRef will keep on increasing the value in the background but doesn't show that increased value in the UI.
- second when somehow the re-render processs occurs in the UI then the increase value is shown on the UI. 


