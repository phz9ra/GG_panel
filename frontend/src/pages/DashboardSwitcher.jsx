import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import OrgDashboard from "./OrgDashboard";
import TeamDashboard from "./TeamDashboard";
export default function DashboardSwitcher() {
  const { usuario } = useAuth();
  if (!usuario) return <Login />;
  if (usuario.papel === "organizador") {
    return <OrgDashboard />;
  }
  // default for "org" (team organization) and other roles
  return <TeamDashboard />;
}
