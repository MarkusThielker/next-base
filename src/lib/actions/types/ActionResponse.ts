export interface ActionResponse {
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
    redirect?: string;
}
