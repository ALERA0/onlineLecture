import moment from "moment";

export const columns = [
  {
    title: "Oluşturma Tarihi",
    dataIndex: "createdAt",
    width: 200,
    render: (createdAt) => (
      <p>{moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
    ),
  },
  {
    title: "Değiştirme Zamanı",
    dataIndex: "updatedAt",
    width: 200,
    render: (updatedAt) => (
      <p>{moment(updatedAt).format("YYYY-MM-DD HH:mm:ss")}</p>
    ),
  },
  {
    title: "Durum",
    dataIndex: "isActive",
    width: 100,
    render: (isActive) =>
      isActive ? (
        <p className="text-green-500">Aktif</p>
      ) : (
        <p className="text-red-500">Pasif</p>
      ),
  },
  {
    title: "Rol",
    dataIndex: "role",
    width: 120,
  },
  {
    title: "User ID",
    dataIndex: "Profile",
    width: 90,
    render: (fields) => <p>{fields.id}</p>,
  },
  {
    title: "İsim",
    dataIndex: "Profile",
    width: 180,
    render: (fields) => <p>{fields.name}</p>,
  },
  {
    title: "Email",
    dataIndex: "Profile",
    width: 120,
    render: (fields) => (
      <p className=" flex flex-nowrap overflow-hidden text-ellipsis">
        {fields.email}
      </p>
    ),
  },
  {
    title: "Tel No",
    dataIndex: "Profile",
    width: 120,
    render: (fields) => <p>{fields.phoneNumber}</p>,
  },
  {
    title: "Resim",
    dataIndex: "Profile",
    width: 120,
    render: (fields) => <p>{fields.profileImage}</p>,
  },
  {
    title: "TC No",
    dataIndex: "Profile",
    width: 120,
    render: (fields) => <p>{fields.tcIdentity}</p>,
  },
  {
    title: "Doğum Tarihi",
    dataIndex: "Profile",
    width: 120,
    render: (updatedAt) => (
      <p>{moment(updatedAt.birthDate).format("YYYY-MM-DD")}</p>
    ),
  },
  {
    title: "Şehir",
    dataIndex: "Profile",
    width: 120,
    render: (fields) => <p>{fields.city}</p>,
  },
  {
    title: "İlçe",
    dataIndex: "Profile",
    width: 120,
    render: (fields) => <p>{fields.district}</p>,
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a>action</a>,
  },
];
