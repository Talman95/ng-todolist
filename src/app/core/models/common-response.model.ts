export interface CommonResponse<T = object> {
  data: T;
  resultCode: number;
  messages: string[];
  fieldsErrors: string[];
}
