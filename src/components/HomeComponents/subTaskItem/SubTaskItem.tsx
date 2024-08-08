import Image from "next/image";
import React, { useState } from "react";
import arrowDown from "../../../../public/icons/home/expand_more.svg";
import cross from "../../../../public/icons/header/cross.svg";
import edit from "../../../../public/icons/home/editt.svg";
import { convertTimeRange } from "@/utils/timeUtils";
import type { SubTaskItemProps, SubTaskItemType } from "./SubTaskItem.dto";
import { deleteTask } from "@/lib/actions";
import styles from "./SubTaskItem.module.css";
import ModalForm from "@/components/SideBarComponents/modalForm/ModalForm";

const SubTaskItem: React.FC<SubTaskItemProps> = ({
  subTask,
  taskID,
}: {
  subTask: SubTaskItemType;
  taskID: string;
}) => {
  const [expandSubTask, setExpandSubTask] = useState(false);
  const handleSubTaskDelete = async (subTaskID: string, taskID: string) => {
    await deleteTask(subTaskID, taskID);
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
          <Image className="svgIcon" src={arrowDown} alt={"arrow-down"} />
        </button>
      </div>
      <div
        className={`${styles.addInfo} ${expandSubTask ? styles.visible : ""}`}
      >
        <p>{subTask.addInfo}</p>
        <div className={styles.subTaskControls}>
          <button
            className={styles.addInfoEdit}
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
            onClick={() => handleSubTaskDelete(subTask._id, taskID)}
            className={styles.addInfoDelete}
          >
            <Image className="svgIcon" src={cross} alt={"delete"} />
          </button>
        </div>
      </div>
      <ModalForm />
    </div>
  );
};

export default SubTaskItem;
