import { Button, Input, Modal } from "antd";
import React from "react";

const NewUserModalComp = ({
  open,
  handleCancel,
  data,
  setData,
  handleSave,
  buttonLoading
}) => {
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title="Yeni Kullanıcı Oluştur"
      footer={(_) => (
        <>
          <Button type="primary" onClick={handleSave} loading={buttonLoading}>
            Kaydet
          </Button>
          <Button
            onClick={handleCancel}
            type="primary"
            danger
            className="border-none"
          >
            İptal
          </Button>
        </>
      )}
    >
      <div className="flex flex-col">
        <p className="">İsim</p>
        <Input
          placeholder="İsim"
          value={data.userName}
          onChange={(e) => setData({ ...data, userName: e.target.value })}
        />
        <p>Email</p>
        <Input
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <p>Şifre</p>
        <Input
          placeholder="Şifre"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
    </Modal>
  );
};

export default NewUserModalComp;
