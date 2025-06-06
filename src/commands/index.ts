import { displayLogMessageCommand } from './displayLogMessage';
import { commentAllLogMessagesCommand } from './commentAllLogMessages';
import { uncommentAllLogMessagesCommand } from './uncommentAllLogMessages';
import { deleteAllLogMessagesCommand } from './deleteAllLogMessages';
import { correctAllLogMessagesCommand } from './correctAllLogMessages';
import { activateTurboProBundleCommand } from './activateTurboProBundle';
import { logAllVariableOccurrencesCommand } from './logAllVariableOccurrences';
import { Command } from '../entities';
export function getAllCommands(): Array<Command> {
  return [
    displayLogMessageCommand(),
    commentAllLogMessagesCommand(),
    uncommentAllLogMessagesCommand(),
    deleteAllLogMessagesCommand(),
    correctAllLogMessagesCommand(),
    activateTurboProBundleCommand(),
    logAllVariableOccurrencesCommand(),
  ];
}
