// components/tableColumn.js
import React from "react";


import { useDispatch } from "react-redux";
import { getSchoolById } from "@/api";
import { Button, Tooltip } from "antd";
import { EditOutlined, FolderViewOutlined } from "@ant-design/icons";
import { useRouter } from "@/navigation";

const ViewButton = ({ schoolId ,t}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleView = async () => {
    await dispatch(getSchoolById(schoolId));
    await router.push(`/schools/schoolDetail/${schoolId}/allClasses`);
  };

  return (
    <Tooltip title={t("viewSchool")} >
      <Button
        className="text-blue-700 cursor-pointer"
        onClick={handleView}
        icon={<FolderViewOutlined />}
      />
    </Tooltip>
  );
};

const ActionButton = ({ record, onEdit ,t}) => {
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    const response = await dispatch(getSchoolById(record.id));
    if (response.payload) {
      onEdit(response.payload.data.data.data.getSchoolById.SchoolDetails);
    }
  };

  return (
    <>
      <Tooltip title={t("editSchool")}>
        <Button
          className="text-green-500 cursor-pointer"
          onClick={handleButtonClick}
          icon={<EditOutlined />}
        />
      </Tooltip>
    </>
  );
};

export const columns = (openEditModal, t) => [
  {
    title: t("schoolInfo"),
    dataIndex: "SchoolDetails",
    width: 160,
    render: (schoolName) => {
      return (
        <p className="flex flex-nowrap overflow-hidden text-ellipsis">
          {schoolName?.schoolName}
        </p>
      );
    },
  },
  {
    title: t("schoolAddress"),
    dataIndex: "SchoolDetails",
    width: 100,
    render: (schoolAddress) => {
      return (
        <p className="flex flex-nowrap overflow-hidden text-ellipsis">
          {schoolAddress?.schoolAddress}
        </p>
      );
    },
  },
  {
    title: t("schoolNumber"),
    dataIndex: "SchoolDetails",
    width: 120,
    render: (schoolPhone) => {
      return (
        <p className="flex flex-nowrap overflow-hidden text-ellipsis">
          {schoolPhone?.schoolPhone}
        </p>
      );
    },
  },
  {
    title: t("schoolEmail"),
    dataIndex: "SchoolDetails",
    width: 120,
    render: (schoolEmail) => {
      return (
        <p className="flex flex-nowrap overflow-hidden text-ellipsis">
          {schoolEmail?.schoolEmail}
        </p>
      );
    },
  },
  {
    title: "-",
    key: "action",
    fixed: "right",
    width: 60,
    render: (_, record) => (
      <div className="flex gap-2">
        <ViewButton schoolId={record.id} t={t} />
        <ActionButton record={record} onEdit={openEditModal} t={t} />
      </div>
    ),
  },
];
