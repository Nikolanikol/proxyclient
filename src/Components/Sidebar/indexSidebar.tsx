import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../UI/Shadcn/ShadcnSidebar";
import TagFilter from "../Filters/TagFilter";
import YearFilter from "../Filters/YearFilter";
import { Input } from "@/UI/Shadcn/ShadcnInput";
import { Button } from "@/UI/Shadcn/ShadcnButton";
import { useEffect, useState } from "react";
import { useStores } from "@/Store/RootStoreContext";

export function MySidebar() {
  const { filterStore } = useStores();
  const [value, setValue] = useState<string>();
  const handleClick = () => {
    filterStore.setFetchMode("search");
    filterStore.setSearchQuery(value);
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="h-full">
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent className=" h-full ">
            <SidebarMenu className="flex flex-col gap-2 h-full ">
              {/* ///фильтр для тегов */}

              <SidebarMenuItem>
                <TagFilter />
                <SidebarMenuButton asChild></SidebarMenuButton>
              </SidebarMenuItem>

              {/* ///фильтр для года */}

              <SidebarMenuItem>
                <YearFilter />
                <SidebarMenuButton asChild></SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mt-auto">
                <div className="flex flex-col gap-y-3">
                  <Input
                    placeholder="Enter name"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  />
                  <Button
                    onClick={() => handleClick()}
                    className="cursor-pointer"
                  >
                    {" "}
                    Search
                  </Button>
                </div>
                <SidebarMenuButton asChild></SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
