import GenericModal from "@/components/reusable/GenericModal/GenericModal";
import { deleteTask } from "@/lib/actions";
import { convertTimeRange } from "@/utils/timeUtils";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import cross from "../../../../public/icons/header/cross.svg";
import edit from "../../../../public/icons/home/editt.svg";
import arrowDown from "../../../../public/icons/home/expand_more.svg";
import styles from "./SubTaskItem.module.css";
import type { SubTaskItemProps, SubTaskItemType } from "./SubTaskItem.types";
import EditForm from "./editForm/EditForm";

const SubTaskItem: React.FC<SubTaskItemProps> = ({
  subTask,
  taskID,
  token,
}: {
  subTask: SubTaskItemType;
  taskID: string;
  token: string;
}) => {
  const [expandSubTask, setExpandSubTask] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubTaskDelete = async (subTaskID: string, taskID: string) => {
    const response = await deleteTask({
      subTaskID,
      taskID,
      token: token,
    });

    if (response.success) {
      toast.success("Task deleted successfully!");
    } else {
      toast.error(response.message as string);
    }
  };

  return (
    <div className={styles.subTask}>
      <div className={styles.subTaskMain}>
        <span className={styles.subTaskTimeSquare} />
        <span className={styles.subTaskTime}>
          {subTask.time.timeFrom === "00:00" && subTask.time.timeTo === "00:00"
            ? "All day"
            : convertTimeRange(
                `${subTask.time.timeFrom} - ${subTask.time.timeTo}`
              )}
        </span>
        <span className={styles.subTaskInner}>{subTask.info}</span>
        <button
          type="button"
          onClick={() => setExpandSubTask(!expandSubTask)}
          className={`${styles.subTaskExpand} ${
            expandSubTask ? styles.upsided : ""
          }`}
        >
          <Image
            className="svgIcon"
            src={arrowDown}
            alt={"arrow-down"}
          />
        </button>
      </div>
      <div
        className={`${styles.addInfo} ${expandSubTask ? styles.visible : ""}`}
      >
        <p style={{ whiteSpace: "pre-wrap" }}>{subTask.addInfo}</p>
        <div className={styles.subTaskControls}>
          <button
            type="button"
            className={styles.addInfoEdit}
            onClick={() => setIsEditing(true)}
          >
            <Image
              className="svgIcon"
              src={edit}
              alt={"edit"}
              width={19}
              height={18}
            />
          </button>
          <button
            type="button"
            onClick={() => handleSubTaskDelete(subTask._id, taskID)}
            className={styles.addInfoDelete}
          >
            <Image className="svgIcon" src={cross} alt={"delete"} />
          </button>
        </div>
      </div>
      <GenericModal open={isEditing} setOpen={() => setIsEditing(!isEditing)}>
        <EditForm
          subTask={subTask}
          token={token}
          taskID={taskID}
          handleCloseModal={() => setIsEditing(!isEditing)}
        />
      </GenericModal>
    </div>
  );
};

export default SubTaskItem;
