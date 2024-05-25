import { ErrorComponentProps, DefaultErrorComponent } from "../../../../components/ErrorBoundary";
import "bootstrap/dist/css/bootstrap.min.css";


export const ErrorBoundaryErrorMessage = ({
    error,
    errorInfo,
    retry,
    children,
}: ErrorComponentProps & { children?: React.ReactNode }) => {
  return DefaultErrorComponent({ error, errorInfo, retry, children });
};