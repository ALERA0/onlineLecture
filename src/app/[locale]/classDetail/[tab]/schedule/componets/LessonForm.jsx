import React, { useEffect, useState } from "react";
import { Button, TimePicker, Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubjectsBySchoolId,
  getTeacherAssignedToSubject,
  getTeachersByClassId,
} from "@/api";
import { useTranslations } from "next-intl";

const { Option } = Select;

const LessonForm = ({ addLesson, params }) => {
  const [form] = Form.useForm();
  const [teachers, setTeachers] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const t = useTranslations("classDetail");
  const {
    status: createClassScheduleStatus,
    message: createClassScheduleMessage,
  } = useSelector((state) => state.createClassSchedule);

  console.log(createClassScheduleMessage,"MESSAGEE")

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachersByClassId(params.tab));
  }, [params.tab, dispatch]);

  const getTeachersByClassIdData = useSelector(
    (state) => state.getTeachersByClassId.data
  );
  const getSubjectsBySchoolIdData = useSelector(
    (state) => state.getSubjectsBySchoolId.data
  );
  const teachersAssignedToSubject = useSelector(
    (state) => state.getTeacherAssignedToSubject.data
  );

  useEffect(() => {
    if (getTeachersByClassIdData?.teachersWithSubject?.length > 0) {
      dispatch(
        getSubjectsBySchoolId(
          getTeachersByClassIdData.teachersWithSubject[0].schoolId
        )
      );
    }
  }, [getTeachersByClassIdData, dispatch]);

  useEffect(() => {
    if (selectedSubject) {
      dispatch(getTeacherAssignedToSubject(selectedSubject));
    }
  }, [selectedSubject, dispatch]);

  console.log(teachers, "TEACHERs");

  useEffect(() => {
    if (teachersAssignedToSubject) {
      setTeachers(teachersAssignedToSubject.teachers);
    }
  }, [teachersAssignedToSubject]);

  const onFinish = (values) => {
    // scheduleEntries formatına uygun bir obje oluşturun
    const newEntry = {
      scheduleEntries: [
        {
          dayOfWeek: values.day,
          startTime: values.timeRange[0].format("HH:mm"),
          endTime: values.timeRange[1].format("HH:mm"),
          subjectId: values.subjectId,
          teacherId: values.teacherId,
        },
      ],
    };

    addLesson(newEntry); // Bu şekilde dispatch edin
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="inline" className="my-4">
      <Form.Item
        name="day"
        rules={[{ required: true, message: t("selectDay") }]}
      >
        <Select placeholder={t("selectDay")} style={{ width: 150 }}>
          <Option value="Monday">{t("Monday")}</Option>
          <Option value="Tuesday">{t("Tuesday")}</Option>
          <Option value="Wednesday">{t("Wednesday")}</Option>
          <Option value="Thursday">{t("Thursday")}</Option>
          <Option value="Friday">{t("Friday")}</Option>
          <Option value="Saturday">{t("Saturday")}</Option>
          <Option value="Sunday">{t("Sunday")}</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="subjectId"
        rules={[{ required: true, message: t("selectSubjectpls") }]}
      >
        <Select
          placeholder={t("selectSubject")}
          style={{ width: 200 }}
          onChange={setSelectedSubject}
        >
          {getSubjectsBySchoolIdData?.subjects.map((subject) => (
            <Option key={subject.id} value={subject.id}>
              {subject.subjectName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="teacherId"
        rules={[{ required: true, message: t("selectTeacher") }]}
      >
        <Select
          placeholder={t("selectTeacher")}
          style={{ width: 200 }}
          disabled={!selectedSubject}
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {teachers?.map((teacher) => (
            <Option key={teacher?.id} value={teacher?.id}>
              {teacher?.User.Profile.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="timeRange"
        rules={[{ required: true, message: "Please select time!" }]}
      >
        <TimePicker.RangePicker format="HH:mm" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("addlesson")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LessonForm;
