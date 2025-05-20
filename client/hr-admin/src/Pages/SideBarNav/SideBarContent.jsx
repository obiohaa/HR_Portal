import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Context/userContext";

const SideBarContent = ({ loginRole }) => {
  const { isBarOpen, DropDownOpen, toggleNavbar } = useGlobalContext();

  return (
    <div className="nav-menu">
      {loginRole.map((items, index) => {
        return (
          <div className="menus" key={index} onClick={items.subNav && toggleNavbar}>
            <Link to={items.url} className={isBarOpen ? "menu-item" : "menu-item menu-item-close"}>
              <span className="icon-img">{items.icon}</span>
              {isBarOpen && <span className="menu-text">{items.text}</span>}
              {isBarOpen && (
                <span className={items.subNav && !DropDownOpen ? "dropdown" : "dropdown rotate"}>
                  {items.iconClosed}
                </span>
              )}
              {!isBarOpen && <div className="tooltip">{items.text}</div>}
            </Link>
            {items.subNav &&
              items.subNav.map((subN, index) => {
                return (
                  <div
                    className={
                      !isBarOpen && DropDownOpen
                        ? "subMenu "
                        : isBarOpen && DropDownOpen
                        ? "blockSubMenu"
                        : isBarOpen && !DropDownOpen
                        ? "subMenu "
                        : "subMenu "
                    }
                    key={index}>
                    {isBarOpen && (
                      <Link className="anchor" to={subN.url}>
                        {subN.text}
                      </Link>
                    )}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};
export default SideBarContent;
