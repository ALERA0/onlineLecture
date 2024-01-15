import { Button, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const EditClassModalComp = ({
  open,
  handleCancel,
  handleSave,
  buttonLoading,
  classData
}) => {
  const formikRef = React.useRef();
  const { status: updateClassStatus } = useSelector(
    (state) => state.updateClass
  );

  const t = useTranslations("schools")
  const ct = useTranslations("schools.schoolModal")

  useEffect(() => {
    if (updateClassStatus === 200) {
      handleCancel();
      formikRef.current && formikRef.current.resetForm();
    }
  }, [updateClassStatus,handleCancel]);

  useEffect(() => {
    console.log(classData);
    if (open && classData && formikRef.current) {
      formikRef.current.setValues({
        className: classData.name || "",
        classDescription: classData.description || "",
        classGradeLevel: classData.gradeLevel|| "",
      });
    }
  }, [classData, open]);

  const onCancel = () => {
    handleCancel();
    formikRef.current && formikRef.current.resetForm();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={t("newClass")}
      footer={null}
    >
      <Formik
        initialValues={{
          className: "",
          classDescription: "",
          classGradeLevel: "",
        }}
        validate={(values) => {
          const errors = {};

          // Name doğrulama kuralları
          if (!values.className) {
            errors.name = ct("classBranchEmpty");
          }

          if (!values.classGradeLevel) {
            errors.classGradeLevel = ct("classDegreeEmpty");
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
              <p>{t("branchName")}</p>
              <Field
                type="text"
                name="className"
                as={Input}
                placeholder={t("branchName")}
              />
              <ErrorMessage
                name="className"
                component="div"
                className="text-red-700"
              />

              <p>{t("classDegree")}</p>
              <Field
                name="classGradeLevel"
                as={Select}
                placeholder={t("classDegree")}
                onChange={(value) => setFieldValue("classGradeLevel", value)}
              >
                {[...Array(12).keys()].map((i) => (
                  <Select.Option key={i + 1} value={i + 1}>
                    {i + 1}
                  </Select.Option>
                ))}
              </Field>
              <ErrorMessage
                name="classGradeLevel"
                component="div"
                className="text-red-700"
              />

              <p>{t("description")}</p>
              <Field
                type="text"
                name="classDescription"
                as={TextArea}
                placeholder={t("description")}
              />
              <ErrorMessage name="classDescription" component="div" className="text-red-700" />
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

export default EditClassModalComp;
