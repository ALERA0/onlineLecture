"use client";

import React, { useEffect, useState } from "react";
import inventory from "../../../../../public/images/logo.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { authAdminLogin, authAdminRegister, getAllUsers } from "../../../../api";
import { resetAuth } from "@/redux/slice/admin/auth/auth-admin-login-slice";
import { useToast } from "@/components/ToastContainer/useToast";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { status: authAdminLoginStatus } = useSelector(
    (state) => state.authAdminLogin
  );

  // const { status: authAdminLoginStatus } = useSelector(
  //   (state) => state.authAdminRegister
  // );

  const [username, setUsername] = useState("tariktestAdmin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [registerOrLogin, setRegisterOrLogin] = useState(false);

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };



  const handleregisterOrLogin = () => {
    setRegisterOrLogin(!registerOrLogin);
    setEmail("");
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (authAdminLoginStatus === 200) {
      router.push("/");
    }
  }, [authAdminLoginStatus, router]);

  const handleLogin = async () => {
    if (!registerOrLogin) {
      await dispatch(authAdminLogin({ email, password }));
    } else {
        dispatch(
          authAdminRegister({
            email: email,
            password: password,
            name: username,
            adminInviteCode: inviteCode,
          })
        );
    }
  };

  useToast(
    authAdminLoginStatus,
    resetAuth(),
    "Giriş işlemi başarılı",
    "Giriş bilgileri hatalı",
    dispatch
  );

  

  return (
    <div className="w-full h-screen  flex justify-center items-center  ">
      <div className="w-full  h-full py-24 lg:px-12 md:px-6 px-2 flex justify-center items-center  bg-[#DEE3F0] ">
        <div className="flex bg-white rounded-2xl shadow-xl">
          <div className="w-full lg:col-span-1 col-span-3 h-full flex flex-col   lg:px-6 py-8 text-blue-950">
            <div className="px-20">
              <Image src={inventory} alt="inventory" className="w-72" />
            </div>

            <h2 className="text-center lg:text-3xl md:text-2xl text-xl font-bold  xl:pt-8 lg:pt-6 md:pt-4 pt-2 ">
              Dersigo Kurum
            </h2>
            <div className="h-4/5 w-full flex flex-col lg:pt-28 2xl:px-8 md:pt-14 lg:px-2 pt-10 px-2 gap-4 items-center">
              <h2 className="lg:text-4xl text-center w-full  md:text-2xl text-xl font-bold">
                Hoşgeldiniz
              </h2>
              <p className="text-lg font-semibold">
                {!registerOrLogin
                  ? "Lütfen Giriş Yapınız"
                  : "Lütfen Kayıt Olunuz"}
              </p>
              {registerOrLogin && (
                <input
                  className="w-full h-12 rounded-lg border-2 pl-4 border-gray-300 "
                  type="text"
                  placeholder="Kullanıcı Adı"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
              <input
                className="w-full h-12 rounded-lg border-2 pl-4 border-gray-300 "
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="w-full h-12 rounded-lg border-2 pl-4 border-gray-300 "
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {registerOrLogin && (
                <input
                  className="w-full h-12 rounded-lg border-2 pl-4 border-gray-300 "
                  type="text"
                  placeholder="Davet Kodu"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                />
              )}
              <div
                onClick={handleregisterOrLogin}
                className="cursor-pointer hover:text-blue-500 duration-200 flex flex-col text-center"
              >
                {!registerOrLogin ? (
                  <div>
                    <h2>Henüz bir hesabınız yok mu ?</h2>
                    <h2>Kayıt Ol</h2>
                  </div>
                ) : (
                  <div>
                    <h2>Hesabınız var mı ?</h2>
                    <h2>Giriş Yap</h2>
                  </div>
                )}
              </div>
              <button
                className="w-full h-12 rounded-lg duration-300 hover:text-[#000E36] bg-[#000E36] text-white text-center cursor-pointer flex justify-center font-bold hover:bg-[#FF8A00] items-center"
                onClick={handleLogin}
              >
                {registerOrLogin ? "Kayıt Ol" : "Giriş Yap"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
