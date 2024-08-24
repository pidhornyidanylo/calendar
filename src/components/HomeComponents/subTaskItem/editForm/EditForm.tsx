import { updateTask } from "@/lib/actions";
import type React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { EditFormProps, FormStateType } from "./EditForm.types";
import styles from "./EditForm.module.css";

const EditForm: React.FC<EditFormProps> = ({
  subTask,
  taskID,
  handleCloseModal,
  token,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormStateType>({
    defaultValues: {
      timeFrom: subTask.time.timeFrom,
      timeTo: subTask.time.timeTo,
      taskInfo: subTask.info,
      allDay:
        subTask.time.timeFrom === "00:00" && subTask.time.timeTo === "00:00",
      addInfo: subTask.addInfo,
    },
  });

  const allDay = watch("allDay");

  const onSubmit: SubmitHandler<FormStateType> = async (data) => {
    const response = await updateTask({
      formState: {
        ...data,
        timeFrom: data.allDay ? "00:00" : data.timeFrom,
        timeTo: data.allDay ? "00:00" : data.timeTo,
      },
      taskID,
      subTaskID: subTask._id,
      token: token,
    });

    if (response.success) {
      handleCloseModal();
      toast.success("Task updated successfully!");
    } else {
      toast.error(response.message as string);
    }
  };

  return (
    <form
      data-value="form"
      className={styles.editForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h5 className={styles.taskDetailsTitle}>Task details:</h5>
      <div
        className={`${styles.timeContainer} ${allDay ? styles.disabled : ""}`}
      >
        <div className={styles.timeItem}>
          <label htmlFor="time-from">From: </label>
          <input
            {...register("timeFrom")}
            disabled={allDay}
            type="time"
            id="time-from"
            step={60}
          />
        </div>
        <div className={styles.timeItem}>
          <label htmlFor="time-to">To: </label>
          <input
            {...register("timeTo")}
            disabled={allDay}
            type="time"
            id="time-to"
            step={60}
          />
        </div>
      </div>
      <div className={styles.wholeDay}>
        <label htmlFor="all_day">All day</label>
        <input {...register("allDay")} type="checkbox" id="all_day" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.taskContainer}>
          <label htmlFor="task">Task:</label>
          <input
            {...register("taskInfo", { required: true })}
            type="text"
            id="task"
          />
          {errors.taskInfo && <span>This field is required</span>}
        </div>
        <div className={styles.addInfoContainer}>
          <label htmlFor="add-info">Additional info:</label>
          <textarea {...register("addInfo")} id="add-info" />
        </div>
      </div>
      <button className={styles.submitBtn} type="submit">
        Update task
      </button>
    </form>
  );
};

export default EditForm;
