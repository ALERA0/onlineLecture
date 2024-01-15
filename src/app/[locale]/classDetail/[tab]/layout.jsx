import TabContainer from "@/components/Containers/TabContainer";
import "./style.css";
import { Tab, TabList, Tabs } from "@/components/Tabs/tabs";
import TabLists from "./TabLists";

export default function Layout({ children, params }) {
  return (
    <main className="w-full text-black">
      <h1 className="heading">
        {params.locale === "tr" ? "Sınıf Bilgileriniz" : "Class Informations"}
      </h1>
      <div className="wrapper">
        <Tabs>
          <TabLists params={params} />
          <TabContainer>{children}</TabContainer>
        </Tabs>
      </div>
    </main>
  );
}
