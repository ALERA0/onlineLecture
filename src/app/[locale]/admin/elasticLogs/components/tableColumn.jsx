import moment from "moment";

export const columns = [
  {
    title: "Log ID",
    dataIndex: "id",
    width: 200,
  },
  {
    title: "Log Mesajı",
    dataIndex: "message",
    width: 200,
  },
  {
    title: "Oluşturma Tarihi",
    dataIndex: "timestamp",
    width: 100,
    render: (updatedAt) => (
      <p>{moment(updatedAt).format("YYYY-MM-DD HH:mm:ss")}</p>
    ),
  },
  {
    title: "Log Level",
    dataIndex: "fields",
    width: 120,
    render: (fields) => <p>{fields["log.level"]}</p>,
  },
  
];
