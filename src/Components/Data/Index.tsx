interface IRegister {
  label: string;
  name: "username" | "password" | "email";
  type: string;
  placeholder: string;
}

export const IRegister_Form: IRegister[] = [
  {
    name: "username",
    label: "ادخل اسمك...",
    type: "text",
    placeholder: "ادخل اسمك هنا..."
  },
  {
    name: "email",
    label: "ادخل البريد الالكتروني هنا",
    type: "email",
    placeholder: "ادخل البريد الالكتروني الخاص بك هنا..."

  },
  {
    name: "password",
    label: "ادخل كلمة المرور هنا",
    type: "password",
    placeholder: "ادخل كلمة السر الخاصة بك هنا"
  },
];
