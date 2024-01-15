import React from "react";
import { usePathname } from "@/navigation";

const MenuItem = ({ icon, title, onClick, path }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <div
      className={`flex items-center gap-x-2 text-2xl cursor-pointer p-1 ${isActive ? "text-blue-500" : "text-black"}`}
      onClick={onClick}
    >
      <div className=" flex justify-center items-center">{icon}</div>
      <span className="flex-1 truncate w-60 ">{title}</span>
    </div>
  );
  
};

export default MenuItem;
