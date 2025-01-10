import chalk from "chalk";

type Role = "info" | "warning" | "error" | "success";

const maxRoleLength = 8;
const separator = " | ";

const formatRole = (role: string) => {
  const upperRole = role.toUpperCase();
  return `[${upperRole}]`.padEnd(maxRoleLength, " ");
};

const logMessage = (message: string, role: Role, source: string = "") => {
  const formattedRole = formatRole(role);
  const sourcePrefix = source
    ? `[${source}]`.padEnd(maxRoleLength + 1, " ")
    : "".padEnd(maxRoleLength + 5, " ");

  const formattedMessage = `${formattedRole}${separator}${sourcePrefix}${separator}${message}`;

  switch (role) {
    case "info":
      console.log(chalk.blue(formattedMessage));
      break;
    case "warning":
      console.log(chalk.yellow(formattedMessage));
      break;
    case "error":
      console.log(chalk.red.bold(formattedMessage));
      break;
    case "success":
      console.log(chalk.green.bold(formattedMessage));
      break;
    default:
      console.log(message);
  }
};

export default logMessage;
