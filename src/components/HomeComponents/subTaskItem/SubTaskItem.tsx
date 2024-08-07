import Image from "next/image";
import React, { useState } from "react";
import arrowDown from "../../../../public/icons/home/expand_more.svg";
import cross from "../../../../public/icons/header/cross.svg";
import { convertTimeRange } from "@/utils/timeUtils";
import type { SubTaskItemType } from "./SubTaskItem.dto";
import styles from "./SubTaskItem.module.css";
import { deleteTask } from "@/lib/actions";

const SubTaskItem = ({ subTask }: { subTask: SubTaskItemType }) => {
  const [expandSubTask, setExpandSubTask] = useState(false);
  const handleSubTaskDelete = async (subTaskID: string) => {
    await deleteTask(subTaskID);
  };
  return (
    <div className={styles.subTask}>
      <div className={styles.subTaskMain}>
        <span className={styles.subTaskTimeSquare} />
        <span className={styles.subTaskTime}>
          {convertTimeRange(
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
        <span
          onClick={() => handleSubTaskDelete(subTask._id)}
          className={styles.addInfoDelete}
        >
          <Image className="svgIcon" src={cross} alt={"delete"} />
        </span>
      </div>
    </div>
  );
};

export default SubTaskItem;
