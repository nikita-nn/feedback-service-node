export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export interface ResponseType {
  status: ResponseStatus;
  data?: string;
  message?: string;
}
