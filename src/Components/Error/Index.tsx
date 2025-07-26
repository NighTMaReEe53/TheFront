interface IText {
  text: string | undefined;
}

const Error = ({ text }: IText) => {
  return <p className="my-error">{text}</p>;
};

export default Error;
