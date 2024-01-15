import { Button, Input, Modal, Select } from "antd";
import React, { useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const EditStudentModal = ({
  open,
  handleCancel,
  handleSave,
  buttonLoading,
  studentData,
}) => {
  const formikRef = useRef();
  const t = useTranslations("classDetail");
  const ct = useTranslations("classDetail.studentModal");

  const { status: updateStudentStatus } = useSelector(
    (state) => state.updateStudent
  );

  useEffect(() => {
    if (updateStudentStatus === 200) {
      handleCancel();
      formikRef.current && formikRef.current.resetForm();
    }
  }, [updateStudentStatus, handleCancel]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    console.log(studentData);
    if (open && studentData && formikRef.current) {
      formikRef.current.setValues({
        studentName: studentData.StudentDetails.studentName || "",
        studentSurname: studentData.StudentDetails.studentSurname || "",
        studentNumber: studentData.StudentDetails.studentNumber || "",
        studentBirthDate:
          formatDate(studentData.StudentDetails.studentBirthDate) || "",
        studentGender: studentData.StudentDetails.studentGender || "",
        parentSurname: studentData.Parents[0].parentSurname || "",
        parentName: studentData.Parents[0].parentName || "",
        parentJob: studentData.Parents[0].parentJob || "",
        parentRelationship: studentData.Parents[0].parentRelationship || "",
        parentEmail: studentData.Parents[0].parentEmail || "",
        parentAddress: studentData.Parents[0].parentAddress || "",
        studentGender: studentData.Parents[0].studentGender || "",
        parentPhoneNumber: studentData.Parents[0].parentPhoneNumber || "",
      });
    }
  }, [studentData, open]);

  const onCancel = () => {
    handleCancel();
    formikRef.current && formikRef.current.resetForm();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={ct("newStudent")}
      footer={null}
    >
      <Formik
        initialValues={{
          studentName: "",
          studentSurname: "",
          studentNumber: "",
          studentBirthDate: "",
          parentName: "",
          parentSurname: "",
          parentRelationship: "",
          parentEmail: "",
          parentAddress: "",
          studentGender: "",
          parentPhoneNumber: "",
          parentJob: "",
        }}
        validate={(values) => {
          const errors = {};
          // Validation logic
          if (!values.studentName) {
            errors.studentName = ct("studentNameEmpty");
          }
          if (!values.studentSurname) {
            errors.studentSurname = ct("studentSurnameEmpty");
          }
          if (!values.studentNumber) {
            errors.studentNumber = ct("studentNumberEmpty");
          }
          if (!values.studentBirthDate) {
            errors.studentBirthDate = ct("studentBirthDateEmpty");
          }
          if (!values.parentPhoneNumber) {
            errors.parentPhoneNumber = ct("studentParentNumberEmpty");
          } else if (!/^\d+$/.test(values.parentPhoneNumber)) {
            errors.parentPhoneNumber = ct("parentPhoneOnlyNumber");
          } else if (values.parentPhoneNumber.length !== 11) {
            errors.parentPhoneNumber = ct("studentParentNumber11char");
          }
          if (!values.parentName) {
            errors.parentName = ct("parentNameEmpty");
          } else if (values.parentName.length < 2) {
            errors.parentName = ct("parentName2char");
          }
          if (!values.parentSurname) {
            errors.parentSurname = ct("parentSurnameEmpty");
          } else if (values.parentSurname.length < 2) {
            errors.parentSurname = ct("parentSurname2char");
          }
          if (!values.parentRelationship) {
            errors.parentRelationship = ct("parentRelationshipEmpty");
          } else if (values.parentRelationship.length < 2) {
            errors.parentRelationship = ct("parentRelationship2char");
          }
          if (!values.parentEmail) {
            errors.parentEmail = ct("parentEmailEmpty");
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.parentEmail)) {
            errors.parentEmail = ct("parentEmailIsValid");
          }
          if (!values.parentAddress) {
            errors.parentAddress = ct("parentAddressEmpty");
          }
          if (!values.studentGender) {
            errors.studentGender = ct("studentGenderEmpty");
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSave(values);
          setSubmitting(false);
        }}
        innerRef={formikRef}
      >
        {({ isValid, dirty, setFieldValue }) => (
          <Form>
            <div className="flex flex-col">
              <p>{t("studentName")}</p>
              <Field
                type="text"
                name="studentName"
                as={Input}
                placeholder={t("studentName")}
              />
              <ErrorMessage
                name="studentName"
                component="div"
                className="text-red-700"
              />

              <p>{t("studentSurname")}</p>
              <Field
                type="text"
                name="studentSurname"
                as={Input}
                placeholder={t("studentSurname")}
              />
              <ErrorMessage
                name="studentSurname"
                component="div"
                className="text-red-700"
              />

              <p>{t("studentNo")}</p>
              <Field
                type="text"
                name="studentNumber"
                as={Input}
                placeholder={t("studentNo")}
              />
              <ErrorMessage
                name="studentNumber"
                component="div"
                className="text-red-700"
              />

              <p>{t("studentBirthDate")}</p>
              <Field
                type="date"
                name="studentBirthDate"
                as={Input}
                placeholder={t("studentBirthDate")}
              />
              <ErrorMessage
                name="studentBirthDate"
                component="div"
                className="text-red-700"
              />

              <p>{t("studentGender")}</p>
              <Field name="studentGender">
                {({ field }) => (
                  <Select
                    {...field}
                    onChange={(value) => setFieldValue("studentGender", value)}
                    placeholder={t("studentGender")}
                    value={
                      formikRef.current
                        ? formikRef.current.values.studentGender
                        : ""
                    }
                  >
                    <Select.Option value="E">{t("male")}</Select.Option>
                    <Select.Option value="K">{t("female")}</Select.Option>
                  </Select>
                )}
              </Field>

              <ErrorMessage
                name="studentGender"
                component="div"
                className="text-red-700"
              />

              <p>{t("parentName")}</p>
              <Field
                type="text"
                name="parentName"
                as={Input}
                placeholder={t("parentName")}
              />
              <ErrorMessage
                name="parentName"
                component="div"
                className="text-red-700"
              />

              <p>{t("parentSurname")}</p>
              <Field
                type="text"
                name="parentSurname"
                as={Input}
                placeholder={t("parentSurname")}
              />
              <ErrorMessage
                name="parentSurname"
                component="div"
                className="text-red-700"
              />

              <p>{t("parentNumber")}</p>
              <Field
                type="text"
                name="parentPhoneNumber"
                as={Input}
                placeholder={t("parentNumber")}
              />
              <ErrorMessage
                name="parentPhoneNumber"
                component="div"
                className="text-red-700"
              />

              <p>{t("parentRelationship")}</p>
              <Field
                type="text"
                name="parentRelationship"
                as={Input}
                placeholder={t("parentRelationship")}
              />
              <ErrorMessage
                name="parentRelationship"
                component="div"
                className="text-red-700"
              />

              <p>{t("parentEmail")}</p>
              <Field
                type="text"
                name="parentEmail"
                as={Input}
                placeholder={t("parentEmail")}
              />
              <ErrorMessage
                name="parentEmail"
                component="div"
                className="text-red-700"
              />

              <p>{t("parentJob")}</p>
              <Field
                type="text"
                name="parentJob"
                as={Input}
                placeholder={t("parentJob")}
              />

              <p>{t("parentAddress")}</p>
              <Field
                type="text"
                name="parentAddress"
                as={Input}
                placeholder={t("parentAddress")}
              />
              <ErrorMessage
                name="parentAddress"
                component="div"
                className="text-red-700"
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={buttonLoading}
                disabled={!isValid || !dirty}
              >
                {ct("studentSave")}
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
                {ct("studentCancel")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditStudentModal;
