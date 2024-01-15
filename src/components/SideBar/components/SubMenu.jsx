import React, { useEffect, useRef, useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "@/navigation";

const SubMenu = ({ icon, title, children, basePath, route }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const contentRef = useRef(null); // Alt menü içeriği için ref

  useEffect(() => {
    setIsOpen(pathname.startsWith(basePath));
  }, [pathname, basePath]);

  const toggleSubMenu = () => {
    if (route && !isOpen) {
      router.push(route);
    }
    setIsOpen(!isOpen);
  };

  const isActive = pathname.startsWith(basePath);
  const maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0'; // Maksimum yükseklik

  return (
    <div className="flex flex-col w-full pl-7">
      <div className={`flex  text-black text-2xl cursor-pointer gap-2 hover:text-[#315ef7] duration-200`} >
        <span
          className={`flex gap-1 duration-300 ${isOpen ? "ml-[-16px]" : ""} ${
            isActive ? "text-blue-500" : "text-black"
          }`}
          onClick={toggleSubMenu}
        >
          {icon}
          <span className="ml-1">{title}</span>
        </span>
        {/* <span
          onClick={toggleSubMenu}
          className={`duration-300 ${
            isActive ? "text-blue-500" : "text-black"
          } `}
        >
          {isOpen ? <UpOutlined /> : <DownOutlined />}
        </span> */}
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
      >
        <div
          className={`flex flex-col gap-2 pl-6 mt-2 border-l-2 border-blue-500 duration-500`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
