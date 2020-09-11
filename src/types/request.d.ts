interface IRequest {
  url: string;
  method: string;
  params: any;
  type: string;
  onSuccess: Function;
  onFail: Function;
}
