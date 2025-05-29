import * as vscode from 'vscode';

/**
 *
 * @param message - Notification message
 * @param duration - Duration in milliseconds
 */
export function showNotification(message: string, duration: number): void {
  vscode.window.withProgress(
    { location: vscode.ProgressLocation.Notification },
    async (progress) => {
      const steps = 100;
      console.log("STEP 1: steps => ", steps)
      const delay = duration / steps;
      console.log("STEP 2: steps => ", steps)

      for (let i = 0; i <= steps; i++) {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            progress.report({ increment: 1, message: message });
            resolve();
          }, delay);
          console.log("🚀 ~ delay:", delay)
        });
      }
    },
  );
}
