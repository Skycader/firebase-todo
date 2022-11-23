

interface IContext {
  modalAdd: boolean;
  modalEdit: boolean;
  todos?: ITodo[];
  current?: ITodo;
}

interface IDoc {
  id: string,
  data: Function
}

interface IUpload {
  name: string
}
interface ITodoEdit {
  todo: ITodo
}
interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  time: number;
  description: string;
  files: string[];
}

interface IAction {
  type: string;
  payload: IPayload
}

interface IPayload {
  description: string;
  time: number;
  id: number;
  modal: boolean;
  title: string;
  completed: boolean;
  files: string[];
}
export type { IContext, IAction, ITodo, IDoc, IUpload, ITodoEdit };
