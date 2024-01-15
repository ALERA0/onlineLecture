"use client";

import { setUserId, setUserRole } from "@/redux/slice/session-slice";
import { verifyJwtToken } from "@/utils/auth";
import { getCookies } from "cookies-next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const t = useTranslations("headers");

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const cookies = getCookies();
      const token = cookies.token;
      try {
        if (token) {
          const verifiedToken = await verifyJwtToken(token);
          if (verifiedToken) {
            dispatch(setUserId(verifiedToken.payload.id));
            dispatch(setUserRole(verifiedToken.payload.roles));
          }
        }
      } catch (error) {
        throw error;
      }
    })();
  }, [dispatch, router]);

  return (
    <>
      

    </>
  );
};
export default HomePage;
