import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { TaskItemType } from "@/components/HomeComponents/taskItem/TaskItem.types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    border: "1px solid #000",
    borderRadius: 5,
  },
  dateTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  taskList: {
    marginLeft: 10,
  },
  taskItem: {
    fontSize: 12,
    marginBottom: 5,
  },
  taskTime: {
    fontSize: 10,
    color: "#555",
  },
});

const PDFDocument = ({ data }: { data: TaskItemType[] }) => {
  console.log(data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Calendar Tasks Report</Text>
        {data.map((taskGroup: any) => (
          <View style={styles.section} key={taskGroup._id}>
            <Text style={styles.dateTitle}>
              Date:{" "}
              {(taskGroup.date.day as number) < 10
                ? `0${taskGroup.date.day}`
                : taskGroup.date.day}
              /
              {(taskGroup.date.month as number) < 10
                ? `0${taskGroup.date.month}`
                : taskGroup.date.month}
              / {taskGroup.date.year}
            </Text>
            <View style={styles.taskList}>
              {taskGroup.tasks.length > 0 ? (
                taskGroup.tasks.map((task: any) => (
                  <View style={styles.taskItem} key={task._id}>
                    <Text>
                      - {task.info}: {task.addInfo}
                    </Text>
                    <Text style={styles.taskTime}>
                      Time: {task.time.timeFrom} - {task.time.timeTo}
                    </Text>
                  </View>
                ))
              ) : (
                <Text>No tasks for this date.</Text>
              )}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default PDFDocument;
