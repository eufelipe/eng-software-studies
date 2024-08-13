const logMessage = (message: string): void => {
  console.log(`Log: ${message}`);
};

const processMessage = (message: string): void => {
  logMessage(message);
};

processMessage("Processing message...");
