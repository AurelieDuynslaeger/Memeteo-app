
import './stylesheet/Root.scss';
import App from './routes/App';
import ForecastDetails from './routes/ForecastDetails';
import NotFound from './routes/NotFound';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


const Root = () => (
      <Router>
          <Routes>
              <Route path='/' element={<App/>} />
              <Route path='/forecast-details' element={<ForecastDetails/>} />
              <Route path="*" element={<NotFound/>} />
          </Routes>
      </Router>
  );

export default Root;
