"use client";
import { Link, usePathname } from "@/navigation";
import { RightCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import React from "react";
import { useSelector } from "react-redux";

const RoutingHeader = () => {
  const pathname = usePathname();
  const t = useTranslations("routingHeaders");

  const { data: getSchoolByIdData } = useSelector(
    (state) => state.getSchoolById
  );
  const { data: getClassByIdData } = useSelector((state) => state.getClassById);

  console.log(getClassByIdData, "CLASS DATA");

  const isAdminLoginPage = pathname === `/admin/login`;
  const isUserLoginPage = pathname === `/auth`;

  if (isAdminLoginPage || isUserLoginPage) {
    return null;
  }
  const isSchoolPage = pathname.startsWith("/schools");
  const isClassDetailsPage = pathname.startsWith("/classDetail");

  const hasAdditionalSchoolRoute = pathname.split("/").length > 2;

  const isClasssPage = pathname.endsWith("/allClasses");
  const isTeachersPage = pathname.endsWith("/allTeachers");
  const isDirectorsPage = pathname.endsWith("/directors");
  const isLecturesPage = pathname.endsWith("/lectures");
  const isStudentsPage = pathname.endsWith("/students");
  const isClassTeachersPage = pathname.endsWith("/teachers");
  const isClassSchedulePage = pathname.endsWith("/schedule");

  const isMainPage = pathname === "/";

  console.log(pathname, "pathhhhhhh");

  return (
    <div className="w-full flex bg-white text-black px-6 rounded-xl py-4 text-2xl">
      <Link
        href="/schools"
        className="text-[#315ef7] hover:text-blue-400 duration-200"
      >
        {isSchoolPage ? <p>{t("schools")} </p> : null}
      </Link>
      {isSchoolPage && hasAdditionalSchoolRoute ? (
        <span>
          <RightOutlined className="text-lg flex justify-center items-center h-full mx-1.5 text-[#315ef7]" />
        </span>
      ) : null}
      {isSchoolPage && hasAdditionalSchoolRoute ? (
        <div className="flex">
          <Link
            href={`/schools/schoolDetail/${getClassByIdData?.classInfo.schoolId}/allClasses`}
            className="text-[#315ef7] hover:text-blue-400 duration-200"
          >
            <p>{getSchoolByIdData?.SchoolDetails.schoolName} </p>
          </Link>
          <span>
            <RightOutlined className="text-lg flex justify-center items-center h-full mx-1.5 text-[#315ef7]" />
          </span>
        </div>
      ) : null}

      <Link
        href="allTeachers"
        className="text-[#315ef7] hover:text-blue-400 duration-200"
      >
        {isTeachersPage ? <p>{t("allTeachers")} </p> : null}
      </Link>
      {isClassDetailsPage ? (
        <div className="flex">
          <Link
            href={`/schools/schoolDetail/${getClassByIdData?.classInfo.schoolId}/allClasses`}
            className="text-[#315ef7] hover:text-blue-400 duration-200"
          >
            <p>{getSchoolByIdData?.SchoolDetails.schoolName} </p>
          </Link>
          <span>
            <RightOutlined className="text-lg flex justify-center items-center h-full mx-1.5 text-[#315ef7]" />
          </span>
        </div>
      ) : null}
      <Link
        href={`/schools/schoolDetail/${getClassByIdData?.classInfo.schoolId}/allClasses`}
        className="text-[#315ef7] hover:text-blue-400 duration-200"
      >
        {isClassDetailsPage ? <p>{t("allClasses")} </p> : null}
      </Link>

      {isClassDetailsPage ? (
        <span>
          <RightOutlined className="text-lg flex justify-center items-center h-full mx-1.5 text-[#315ef7]" />
        </span>
      ) : null}

      {isClassDetailsPage ? (
        <div className="flex">
          <Link
            href="students"
            className="text-[#315ef7] hover:text-blue-400 duration-200"
          >
            {getClassByIdData?.classInfo.name}
          </Link>

          <span>
            <RightOutlined className="text-lg flex justify-center items-center h-full mx-1.5 text-[#315ef7]" />
          </span>
        </div>
      ) : null}

      {isStudentsPage ? <p>{t("students")} </p> : null}
      {isClassTeachersPage ? <p>{t("teachers")} </p> : null}
      {isClassSchedulePage ? <p>{t("schedule")} </p> : null}

      <Link
        href="allClasses"
        className="text-[#315ef7] hover:text-blue-400 duration-200"
      >
        {isClasssPage ? <p>{t("allClasses")} </p> : null}
      </Link>
      <Link
        href="allDirectors"
        className="text-[#315ef7] hover:text-blue-400 duration-200"
      >
        {isDirectorsPage ? <p>{t("allDirectors")} </p> : null}
      </Link>

      <Link
        href="lectures"
        className="text-[#315ef7] hover:text-blue-400 duration-200"
      >
        {isLecturesPage ? <p>{t("lectures")} </p> : null}
      </Link>
      <Link
        href="/"
        className="text-[#315ef7] hover:text-blue-400 duration-200 "
      >
        {isMainPage ? <p>{t("mainPage")} </p> : null}
      </Link>
    </div>
  );
};

export default RoutingHeader;
