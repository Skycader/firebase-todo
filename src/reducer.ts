import { IContext, IAction, ITodo } from "./models/context";

/**
 * Reducer to control adding, editing, modals
 * @param state IContext
 * @param action IAction
 * @returns state of IContext
 */
export default function (state: IContext, action: IAction): IContext {
  switch (action.type) {
    case "toggleAdd":
      return {
        ...state,
        modalAdd: !state.modalAdd,
      };

    case "openEdit":
      return {
        ...state,
        modalEdit: true,
        current: {
          id: action.payload.id,
          title: action.payload.title,
          description: action.payload.description,
          time: action.payload.time,
          completed: action.payload.completed,
          files: [],
        },
      };
    case "closeEdit":
      return {
        ...state,
        modalEdit: false,
      };
    case "editTodo":
      return {
        ...state,
        todos: state?.todos?.map((todo: ITodo) => {
          console.log(action.payload);
          if (todo.id === action?.payload?.id) {
            todo.title = action.payload.title;
          }
          return todo;
        }),
      };

    default:
      return state;
  }
}
