


import {Provider} from "react-redux";
import {RouterProvider} from "react-router";
import {routes} from "./routes";
//import {Navigation} from "./layouts/navigation/navigation";
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

