import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Products from './view/productPage';
import Invoices from './view/InvoicePage';
import Summary from './view/summaryView';
import { toggleSidebar } from './actions/sideBarActions';
import "./index.css";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";

const NavBar = () => {
  const location = useLocation();
  let pageTitle = "Invoices";

  if (location.pathname === '/product') {
    pageTitle = "Products";
  } 

  return (
    <div className="top-nav">
      <h2 className='page-title'>{pageTitle}</h2>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.sidebar.isOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar collapsed={!isOpen}>
          <Menu>
            <MenuItem className="no-hover" icon={<MenuRoundedIcon />} onClick={handleToggleSidebar}>
              <h2>WidaTech</h2>
            </MenuItem>
            <div style={{ height: 20 }}></div>
            <MenuItem
              component={<Link to="/" className="link-side-bar" />}
              icon={<ReceiptRoundedIcon />}
            >
              <p>Invoices</p>
            </MenuItem>
            <MenuItem
              component={<Link to="/product" className="link-side-bar" />}
              icon={<GridViewRoundedIcon />}
            >
              <p>Products</p>
            </MenuItem>
          </Menu>
        </Sidebar>
        <div style={{ width: '100%' }}>
          <NavBar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Invoices />} />
              <Route path="/product" element={<Products />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
