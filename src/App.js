import './App.css';
import Template from "./Template";
import Welcome from "./Components/Welcome/Welcome";
import appStore from "./Utils/appStore";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Newtemplate from "./Components/NewTemplate/Newtemplate";
import Createdtemplate from "./Components/CreatedTemplate/Createdtemplate";
import Body from "./Components/Body";
import ExistingPrompt from "./Components/CreatedTemplate/ExistingPrompt";
import NewPrompt from "./Components/CreatedTemplate/NewPrompt";
import Error from "./Components/Error";

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
                  path:"/created/:id",
                  element:<Createdtemplate/>,
                  children:[
                      {
                          path:"/created/:id/:promptId",
                          element:<ExistingPrompt/>,
                      },
                      {
                          path:"/created/:id/new",
                          element:<NewPrompt/>,
                      }
                  ]
              },
              {
                  path:"/error",
                  element:<Error/>,
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
