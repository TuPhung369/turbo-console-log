import * as vscode from 'vscode';
import { Command } from '../entities';

export function logAllVariableOccurrencesCommand(): Command {
  return {
    name: 'turboConsoleLog.logAllVariableOccurrences',
    handler: async ({ extensionProperties }) => {
      const editor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const document: vscode.TextDocument = editor.document;

      // Get the selected variable
      const selection: vscode.Selection = editor.selection;
      let wordUnderCursor = '';
      const rangeUnderCursor: vscode.Range | undefined =
        document.getWordRangeAtPosition(selection.active);

      if (rangeUnderCursor) {
        wordUnderCursor = document.getText(rangeUnderCursor);
      }

      const selectedVar: string =
        document.getText(selection) || wordUnderCursor;

      if (selectedVar.trim().length === 0) {
        vscode.window.showInformationMessage('No variable selected');
        return;
      }

      // Find all occurrences of the variable in the document
      const documentText = document.getText();
      const regex = new RegExp(`\\b${selectedVar}\\b`, 'g');
      const matches: vscode.Range[] = [];

      let match;
      while ((match = regex.exec(documentText)) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + selectedVar.length);
        matches.push(new vscode.Range(startPos, endPos));
      }

      if (matches.length === 0) {
        vscode.window.showInformationMessage(
          `No occurrences of '${selectedVar}' found`,
        );
        return;
      }

      // Sort matches by line number (top to bottom)
      matches.sort((a, b) => a.start.line - b.start.line);

      // Add console.log for each occurrence with STEP number
      await editor.edit((editBuilder) => {
        matches.forEach((range, index) => {
          const lineOfSelectedVar = range.start.line;

          // Get the current line text to check if it's safe to add a log after it
          const currentLine = document.lineAt(lineOfSelectedVar);
          const currentLineText = currentLine.text;

          // Check if the current line is inside a function parameter, regex test, or other unsafe locations
          const isInsideParenthesis = (text: string): boolean => {
            const openParens = (text.match(/\(/g) || []).length;
            const closeParens = (text.match(/\)/g) || []).length;
            return openParens > closeParens;
          };

          const isInsideRegexTest = (text: string): boolean => {
            return text.includes('.test(') && !text.includes(');');
          };

          const isInsideObjectLiteral = (text: string): boolean => {
            const openBraces = (text.match(/{/g) || []).length;
            const closeBraces = (text.match(/}/g) || []).length;
            return openBraces > closeBraces;
          };

          const isInsideArrayLiteral = (text: string): boolean => {
            const openBrackets = (text.match(/\[/g) || []).length;
            const closeBrackets = (text.match(/\]/g) || []).length;
            return openBrackets > closeBrackets;
          };

          const isUnsafeLocation =
            isInsideParenthesis(currentLineText) ||
            isInsideRegexTest(currentLineText) ||
            isInsideObjectLiteral(currentLineText) ||
            isInsideArrayLiteral(currentLineText);

          // Skip adding log if it's an unsafe location
          if (isUnsafeLocation) {
            return;
          }

          // Get indentation of the current line
          const indentation = currentLineText.substring(
            0,
            currentLine.firstNonWhitespaceCharacterIndex,
          );

          // Determine where to insert the log
          const lineOfLogMsg = lineOfSelectedVar + 1;

          // Create the log message with STEP number
          const stepNumber = index + 1;
          const logFunction =
            extensionProperties.logFunction !== 'log'
              ? extensionProperties.logFunction
              : `console.${extensionProperties.logType}`;

          const quote = extensionProperties.quote;
          const semicolon = extensionProperties.addSemicolonInTheEnd ? ';' : '';

          const logMessage = `${indentation}${logFunction}(${quote}STEP ${stepNumber}: ${selectedVar} => ${quote}, ${selectedVar})${semicolon}`;

          // Insert the log message
          editBuilder.insert(
            new vscode.Position(lineOfLogMsg, 0),
            `${logMessage}\n`,
          );
        });
      });

      vscode.window.showInformationMessage(
        `Added ${matches.length} log statements for '${selectedVar}'`,
      );
    },
  };
}
