import { useOverlay } from "./context";
import {
  ResultDialog,
  ResultDialogProps,
} from "./dialogs/ResultDialog";
import { WelcomeDialog } from "./dialogs/WelcomeDialog";

export function useDialog() {
  const { showDialog } = useOverlay();

  const showWelcomeDialog = () => showDialog(<WelcomeDialog />);
  const showResultDialog = (props: ResultDialogProps) =>
    showDialog(<ResultDialog {...props} />);

  return { showResultDialog, showWelcomeDialog };
}
