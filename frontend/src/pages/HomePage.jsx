import React from "react";
import MemberDashboard from "./MemberDashboard";
import ManagerDashboard from "./ManagerDashboard";
import AdminDashboard from "./AdminDashboard";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const { user } = useAuth(); // user.role should be 'member', 'manager', or 'admin'

  if (!user) {
    return <div>Loading user info...</div>;
  }

  if (user.role === "Member") return <MemberDashboard />;
  if (user.role === "Manager") return <ManagerDashboard />;
  if (user.role === "Admin") return <AdminDashboard />;

  return <div>Invalid role</div>;
}
