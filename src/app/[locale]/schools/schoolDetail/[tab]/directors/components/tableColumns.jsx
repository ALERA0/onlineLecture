import { deleteDirectorByOwnerId, deleteSubject, getDirectorById, getDirectorsBySchoolId, getSubjectsBySchoolId } from "@/api";
import { useRouter } from "@/navigation";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useDispatch } from "react-redux";

const DeleteButton = ({ subjectId, t, params }) => {
  const dispatch = useDispatch();

  const showDeleteConfirm = async () => {
    Modal.confirm({
      title: t("deleteDirectorModal.areYouSure"),
      content: t("deleteDirectorModal.content"),
      okText: t("deleteDirectorModal.yes"),
      okType: "danger",
      cancelText: t("deleteDirectorModal.no"),
      onOk: async () => {
        await dispatch(deleteDirectorByOwnerId(subjectId));
        await dispatch(getDirectorsBySchoolId(params.tab));
      },
      onCancel() {
        console.log("Silme işlemi iptal edildi");
      },
    });
  };

  return (
    <Tooltip title={t("deleteLecture")}>
      <Button
        className="text-red-700 cursor-pointer border-2 border-red-600"
        onClick={showDeleteConfirm}
        icon={<DeleteOutlined />}
      />
    </Tooltip>
  );
};

const EditButton = ({ record, onEdit, t }) => {
  const dispatch = useDispatch();
console.log(record,"RECORD")
  const handleButtonClick = async () => {
    const response = await dispatch(getDirectorById(record.id));
    if (response.payload) {
      onEdit(response.payload.data.data.data.directorData);
    }
  };

  return (
    <>
      <Tooltip title={t("viewLecture")}>
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
    title: t("directorName"),
    dataIndex: "User",
    width: 180,
    render: (fields) => <p>{fields.Profile.name}</p>,
  },
  {
    title: t("directorEmail"),
    dataIndex: "User",
    width: 200,
    render: (fields) => <p>{fields.Profile.email}</p>,
  },
  {
    title: t("directorPhoneNumber"),
    dataIndex: "User",
    width: 90,
    render: (fields) => <p>{fields.Profile.phoneNumber}</p>,
  },
  {
    title: "-",
    key: "action",
    fixed: "right",
    width: 65,
    render: (_, record) => (
      <div className="flex gap-2">
        <DeleteButton subjectId={record.id} t={t} params={params} />
        <EditButton record={record} onEdit={openEditModal} t={t} />
      </div>
    ),
  },
];
