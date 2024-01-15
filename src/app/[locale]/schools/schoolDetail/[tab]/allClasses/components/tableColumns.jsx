import { getClassById, getStudentsByClassId } from "@/api";
import { useRouter } from "@/navigation";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useDispatch } from "react-redux";

const ViewButton = ({ classId, t }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleView = async () => {
    await dispatch(getStudentsByClassId(classId));
    await router.push(`/classDetail/${classId}/students`);
  };

  return (
    <Tooltip title={t("viewClass")}>
      <Button
        className="text-blue-700 cursor-pointer border-2 border-blue-600"
        onClick={handleView}
        icon={<EyeOutlined />}
      />
    </Tooltip>
  );
};


const EditButton = ({ record, onEdit, t }) => {
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    const response = await dispatch(getClassById(record.id));
    if (response.payload) {
      console.log(response.payload.data.data.data.classInfo)
      onEdit(response.payload.data.data.data.classInfo);
    }
  };

  return (
    <>
      <Tooltip title={t("editClass")}>
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
    title: t("branchName"),
    dataIndex: "name",
    width: 60,
  },
  {
    title: t("classDegree"),
    dataIndex: "gradeLevel",
    width: 40,
  },
  {
    title: t("studentCount"),
    dataIndex: "studentCount",
    width: 40,
  },
  {
    title: t("description"),
    dataIndex: "description",
    width: 80,
  },
  {
    title: "-",
    key: "action",
    fixed: "right",
    width: 30,
    render: (_, record) => (
      <div className="flex gap-2">
        <EditButton record={record} onEdit={openEditModal} t={t} />
        <ViewButton classId={record.id} t={t} />
      </div>
    ),
  },
];
