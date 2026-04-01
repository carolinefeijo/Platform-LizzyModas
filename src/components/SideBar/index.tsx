import { useState } from "react";
import {
  BsColumnsGap,
  BsBoxSeam,
  BsHouse,
  BsLayoutTextWindowReverse,
  BsPerson,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import "./styles.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div className="logo">
        <BsColumnsGap size={22} />
        {!isCollapsed && <h2>Dashboard</h2>}
      </div>

      <nav className="nav">
        <NavLink to="/home" className="navLink">
          <BsHouse size={20} />
          {!isCollapsed && <span>inicio</span>}
        </NavLink>

        <NavLink to="/posts" className="navLink">
          <BsLayoutTextWindowReverse size={20} />
          {!isCollapsed && <span>Postagens</span>}
        </NavLink>

        <NavLink to="/products" className="navLink">
          <BsBoxSeam size={20} />
          {!isCollapsed && <span>Produtos</span>}
        </NavLink>

        <NavLink to="/users" className="navLink">
          <BsPerson size={20} />
          {!isCollapsed && <span>Funcionários</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
