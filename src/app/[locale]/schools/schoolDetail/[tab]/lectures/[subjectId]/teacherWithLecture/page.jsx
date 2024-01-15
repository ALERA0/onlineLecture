"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumns";
import {
  createSchoolStaff,
  getSchoolById,
  getTeacherAssignedToSubject,
  getUnassignedTeachersForClass,
  subjectTeacherSearch,
} from "@/api";
import { useToast } from "@/components/ToastContainer/useToast";
import { resetAssignTeacherToClasses } from "@/redux/slice/user/scholl/assign-teacher-to-classes-slice";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import "./components/styles.css";
import Search from "antd/es/input/Search";

const TeacherWithLecturePage = ({ params }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("classDetail");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataLoading, setFilteredDataLoading] = useState(true);

  const { status: assignTeacherToClassesStatus } = useSelector(
    (state) => state.assignTeacherToClasses
  );

  const {
    data: getTeacherAssignedToSubjectData,
    isLoading: getTeacherAssignedToSubjectIsLoading,
  } = useSelector((state) => state.getTeacherAssignedToSubject);

  const {
    data: subjectTeacherSearchData,
    isLoading: subjectTeacherSearchIsLoading,
  } = useSelector((state) => state.subjectTeacherSearch);

  useToast(
    assignTeacherToClassesStatus,
    resetAssignTeacherToClasses(),
    "Öğretmen başarıyla sınıfa atandı",
    "Öğretmen sınıfa atanamadı!",
    dispatch
  );

  const handleRouteToUnassignedSubjectTeachers = () => {
    router.push(`teacherWithoutLecture`);
  };

  useEffect(() => {
    dispatch(getTeacherAssignedToSubject(params.subjectId));
    dispatch(getSchoolById(params.tab));
  }, []);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const searchTeacherWithSubject = async (searchQuery) => {
    try {
      await dispatch(
        subjectTeacherSearch({ id: params.tab, searchQuery: searchQuery })
      );
    } catch (error) {
      console.error("Error during search:", error);
      // Handle error
    }
  };

  const debouncedSearch = useCallback(
    debounce(searchTeacherWithSubject, 500),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      dispatch(getTeacherAssignedToSubject(params.tab));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(subjectTeacherSearchData);
      setFilteredDataLoading(subjectTeacherSearchIsLoading);
    } else {
      setFilteredData(getTeacherAssignedToSubjectData?.teachers);
      setFilteredDataLoading(getTeacherAssignedToSubjectIsLoading);
    }
  }, [
    searchTerm,
    subjectTeacherSearchData,
    subjectTeacherSearchIsLoading,
    getTeacherAssignedToSubjectData,
    getTeacherAssignedToSubjectIsLoading,
  ]);

  return (
    <div className="text-blue-950 w-full flex-col  ">
      <div className="flex justify-between w-full mb-4">
        <div className="flex flex-col justify-center items-start w-full gap-2 ">
          <h2 className="text-2xl  ">
            {getTeacherAssignedToSubjectData?.subject} {t("ofTeachers")}
          </h2>
        </div>
        <div className="flex my-auto gap-4">
          <div className="flex justify-end items-end w-full gap-4">
            <Search
              className="w-56 my-auto"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="text-white flex items-center my-auto bg-[#315ef7] gap-2 rounded-lg py-0.5 px-5 hover:bg-blue-500 hover:shadow-lg duration-200 "
              onClick={handleRouteToUnassignedSubjectTeachers}
              type="primary"
            >
              <div className="text-2xl">
                <PlusCircleOutlined />
              </div>
              {t("assignTeacherToLecture")}
            </button>
          </div>
        </div>
      </div>

      <Table
        loading={filteredDataLoading}
        className="custom-table"
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-row-odd" : "bg-row-even"
        }
        columns={columns(t)}
        dataSource={filteredData}
        scroll={{
          x: 500,
          y: 300,
        }}
      />
    </div>
  );
};

export default TeacherWithLecturePage;
