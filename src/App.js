import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login/" component={LoginForm} />
    <ProtectedRoute exact path="/chat/:Username" component={Home} />
    <Route component={NotFound} />
  </Switch>
)
export default App