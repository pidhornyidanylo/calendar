import Image from "next/image";
import React, { useState } from "react";
import arrowDown from "../../../../public/icons/home/expand_more.svg";
import { convertTimeRange } from "@/utils/timeUtils";
import type { SubTaskItemType } from "./SubTaskItem.dto";
import styles from "./SubTaskItem.module.css";

const SubTaskItem = ({ subTask }: { subTask: SubTaskItemType }) => {
  const [expandSubTask, setExpandSubTask] = useState(false);
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
          className={styles.subTaskExpand}
        >
          <Image className="svgIcon" src={arrowDown} alt={"arrow-down"} />
        </button>
      </div>
      <p className={`${styles.addInfo} ${expandSubTask ? styles.visible : ""}`}>
        {subTask.addInfo}
      </p>
    </div>
  );
};

export default SubTaskItem;
