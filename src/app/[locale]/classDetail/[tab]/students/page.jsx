"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumns";
import {
  addStudentToClass,
  getClassById,
  getSchoolById,
  getStudentsByClassId,
  searchStudents,
  updateStudent,
} from "@/api";
import { useToast } from "@/components/ToastContainer/useToast";
import AddStudentToClassModalComp from "./components/AddStudentToClassModalComp";
import { resetAddStudentToClass } from "@/redux/slice/user/scholl/add-student-to-class-slice";
import { useTranslations } from "next-intl";
import Search from "antd/es/input/Search";
import "./components/styles.css";
import EditStudentModal from "./components/EditStudentModal";
import { resetUpdateStudent } from "@/redux/slice/user/scholl/update-student-slice";
import { resetDeleteStudent } from "@/redux/slice/user/scholl/delete-student-slice";

const StudentsPage = ({ params }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const t = useTranslations("classDetail");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataLoading, setFilteredDataLoading] = useState(true);

  useEffect(() => {
    dispatch(getStudentsByClassId(params.tab));
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

  const searchStudent = async (searchQuery) => {
    try {
      await dispatch(
        searchStudents({ id: params.tab, searchQuery: searchQuery })
      );
    } catch (error) {
      console.error("Error during search:", error);
      // Handle error
    }
  };

  const {
    data: getStudentsByClassIdData,
    isLoading: getStudentsByClassIdIsLoading,
  } = useSelector((state) => state.getStudentByClassId);

  const {
    status: addStudentToClassStatus,
    isLoading: addStudentToClassIsLoading,
    message: addStudentToClassMessage,
  } = useSelector((state) => state.addStudentToClass);

  const {
    status: udpateStudentStatus,
    isLoading: udpateStudentIsLoading,
    message: udpateStudentMessage,
  } = useSelector((state) => state.updateStudent);

  const { data: searchStudentsData, isLoading: searchStudentsIsLoading } =
    useSelector((state) => state.searchStudents);

  const { status: deleteStudentStatus, message: deleteStudentMessage } =
    useSelector((state) => state.deleteStudent);

  useEffect(() => {
    dispatch(getSchoolById(getStudentsByClassIdData?.Student[0].schoolId));
  }, [getStudentsByClassIdData]);

  const openEditModal = (subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedSubject(null);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const tableColumns = columns(openEditModal, t, params);

  const debouncedSearch = useCallback(debounce(searchStudent, 500), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      dispatch(getStudentsByClassId(params.tab));
    }
  }, [searchTerm]);

  console.log(getStudentsByClassIdData?.Student[0].schoolId, "School DETAİL");

  const handleUpdateStudent = async (formikValues) => {
    await dispatch(
      updateStudent({
        id: selectedSubject.StudentDetails.id,
        data: {
          studentName: formikValues.studentName,
          studentSurname: formikValues.studentSurname,
          studentNumber: formikValues.studentNumber,
          studentBirthDate: formikValues.studentBirthDate,
          parentName: formikValues.parentName,
          parentSurname: formikValues.parentSurname,
          parentPhoneNumber: formikValues.parentPhoneNumber,
          parentRelationship: formikValues.parentRelationship,
          parentEmail: formikValues.parentEmail,
          parentAddress: formikValues.parentAddress,
          studentGender: formikValues.studentGender,
          parentJob: formikValues.parentJob,
        },
      })
    );
    await dispatch(getStudentsByClassId(params.tab));
  };

  const handleSave = async (formikValues) => {
    await dispatch(
      addStudentToClass({
        classId: params.tab,
        schoolId: getStudentsByClassIdData.schoolId,
        data: {
          studentName: formikValues.studentName,
          studentSurname: formikValues.studentSurname,
          studentNumber: formikValues.studentNumber,
          studentBirthDate: formikValues.studentBirthDate,
          parentName: formikValues.parentName,
          parentSurname: formikValues.parentSurname,
          parentPhoneNumber: formikValues.parentPhoneNumber,
          parentRelationship: formikValues.parentRelationship,
          parentEmail: formikValues.parentEmail,
          parentAddress: formikValues.parentAddress,
          studentGender: formikValues.studentGender,
          parentJob: formikValues.parentJob,
        },
      })
    );
    await dispatch(getStudentsByClassId(params.tab));
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(searchStudentsData);
      setFilteredDataLoading(searchStudentsIsLoading);
    } else {
      setFilteredData(getStudentsByClassIdData?.Student);
      setFilteredDataLoading(getStudentsByClassIdIsLoading);
    }
  }, [
    searchTerm,
    searchStudentsData,
    searchStudentsIsLoading,
    getStudentsByClassIdData,
    getStudentsByClassIdIsLoading,
  ]);

  useToast(
    addStudentToClassStatus,
    resetAddStudentToClass(),
    addStudentToClassMessage,
    addStudentToClassMessage,
    dispatch
  );

  useToast(
    udpateStudentStatus,
    resetUpdateStudent(),
    udpateStudentMessage,
    udpateStudentMessage,
    dispatch
  );

  useToast(
    deleteStudentStatus,
    resetDeleteStudent(),
    deleteStudentMessage,
    deleteStudentMessage,
    dispatch
  );

  return (
    <div className="text-blue-950 w-full flex-col  ">
      <div className="flex justify-between">
        <h2 className="text-2xl py-3 px-4">{getStudentsByClassIdData?.name}</h2>
        <div className="flex my-auto gap-4">
          <div className="flex justify-end items-end w-full gap-4">
            <Search
              className="w-56 my-auto"
              placeholder="Search"
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="text-white flex items-center my-auto bg-[#315ef7] gap-2 rounded-lg py-0.5 px-5 hover:bg-blue-500 hover:shadow-lg duration-200 "
              onClick={() => setOpen(true)}
              type="primary"
            >
              <div className="text-2xl">
                <PlusCircleOutlined />
              </div>
              {t("newStudent")}
            </button>
          </div>
        </div>
      </div>
      <EditStudentModal
        open={isModalOpen}
        handleCancel={closeEditModal}
        handleSave={handleUpdateStudent}
        buttonLoading={udpateStudentIsLoading}
        studentData={selectedSubject}
      />
      <AddStudentToClassModalComp
        open={open}
        handleCancel={handleCancel}
        handleSave={handleSave}
        buttonLoading={addStudentToClassIsLoading}
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
          x: 1300,
          y: 450,
        }}
      />
    </div>
  );
};

export default StudentsPage;
