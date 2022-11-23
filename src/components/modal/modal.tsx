import style from "./modal.module.less";

interface IModal {
  children: React.ReactNode
}
/**
 * Functional component Modal is to create & edit the todos
 * @param props IModal
 * @returns TSX
 */
const Modal = (props: IModal) => {
  return (
    <div className={style.modalBody}>
      <div className={style.modalContent}>{props.children}</div>
    </div>
  );
};

export { Modal };
