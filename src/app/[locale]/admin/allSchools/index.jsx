"use client";

import {  getAllSchools, getSchoolByOwnerId } from "@/api";
import {  Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumn";


const SchoolsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSchools());
  }, []);

  const {
    data: getAllSchoolsData,
    isLoading: getAllSchoolsIsLoading,
  } = useSelector((state) => state.getAllSchools);

  return (
    <div className="flex flex-col text-black">
      <div className="flex justify-between py-4">
        <h2 className="flex  text-4xl  font-bold">Tüm Okullar</h2>
      </div>

      <Table
        loading={getAllSchoolsIsLoading}
        columns={columns}
        dataSource={getAllSchoolsData}
        scroll={{
          x: 1500,
          y: 300,
        }}
      />
    </div>
  );
};

export default SchoolsPage;
