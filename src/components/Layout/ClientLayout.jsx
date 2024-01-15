"use client";
import { ConfigProvider, Layout } from "antd";
import React from "react";
import SidebarComp from "@/components/SideBar/SidebarComp";
import RoutingHeader from "@/components/RoutingHeader/RoutingHeader";
import HeaderComp from "@/components/Header/HeaderComp";
import { Content } from "antd/es/layout/layout";
import { ToastContainer } from "react-toastify";
import { usePathname } from "@/navigation";
import AuthPage from "@/app/[locale]/auth";

const ClientLayout = ({ children, locale }) => {
  const pathname = usePathname();

  return (
    <ConfigProvider>
      {pathname !== "/auth" ? (
        <div className="px-9 py-6 w-full bg-[#eff3ff] overflow-hidden overscroll-none">
          <Layout
            className="h-full grid grid-cols-12 rounded-xl gap-4 bg-[#eff3ff] "
            style={{
              height: "95vh",
            }}
          >
            <div className="col-span-3 h-full w-full  ">
              <SidebarComp />
            </div>
            <div className="col-span-9 h-full rounded-xl bg-[#eff3ff]">
              <div className="flex flex-col w-full h-full ">
                <div className="grid grid-cols-10 gap-6 rounded-xl mb-6">
                  <div className="col-span-7 rounded-xl ">
                    <RoutingHeader locale={locale} />
                  </div>
                  <div className="col-span-3 rounded-xl">
                    <HeaderComp locale={locale} />
                  </div>
                </div>
                <Layout className="bg-white rounded-xl">
                  <Content
                    style={{
                      // margin: "24px 16px 0",
                      overflow: "initial",
                    }}
                  >
                    <div
                      style={{
                        padding: 24,
                        textAlign: "center",
                        backgroundColor: "white",
                        borderRadius: "12px",
                      }}
                    >
                      {children}
                    </div>
                  </Content>
                  {/* <FooterComp locale={locale} /> */}
                </Layout>
              </div>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </Layout>
        </div>
      ) : (
        <AuthPage />
      )}
    </ConfigProvider>
  );
};

export default ClientLayout;
