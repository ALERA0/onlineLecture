import { deleteStudent, getStudentById, getStudentsByClassId } from "@/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";

const EditButton = ({ record, onEdit, t }) => {
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    const response = await dispatch(getStudentById(record.id));
    if (response.payload) {
      console.log(response.payload.data.data.data.student)
      onEdit(response.payload.data.data.data.student);
    }
  };

  return (
    <>
      <Tooltip title={t("editStudent")}>
        <Button
          className="text-green-500 border-2 border-green-500 cursor-pointer"
          onClick={handleButtonClick}
          icon={<EditOutlined />}
        />
      </Tooltip>
    </>
  );
};

const DeleteButton = ({ subjectId, t, params }) => {
  const dispatch = useDispatch();

  const showDeleteConfirm = async () => {
    Modal.confirm({
      title: t("deleteStudentModal.areYouSure"),
      content: t("deleteStudentModal.content"),
      okText: t("deleteStudentModal.yes"),
      okType: "danger",
      cancelText: t("deleteStudentModal.no"),
      onOk: async () => {
        await dispatch(deleteStudent(subjectId));
        await dispatch(getStudentsByClassId(params.tab));
      },
      onCancel() {
        console.log("Silme işlemi iptal edildi");
      },
    });
  };

  return (
    <Tooltip title={t("deleteStudent")}>
      <Button
        className="text-red-700 cursor-pointer border-2 border-red-600"
        onClick={showDeleteConfirm}
        icon={<DeleteOutlined />}
      />
    </Tooltip>
  );
};

export const columns = (openEditModal,t, params) => [
  {
    title: t("studentName"),
    dataIndex: "StudentDetails",
    width: 50,
    render: (studentName) => (
      <p className="flex flex-nowrap overflow-hidden text-ellipsis">
        {studentName.studentName}
      </p>
    ),
  },
  {
    title: t("studentSurname"),
    dataIndex: "StudentDetails",
    width: 60,
    render: (studentSurname) => (
      <p className="flex flex-nowrap overflow-hidden text-ellipsis">
        {studentSurname.studentSurname}
      </p>
    ),
  },
  {
    title: t("studentNo"),
    dataIndex: "StudentDetails",
    width: 45,
    render: (studentNumber) => (
      <p className="flex flex-nowrap overflow-hidden text-ellipsis">
        {studentNumber.studentNumber}
      </p>
    ),
  },
  {
    title: t("studentBirthDate"),
    dataIndex: "StudentDetails",
    width: 50,
    render: (studentBirthDate) => (
      <p className="flex flex-nowrap overflow-hidden text-ellipsis">
        {moment(studentBirthDate.studentBirthDate).format("YYYY-MM-DD")}
      </p>
    ),
  },
  {
    title: t("studentGender"),
    dataIndex: "StudentDetails",
    width: 45,
    render: (studentGender) =>
      studentGender.studentGender === "E" ? (
        <p>{params.locale === "tr" ? "Erkek" : "Male"}</p>
      ) : (
        <p>{params.locale === "tr" ? "Kız" : "Female"}</p>
      ),
  },
  {
    title: <span className="overflow-hidden whitespace-nowrap text-ellipsis">{t("parentName")}</span>,
    dataIndex: "Parents",
    width: 65,
    render: (parentName) => (
      <p className="flex flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap">
        {parentName[0].parentName} {parentName[0].parentSurname}
      </p>
    ),
  },
  {
    title: <span className="overflow-hidden whitespace-nowrap text-ellipsis">{t("parentPhoneNumber")}</span>,
    dataIndex: "Parents",
    width: 45,
    render: (parentName) => (
      <p className="flex flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap">
        {parentName[0].parentPhoneNumber}
      </p>
    ),
  },
  {
    title: <span className="overflow-hidden whitespace-nowrap text-ellipsis">{t("parentRelationship")}</span>,
    dataIndex: "Parents",
    width: 50,
    render: (parentName) => (
      <p className="flex flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap">
        {parentName[0].parentRelationship}
      </p>
    ),
  },
  {
    title: "-",
    key: "action",
    fixed: "right",
    width: 40,
    render: (_, record) => (
      <div className="flex gap-2">
        <EditButton record={record} onEdit={openEditModal} t={t} />
        <DeleteButton subjectId={record.id} t={t} params={params} />
      </div>
    ),
  },
];
