import './App.css';
import Template from "./Template";
import Welcome from "./Components/Welcome/Welcome";
import appStore from "./Utils/appStore";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Newtemplate from "./Components/NewTemplate/Newtemplate";
import Createdtemplate from "./Components/CreatedTemplate/Createdtemplate";
import Body from "./Components/Body";

function App() {
  const appRouter=createBrowserRouter([
      {
          path:"/",
          element:<Body/>,
          children:[
              {
                  path:'/',
                  element:<Welcome/>
              },
              {
                  path:"/new",
                  element:<Newtemplate/>
              },
              {
                  path:"/created",
                  element:<Createdtemplate/>
              }
          ]
      },

  ]);
    return (
    <div className="App">
        <Provider store={appStore}>
            <RouterProvider router={appRouter}>
                <Body/>
            </RouterProvider>

        </Provider>
        {/*<Template/>*/}


    </div>
  );
}

export default App;
