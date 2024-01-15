import { Button, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { useTranslations } from "next-intl";

const NewLectureModal = ({ open, handleCancel, handleSave, buttonLoading }) => {
  const formikRef = React.useRef();

  const t = useTranslations("schools");
  const ct = useTranslations("schools.lectureModal");
  const { status: createSubjectStatus } = useSelector(
    (state) => state.createSubject
  );

  useEffect(() => {
    if (createSubjectStatus === 200) {
      handleCancel();
      formikRef.current && formikRef.current.resetForm();
    }
  }, [createSubjectStatus, handleCancel]);

  const onCancel = () => {
    handleCancel();
    formikRef.current && formikRef.current.resetForm();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={ct("newLecture")}
      footer={null}
    >
      <Formik
        initialValues={{
          subjectName: "",
          subjectDescription: "",
        }}
        validate={(values) => {
          const errors = {};

          // Name doğrulama kuralları
          if (!values.subjectName) {
            errors.subjectName = ct("lectureNameEmpty");
          } else if (values.subjectName.length < 2) {
            errors.subjectName = ct("lectureName2char");
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
              <p>{t("lecturName")}</p>
              <Field
                type="text"
                name="subjectName"
                as={Input}
                placeholder={t("lecturName")}
              />
              <ErrorMessage
                name="subjectName"
                component="div"
                className="text-red-700"
              />

              <p>{t("lectureDesc")}</p>
              <Field
                type="text"
                name="subjectDescription"
                as={Input}
                placeholder={t("lectureDesc")}
              />
              <ErrorMessage
                name="subjectDescription"
                component="div"
                className="text-red-700"
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

export default NewLectureModal;
