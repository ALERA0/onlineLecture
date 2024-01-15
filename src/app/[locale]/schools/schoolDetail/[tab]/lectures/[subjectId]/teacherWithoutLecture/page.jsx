"use client";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumns";
import { getSchoolById, getTeacherAssignedToSubject, getUnassignedTeachers } from "@/api";
import { useToast } from "@/components/ToastContainer/useToast";
import { resetAssignTeacherToClasses } from "@/redux/slice/user/scholl/assign-teacher-to-classes-slice";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { resetAssignSubjectsToTeacher } from "@/redux/slice/user/subject/assign-subjects-to-teacher-slice";
import "./components/styles.css";


const TeacherWithoutLecturePage = ({ params }) => {
  const t = useTranslations("classDetail");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getUnassignedTeachers());
    dispatch(getTeacherAssignedToSubject(params.subjectId));
    dispatch(getSchoolById(params.tab));
  }, []);

  const { status: assignSubjectsToTeacherStatus } = useSelector(
    (state) => state.assignSubjectsToTeacher
  );

  const {
    data: getUnassignedTeachersData,
    isLoading: getTeacherUnassignedToSubjectIsLoading,
  } = useSelector((state) => state.getUnassignedTeachers);

  const {
    data: getTeacherAssignedToSubjectData,
    isLoading: getTeacherAssignedToSubjectIsLoading,
  } = useSelector((state) => state.getTeacherAssignedToSubject);

  useToast(
    assignSubjectsToTeacherStatus,
    resetAssignSubjectsToTeacher(),
    "Öğretmen başarıyla derse atandı",
    "Öğretmen derse atanamadı!",
    dispatch
  );

  return (
    <div className="text-blue-950 w-full flex-col  ">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center w-full gap-2 mb-3">
          <h2 className="text-2xl  ">
            {getTeacherAssignedToSubjectData?.subject} {t("assignTeacher")}
          </h2>
        </div>
      </div>
      <Table
        loading={getTeacherUnassignedToSubjectIsLoading}
        className="custom-table"
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-row-odd" : "bg-row-even"
        }
        columns={columns(t,params)}
        dataSource={getUnassignedTeachersData}
        scroll={{
          x: 500,
          y: 300,
        }}
      />
    </div>
  );
};

export default TeacherWithoutLecturePage;
