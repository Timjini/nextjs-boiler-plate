// src/api/errorHandler.ts
export class AppError extends Error {
    status?: number;
    details?: any;
    constructor(message: string, status?: number, details?: any) {
      super(message);
      this.status = status;
      this.details = details;
    }
  }
  
  export const normalizeError = (error: any): AppError => {
    if (error.response) {
      return new AppError(
        error.response.data?.message || "Server error",
        error.response.status,
        error.response.data
      );
    }
    if (error.request) {
      return new AppError("Network error", 0);
    }
    return new AppError(error.message || "Unexpected error");
  };
  