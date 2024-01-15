import React from "react";
import {
  FileOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

export const items = (t) => [
  getItem(t("user_settings"), "1", <SettingOutlined />, null, () => {}),
  getItem(t("logout"), "2", <LogoutOutlined />, null, () => {}),
];
