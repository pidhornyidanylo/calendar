import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
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
