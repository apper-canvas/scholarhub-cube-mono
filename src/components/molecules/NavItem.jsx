import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavItem = ({ to, icon, label, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100",
          isActive
            ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-l-4 border-primary"
            : "text-gray-600 hover:text-gray-900"
        )
      }
    >
      <ApperIcon name={icon} className="h-5 w-5 mr-3" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="ml-auto bg-accent text-white text-xs rounded-full px-2 py-0.5">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default NavItem;