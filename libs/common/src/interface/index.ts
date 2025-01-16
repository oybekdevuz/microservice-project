interface HttpExceptionResponse {
    statusCode?: number;
    message?: string | string[];
    error?: string;
  }
  
  interface RpcExceptionResponse {
    status?: number;
    message?: string;
  }
  