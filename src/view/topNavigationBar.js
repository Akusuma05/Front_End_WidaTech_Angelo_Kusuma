import { BrowserRouter as useLocation } from 'react-router-dom';

//Top Navigation Bar
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

export default NavBar;