interface IText {
  text: string;
  isShow?: boolean;
}

const Title = ({ text, isShow = false }: IText) => {
  return (
    <div className={`main-title ${isShow && "none"}`}>
      <h2>
        {text}
        <span></span>
        <span></span>
      </h2>
    </div>
  );
};

export default Title;
