import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AuthContext } from "@/App";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import NavItem from "@/components/molecules/NavItem";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { to: "/students", label: "Students", icon: "Users" },
  { to: "/classes", label: "Classes", icon: "BookOpen" },
  { to: "/assignments", label: "Assignments", icon: "FileText" },
  { to: "/grades", label: "Grades", icon: "BarChart3" },
  { to: "/settings", label: "Settings", icon: "Settings" }
];

function Sidebar({ className, isMobileOpen, toggleMobile }) {
  return (
    <>
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
        
        {/* User Info and Logout */}
        <div className="p-4 border-t border-gray-200">
          <UserInfo />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMobileOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 shadow-xl"
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
          <UserInfo />
        </div>
      </motion.div>
    </>
);
}

function UserInfo() {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
  
  if (!user) return null;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
        <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <span className="text-xs font-medium text-white">
            {user.firstName?.[0] || user.name?.[0] || 'U'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            {user.firstName ? `${user.firstName} ${user.lastName}` : user.name}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {user.emailAddress || user.email}
          </div>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={logout}
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <ApperIcon name="LogOut" className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}

export default Sidebar;