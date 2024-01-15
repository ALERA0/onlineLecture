import { assignSubjectsToTeacher, getUnassignedTeachers } from "@/api";
import { useDispatch } from "react-redux";

const ActionButton = ({ record, t, params }) => {
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    console.log("Clicked on item with id:", record);
    await dispatch(
      assignSubjectsToTeacher({
        teacherId: record,
        subjectId: params.subjectId,
      })
    );
    await dispatch(getUnassignedTeachers());
  };

  return (
    <button
      className="text-blue-700 cursor-pointer"
      onClick={handleButtonClick}
    >
      {t("assignTeacher")}
    </button>
  );
};

export const columns = (t, params) => [
  {
    title: t("teacherNameSurname"),
    dataIndex: "User",
    width: 180,
    render: (fields) => <p>{fields.Profile.name}</p>,
  },
  {
    title: t("teacherMail"),
    dataIndex: "User",
    width: 200,
    render: (fields) => <p>{fields.Profile.email}</p>,
  },
  {
    title: "-",
    key: "actions",
    fixed: "right",
    width: 100,
    render: (_, record) => (
      <ActionButton record={record.id} t={t} params={params} />
    ),
  },
];
