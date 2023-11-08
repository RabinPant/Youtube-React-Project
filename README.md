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


