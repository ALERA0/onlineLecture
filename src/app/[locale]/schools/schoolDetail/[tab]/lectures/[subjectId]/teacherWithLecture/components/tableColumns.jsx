import { assignSubjectsToTeacher, getTeacherAssignedToSubject } from "@/api";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const ActionButton = ({ record}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: getTeacherAssignedToSubjectData } = useSelector(
    (state) => state.getTeacherAssignedToSubject
  );


  const handleButtonClick = async () => {
    console.log("Clicked on item with id:", record);
    await dispatch(
      assignSubjectsToTeacher({
        teacherId: record,
        schoolId: 1,
      })
    );
    await dispatch(
      getTeacherAssignedToSubject()
    );
  };



  return (
    <button
      className="text-blue-700 cursor-pointer"
      onClick={handleButtonClick}
    >
      Action
    </button>
  );
};

export const columns =(t)=> [
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
  // {
  //   title: "Actions",
  //   key: "actions",
  //   fixed: "right",
  //   width: 100,
  //   render: (_, record) => <ActionButton record={record.id} />,
  // },
];
