import './App.css';
import Welcome from "./Components/Welcome/Welcome";
import appStore from "./Utils/appStore";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NewTemplate from "./Components/NewTemplate/NewTemplate";
import Createdtemplate from "./Components/CreatedTemplate/Createdtemplate";
import Body from "./Components/Body";
import ExistingPrompt from "./Components/CreatedTemplate/ExistingPrompt";
import NewPrompt from "./Components/CreatedTemplate/NewPrompt";
import Error from "./Components/Error";
import Login from "./Components/Login";
import Template from "./Components/Template";
import Landing from "./Components/Landing";
import ProfilePage from "./Components/Profile/ProfilePage";
import PublicTemplates from "./Components/PublicTemplates";

function App() {
  const appRouter=createBrowserRouter([
      {
          path:"/",
          element:<Body/>,
          children:[
              {
                  path:"/",
                  element:<Landing/>
              },
              {
                  path:'/public',
                  element:<PublicTemplates/>
              },
              {
                  path:'/login',
                  element:<Login/>
              },
              {
                path:'/welcome',
                element:<Welcome/>
              },
              {
                  path:'/profile/:id',
                  element:<ProfilePage/>
              },
              {
                path:'/template',
                element:<Template/>,
                  children:[
                      {
                          path:"/template/new",
                          element:<NewTemplate/>
                      },
                      {
                          path:"/template/created/:id",
                          element:<Createdtemplate/>,
                          children:[
                              {
                                  path:"/template/created/:id/:promptId",
                                  element:<ExistingPrompt/>,
                              },
                              {
                                  path:"/template/created/:id/new",
                                  element:<NewPrompt/>,
                              }
                          ]
                      },

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
