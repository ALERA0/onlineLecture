import { getStudentsByClassId } from "@/api";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const ViewButton = ({ classId }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  
  const handleView = async () => {
    await dispatch(getStudentsByClassId(classId));
    await router.push(`/classDetail/${classId}/students`);
  };

  return (
    <a className="text-blue-700 cursor-pointer" onClick={handleView}>
      Görüntüle
    </a>
  );
};

export const columns = (t)=> [
  {
    title: t("teacherNameSurname"),
    dataIndex: "User",
    width: 100,
    render: (profile) => <p className="flex flex-nowrap overflow-hidden text-ellipsis">{profile.Profile?.name}</p>,

  },
  {
    title: t("teacherMail"),
    dataIndex: "User",
    width: 100,
    render: (profile) => <p className="flex flex-nowrap overflow-hidden text-ellipsis">{profile.Profile?.email}</p>,
  },
  {
    title:t("teacherPhoneNumber"),
    dataIndex: "User",
    width: 100,
    render: (profile) => <p className="flex flex-nowrap overflow-hidden text-ellipsis">{profile.Profile?.phoneNumber}</p>,

  },
  {
    title: t("status"),
    dataIndex: "User",
    width: 30,
    render: (isActive) =>
    isActive ? (
      <p className="text-green-500">Aktif</p>
    ) : (
      <p className="text-red-500">Pasif</p>
    ),
  },

  
];
