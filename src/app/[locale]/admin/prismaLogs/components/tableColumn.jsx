import moment from "moment";

export const columns = [
  {
    title: "Action",
    dataIndex: "action",
    width: 100,
  },
  {
    title: "Bekleme Süresi",
    dataIndex: "duration",
    width: 130,
  },
  {
    title: "Log ID",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "Log Level",
    dataIndex: "logLevel",
    width: 120,
  },
  {
    title: "Model",
    dataIndex: "model",
    width: 90,
  },
  {
    title: "Parametre",
    dataIndex: "params",
    width: 180,
    render: (params) => <p>{params.include?.Profile ? "Profile" : "User"}</p>,
  },
];
