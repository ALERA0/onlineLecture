import TabContainer from "@/components/Containers/TabContainer";
import "./style.css";
import { Tabs } from "@/components/Tabs/tabs";
import React from "react";
import TabLists from "./TabLists";




export default async function Layout({ children, params }) {
  return (
    <main className="w-full text-black h-full bg-white ">
      <div className="wrapper">
        <Tabs>
          <TabLists params={params} />
          <TabContainer>{children}</TabContainer>
        </Tabs>
      </div>
    </main>
  );
}
