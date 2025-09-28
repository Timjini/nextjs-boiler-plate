import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
  } from "@/components/ui/sidebar"
import CustomSideBarFooter from "./CustomSideBarFooter"
import CustomSideBarHeader from "./CustomSideBarHeader"
import CustomSideBarContent from "./CustomSideBarContent"
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <CustomSideBarHeader />
        <CustomSideBarContent />
        <CustomSideBarFooter />
      </Sidebar>
    )
  }