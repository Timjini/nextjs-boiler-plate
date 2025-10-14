import { SidebarHeader, SidebarMenuButton } from "@/components/ui/sidebar";
import { User2 } from "lucide-react";

export default function CustomSideBarHeader(){
    const applicationName = process.env.NEXT_PUBLIC_APPLICATION_NAME
    return (
        <SidebarHeader >
            <SidebarMenuButton>
                  <User2 /> {applicationName}
                </SidebarMenuButton>
        </SidebarHeader>
    )
}