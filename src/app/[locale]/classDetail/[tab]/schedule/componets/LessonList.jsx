import React from "react";
import { List, Button, Popconfirm } from "antd";

const LessonList = ({ day, lessons, updateLesson, deleteLesson }) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={lessons}

      renderItem={(lesson, index) => (
        <List.Item
          key={lesson.id} // Her ders için benzersiz bir anahtar

          actions={
            [
              // <Button key="edit" onClick={() => updateLesson(day, index, lesson)}>Edit</Button>,
              // <Popconfirm
              //   key="delete"
              //   title="Are you sure you want to delete this lesson?"
              //   onConfirm={() => deleteLesson(day, index)}
              //   okText="Yes"
              //   cancelText="No"
              // >
              //   <Button type="danger">Delete</Button>
              // </Popconfirm>
            ]
          }
        >
          <List.Item.Meta
            
            title={lesson.Subject.subjectName} // Varsayılan olarak lesson'un yapısına bağlı
            description={`${lesson.startTime} - ${lesson.endTime}`}
          />
        </List.Item>
      )}
    />
  );
};

export default LessonList;
