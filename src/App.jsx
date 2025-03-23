


import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";
import {store} from "./redux/store";
import { Alerts } from "./components/alert";
 
function App() {
  return (
    
    <Provider store={store}>
    <RouterProvider router={routes} />
    <Alerts/>
   </Provider>
  );
}

export default App;

