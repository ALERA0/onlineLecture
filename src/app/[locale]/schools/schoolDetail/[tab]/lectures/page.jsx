"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubject,
  getSchoolById,
  getSubjectsBySchoolId,
  searchSubject,
  updateSubject,
} from "@/api";
import { useToast } from "@/components/ToastContainer/useToast";
import { columns } from "./components/tableColumns";
import NewLectureModal from "./components/NewLectureModal";
import { resetCreateSubject } from "@/redux/slice/user/subject/create-subject-slice";
import EditLectureModal from "./components/EditLectureModal";
import { resetUpdateSubject } from "@/redux/slice/user/subject/update-subject-by-school-id-slice";
import { useTranslations } from "next-intl";
import { resetDeleteSubject } from "@/redux/slice/user/subject/delete-subject-slice";
import Search from "antd/es/input/Search";
import "./components/styles.css";

const LecturesPage = ({ params }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const t = useTranslations("schools");

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataLoading, setFilteredDataLoading] = useState(true);

  useEffect(() => {
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

  const searchSubjects = async (searchQuery) => {
    try {
      await dispatch(
        searchSubject({ id: params.tab, searchQuery: searchQuery })
      );
    } catch (error) {
      console.error("Error during search:", error);
      // Handle error
    }
  };

  const { status: updateSubjectStatus, isLoading: updateSubjectIsLoading } =
    useSelector((state) => state.updateSubject);

  const { status: deleteSubjectStatus } = useSelector(
    (state) => state.deleteSubject
  );

  const {
    data: getSubjectsBySchoolIdData,
    isLoading: getSubjectsBySchoolIdIsLoading,
  } = useSelector((state) => state.getSubjectsBySchoolId);

  const { status: createSubjectStatus, isLoading: createSubjectIsLoading } =
    useSelector((state) => state.createSubject);

  const { data: searchSubjectData, isLoading: searchSubjectIsLoading } =
    useSelector((state) => state.searchSubject);

  const handleCancel = () => {
    setOpen(false);
  };

  const debouncedSearch = useCallback(debounce(searchSubjects, 500), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      dispatch(getSubjectsBySchoolId(params.tab));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(searchSubjectData);
      setFilteredDataLoading(searchSubjectIsLoading);
    } else {
      setFilteredData(getSubjectsBySchoolIdData?.subjects);
      setFilteredDataLoading(getSubjectsBySchoolIdIsLoading);
    }
  }, [
    searchTerm,
    searchSubjectData,
    searchSubjectIsLoading,
    getSubjectsBySchoolIdData,
    getSubjectsBySchoolIdIsLoading,
  ]);

  const openEditModal = (subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedSubject(null);
  };

  const handleUpdateSubject = async (formikValues) => {
    await dispatch(
      updateSubject({
        id: selectedSubject.id,
        data: {
          subjectName: formikValues.subjectName,
          subjectDescription: formikValues.subjectDescription,
        },
      })
    );
    await dispatch(getSubjectsBySchoolId(params.tab));
  };

  const tableColumns = columns(openEditModal, t, params);

  const handleSave = async (formikValues) => {
    await dispatch(
      createSubject({
        id: params.tab,
        data: {
          subjectName: formikValues.subjectName,
          subjectDescription: formikValues.subjectDescription,
        },
      })
    );
    await dispatch(getSubjectsBySchoolId(params.tab));
  };

  useToast(
    createSubjectStatus,
    resetCreateSubject(),
    "Ders Başarıyla Oluşturuldu",
    "Ders oluşturulamadı!",
    dispatch
  );

  useToast(
    updateSubjectStatus,
    resetUpdateSubject(),
    "Ders Başarıyla Güncellendi",
    "Ders güncellenemedi!",
    dispatch
  );

  useToast(
    deleteSubjectStatus,
    resetDeleteSubject(),
    "Ders Başarıyla Silindi",
    "Ders silinemedi!",
    dispatch
  );

  return (
    <div className="text-blue-950 w-full flex-col  ">
      <div className="flex justify-between">
        <h2 className="text-2xl py-3 px-4">
          {getSubjectsBySchoolIdData?.schoolDetails.schoolName}{" "}
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
              onClick={() => setOpen(true)}
              type="primary"
            >
              <div className="text-2xl">
                <PlusCircleOutlined />
              </div>
              {t("newLecture")}
            </button>
          </div>
        </div>
      </div>
      <EditLectureModal
        open={isModalOpen}
        handleCancel={closeEditModal}
        handleSave={handleUpdateSubject}
        buttonLoading={updateSubjectIsLoading}
        subjectData={selectedSubject}
      />
      <NewLectureModal
        open={open}
        handleCancel={handleCancel}
        handleSave={handleSave}
        buttonLoading={createSubjectIsLoading}
      />
      <Table
        loading={getSubjectsBySchoolIdIsLoading}
        className="custom-table"
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-row-odd" : "bg-row-even"
        }
        columns={tableColumns}
        dataSource={getSubjectsBySchoolIdData?.subjects}
        scroll={{
          x: 800,
          y: 400,
        }}
      />
    </div>
  );
};

export default LecturesPage;
