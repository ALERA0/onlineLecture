"use client";

import {
  createSchool,
  getSchoolByOwnerId,
  searchSchools,
  updateSchool,
} from "@/api";
import { Button, Table } from "antd";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumn";
import { useState } from "react";
import {
  BackwardOutlined,
  LeftOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import NewSchoolModalComp from "./components/NewSchoolModalComp";
import { resetCreateSchool } from "@/redux/slice/user/scholl/create-school-slice";
import { useToast } from "@/components/ToastContainer/useToast";
import UpdateSchoolModal from "./components/UpdateSchoolModalComp";
import { resetUpdateSchool } from "@/redux/slice/user/scholl/update-school-slice";
import { useTranslations } from "next-intl";
import "./components/styles.css";
import Search from "antd/es/input/Search";
import { useRouter } from "@/navigation";

const SchoolsPage = () => {
  const t = useTranslations("schools");
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataLoading, setFilteredDataLoading] = useState(true);

  useEffect(() => {
    dispatch(getSchoolByOwnerId());
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

  const searchSchool = async (searchQuery) => {
    try {
      await dispatch(searchSchools(searchQuery));
    } catch (error) {
      console.error("Error during search:", error);
      // Handle error
    }
  };

  const debouncedSearch = useCallback(debounce(searchSchool, 500), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      dispatch(getSchoolByOwnerId());
    }
  }, [searchTerm]);

  const handleCancel = () => {
    setOpen(false);
  };

  const { status: createSchoolStatus, isLoading: createSchoolIsLoading } =
    useSelector((state) => state.createSchool);

  const { status: updateSchooltatus, isLoading: updateSchoolIsLoading } =
    useSelector((state) => state.updateSchool);

  const { data: getSchoolByIdData } = useSelector(
    (state) => state.getSchoolById
  );

  const { data: searchSchoolsData, isLoading: searchSchoolsIsLoading } =
    useSelector((state) => state.searchSchools);

  const {
    data: getSchoolByOwnerIdData,
    isLoading: getSchoolByOwnerIdIsLoading,
  } = useSelector((state) => state.getSchoolByOwnerId);

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(searchSchoolsData);
      setFilteredDataLoading(searchSchoolsIsLoading);
    } else {
      setFilteredData(getSchoolByOwnerIdData);
      setFilteredDataLoading(getSchoolByOwnerIdIsLoading);
    }
  }, [
    searchTerm,
    searchSchoolsData,
    getSchoolByOwnerIdData,
    searchSchoolsIsLoading,
    getSchoolByOwnerIdIsLoading,
  ]);

  const openEditModal = (school) => {
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedSchool(null);
  };

  const tableColumns = columns(openEditModal, t);

  const handleSave = async (formikValues) => {
    await dispatch(
      createSchool({
        schoolName: formikValues.schoolName,
        schoolAddress: formikValues.schoolAddress,
        schoolPhone: formikValues.schoolPhone,
        schoolEmail: formikValues.schoolEmail,
      })
    );
    await dispatch(getSchoolByOwnerId());
  };

  const handleUpdateSchool = async (formikValues) => {
    await dispatch(
      updateSchool({
        id: getSchoolByIdData.id,
        data: {
          schoolName: formikValues.schoolName,
          schoolAddress: formikValues.schoolAddress,
          schoolPhone: formikValues.schoolPhone,
          schoolEmail: formikValues.schoolEmail,
        },
      })
    );
    await dispatch(getSchoolByOwnerId());
  };

  useToast(
    createSchoolStatus,
    resetCreateSchool(),
    "Okul Başarıyla oluşturuldu",
    "Okul oluşturulamadı!",
    dispatch
  );

  useToast(
    updateSchooltatus,
    resetUpdateSchool(),
    "Okul Başarıyla güncellendi",
    "Okul güncellenemedi!",
    dispatch
  );

  return (
    <div className="flex flex-col text-black">
      <div className="flex justify-between py-4">
        <div className="flex gap-2 w-full">
          <Button
            icon={<LeftOutlined />}
            onClick={() => router.back()}
            className="rounded-full text-blue-600 text-lg flex justify-center items-center border-blue-600 my-auto"
          />
          <h2 className="flex  text-4xl  font-bold">{t("schoolInfo")}</h2>
        </div>
        <div className="flex   w-full">
          <div className="flex justify-end items-end w-full gap-4 ">
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
              {t("newSchool")}
            </button>
          </div>
        </div>
      </div>
      <UpdateSchoolModal
        open={isModalOpen}
        handleCancel={closeEditModal}
        handleSave={handleUpdateSchool}
        buttonLoading={updateSchoolIsLoading}
        schoolData={selectedSchool}
      />
      <NewSchoolModalComp
        open={open}
        handleCancel={handleCancel}
        handleSave={handleSave}
        buttonLoading={createSchoolIsLoading}
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
          x: 1500,
          y: 500,
        }}
      />
    </div>
  );
};

export default SchoolsPage;
