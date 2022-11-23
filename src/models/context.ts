interface IContext {
  modalAdd: boolean;
  modalEdit: boolean;
  modal: boolean;
  todos: ITodo[];
}

interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  deadline: number;
  files: string[];
}

interface IAction {
  type: string;
  payload: IPayload;
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
export type { IContext, IAction, ITodo };
