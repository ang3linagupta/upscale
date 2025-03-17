import { Fragment, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Curd from './components/axioss/Curd.jsx';
import ApplicantsTable from './components/axioss/ApplicantsTable.jsx'
import SideBar2 from './components/SideBar2.jsx'
import Sales22 from './components/routing/Sales/Sales22.jsx'
import Login from './components/Login.jsx'
import Landing from './components/Landing.jsx'

let root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

<Fragment>
    <App></App>
</Fragment>);
