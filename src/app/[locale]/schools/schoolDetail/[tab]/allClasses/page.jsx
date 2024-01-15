"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumns";
import {
  createSchoolClass,
  getClassesBySchoolId,
  getSchoolById,
  searchClass,
  updateClass,
} from "@/api";
import NewClassModalComp from "./components/NewClassModalComp";
import { resetCreateSchoolClass } from "@/redux/slice/user/scholl/create-school-class-slice";
import { useToast } from "@/components/ToastContainer/useToast";
import { useTranslations } from "next-intl";
import Search from "antd/es/input/Search";
import "./components/styles.css";
import EditClassModalComp from "./components/EditClassModalComp";
import { resetUpdateClass } from "@/redux/slice/user/scholl/update-class-slice";

const AllClassesPage = ({ params }) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingFormikValues, setPendingFormikValues] = useState(null);
  const [saveAttempt, setSaveAttempt] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataLoading, setFilteredDataLoading] = useState(true);

  const dispatch = useDispatch();
  const t = useTranslations("schools");

  useEffect(() => {
    dispatch(getClassesBySchoolId(params.tab));
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

  const searchClasses = async (searchQuery) => {
    try {
      await dispatch(searchClass({ id: params.tab, searchQuery: searchQuery }));
    } catch (error) {
      console.error("Error during search:", error);
      // Handle error
    }
  };

  const {
    data: getClassesBySchoolIdData,
    isLoading: getClassesBySchoolIdIsLoading,
  } = useSelector((state) => state.getClassesBySchoolId);

  const {
    status: updateClassStatus,
    isLoading: updateClassIsLoading,
    message: updateClassMessage,
  } = useSelector((state) => state.updateClass);

  const {
    status: createSchoolClassStatus,
    isLoading: createSchoolClassIsLoading,
    message: createSchoolClassMessage,
  } = useSelector((state) => state.createSchoolClass);

  const { data: searchClassData, isLoading: searchClassIsLoading } =
    useSelector((state) => state.searchClass);

  const handleCancel = () => {
    setOpen(false);
  };

  const debouncedSearch = useCallback(debounce(searchClasses, 500), []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(searchClassData);
      setFilteredDataLoading(searchClassIsLoading);
    } else {
      setFilteredData(getClassesBySchoolIdData?.classes);
      setFilteredDataLoading(getClassesBySchoolIdIsLoading);
    }
  }, [
    searchTerm,
    searchClassData,
    searchClassIsLoading,
    getClassesBySchoolIdData,
    getClassesBySchoolIdIsLoading,
  ]);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      dispatch(getClassesBySchoolId(params.tab));
    }
  }, [searchTerm]);

  const handleSave = async (formikValues) => {
    setPendingFormikValues(formikValues);

    const payload = {
      className: formikValues.className,
      classGradeLevel: formikValues.classGradeLevel,
      forceCreate: false,
    };

    if (formikValues.classDescription !== "") {
      payload.classDescription = formikValues.classDescription;
    }

    await dispatch(
      createSchoolClass({
        id: params.tab,
        data: payload,
      })
    );
    setSaveAttempt((prev) => prev + 1);
    await dispatch(getClassesBySchoolId(params.tab));
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

  const handleUpdateClass = async (formikValues) => {
    console.log(formikValues, "FORMİK VALUES");
    await dispatch(
      updateClass({
        id: selectedSubject.id,
        data: {
          name: formikValues.className || "",
          description: formikValues.classDescription || "",
          gradeLevel: formikValues.classGradeLevel || "",
        },
      })
    );
    await dispatch(getClassesBySchoolId(params.tab));
  };

  const handleForceSave = async () => {
    if (pendingFormikValues) {
      const payload = {
        className: pendingFormikValues.className,
        classGradeLevel: pendingFormikValues.classGradeLevel,
        forceCreate: true,
      };

      if (pendingFormikValues.classDescription !== "") {
        payload.classDescription = pendingFormikValues.classDescription;
      }

      await dispatch(
        createSchoolClass({
          id: params.tab,
          data: payload,
        })
      );
      await dispatch(getClassesBySchoolId(params.tab));
      setSaveAttempt((prev) => prev + 1);
      setPendingFormikValues(null);
      setConfirmOpen(false);
    }
  };

  const showModalConfirmModal = () => {
    if (createSchoolClassStatus === 409 && !confirmOpen) {
      setConfirmOpen(true);
      Modal.confirm({
        open: confirmOpen,
        title: t("classExistsTitle"),
        content: t("classExistsMessage"),
        onOk: handleForceSave,
        onCancel: () => {
          setPendingFormikValues(null),
            setConfirmOpen(false),
            dispatch(resetCreateSchoolClass());
        },
      });
    }
  };

  useEffect(() => {
    showModalConfirmModal();
    // Reset confirmOpen for other statuses
  }, [createSchoolClassStatus, saveAttempt]);

  useToast(
    createSchoolClassStatus,
    resetCreateSchoolClass(),
    createSchoolClassMessage,
    createSchoolClassMessage,
    dispatch
  );

  useToast(
    updateClassStatus,
    resetUpdateClass(),
    updateClassMessage,
    updateClassMessage,
    dispatch
  );

  return (
    <div className="text-blue-950 w-full flex-col  ">
      <div className="flex justify-between">
        <h2 className="text-2xl py-3 px-4">
          {getClassesBySchoolIdData?.schoolDetails.schoolName}
        </h2>
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
              {t("newClass")}
            </button>
          </div>
        </div>
      </div>
      <EditClassModalComp
        open={isModalOpen}
        handleCancel={closeEditModal}
        handleSave={handleUpdateClass}
        buttonLoading={updateClassIsLoading}
        classData={selectedSubject}
      />
      <NewClassModalComp
        open={open}
        handleCancel={handleCancel}
        handleSave={handleSave}
        buttonLoading={createSchoolClassIsLoading}
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
          // y: 800,
        }}
      />
    </div>
  );
};

export default AllClassesPage;
