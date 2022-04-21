import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom';
import { useEffect } from 'react';
import { connectWithWebSocket } from './utils/wssConnection/wssConnection';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './LoginPage/LoginPage';
import ForgotPage from './LoginPage/ForgotPage';
import MachineLogin from './MachineLogin/MachineLogin';
import MainDashboard from './MainDashboard/MainDashboard';
import OperatorList from './Admin/OperatorList';
import AuditList from './Admin/AuditList';
import OperatorEdit from './Admin/OperatorEdit';
import AuditListInit from './Admin/AuditListInit';


import PrivateRoute from './utils/routing/PrivateRoute';
import PublicRoute from './utils/routing/PublicRoute';

import Thankyou from './Dashboard/components/ThankyouScreen/Thankyou'

function App () {
  useEffect(() => {
    connectWithWebSocket();
  }, []);

  return (
    // <Router>
    //   {/* <NavbarLocal /> */}
    //   <Switch>
    //     <Route path='/dashboard'>
    //       <Dashboard />
    //     </Route>
    //     {/* <Route path='/dashboard/:MachineFlag'>
    //       <Dashboard />
    //     </Route> */}
    //     <Route path='/login'>
    //       <LoginPage />
    //     </Route>
    //     <Route path="/main/:userid/:userreason">
    //       <MainDashboard />
    //     </Route>
    //     <Route path='/operatorlist'>
    //       <OperatorList />
    //     </Route>
    //     <Route path='/operatorEdit/:userid'>
    //       <OperatorEdit />
    //     </Route>
    //     <Route path='/'>
    //       <OperatorEdit />
    //     </Route>
    //     {/* <Route path='/'>
    //       <LoginPage />
    //     </Route> */}
    //     {/* <Route path='/machine'>
    //       <MachineLogin />
    //     </Route> */}
       
    //   </Switch>
    // </Router>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <PublicRoute path="/login" component={LoginPage} />
        <PublicRoute path="/forgot" component={ForgotPage} />
        <PublicRoute path="/main/:userid/:userreason" component={MainDashboard} />
        <PrivateRoute path="/thankyou" component={Thankyou} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/operatorlist" component={OperatorList} />
        <PrivateRoute path="/Auditlist" component={AuditList} />
        <PrivateRoute path="/Auditlistinit" component={AuditListInit} />
        <PrivateRoute path="/operatorEdit/:userid" component={OperatorEdit} />
        <PrivateRoute path="/operatorEdit/" component={OperatorEdit} />
      </Switch>
    </Router>
  );
}

export default App;
