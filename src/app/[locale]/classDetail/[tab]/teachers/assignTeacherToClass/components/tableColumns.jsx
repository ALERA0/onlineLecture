import { assignTeacherToClasses, getUnassignedTeachersForClass } from "@/api";
import { useToast } from "@/components/ToastContainer/useToast";
import { resetAssignTeacherToClasses } from "@/redux/slice/user/scholl/assign-teacher-to-classes-slice";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const ActionButton = ({ record, t }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: getUnassignedTeachersForClassData } = useSelector(
    (state) => state.getUnassignedTeachersForClass
  );

  const handleButtonClick = async () => {
    console.log("Clicked on item with id:", record);
    await dispatch(
      assignTeacherToClasses({
        teacherId: record,
        classId: getUnassignedTeachersForClassData?.classInfo.id,
      })
    );
    await dispatch(
      getUnassignedTeachersForClass(
        getUnassignedTeachersForClassData?.classInfo.id
      )
    );
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

export const columns = (t) => [
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
    title: t("teacherPhoneNumber"),
    dataIndex: "User",
    width: 100,
    render: (fields) => <p>{fields.Profile.phoneNumber}</p>,
  },
  {
    title: "-",
    key: "actions",
    fixed: "right",
    width: 80,
    render: (_, record) => <ActionButton record={record.id} t={t} />,
  },
];
