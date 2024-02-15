
import './stylesheet/Root.scss';
import App from "./routes/App";
import SplashScreen from './routes/SplashScreen';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';



const Root = () => (
      <Router>
          <Routes>
            <Route path='/' element={<SplashScreen/>} />
              <Route path='/home' element={<App/>} />
              {/* <Route path="*" element={<NotFound/>} /> */}
          </Routes>
      </Router>
  );

export default Root;
