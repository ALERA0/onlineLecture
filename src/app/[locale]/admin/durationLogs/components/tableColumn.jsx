import moment from "moment";

export const columns = [
  {
    title: "Action",
    dataIndex: "action",
    width: 200,
  },
  {
    title: "Log ID",
    dataIndex: "id",
    width: 200,
  },
  {
    title: "Log Level",
    dataIndex: "logLevel",
    width: 100,
  },
  {
    title: "Model",
    dataIndex: "model",
    width: 120,
  },
  {
    title: "Parametre",
    dataIndex: "params",
    width: 120,
    render: (text) => (text.include?.User ? "User" : "Profile"),
  },
  {
    title: "Email",
    dataIndex: "params",
    width: 120,
    render: (text) => text.where?.email,
  },
  {
    title: "ms",
    dataIndex: "sort",
    width: 120,
    render: (text) => text[0],
  },
];
