import {
  BankOutlined,
  BookOutlined,
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  PropertySafetyOutlined,
  TeamOutlined,
  UserOutlined,
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





export const items = (t)=> [
  getItem(t("admin"), "sub1", <PropertySafetyOutlined  />, [
    getItem(t("allUsers"), "3", <UserOutlined />, null, () => {}),
    getItem(t("allSchools"), "7", <BookOutlined />, null, () => {}),
    getItem("Elastic Logs", "4", <BookOutlined />, null, () => {}),
    getItem("Prisma Logs", "5", <BookOutlined />, null, () => {}),
    getItem("Duration Logs", "6", <BookOutlined />, null, () => {}),


  ]),
  getItem(t("mainPage"), "8", <HomeOutlined/>, null, () => {}),
  getItem(t("schools"), "1", <BankOutlined />, null, () => {}),
  getItem(t("yourSchool"),"10",<BankOutlined />,null,()=>{}),



];
