"use client";

import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { items } from "./items";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import {
  adminLogout,
  authUserLogout,
  createSupportTicket,
  getAdminUserById,
  getSchoolByOwnerId,
} from "@/api";
import {
  BankOutlined,
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import TroubleshootModal from "./TroubleshootModal";
import { useToast } from "../ToastContainer/useToast";
import { resetCreateSupportTicket } from "@/redux/slice/support/create-support-ticket-slice";
import MenuItem from "./components/MenuItem";
import SubMenu from "./components/SubMenu";

const SidebarComp = () => {
  const t = useTranslations("sidebar");
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const isAdminLoginPage = pathname === `/admin/login`;
  const isUserLoginPage = pathname === `/auth`;

  useEffect(() => {
    dispatch(getSchoolByOwnerId());
  }, []);

  const { role: userRole, id: userId } = useSelector(
    (state) => state.setUserData
  );
  const {
    isLoading: createSupportTicketIsLoading,
    status: createSupportTicketStatus,
  } = useSelector((state) => state.createSupportTicket);

  const { data: getSchoolByOwnerIdData } = useSelector(
    (state) => state.getSchoolByOwnerId
  );

  console.log(getSchoolByOwnerIdData, "SCHOOl");

  const renderSchoolsSubMenu = () => {
    return getSchoolByOwnerIdData?.map((school) => (
      <MenuItem
        key={school.id}
        icon={<BookOutlined />}
        title={school.SchoolDetails.schoolName}
        onClick={() =>
          handleRedirect(`/schools/schoolDetail/${school.id}/allClasses`)
        }
        path={`/schools/schoolDetail/${school.id}/allClasses`}
      />
    ));
  };

  useEffect(() => {
    if (userId) {
      dispatch(getAdminUserById());
    }
  }, [userId]);

  const handleLogout = async () => {
    if (userRole === "ADMIN") {
      await dispatch(adminLogout());
    } else {
      await dispatch(authUserLogout());
      await router.push(`/auth`);
    }
  };

  const handleTrouble = async (formikValues) => {
    await dispatch(
      createSupportTicket({
        id: userId,
        data: {
          description: formikValues.description,
        },
      })
    );
  };

  const handleCancelTrouble = () => {
    setOpen(false);
  };

  const handleRedirect = (path) => {
    router.push(path);
  };

  useToast(
    createSupportTicketStatus,
    resetCreateSupportTicket(),
    "Sorun raporunuz tarafımıza iletilmiştir.",
    "Sorun raporunuz iletilemedi.",
    dispatch
  );

  if (isAdminLoginPage || isUserLoginPage) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <div
        style={{
          height: "95vh",
          overflow: "auto",
          maxWidth: "370px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "14px",
          backgroundColor: "white",
          paddingBottom: "25px",
          overflowX:"hidden"
        }}
        className="shadow-md"
      >
        <div className="h-full w-full flex w- flex-col justify-between pb-3 px-2">
          <div>
            <Image
              src="/images/logo.png"
              alt="logo"
              width={230}
              height={90}
              className="mx-auto py-6 cursor-pointer rounded-xl  duration-500 "
              onClick={() => router.push("/")}
            />
            <div className="w-full bg-gray-200 mb-6 h-0.5" />
            <div className="flex pl-6 flex-col w-full gap-4 justify-center items-center">
              <MenuItem
                icon={<HomeOutlined />}
                title={t("mainPage")}
                onClick={() => handleRedirect("/")}
                path="/"
              />
              {userRole === "USER" ? (
                <SubMenu
                  icon={<BankOutlined />}
                  title={t("schools")}
                  basePath="/schools"
                  route="/schools"
                >
                  {renderSchoolsSubMenu()}
                </SubMenu>
              ) : null}
            </div>
          </div>

          <div className="flex items-center w-full flex-col  justify-between gap-4 bg-white  duration-200 py-1 rounded-lg">
            <div className="flex justify-center items-center w-full border-b-2">
              <div
                className="text-black text-xl flex justify-center items-center  mb-4 font-bold hover:text-blue-600 cursor-pointer gap-3 duration-300  pb-2"
                onClick={() => setOpen(true)}
              >
                <WarningOutlined />
                {t("troubleshoot")}
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <div
                className="text-red-500 text-xl flex justify-center items-center  mb-4 font-bold hover:text-red-800 cursor-pointer gap-3 duration-300 "
                onClick={handleLogout}
              >
                <LogoutOutlined />
                {t("logout")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <TroubleshootModal
        open={open}
        handleSave={handleTrouble}
        handleCancel={handleCancelTrouble}
        buttonLoading={createSupportTicketIsLoading}
      />
    </div>
  );
};

export default SidebarComp;
