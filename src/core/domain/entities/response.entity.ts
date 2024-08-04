export class ResponseEntity {
  statusCode: statusCode;
  status: statusType;
  message: string;
  data?: any;
}

export type statusCode = 200 | 204 | 400 | 500;
export type statusType = 'success' | 'error' | 'warning' | 'info';
