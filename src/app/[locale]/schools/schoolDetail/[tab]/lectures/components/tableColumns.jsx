import {
  deleteSubject,
  getSubjectById,
  getSubjectsBySchoolId,
  getTeacherAssignedToSubject,
} from "@/api";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const DeleteButton = ({ subjectId, t, params }) => {
  const dispatch = useDispatch();

  const showDeleteConfirm = async () => {
    Modal.confirm({
      title: t("deleteLectureModal.areYouSure"),
      content: t("deleteLectureModal.content"),
      okText: t("deleteLectureModal.yes"),
      okType: "danger",
      cancelText: t("deleteLectureModal.no"),
      onOk: async () => {
        await dispatch(deleteSubject(subjectId));
        await dispatch(getSubjectsBySchoolId(params.tab));
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

  const handleButtonClick = async () => {
    const response = await dispatch(getSubjectById(record.id));
    if (response.payload) {
      onEdit(response.payload.data.data.data);
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
const ViewTeachersButton = ({ subjectId, t }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleView = async () => {
    await dispatch(getTeacherAssignedToSubject(subjectId));
    await router.push(`lectures/${subjectId}/teacherWithLecture`);
  };

  return (
    <Tooltip title={t("viewTeacher")}>
      <Button
        className="text-blue-700 cursor-pointer border-2 border-blue-600"
        onClick={handleView}
        icon={<EyeOutlined />}
      />
    </Tooltip>
  );
};

export const columns = (openEditModal, t, params) => [
  {
    title: t("lecturName"),
    dataIndex: "subjectName",
    width: 100,
  },
  {
    title: t("lectureDesc"),
    dataIndex: "subjectDescription",
    width: 100,
  },
  {
    title: "-",
    key: "action",
    fixed: "right",
    width: 30,
    render: (_, record) => (
      <div className="flex gap-2">
        <EditButton record={record} onEdit={openEditModal} t={t} />
        <DeleteButton subjectId={record.id} t={t} params={params} />
        <ViewTeachersButton subjectId={record.id} t={t} />
      </div>
    ),
  },
];
