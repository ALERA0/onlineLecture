"use client";

import { deleteAllPrismaLogs, listAllPrismaLogs } from "@/api";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./components/tableColumn";
import { useState } from "react";
import { resetDeleteAllPrismaLogs } from "@/redux/slice/admin/logs/delete-all-prisma-logs-slice";
import { useToast } from "@/components/ToastContainer/useToast";

const PrismaLogsPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(listAllPrismaLogs());
  }, []);

  const { data: listAllPrismaLogsData, isLoading: listAllPrismaLogsLoading } =
    useSelector((state) => state.listAllPrismaLogs);
  const { status: deleteAllPrismaLogsStatus } = useSelector(
    (state) => state.deleteAllPrismaLogs
  );

  const handleOk = async () => {
    await dispatch(deleteAllPrismaLogs());
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  useToast(
    deleteAllPrismaLogsStatus,
    resetDeleteAllPrismaLogs(),
    "Tüm Loglar Başarıyla Silindi",
    "Loglar silinirken hata oluştu !",
    dispatch
  );

  return (
    <div className="flex flex-col text-black">
      <div className="flex justify-between py-4">
        <h2 className="flex  text-4xl  font-bold">Bütün Prisma Logları</h2>
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
        loading={listAllPrismaLogsLoading}
        columns={columns}
        dataSource={listAllPrismaLogsData}
        scroll={{
          x: 1500,
          y: 300,
        }}
      />
    </div>
  );
};

export default PrismaLogsPage;
