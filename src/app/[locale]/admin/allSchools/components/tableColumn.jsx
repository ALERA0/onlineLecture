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
    title: "Okul İsmi",
    dataIndex: "schoolName",
    width: 120,
  },
  {
    title: "Okul Sahibi",
    dataIndex: "schoolOwner",
    width: 90,
  },
  {
    title: "Okul No",
    dataIndex: "schoolPhone",
    width: 180,
  },
  {
    title: "Okul Adres",
    dataIndex: "schoolAddress",
    width: 120,
    render: (fields) => (
      <p className=" flex flex-nowrap overflow-hidden text-ellipsis">
        {fields}
      </p>
    ),
  },
];
