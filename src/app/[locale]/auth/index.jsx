"use client";

import React, { useEffect, useState } from "react";
import inventory from "../../../../public/images/logo.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ToastContainer/useToast";
import { useRouter } from "next/navigation";
import { authUserLogin } from "@/api";
import { Button, Input } from "antd";
import { resetAuthUserLogin } from "@/redux/slice/user/auth/auth-user-login-slice";
import dersigoIMG from "../../../../public/images/aa1.png";
import logo from "../../../../public/images/kurumsal.svg";

const AuthPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { status: authUserLoginStatus, isLoading: authUserLoginIsLoading } =
    useSelector((state) => state.authUserLogin);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    await dispatch(authUserLogin({ email, password }));
  };

  useToast(
    authUserLoginStatus,
    resetAuthUserLogin(),
    "Giriş işlemi başarılı",
    "Giriş işlemi yapılamadı",
    dispatch
  );

  useEffect(() => {
    if (authUserLoginStatus === 200) {
      router.push("/");
    }
  }, [authUserLoginStatus]);

  return (
    <div className="w-full h-screen  flex justify-center items-center  ">
      <div className="w-full  h-full py-24 flex justify-center items-center  bg-[#eff3ff] ">
        <div className="grid grid-cols-4 h-full bg-white px-8 py-6 rounded-2xl">
          <div className="w-full lg:col-span-2  lg:flex hidden justify-center items-center rounded-xl ">
            <Image
              src={dersigoIMG}
              className=" w-full object-contain hidden h-full   lg:flex justify-center items-center rounded-2xl "
              alt="inventory"
            />
          </div>
          <div className="w-full lg:col-span-2 col-span-4 h-full flex flex-col   lg:px-6 py-20">
            <div className="px-12 flex flex-col justify-between h-full   gap-6 items-center">
              <Image src={logo} alt="logo" width={220} />

              <div className="flex flex-col items-center px-6 w-4/5 gap-6">
                <h2 className="text-4xl font-bold text-[#315ef7] mb-8 ">
                  Kullanıcı Girişi
                </h2>
                <Input
                  className="w-full h-12 rounded-lg  pl-4 shadow-lg   "
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input.Password
                  className="w-full h-12 rounded-lg  pl-4 shadow-lg  "
                  type="password"
                  placeholder="Şifre"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="px-9 h-12 rounded-3xl duration-300  bg-[#315ef7] text-white text-center cursor-pointer flex justify-center font-bold  items-center hover:bg-blue-500 "
                  onClick={handleLogin}
                >
                  Giriş Yap
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
