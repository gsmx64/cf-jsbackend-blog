import React, { ErrorInfo, ReactNode } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


type AnyRecord = Record<string | number | symbol, any>;

export type ErrorComponentProps = {
    className?: string;
    error?: Error;
    errorInfo?: ErrorInfo;
    retry: () => void;
};

export const DefaultErrorComponent = ({
    error,
    errorInfo,
    retry,
    children,
}: ErrorComponentProps & { children?: React.ReactNode }) => {
    const heading = "⚠ " + (error?.name ? error?.name : "Unknown Error");
    return (
      <>
        <Navbar />
        <div className="container mt-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">{heading}</div>
            <div className="card-body">
              {
                error?.message && (
                  <h5 className="card-title">
                    {error?.message}
                  </h5>
                )
              }
              {
                errorInfo && (
                  <p className="card-text">
                    {errorInfo as React.ReactNode}
                  </p>
                )
              }
              <button onClick={retry} className="btn btn-info">
                Retry
              </button>
            </div>
            {children}
          </div>
        </div>
        <Footer />
      </>
    );
};

export type ErrorBoundaryProps = {
    className?: string;
    ErrorComponent?: React.ComponentType<ErrorComponentProps>;
    extraErrorProps?: AnyRecord;
    children: ReactNode;
};

interface State {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error, errorInfo: ErrorInfo) {
        // Update state so the next render will show the fallback UI.
        return { error, errorInfo };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.error("ErrorBoundary caught: ", error, errorInfo);
        return false;
    }

    retry = () => {
        this.setState({ error: null, errorInfo: null });
    };

    render() {
        if (this.state.error) {
            const { className, ErrorComponent = DefaultErrorComponent } = this.props;
            const error = this.state.error as ErrorComponentProps["error"];
            const errorInfo = this.state.errorInfo as ErrorComponentProps["errorInfo"];
            // You can render any custom fallback UI
            return (
                <ErrorComponent
                    {...{ className, error, errorInfo, retry: this.retry, ...this.props.extraErrorProps }}
                />
            );
        }

        return this.props.children;
    }
}