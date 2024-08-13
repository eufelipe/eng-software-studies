export const processMessage = (
  message: string,
  logger: (msg: string) => void
): void => {
  logger(message);
};

const consoleLogger = (message: string): void => {
  console.log(`Log: ${message}`);
};

const fileLogger = (message: string): void => {
  // Suponha que essa função registre a mensagem em um arquivo
  console.log(`Writing to file: ${message}`);
};

// Uso
processMessage("Processing message...", consoleLogger);
processMessage("Processing message...", fileLogger);
