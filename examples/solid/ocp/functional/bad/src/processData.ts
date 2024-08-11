export type DataType = "json" | "csv" | "xml";

export const processData = (data: string[][], type: DataType) => {
  if (type === "json") {
    return JSON.stringify(data);
  } else if (type === "csv") {
    return data.map((row) => row.join(",")).join("\n");
  } else if (type === "xml") {
    return data.map((row) => `<row>${row.join("")}</row>`).join("");
  } else {
    throw new Error("Unsupported data type");
  }
};
