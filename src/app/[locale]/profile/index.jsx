"use client";

import { getAdminUserById, updateUserProfile } from "@/api";
import { useToast } from "@/components/ToastContainer/useToast";
import { resetUpdateUserProfile } from "@/redux/slice/user/profile/update-user-profile-slice";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const handleSave = async () => {
    await dispatch(updateUserProfile({ id: 2, data: data }));
  };

  const dispatch = useDispatch();
  const [data, setData] = useState({
    tcIdentity: "",
    city: "",
    birthDate: "",
    district: "",
    phoneNumber: "",
  });

  const { data: getAdminUserByIdData } = useSelector(
    (state) => state.getAdminUserById
  );

  const { isLoading: updateUserProfileIsLoading,status:updateUserProfileStatus } = useSelector(
    (state) => state.updateUserProfile
  );

  const formattedBirthDate = data.birthDate
    ? new Date(data.birthDate).toISOString().split("T")[0]
    : "";

  const handleBirthDateChange = (e) => {
    setData({
      ...data,
      birthDate: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getAdminUserById());
  }, []);

  useEffect(() => {
    setData({
      tcIdentity: getAdminUserByIdData?.tcIdentity,
      city: getAdminUserByIdData?.city,
      birthDate: getAdminUserByIdData?.birthDate,
      district: getAdminUserByIdData?.district,
      phoneNumber: getAdminUserByIdData?.phoneNumber,
    });
  }, [getAdminUserByIdData]);

  useToast(
    updateUserProfileStatus,
    resetUpdateUserProfile(),
    "Profiliniz başarıyla güncellendi",
    "Profiliniz Güncellenemedi",
    dispatch
  )

  return (
    <div className="flex flex-col w-full text-blue-950 justify-center items-center">
      <h2 className="font-bold text-3xl">Admin Profile Settings</h2>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 w-full mt-4 gap-6">
        <Input
          type="text"
          name="tcIdentity"
          placeholder="Tc Kimlik Numarası"
          className="col-span-1"
          value={data.tcIdentity}
          onChange={(event) =>
            setData({ ...data, tcIdentity: event.target.value })
          }
        />
        <Input
          type="text"
          name="city"
          placeholder="Şehir"
          className="col-span-1"
          value={data.city}
          onChange={(event) => setData({ ...data, city: event.target.value })}
        />
        <Input
          type="date"
          name="birthDate"
          placeholder="Şehir"
          className="col-span-1"
          value={formattedBirthDate}
          onChange={handleBirthDateChange}
        />
        <Input
          type="text"
          name="district"
          placeholder="İlçe"
          className="col-span-1"
          value={data.district}
          onChange={(event) =>
            setData({ ...data, district: event.target.value })
          }
        />
        <Input
          type="text"
          name="phoneNumber"
          placeholder="Telefon Numarası"
          className="col-span-1"
          value={data.phoneNumber}
          onChange={(event) =>
            setData({ ...data, phoneNumber: event.target.value })
          }
        />
      </div>
      <Button
        icon={<SaveOutlined />}
        type="primary"
        className="rounded-lg bg-[#1890FF] mt-4 "
        onClick={handleSave}
        loading={updateUserProfileIsLoading}
      >
        Kaydet
      </Button>
    </div>
  );
};

export default ProfilePage;
