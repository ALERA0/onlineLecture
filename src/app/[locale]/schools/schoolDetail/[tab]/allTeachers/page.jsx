"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumns";
import {
  createSchoolStaff,
  getSchoolById,
  getSubjectsBySchoolId,
  getTeacherBySchoolId,
  searchTeachers,
  updateTeacher,
} from "@/api";
import { resetCreateSchoolStaff } from "@/redux/slice/user/scholl/create-school-staff-slice";
import NewTeacherModalComp from "./components/NewTeacherModalComp";
import { useToast } from "@/components/ToastContainer/useToast";
import { useTranslations } from "next-intl";
import Search from "antd/es/input/Search";
import "./components/styles.css";
import EditTeacherModal from "./components/EditTeacherModal";
import { resetUpdateTeacher } from "@/redux/slice/user/scholl/update-teacher-slice";

const AllTeachersPage = ({ params }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const t = useTranslations("schools");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataLoading, setFilteredDataLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getTeacherBySchoolId(params.tab));
    dispatch(getSubjectsBySchoolId(params.tab));
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

  const searchTeacher = async (searchQuery) => {
    try {
      await dispatch(
        searchTeachers({ id: params.tab, searchQuery: searchQuery })
      );
    } catch (error) {
      console.error("Error during search:", error);
      // Handle error
    }
  };

  const debouncedSearch = useCallback(debounce(searchTeacher, 500), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      dispatch(getTeacherBySchoolId(params.tab));
    }
  }, [searchTerm]);

  const {
    data: getTeacherBySchoolIdData,
    isLoading: getTeacherBySchoolIdIsLoading,
  } = useSelector((state) => state.getTeacherBySchoolId);

  const { data: searchTeachersData, isLoading: searchTeachersIsLoading } =
    useSelector((state) => state.searchTeachers);

  const {
    status: createSchoolStaffStatus,
    isLoading: createSchoolStaffIsLoading,
    message: createSchoolStaffMessage,
  } = useSelector((state) => state.createSchoolStaff);

  const {
    status: updateTeacherStatus,
    isLoading: updateTeacherIsLoading,
    message: updateTeacherMessage,
  } = useSelector((state) => state.updateTeacher);

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(searchTeachersData);
      setFilteredDataLoading(searchTeachersIsLoading);
    } else {
      setFilteredData(getTeacherBySchoolIdData?.teachersInformation);
      setFilteredDataLoading(getTeacherBySchoolIdIsLoading);
    }
  }, [
    searchTerm,
    searchTeachersData,
    searchTeachersIsLoading,
    getTeacherBySchoolIdData,
    getTeacherBySchoolIdIsLoading,
  ]);

  const handleCancel = () => {
    setOpen(false);
  };

  const openEditModal = (subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedSubject(null);
  };

  const tableColumns = columns(openEditModal, t, params);

  const handleUpdateSubject = async (formikValues) => {
    await dispatch(
      updateTeacher({
        id: selectedSubject.User.id,
        data: {
          name: formikValues.name,
          email: formikValues.email,
          // password: formikValues.password,
          phoneNumber: formikValues.phoneNumber,
          birthDate: formikValues.birthDate,
          city: formikValues.city,
          district: formikValues.district,
          newSubjectId:formikValues.subjectId
        },
      })
    );
    await dispatch(getTeacherBySchoolId(params.tab));
  };

  const handleSave = async (formikValues) => {
    await dispatch(
      createSchoolStaff({
        id: params.tab,
        data: {
          name: formikValues.name,
          email: formikValues.email,
          password: formikValues.password,
          subjectId: formikValues.subjectId,
          phoneNumber: formikValues.phoneNumber,
          role: "TEACHER",
        },
      })
    );
    await dispatch(getTeacherBySchoolId(params.tab));
  };

  const handleNewTeacher = async () => {
    await dispatch(getSubjectsBySchoolId(params.tab));
    await setOpen(true);
  };

  useToast(
    createSchoolStaffStatus,
    resetCreateSchoolStaff(),
    createSchoolStaffMessage,
    createSchoolStaffMessage,
    dispatch
  );

  useToast(
    updateTeacherStatus,
    resetUpdateTeacher(),
    updateTeacherMessage,
    updateTeacherMessage,
    dispatch
  );

  return (
    <div className="text-blue-950 w-full flex-col  ">
      <div className="flex justify-between mb-3 w-full">
        <h2 className="text-2xl py-2 px-4 w-full text-start">
          {getTeacherBySchoolIdData?.schoolInformation.SchoolDetails.schoolName}
        </h2>
        <div className="flex w-full my-auto">
          <div className="flex justify-end items-end w-full gap-4">
            <Search
              className="w-56 my-auto"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="text-white flex items-center my-auto bg-[#315ef7] gap-2 rounded-lg py-0.5 px-5 hover:bg-blue-500 hover:shadow-lg duration-200 "
              onClick={handleNewTeacher}
              type="primary"
            >
              <div className="text-2xl">
                <PlusCircleOutlined />
              </div>
              {t("newTeacher")}
            </button>
          </div>
        </div>
      </div>
      <EditTeacherModal
        open={isModalOpen}
        handleCancel={closeEditModal}
        handleSave={handleUpdateSubject}
        buttonLoading={updateTeacherIsLoading}
        teacherData={selectedSubject}
      />
      <NewTeacherModalComp
        open={open}
        handleCancel={handleCancel}
        handleSave={handleSave}
        buttonLoading={createSchoolStaffIsLoading}
      />
      <Table
        loading={filteredDataLoading}
        className="custom-table"
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-row-odd" : "bg-row-even"
        }
        columns={tableColumns}
        dataSource={filteredData}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
    </div>
  );
};

export default AllTeachersPage;
