"use client";
import React, { useEffect, useState } from "react";
import LessonForm from "./componets/LessonForm";
import LessonList from "./componets/LessonList";
import { useDispatch, useSelector } from "react-redux";
import { createClassSchedule, getClassById, getClassSchedule } from "@/api";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ToastContainer/useToast";
import { resetCreateClassSchedule } from "@/redux/slice/user/schedule/create-class-schedule-slice";

const initialLessons = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const ScheduleComponent = ({ params }) => {
  const [lessons, setLessons] = useState(initialLessons);
  const dispatch = useDispatch();
  const t = useTranslations("classDetail");

  useEffect(() => {
    dispatch(getClassSchedule(params.tab));
    dispatch(getClassById(params.tab));

  }, []);

  const { data: getClassScheduleData } = useSelector(
    (state) => state.getClassSchedule
  );

  const {
    status: createClassScheduleStatus,
    message: createClassScheduleMessage,
  } = useSelector((state) => state.createClassSchedule);



  const addLesson = async (newEntry) => {
    await dispatch(createClassSchedule({ id: params.tab, data: newEntry }));
    await dispatch(getClassSchedule(params.tab));
  };

  const updateLesson = (day, index, updatedLesson) => {
    setLessons((prevLessons) => ({
      ...prevLessons,
      [day]: prevLessons[day].map((lesson, i) =>
        i === index ? updatedLesson : lesson
      ),
    }));
  };

  const deleteLesson = (day, index) => {
    setLessons((prevLessons) => ({
      ...prevLessons,
      [day]: prevLessons[day].filter((_, i) => i !== index),
    }));
  };

  

  useToast(
    createClassScheduleStatus,
    resetCreateClassSchedule(),
    "Ders programı güncellendi",
    "Ders programı güncellenemedi",
    dispatch
  );

  return (
    <div className="container mx-auto ">
      <LessonForm addLesson={addLesson} params={params} />
      <div className="flex overflow-x-auto gap-1 h-full overflow-y-auto">
        {Object.entries(getClassScheduleData?.scheduleByDay || {}).map(
          ([day, dayLessons]) => {
            return (
              <div
                key={day}
                className="flex-none w-40  bg-slate-200  text-white shadow-lg rounded-lg"
              >
                <h2 className="text-center text-xl text-white  bg-[#315ef7] rounded-lg  ">
                  {t(`${day}`)}
                </h2>
                <LessonList
                  day={day}
                  lessons={dayLessons}
                  updateLesson={(index, lesson) =>
                    updateLesson(day, index, lesson)
                  }
                  deleteLesson={(index) => deleteLesson(day, index)}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default ScheduleComponent;
