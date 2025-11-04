import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../Context/userContext";

const SideBarContent = ({ loginRole }) => {
  const { isBarOpen } = useGlobalContext();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const isParentActive = (subNav) => {
    return subNav.some((subItem) => location.pathname.startsWith(subItem.url));
  };

  // Auto-open dropdown if the current route is inside it
  useEffect(() => {
    loginRole.forEach((item) => {
      if (item.subNav && isParentActive(item.subNav)) {
        setActiveDropdown(item.text);
      }
    });
  }, [location.pathname, loginRole]);

  return (
    <div className="howLong">
      <div className="nav-menu">
        {loginRole.map((items, index) => (
          <div key={index}>
            {items.subNav ? (
              <>
                <div
                  className={`menuOptions ${
                    activeDropdown === items.text || isParentActive(items.subNav) ? "active" : ""
                  }`}
                  onClick={() => handleDropdownClick(items.text)}>
                  <div className={isBarOpen ? "menuOptionsContent" : "menuOptionsContentSmall"}>
                    <span className="icon-img">{items.icon}</span>
                    {isBarOpen && <span className="menu-texts">{items.text}</span>}
                  </div>
                  {!isBarOpen && <div className="tooltip">{items.text}</div>}
                  {isBarOpen && (
                    <span
                      className={activeDropdown === items.text ? "dropdown rotate" : "dropdown"}>
                      {items.iconClosed}
                    </span>
                  )}
                </div>

                <div className={`sideMenuNew ${activeDropdown === items.text ? "open" : ""}`}>
                  {isBarOpen &&
                    items.subNav.map((subItem, index) => (
                      <NavLink
                        key={index}
                        to={subItem.url}
                        className={({ isActive }) =>
                          isActive ? "dropdown-menuOptions active" : "dropdown-menuOptions"
                        }>
                        {<span className="menu-texts">{subItem.text}</span>}
                      </NavLink>
                    ))}
                </div>
              </>
            ) : (
              <NavLink
                key={index}
                to={items.url}
                className={({ isActive }) =>
                  isActive ? "dropdown-singleMenu active" : "dropdown-singleMenu"
                }>
                <div
                  className={`singleOption ${
                    isBarOpen ? "menuOptionsContent" : "menuOptionsContentSmall"
                  }`}>
                  <span className="icon-img">{items.icon}</span>
                  {isBarOpen && <span className="menu-texts">{items.text}</span>}
                  {!isBarOpen && <div className="tooltip">{items.text}</div>}
                </div>
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBarContent;
