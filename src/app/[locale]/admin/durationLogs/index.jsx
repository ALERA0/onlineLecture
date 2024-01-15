"use client";

import { listAllDurationLogs } from "@/api";
import { DeleteColumnOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumn";
import { useState } from "react";
import { resetDeleteAllLogs } from "@/redux/slice/admin/logs/delete-all-logs-slice";
import { useToast } from "@/components/ToastContainer/useToast";

const DurationLogsPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(listAllDurationLogs());
  }, []);

  const {
    data: listAllDurationLogsData,
    isLoading: listAllDurationLogsIsLoading,
  } = useSelector((state) => state.listAllDurationLogs);
  const { status: deleteAllLogsStatus } = useSelector(
    (state) => state.deleteAllLogs
  );

  const handleOk = async () => {
    // await dispatch(deleteAllLogs());
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  useToast(
    deleteAllLogsStatus,
    resetDeleteAllLogs(),
    "Tüm Loglar Başarıyla Silindi",
    "Loglar silinirken hata oluştu !",
    dispatch
  );



  return (
    <div className="flex flex-col text-black">
      <div className="flex justify-between py-4">
        <h2 className="flex  text-4xl  font-bold">Bütün Duration Logları</h2>
        <Button
          icon={<DeleteOutlined />}
          className="text-lg flex items-center"
          onClick={() => {
            Modal.confirm({
              open: open,
              onOk: handleOk,
              onCancel: handleCancel,
              title: "Tüm logları silmek istediğinize emin misiniz ?",
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              ),
            });
          }}
          type="primary"
        >
          Tüm Logları Sil
        </Button>
      </div>

      <Table
        loading={listAllDurationLogsIsLoading}
        columns={columns}
        dataSource={listAllDurationLogsData}
        scroll={{
          x: 1500,
          y: 300,
        }}
      />
    </div>
  );
};

export default DurationLogsPage;
