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

We have given <RouterProvider > in place of <Body/> and this <RouterProvider> is loading accoding to the appRouter const obj<br>

Body has two part, one is main container and another is sidebar. we want sidebar all the time so main container has to be dynamic.<br>
Sometime main container has to load and watch page according to the url.<br>

In place of <MainContainer> we have put <Outlet> and given its childern in app.js file. <br>

Now if we test then /watch will change the body main container to watch page and / change to the main container.
