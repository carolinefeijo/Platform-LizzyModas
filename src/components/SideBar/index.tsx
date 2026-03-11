import { useState } from "react";
import "./styles.css";
import { Home, LayoutGrid, Package, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div className="logo">
        <LayoutGrid className="logo-icon" size={28} />
        {!isCollapsed && <h2>Dashboard</h2>}
      </div>

      <nav className="nav">
        <NavLink to="/home" className="navLink">
          <Home size={20} />
          {!isCollapsed && <span>Home</span>}
        </NavLink>

        <NavLink to="/users" className="navLink">
          <Users size={20} />
          {!isCollapsed && <span>Funcionários</span>}
        </NavLink>

        <NavLink to="/products" className="navLink">
          <Package size={20} />
          {!isCollapsed && <span>Produtos</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
