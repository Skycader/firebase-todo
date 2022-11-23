import style from "./modal.module.less";

interface IModal {
  children: React.ReactNode
}
const Modal = (props: IModal) => {
  return (
    <div className={style.modalBody}>
      <div className={style.modalContent}>{props.children}</div>
    </div>
  );
};

export { Modal };
