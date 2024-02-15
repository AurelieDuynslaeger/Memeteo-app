
import './stylesheet/Root.scss';
import App from "./routes/App";
import NotFound from './routes/NotFound';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


const Root = () => (
      <Router>
          <Routes>
              <Route path='/home' element={<App/>} />
              <Route path="*" element={<NotFound/>} />
          </Routes>
      </Router>
  );

export default Root;
