import { Button, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { cities } from "@/lib/cities";

const EditDirectorModal = ({
  open,
  handleCancel,
  handleSave,
  buttonLoading,
  directorData,
}) => {
  const formikRef = React.useRef();
  const t = useTranslations("schools");
  const ct = useTranslations("schools.directorModal");
  const { status: updateDirectorStatus } = useSelector(
    (state) => state.updateDirector
  );

  useEffect(() => {
    if (updateDirectorStatus === 200) {
      handleCancel();
      formikRef.current && formikRef.current.resetForm();
    }
  }, [updateDirectorStatus, handleCancel]);

  useEffect(() => {
    if (open && directorData && formikRef.current) {
      formikRef.current.setValues({
        name: directorData.directorProfile.name || "",
        email: directorData.directorProfile.email || "",
        password: directorData.directorProfile.password || "",
        phoneNumber: directorData.directorProfile.phoneNumber || "",
        birthDate: directorData.directorProfile.birthDate || "",
        city: directorData.directorProfile.city || "",
        district: directorData.directorProfile.district || "",
      });
    }
  }, [directorData, open]);

  const onCancel = () => {
    handleCancel();
    formikRef.current && formikRef.current.resetForm();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={ct("updateDirector")}
      footer={null}
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          birthDate: "",
          city: "",
          district: "",
        }}
        validate={(values) => {
          const errors = {};

          // Name doğrulama kuralları
          if (!values.name) {
            errors.name = ct("directorNameEmpty");
          } else if (values.name.length < 2) {
            errors.name = ct("directorName2char");
          }

          // Email validation
          if (!values.email) {
            errors.email = ct("directorEmailEmpty");
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = ct("directorEmailIsValid");
          }

          // Password validation
          if (!values.password) {
            errors.password = ct("directorPasswordEmpty");
          } else if (values.password.length < 2) {
            errors.password = ct("directorPassword2char");
          }

          if (!values.phoneNumber) {
            errors.phoneNumber = ct("directorPhoneNumberNotEmpty");
          } else if (!/^\d+$/.test(values.phoneNumber)) {
            errors.phoneNumber = ct("directorPhoneOnlyNumber");
          } else if (values.phoneNumber.length != 11) {
            errors.phoneNumber = ct("directorPhone11Char");
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSave(values);
          setSubmitting(false);
        }}
        innerRef={formikRef}
      >
        {({ isValid, dirty, resetForm }) => (
          <Form>
            <div className="flex flex-col">
              <p>{t("directorName")}</p>
              <Field
                type="text"
                name="name"
                as={Input}
                placeholder={t("directorName")}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-700"
              />

              <p>{t("directorEmail")}</p>
              <Field
                type="text"
                name="email"
                as={Input}
                placeholder={t("directorEmail")}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-700"
              />

              <p>{t("directorPhoneNumber")}</p>
              <Field
                type="text"
                name="phoneNumber"
                as={Input}
                placeholder={t("directorPhoneNumber")}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-700"
              />

              <p>{t("directorPassword")}</p>
              <Field
                type="password"
                name="password"
                as={Input.Password}
                placeholder={t("directorPassword")}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />

              <p>{t("directorPhoneNumber")}</p>
              <Field
                type="date"
                name="birthDate"
                as={Input}
                placeholder={t("directorPhoneNumber")}
              />

              <p>{t("directorCity")}</p>
              <Select
                name="city"
                onChange={(value) => setFieldValue("city", value)}
                placeholder={t("city")}
                value={formikRef.current?.values.city}
              >
                {cities.map((city, index) => (
                  <Select.Option key={index} value={city}>
                    {city}
                  </Select.Option>
                ))}
              </Select>

              <p>{t("directorDistrict")}</p>
              <Field
                type="text"
                name="district"
                as={Input}
                placeholder={t("directorDistrict")}
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={buttonLoading}
                disabled={!isValid || !dirty} // isValid ve dirty özellikleri ile kontrol et
              >
                {t("save")}
              </Button>
              <Button
                onClick={() => {
                  handleCancel();
                  resetForm();
                }}
                type="primary"
                danger
                className="border-none ml-2"
              >
                {t("cancel")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditDirectorModal;
