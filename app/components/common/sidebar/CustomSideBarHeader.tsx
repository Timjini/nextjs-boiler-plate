import { SidebarHeader, SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";

export default function CustomSideBarHeader(){
    return (
        <SidebarHeader >
            <SidebarMenuButton>
                  <User2 /> Chamber For Sport
                </SidebarMenuButton>
        </SidebarHeader>
    )
}