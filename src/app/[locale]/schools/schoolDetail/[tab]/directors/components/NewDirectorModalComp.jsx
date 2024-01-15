import React, { useEffect, useRef } from "react";
import { Modal, Button, Input } from "antd";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const NewDirectorModalComp = ({
  open,
  handleCancel,
  handleSave,
  buttonLoading,
}) => {
  const formikRef = useRef();
  const t = useTranslations("schools");
  const ct = useTranslations("schools.directorModal");

  const { status: createSchoolStaffStatus } = useSelector(
    (state) => state.createSchoolStaff
  );

  useEffect(() => {
    if (createSchoolStaffStatus === 200) {
      handleCancel();
      formikRef.current && formikRef.current.resetForm();
    }
  }, [createSchoolStaffStatus, handleCancel]);

  const onCancel = () => {
    handleCancel();
    formikRef.current && formikRef.current.resetForm();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={ct("newDirector")}
      footer={null}
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          role: "DIRECTOR",
          phoneNumber: "",
        }}
        validate={(values) => {
          const errors = {};

          // Name validation
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
        {({ isValid, dirty }) => (
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
            </div>

            <div className="flex justify-end mt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={buttonLoading}
                disabled={!isValid || !dirty}
              >
                {ct("directorSave")}
              </Button>
              <Button
                onClick={() => {
                  handleCancel();
                  formikRef.current && formikRef.current.resetForm();
                }}
                type="primary"
                danger
                className="border-none ml-2"
              >
                {ct("directorCancel")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default NewDirectorModalComp;
