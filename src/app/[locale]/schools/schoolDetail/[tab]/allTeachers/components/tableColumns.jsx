import { deactiveTeacherById, getTeacherById, getTeacherBySchoolId } from "@/api";
import { useRouter } from "@/navigation";
import { CloseOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useDispatch } from "react-redux";

const DeleteButton = ({ subjectId, t, params }) => {
  const dispatch = useDispatch();

  const showDeleteConfirm = async () => {
    Modal.confirm({
      title: t("deactiveteacherModal.areYouSure"),
      content: t("deactiveteacherModal.content"),
      okText: t("deactiveteacherModal.yes"),
      okType: "danger",
      cancelText: t("deactiveteacherModal.no"),
      onOk: async () => {
        await dispatch(deactiveTeacherById(subjectId));
        await dispatch(getTeacherBySchoolId(params.tab));
      },
      onCancel() {
        console.log("Silme işlemi iptal edildi");
      },
    });
  };

  return (
    <Tooltip title={t("deactivateTeacher")}>
      <Button
        className="text-red-700 cursor-pointer border-2 border-red-600"
        onClick={showDeleteConfirm}
        icon={<CloseOutlined />}
      />
    </Tooltip>
  );
};

const EditButton = ({ record, onEdit, t }) => {
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    const response = await dispatch(getTeacherById(record.id));
    if (response.payload) {
      console.log(response.payload.data.data.data)
      onEdit(response.payload.data.data.data.teacher);
    }
  };

  return (
    <>
      <Tooltip title={t("editTeacher")}>
        <Button
          className="text-green-500 border-2 border-green-500 cursor-pointer"
          onClick={handleButtonClick}
          icon={<EditOutlined />}
        />
      </Tooltip>
    </>
  );
};


export const columns = (openEditModal, t, params) => [
  {
    title: t("teacherName"),
    dataIndex: "User",
    width: 200,
    render: (fields) => <p>{fields?.Profile?.name}</p>,
  },
  {
    title: t("teacherEmail"),
    dataIndex: "User",
    width: 200,
    render: (fields) => <p>{fields?.Profile?.email}</p>,
  },
  {
    title: t("lectureName"),
    dataIndex: "TeacherSubject",
    width: 150,
    render: (fields) => <p>{fields?.subjectName}</p>,
  },
  {
    title: t("teacherPhoneNumber"),
    dataIndex: "User",
    width: 160,
    render: (fields) => <p>{fields?.Profile?.phoneNumber}</p>,
  },
  {
    title: "-",
    key: "action",
    fixed: "right",
    width: 80,
    render: (_, record) => (
      <div className="flex gap-2">
        <EditButton record={record} onEdit={openEditModal} t={t} />
        <DeleteButton subjectId={record.id} t={t} params={params} />
      </div>
    ),
  },
];
