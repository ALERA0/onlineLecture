"use client";
import { createUserByAdmin, getAllUsers } from "@/api";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumn";
import { PlusCircleOutlined } from "@ant-design/icons";
import NewUserModalComp from "./components/newUserModalComp";
import { resetCreateUserByAdmin } from "@/redux/slice/admin/users/create-user-by-admin-slice";
import { useToast } from "@/components/ToastContainer/useToast";

const AllUsersPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const { data: getAllUsersData, isLoading: getAllUsersIsLoading } =
    useSelector((state) => state.getAllUsers);

  const { status: createUserByAdminStatus , isLoading:createUserByAdminIsLoading} = useSelector(
    (state) => state.createUserByAdmin
  );

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });



  const handleSave = async () => {
    if (isValidEmail(data.email) && data.password.length > 2) {
      await dispatch(
        createUserByAdmin({
          name: data.userName,
          email: data.email,
          password: data.password,
        })
      );}
  };
  const handleCancel = () => {
    setOpen(false);
  };



  useEffect(() => {
    if (createUserByAdminStatus === 200) {
      setOpen(false);
    }
  }, [createUserByAdminStatus]);

  useToast(
    createUserByAdminStatus,
    resetCreateUserByAdmin(),
    "Kullanıcı oluşturuldu",
    "Kullanıcı bilgileri hatalı",
    dispatch
  );

  return (
    <div className="flex flex-col text-black">
      <div className="flex justify-between py-4">
        <h2 className="flex  text-4xl  font-bold">Kullanıcılar</h2>
        <Button
          icon={<PlusCircleOutlined />}
          className="text-lg flex items-center"
          onClick={() => setOpen(true)}
          type="primary"
        >
          Yeni Kullanıcı Ekle
        </Button>
      </div>
      <NewUserModalComp
        open={open}
        handleCancel={handleCancel}
        data={data}
        setData={setData}
        handleSave={handleSave}
        buttonLoading={createUserByAdminIsLoading}
      />
      <Table
        loading={getAllUsersIsLoading}
        columns={columns}
        dataSource={getAllUsersData}
        scroll={{
          x: 1500,
          y: 300,
        }}
      />
    </div>
  );
};

export default AllUsersPage;
