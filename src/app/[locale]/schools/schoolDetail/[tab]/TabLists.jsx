"use client";
import { getSchoolById } from "@/api";
import { Tab, TabList } from "@/components/Tabs/tabs";
import { Link, usePathname, useRouter } from "@/navigation";
import { LeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import { useTranslations } from "next-intl";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TabLists = ({ params }) => {
  const t = useTranslations("schools");

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: getSchoolByIdData } = useSelector(
    (state) => state.getSchoolById
  );

  useEffect(() => {
    dispatch(getSchoolById(params.tab));
  }, []);

  // Function to check if the current route matches the link
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className="w-full flex gap-3 ">
      {/* <div className="text-black flex justify-between mb-2 py-3 w-full">
        <p className="text-3xl font-semibold">
          {getSchoolByIdData?.SchoolDetails.schoolName}
        </p>
        <div className="flex gap-4">
          <Search className="w-36" placeholder="Search"/>
        <button
          className="text-white flex items-center my-auto bg-[#315ef7] gap-2 rounded-lg py-0.5 px-5 hover:bg-blue-500 hover:shadow-lg duration-200 "
          onClick={() => {}}
          type="primary"
        >
          <div className="text-2xl">
            <PlusCircleOutlined />
          </div>
          {t("newTeacher")}
        </button>
        </div>
      </div> */}
      <Button
        icon={<LeftOutlined />}
        onClick={() => router.back()}
        className="rounded-full text-blue-600 text-lg flex justify-center items-center border-blue-600 my-auto"
      />
      <TabList>
        <Link
          href={`/schools/schoolDetail/${params.tab}/allClasses`}
          locale={params.locale}
          className={`flex justify-center items-center hover:bg-slate-100 px-2 py-2 duration-200 rounded-lg ${
            isActive(`/schools/schoolDetail/${params.tab}/allClasses`)
              ? "bg-[#315ef7] text-white"
              : "hover:bg-slate-100"
          }`}
        >
          {t("allClasses")}
        </Link>
        <Link
          href={`/schools/schoolDetail/${params.tab}/allTeachers`}
          locale={params.locale}
          className={`flex justify-center items-center hover:bg-slate-100 px-2 py-2 duration-200 rounded-lg ${
            isActive(`/schools/schoolDetail/${params.tab}/allTeachers`)
              ? "bg-[#315ef7] text-white"
              : "hover:bg-slate-100"
          }`}
        >
          {t("allTeachers")}
        </Link>
        <Link
          href={`/schools/schoolDetail/${params.tab}/directors`}
          locale={params.locale}
          className={`flex justify-center items-center hover:bg-slate-100 px-2 py-2 duration-200 rounded-lg ${
            isActive(`/schools/schoolDetail/${params.tab}/directors`)
              ? "bg-[#315ef7] text-white"
              : "hover:bg-slate-100"
          }`}
        >
          {t("allDirectors")}
        </Link>
        <Link
          href={`/schools/schoolDetail/${params.tab}/lectures`}
          locale={params.locale}
          className={`flex justify-center items-center hover:bg-slate-100 px-2 py-2 duration-200 rounded-lg ${
            isActive(`/schools/schoolDetail/${params.tab}/lectures`)
              ? "bg-[#315ef7] text-white"
              : "hover:bg-slate-100"
          }`}
        >
          {t("allLectures")}
        </Link>
      </TabList>
    </div>
  );
};

export default TabLists;
