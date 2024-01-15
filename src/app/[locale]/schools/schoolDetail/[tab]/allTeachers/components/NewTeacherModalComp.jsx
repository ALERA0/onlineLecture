import { Button, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const NewTeacherModalComp = ({
  open,
  handleCancel,
  handleSave,
  buttonLoading,
}) => {
  const formikRef = React.useRef();
  const t = useTranslations("schools");
  const ct = useTranslations("schools.teacherModal");

  const { data: getSubjectsBySchoolIdData } = useSelector(
    (state) => state.getSubjectsBySchoolId
  );

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
      title={ct("newTeacher")}
      footer={null}
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          subjectId: "",
          phoneNumber: "",
          role: "TEACHER",
        }}
        validate={(values) => {
          const errors = {};
          // Validation rules
          if (!values.name) {
            errors.name = ct("teacherNameEmpty");
          } else if (values.name.length < 2) {
            errors.name = ct("teacherName2char");
          }
          if (!values.phoneNumber) {
            errors.phoneNumber = ct("teacherPhoneNumberNotEmpty");
          } else if (!/^\d+$/.test(values.phoneNumber)) {
            errors.phoneNumber = ct("teacherPhoneOnlyNumber"); 
          } else if (values.phoneNumber.length != 11) {
            errors.phoneNumber = ct("teacherPhone11Char");
          }
          if (!values.email) {
            errors.email = ct("teacherEmailEmpty");
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = ct("teacherEmailIsValid");
          }
          if (!values.password) {
            errors.password = ct("teacherPasswordEmpty");
          } else if (values.password.length < 2) {
            errors.password = ct("teacherPassword2char");
          }
          if (!values.subjectId) {
            errors.subjectId = ct("teacherLectureEmpty");
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSave(values);
          setSubmitting(false);
        }}
        innerRef={formikRef}
      >
        {({ isValid, dirty, resetForm, setFieldValue }) => (
          <Form>
            <div className="flex flex-col">
              <p>{t("teacherName")}</p>
              <Field
                type="text"
                name="name"
                as={Input}
                placeholder={t("teacherName")}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-700"
              />

              <p>{t("teacherEmail")}</p>
              <Field
                type="text"
                name="email"
                as={Input}
                placeholder={t("teacherEmail")}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-700"
              />

              <p>{t("lecturName")}</p>
              <Select
                onChange={(value) => setFieldValue("subjectId", value)}
                placeholder={t("lecturName")}
              >
                {getSubjectsBySchoolIdData.subjects.map((subject) => (
                  <Select.Option key={subject.id} value={subject.id}>
                    {subject.subjectName}
                  </Select.Option>
                ))}
              </Select>
              <ErrorMessage
                name="subjectId"
                component="div"
                className="text-red-700"
              />

              <p>{t("teacherPhoneNumber")}</p>
              <Field
                type="text"
                name="phoneNumber"
                as={Input}
                placeholder={t("teacherPhoneNumber")}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-700"
              />

              <p>{t("teacherPassword")}</p>
              <Field
                type="password"
                name="password"
                as={Input.Password}
                placeholder={t("teacherPassword")}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />

              {/* Role field is disabled and preset */}
            </div>
            <div className="flex justify-end mt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={buttonLoading}
                disabled={!isValid || !dirty}
              >
                {ct("teacherSave")}
              </Button>
              <Button
                onClick={onCancel}
                type="primary"
                danger
                className="border-none ml-2"
              >
                {ct("teacherCancel")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default NewTeacherModalComp;
