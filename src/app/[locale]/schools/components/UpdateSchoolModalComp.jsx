import { Button, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {  useSelector } from "react-redux";
import { useTranslations } from "next-intl";


const UpdateSchoolModal = ({
  open,
  handleCancel,
  handleSave,
  buttonLoading,
  schoolData
}) => {

  const formikRef = React.useRef();
  const t = useTranslations("schools")
  const ct = useTranslations("schools.schoolModal")




  const { status: updateSchoolStatus } = useSelector(
    (state) => state.updateSchool
  );

  useEffect(() => {
    if (updateSchoolStatus === 200) {
      handleCancel();
      formikRef.current && formikRef.current.resetForm();
    }
  }, [updateSchoolStatus, handleCancel]);

  useEffect(() => {
    if (open && schoolData && formikRef.current) {
      formikRef.current.setValues({
        schoolName: schoolData.schoolName || '',
        schoolAddress: schoolData.schoolAddress || '',
        schoolPhone: schoolData.schoolPhone || '',
        schoolEmail: schoolData.schoolEmail || '',
      });
    }
  }, [schoolData, open]);

  const onCancel = () => {
    handleCancel();
    formikRef.current && formikRef.current.resetForm();
  };


  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={ct("editSchoolInfo")}
      footer={null}
    >
      <Formik
        initialValues={{
          schoolName: "",
          schoolAddress: "",
          schoolPhone: "",
          schoolEmail: "",
        }}
        validate={(values) => {
          const errors = {};

          // Name doğrulama kuralları
          if (!values.schoolName) {
            errors.schoolName = ct("schoolNameEmpty");
          } else if (values.schoolName.length < 2) {
            errors.schoolName = ct("schoolName2char");
          }

          // Email doğrulama kuralları
          if (!values.schoolEmail) {
            errors.schoolEmail = ct("schoolEmailEmpty");
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.schoolEmail)) {
            errors.schoolEmail = ct("schoolEmailIsValid");
          }

          if (!values.schoolPhone) {
            errors.schoolPhone = ct("schoolNumberEmpty");
          } else if (values.schoolPhone.length !== 11) {
            errors.schoolPhone = ct("schoolPhone11char");
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
              <p>{t("schoolName")}</p>
              <Field
                type="text"
                name="schoolName"
                as={Input}
                placeholder={t("schoolName")}
              />
              <ErrorMessage
                name="schoolName"
                component="div"
                className="text-red-700"
              />

              <p>{t("schoolEmail")}</p>
              <Field
                type="text"
                name="schoolEmail"
                as={Input}
                placeholder={t("schoolEmail")}
              />
              <ErrorMessage name="schoolEmail" component="div" className="text-red-700"/>

              <p>{t("schoolNumber")}</p>
              <Field
                type="text"
                name="schoolPhone"
                as={Input}
                placeholder={t("schoolNumber")}
              />
              <ErrorMessage
                name="schoolPhone"
                component="div"
                className="text-red-600"
              />

              <p>{t("schoolAddress")}</p>
              <Field
                type="text"
                name="schoolAddress"
                as={Input}
                placeholder={t("schoolAddress")}
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={buttonLoading}
                disabled={!isValid || !dirty} // isValid ve dirty özellikleri ile kontrol et
              >
                {ct("schoolSave")}
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
                {ct("schoolCancel")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateSchoolModal;
