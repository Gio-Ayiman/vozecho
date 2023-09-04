import { Outlet, Link } from "react-router-dom";
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <nav className="px-12 py-2 bg-black">
        <ul className="flex justify-between items-center">
          <li>
            <img src="../logo.png" className="h-16" />
          </li>
          {/* <li className="">
            <Link to="/about/" className="text-white">À propos</Link>
          </li> */}
        </ul>
      </nav>
      <div className="flex flex-col items-center">
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  )
}

export default Layout;