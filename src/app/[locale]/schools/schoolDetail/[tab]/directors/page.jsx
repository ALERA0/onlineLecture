"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumns";
import {
  createSchoolStaff,
  getDirectorsBySchoolId,
  getSchoolById,
  searchDirectors,
  updateDirector,
} from "@/api";
import { resetCreateSchoolStaff } from "@/redux/slice/user/scholl/create-school-staff-slice";
import NewDirectorModalComp from "./components/NewDirectorModalComp";
import { useToast } from "@/components/ToastContainer/useToast";
import { useTranslations } from "next-intl";
import Search from "antd/es/input/Search";
import "./components/styles.css";
import EditDirectorModal from "./components/EditDirectorModalComp";
import { resetUpdateDirector } from "@/redux/slice/user/scholl/update-director-slice";

const DirectorsPage = ({ params }) => {
  const [open, setOpen] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataLoading, setFilteredDataLoading] = useState(true);

  const dispatch = useDispatch();
  const t = useTranslations("schools");

  const openEditModal = (subject) => {
    setSelectedDirector(subject);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedDirector(null);
  };

  useEffect(() => {
    dispatch(getDirectorsBySchoolId(params.tab));
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

  const searchDirector = async (searchQuery) => {
    try {
      await dispatch(
        searchDirectors({ id: params.tab, searchQuery: searchQuery })
      );
    } catch (error) {
      console.error("Error during search:", error);
      // Handle error
    }
  };

  const debouncedSearch = useCallback(debounce(searchDirector, 500), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      dispatch(getDirectorsBySchoolId(params.tab));
    }
  }, [searchTerm]);

  const {
    data: getDirectorsBySchoolIdData,
    isLoading: getDirectorsBySchoolIdIsLoading,
  } = useSelector((state) => state.getDirectorsBySchoolId);

  const { data: searchDirectorData, isLoading: searchDirectorIsLoading } =
    useSelector((state) => state.searchDirectors);

  const {
    status: createSchoolStaffStatus,
    isLoading: createSchoolStaffIsLoading,
  } = useSelector((state) => state.createSchoolStaff);

  const { status: updateDirectorStatus, isLoading: updateDirectorIsLoading } =
    useSelector((state) => state.updateDirector);

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(searchDirectorData);
      setFilteredDataLoading(searchDirectorIsLoading);
    } else {
      setFilteredData(getDirectorsBySchoolIdData?.directorsInformation);
      setFilteredDataLoading(getDirectorsBySchoolIdIsLoading);
    }
  }, [
    searchTerm,
    searchDirectorData,
    searchDirectorIsLoading,
    getDirectorsBySchoolIdData,
    getDirectorsBySchoolIdIsLoading,
  ]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleUpdateDirector = async (formikValues) => {
    await dispatch(
      updateDirector({
        id: selectedDirector.id,
        data: {
          name: formikValues.name,
          email: formikValues.email,
          password: formikValues.password,
          phoneNumber: formikValues.phoneNumber,
          birthDate: formikValues.birthDate,
          city: formikValues.city,
          district: formikValues.district,
        },
      })
    );
    await dispatch(getDirectorsBySchoolId(params.tab));
  };

  const handleSave = async (formikValues) => {
    await dispatch(
      createSchoolStaff({
        id: params.tab,
        data: {
          name: formikValues.name,
          email: formikValues.email,
          password: formikValues.password,
          role: "DIRECTOR",
          phoneNumber: formikValues.phoneNumber,
        },
      })
    );
    await dispatch(getDirectorsBySchoolId(params.tab));
  };

  const tableColumns = columns(openEditModal, t, params);

  useToast(
    createSchoolStaffStatus,
    resetCreateSchoolStaff(),
    "Yönetici Başarıyla Oluşturuldu",
    "Yönetici oluşturulamadı!",
    dispatch
  );

  useToast(
    updateDirectorStatus,
    resetUpdateDirector(),
    "Yönetici Başarıyla Güncellendi",
    "Yönetici güncellenemedi!",
    dispatch
  );

  return (
    <div className="text-blue-950 w-full flex-col  ">
      <div className="flex justify-between mb-3 w-full">
        <h2 className="text-2xl py-2 px-4 w-full text-start">
          {
            getDirectorsBySchoolIdData?.schoolInformation.SchoolDetails
              .schoolName
          }
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
              onClick={() => setOpen(true)}
              type="primary"
            >
              <div className="text-2xl">
                <PlusCircleOutlined />
              </div>
              {t("newDirector")}
            </button>
          </div>
        </div>
      </div>
      <EditDirectorModal
        open={isModalOpen}
        handleCancel={closeEditModal}
        handleSave={handleUpdateDirector}
        buttonLoading={updateDirectorIsLoading}
        directorData={selectedDirector}
      />
      <NewDirectorModalComp
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
          // y: 800,
        }}
      />
    </div>
  );
};

export default DirectorsPage;
