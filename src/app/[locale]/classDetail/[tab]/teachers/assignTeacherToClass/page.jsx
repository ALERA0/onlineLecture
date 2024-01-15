"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumns";
import {
  createSchoolStaff,
  getTeacherBySchoolId,
  getUnassignedTeachersForClass,
} from "@/api";
import { resetCreateSchoolStaff } from "@/redux/slice/user/scholl/create-school-staff-slice";

import { useToast } from "@/components/ToastContainer/useToast";
import { resetAssignTeacherToClasses } from "@/redux/slice/user/scholl/assign-teacher-to-classes-slice";
import { useTranslations } from "next-intl";
import "./components/styles.css";


const AssignTeacherToClass = ({ params }) => {
  const dispatch = useDispatch();
  const t = useTranslations("classDetail");

  useEffect(() => {
    dispatch(getUnassignedTeachersForClass(params.tab));
  }, []);

  const { status: assignTeacherToClassesStatus } = useSelector(
    (state) => state.assignTeacherToClasses
  );

  const {
    data: getUnassignedTeachersForClassData,
    isLoading: getUnassignedTeachersForClassIsLoading,
  } = useSelector((state) => state.getUnassignedTeachersForClass);

  useToast(
    assignTeacherToClassesStatus,
    resetAssignTeacherToClasses(),
    "Öğretmen başarıyla sınıfa atandı",
    "Öğretmen sınıfa atanamadı!",
    dispatch
  );

  return (
    <div className="text-blue-950 w-full flex-col  ">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center w-full gap-2 ">
          <h2 className="text-2xl mb-2 ">
            {getUnassignedTeachersForClassData?.classInfo.schoolName}
          </h2>
          <h2 className="text-2xl mb-4">
            {getUnassignedTeachersForClassData?.classInfo.name} {t("assignTeacher")}
          </h2>
        </div>
      </div>

      <Table
        loading={getUnassignedTeachersForClassIsLoading}
        className="custom-table"
        rowClassName={(record, index) => (index % 2 === 0 ? 'bg-row-odd' : 'bg-row-even')}
        columns={columns(t)}
        dataSource={getUnassignedTeachersForClassData?.unassignedTeachers}
        scroll={{
          x: 1000,
          y: 300,
        }}
      />
    </div>
  );
};

export default AssignTeacherToClass;
