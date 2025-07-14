import { useState } from "react";
import { motion } from "framer-motion";
import NavItem from "@/components/molecules/NavItem";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ className }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { to: "/", icon: "Home", label: "Dashboard" },
    { to: "/students", icon: "Users", label: "Students" },
    { to: "/classes", icon: "BookOpen", label: "Classes" },
    { to: "/grades", icon: "Award", label: "Grades" },
    { to: "/attendance", icon: "Calendar", label: "Attendance" }
  ];

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <ApperIcon name="Menu" className="h-6 w-6 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobile}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen", className)}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="GraduationCap" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ScholarHub
              </h1>
              <p className="text-xs text-gray-500">Student Management</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="h-8 w-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Teacher</p>
              <p className="text-xs text-gray-500">Academic Year 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMobileOpen ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="lg:hidden fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="GraduationCap" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ScholarHub
                </h1>
                <p className="text-xs text-gray-500">Student Management</p>
              </div>
            </div>
            <button
              onClick={toggleMobile}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ApperIcon name="X" className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="h-8 w-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Teacher</p>
              <p className="text-xs text-gray-500">Academic Year 2024</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;