import { Footer } from "antd/es/layout/layout";
import { usePathname } from "next/navigation";
import React from "react";

const FooterComp = ({ locale }) => {
  const pathname = usePathname();

  const isAdminLoginPage = pathname === `/${locale}/admin/login`;
  const isUserLoginPage = pathname === `/${locale}/auth`;

//   if (isAdminLoginPage || isUserLoginPage) {
//     return null;
//   }

  return (
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©2023 Created by Ant UED
    </Footer>
  );
};

export default FooterComp;
