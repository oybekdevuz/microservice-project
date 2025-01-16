function isHttpExceptionResponse(obj: any): obj is HttpExceptionResponse {
    return obj && (typeof obj.message === 'string' || Array.isArray(obj.message));
  }
  
  function isRpcExceptionResponse(error: any): error is { status: number; message: string } {
    return (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'message' in error &&
      typeof error.status === 'number' &&
      typeof error.message === 'string'
    );
  }
  
  