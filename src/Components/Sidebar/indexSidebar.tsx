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
import { useNavigate } from "react-router-dom";

export function MySidebar() {
  const navigate = useNavigate();
  const { filterStore } = useStores();
  const [value, setValue] = useState<string>();

  const handleSubmit = (e: HTMLFormElement) => {
    e.preventDefault();

    filterStore.setFetchMode("search");
    filterStore.setSearchQuery(value);
    setValue("");
    navigate("/");
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
              {/* ///поиск по названию */}
              <SidebarMenuItem className="mt-auto">
                <form action="" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-y-3">
                    <Input
                      placeholder="Enter name"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                    />
                    <Button type="submit" className="cursor-pointer">
                      {" "}
                      Search
                    </Button>
                  </div>
                </form>
                <SidebarMenuButton asChild></SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
