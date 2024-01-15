"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumns";
import {
  addStudentToClass,
  getClassById,
  getTeachersByClassId,
  searchTeacherClass,
} from "@/api";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import Search from "antd/es/input/Search";
import "./components/styles.css";

const TeachersPage = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("classDetail");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataLoading, setFilteredDataLoading] = useState(true);

  useEffect(() => {
    dispatch(getTeachersByClassId(params.tab));
    dispatch(getClassById(params.tab));
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

  const searchTeacher = async (searchQuery) => {
    try {
      await dispatch(
        searchTeacherClass({ id: params.tab, searchQuery: searchQuery })
      );
    } catch (error) {
      console.error("Error during search:", error);
      // Handle error
    }
  };

  const {
    data: getTeachersByClassIdData,
    isLoading: getTeachersByClassIdIsLoading,
  } = useSelector((state) => state.getTeachersByClassId);

  const { data: searchTeacherClassData, isLoading: searchTeacherClassIsLoading } =
  useSelector((state) => state.searchTeacherClass);


  const debouncedSearch = useCallback(debounce(searchTeacher, 500), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      dispatch(getTeachersByClassId(params.tab));
    }
  }, [searchTerm]);


  useEffect(() => {
    if (searchTerm) {
      setFilteredData(searchTeacherClassData);
      setFilteredDataLoading(searchTeacherClassIsLoading);
    } else {
      setFilteredData(getTeachersByClassIdData?.teachersWithSubject);
      setFilteredDataLoading(getTeachersByClassIdIsLoading);
    }
  }, [
    searchTerm,
    searchTeacherClassData,
    searchTeacherClassIsLoading,
    getTeachersByClassIdData,
    getTeachersByClassIdIsLoading,
  ]);

  const handleAddTeacherToClass = () => {
    router.push(`/classDetail/${params.tab}/teachers/assignTeacherToClass`);
  };

  return (
    <div className="text-blue-950 w-full flex-col  ">
      <div className="flex justify-between mb-2">
        <h2 className="text-2xl py-3 px-4">
          {getTeachersByClassIdData?.classInfo?.name}
        </h2>
        <div className="flex my-auto gap-4">
          <div className="flex justify-end items-end w-full gap-4">
            <Search
              className="w-56 my-auto"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="text-white flex items-center my-auto bg-[#315ef7] gap-2 rounded-lg py-0.5 px-5 hover:bg-blue-500 hover:shadow-lg duration-200 "
              onClick={handleAddTeacherToClass}
              type="primary"
            >
              <div className="text-2xl">
                <PlusCircleOutlined />
              </div>
              {t("assignTeacherButton")}
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
          x: 1500,
          y: 300,
        }}
      />
    </div>
  );
};

export default TeachersPage;
