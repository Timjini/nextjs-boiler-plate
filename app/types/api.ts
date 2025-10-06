export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
    status: number;
    errors?: Record<string, string[]>;
    meta?: {[key: string]: any};
}