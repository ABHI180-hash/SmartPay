import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SmartPay Runtime Error Caught by Boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#F5F2FD] via-[#ECE6FD] to-[#F8F6FF] flex items-center justify-center p-6 text-[#1E1B4B]">
          <div className="max-w-md w-full bg-white border border-purple-200/80 rounded-[32px] p-6 sm:p-8 shadow-2xl shadow-purple-500/10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 text-[#7C3AED] flex items-center justify-center mx-auto mb-4 border border-purple-200 shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-black text-[#1E1B4B] tracking-tight">
              Application Encountered an Issue
            </h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              SmartPay encountered a client state interruption. You can reload the page or reset the local session.
            </p>

            {this.state.error && (
              <div className="mt-4 p-3 rounded-2xl bg-purple-50 border border-purple-200 text-left overflow-auto max-h-32 text-[11px] font-mono text-purple-900">
                {this.state.error.toString()}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-[#6222BD] to-[#752DE0] hover:from-[#501AA0] hover:to-[#6222BD] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-500/25"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleResetStorage}
                className="flex-1 py-3 px-4 rounded-full bg-purple-50 hover:bg-purple-100 text-[#7C3AED] text-xs font-bold flex items-center justify-center gap-2 transition-all border border-purple-200"
              >
                <Home className="w-4 h-4" />
                <span>Reset State</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
