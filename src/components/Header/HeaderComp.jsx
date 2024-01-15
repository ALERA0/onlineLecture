"use client";
import React, { useEffect } from "react";
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout, authUserLogout, getAdminUserById } from "@/api";
import { Link, usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { getCookies } from "cookies-next";
import { setUserId, setUserRole } from "@/redux/slice/session-slice";
import { verifyJwtToken } from "@/utils/auth";
import Image from "next/image";
import trflag from "../../../public/images/turkey.svg";
import enflag from "../../../public/images/eng.svg";

const HeaderComp = ({ locale }) => {
  const t = useTranslations("headers");
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const itemsDropdown = [
    {
      key: "1",
      label: (
        <Link href={pathname} locale="tr">
          <div className="flex justify-center items-center gap-2 ">
            <Image
              src={trflag}
              alt="trflag"
              className="flex justify-center items-center"
              width={20}
            />
            <p className="flex justify-center items-center">TR</p>{" "}
          </div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href={pathname} locale="en">
          <div className="flex justify-center items-center gap-2 ">
            <Image
              src={enflag}
              alt="enflag"
              className="flex justify-center items-center"
              width={20}
            />
            <p className="flex justify-center items-center">EN</p>{" "}
          </div>
        </Link>
      ),
    },
  ];

  const isAdminLoginPage = pathname === `/admin/login`;
  const isUserLoginPage = pathname === `/auth`;

  const { role: userRole, id: userId } = useSelector(
    (state) => state.setUserData
  );

  useEffect(() => {
    (async () => {
      const cookies = getCookies();
      const token = cookies.token;
      try {
        if (token) {
          const verifiedToken = await verifyJwtToken(token);
          if (verifiedToken) {
            dispatch(setUserId(verifiedToken.payload.id));
            dispatch(setUserRole(verifiedToken.payload.roles));
          }
        }
      } catch (error) {
        throw error;
      }
    })();
  }, [dispatch, router]);


  const { data: getAdminUserByIdData } = useSelector(
    (state) => state.getAdminUserById
  );

  useEffect(() => {
    if (userId) {
      dispatch(getAdminUserById());
    }
  }, [userId]);

  if (isAdminLoginPage || isUserLoginPage) {
    return null;
  }

  return (
    <Header className="flex px-3 justify-between w-full items-center gap-4 rounded-xl bg-white">
      <div className="flex  w-full    rounded-lg">
        <div className="flex   gap-2 ">
          <div className="flex justify-start rounded-lg border-2 text-3xl p-0.5 ">
            <UserOutlined  />
          </div>
          <p className="text-black text-lg font-semibold  my-auto flex-nowrap">
            {getAdminUserByIdData?.name}
          </p>
        </div>
      </div>
      <div className="flex w-full gap-2 justify-end">
        <Dropdown overlay={<Menu items={itemsDropdown} />}>
          <a onClick={(e) => e.preventDefault()}>
            <Space className="text-black  h-9 p-1 flex justify-center items-center border-2 border-slate-200 rounded-lg">
              {locale === "tr" ? (
                <div className="flex justify-center items-center gap-2  ">
                  <Image
                    src={trflag}
                    alt="trflag"
                    className="flex justify-center items-center"
                    width={20}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center gap-2 ">
                  <Image
                    src={enflag}
                    alt="enflag"
                    className="flex justify-center items-center"
                    width={20}
                  />
                </div>
              )}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Button
          icon={<SettingOutlined className="text-2xl" />}
          size="large"
          className="my-auto"
        />
      </div>
    </Header>
  );
};

export default HeaderComp;
