"use client";
import { Tab, TabList } from "@/components/Tabs/tabs";
import { Link, usePathname, useRouter } from "@/navigation";
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

const TabLists = ({ params }) => {
  const t = useTranslations("classDetail");
  const pathname = usePathname();
  const router = useRouter();


  console.log(params, "PARAMSS");

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className="w-full flex gap-3 ">
      <Button
        icon={<LeftOutlined />}
        onClick={() => router.back()}
        className="rounded-full text-blue-600 text-lg flex justify-center items-center border-blue-600 my-auto"
      />
      <TabList>
        <Link
          href={`/classDetail/${params.tab}/students`}
          locale={params.locale}
          className={`flex justify-center items-center hover:bg-slate-100 px-2 py-2 duration-200 rounded-lg ${
            isActive(`/classDetail/${params.tab}/students`)
              ? "bg-[#315ef7] text-white"
              : "hover:bg-slate-100"
          }`}
        >
          {t("students")}
        </Link>
        <Link
          href={`/classDetail/${params.tab}/teachers`}
          locale={params.locale}
          className={`flex justify-center items-center hover:bg-slate-100 px-2 py-2 duration-200 rounded-lg ${
            isActive(`/classDetail/${params.tab}/teachers`)
              ? "bg-[#315ef7] text-white"
              : "hover:bg-slate-100"
          }`}
        >
          {t("teachers")}
        </Link>
        <Link
          href={`/classDetail/${params.tab}/schedule`}
          locale={params.locale}
          className={`flex justify-center items-center hover:bg-slate-100 px-2 py-2 duration-200 rounded-lg ${
            isActive(`/classDetail/${params.tab}/schedule`)
              ? "bg-[#315ef7] text-white"
              : "hover:bg-slate-100"
          }`}
        >
          {t("schedule")}
        </Link>
      </TabList>
    </div>
  );
};

export default TabLists;
