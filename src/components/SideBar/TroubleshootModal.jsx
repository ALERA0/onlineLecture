import { Button, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import TextArea from "antd/es/input/TextArea";

const TroubleshootModal = ({
  open,
  handleCancel,
  handleSave,
  buttonLoading,
}) => {
  const formikRef = React.useRef();
  const t = useTranslations("schools");
  const ct = useTranslations("schools.schoolModal");

  const {
    status: createSupportTicketStatus,
  } = useSelector((state) => state.createSupportTicket);

  useEffect(() => {
    if (createSupportTicketStatus === 200) {
      handleCancel()
      formikRef.current && formikRef.current.resetForm();
    }
  }, [createSupportTicketStatus,handleCancel]);

  const onCancel = () => {
    handleCancel();
    formikRef.current && formikRef.current.resetForm();
  };

  return (
    <Modal open={open} onCancel={onCancel} title={t("troubleshoot")} footer={null}>
      <Formik
        initialValues={{
          description: "",
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
              <p>{t("description")}</p>
              <Field
                type="text"
                name="description"
                as={TextArea}
                placeholder={t("description")}
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

export default TroubleshootModal;
