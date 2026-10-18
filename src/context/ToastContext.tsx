'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = useCallback((msg: string) => addToast(msg, 'success'), [addToast]);
  const error = useCallback((msg: string) => addToast(msg, 'error'), [addToast]);
  const info = useCallback((msg: string) => addToast(msg, 'info'), [addToast]);

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      {/* Toast Render Container */}
      <div
        className="fixed top-5 right-5 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-lg shadow-2xl border text-xs leading-relaxed transition-all duration-300 animate-in slide-in-from-top-2 fade-in ${
              toast.type === 'success'
                ? 'bg-[#0B1D15] text-[#FCFBF8] border-[#C5A869]/60'
                : toast.type === 'error'
                ? 'bg-[#291010] text-[#FCFBF8] border-red-500/60'
                : 'bg-[#10291E] text-[#FCFBF8] border-[#C5A869]/30'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-4 h-4 text-[#D8B979] shrink-0 mt-0.5" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              )}
              {toast.type === 'info' && (
                <Info className="w-4 h-4 text-[#D8B979] shrink-0 mt-0.5" />
              )}
              <span className="font-light tracking-wide">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#EFE9DC]/60 hover:text-white transition-colors shrink-0 p-0.5"
              aria-label="Dismiss alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
