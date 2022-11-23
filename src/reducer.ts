import { IContext, IAction, ITodo } from "./models/context";

export default function (state: IContext, action: IAction) {
  switch (action.type) {
    case "toggleAdd":
      return {
        ...state,
        modalAdd: !state.modalAdd,
      };

    case "toggleEdit":
      return {
        ...state,
        modalEdit: !state.modalEdit,
        current: {
          id: action?.payload?.id,
          title: action?.payload?.title,
          description: action?.payload?.description,
          time: action?.payload?.time
        },
      };
    case "editTodo":
      return {
        ...state,
        todos: state.todos.map((todo: ITodo) => {
          console.log(action.payload);
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
          }
          return todo;
        }),
      };

    case "removeTodo":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "addTodo":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.payload.title,
          },
        ],
      };


    default:
      return state;
  }
}
