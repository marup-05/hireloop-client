"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
  Bookmark,
  Briefcase,       
  Building2,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"

type DashboardRole = "seeker" | "recruiter" | "admin"

type MenuItem = {
  id: string
  name: string
  icon: LucideIcon
  url: string
}

// Menu structure mirrors the "Hireloop 2.0" Figma sidebar (Nav frame) per role:
// - Seeker:    Dashboard, Jobs, Saved Jobs, Applications, Billing,  Settings
// - Recruiter: Dashboard, My Company, Manage Jobs, Applications,       Settings
// - Admin:     Dashboard, Users, Companies, Jobs, Payments,            Settings
const menuItemByRole: Record<DashboardRole, MenuItem[]> = {
  seeker: [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, url: "/dashboard/seeker" },
    { id: "jobs", name: "Jobs", icon: Briefcase, url: "/dashboard/seeker/jobs" },
    { id: "saved-jobs", name: "Saved Jobs", icon: Bookmark, url: "/dashboard/seeker/saved-jobs" },
    { id: "applications", name: "Applications", icon: FileText, url: "/dashboard/seeker/applications" },
    { id: "billing", name: "Billing", icon: Wallet, url: "/dashboard/seeker/billing" },
    { id: "settings", name: "Settings", icon: Settings, url: "/dashboard/seeker/settings" },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, url: "/dashboard/recruiter" },
    { id: "my-company", name: "My Company", icon: Building2, url: "/dashboard/recruiter/company" },
    { id: "manage-jobs", name: "Manage Jobs", icon: Briefcase, url: "/dashboard/recruiter/jobs" },
    { id: "applications", name: "Applications", icon: FileText, url: "/dashboard/recruiter/applications" },
    { id: "settings", name: "Settings", icon: Settings, url: "/dashboard/recruiter/settings" },
  ],
  admin: [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, url: "/dashboard/admin" },
    { id: "users", name: "Users", icon: Users, url: "/dashboard/admin/users" },
    { id: "companies", name: "Companies", icon: Building2, url: "/dashboard/admin/companies" },
    { id: "jobs", name: "Jobs", icon: Briefcase, url: "/dashboard/admin/jobs" },
    { id: "payments", name: "Payments", icon: Wallet, url: "/dashboard/admin/payments" },
    { id: "settings", name: "Settings", icon: Settings, url: "/dashboard/admin/settings" },
  ],
}

const roles: DashboardRole[] = ["seeker", "recruiter", "admin"]

export function DashboardSidebar() {
  const { data: session } = useSession()
  const role: DashboardRole = roles.includes((session?.user?.role ?? "") as DashboardRole)
    ? ((session?.user?.role ?? "seeker") as DashboardRole)
    : "seeker"
  const pathname = usePathname()
  const items = menuItemByRole[role]

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  render={
                    <a href={item.url} />
                  }
                  isActive={pathname === item.url}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
