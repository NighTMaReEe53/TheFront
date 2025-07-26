import * as yup from "yup";

export const Register_Schema = yup
  .object({
    username: yup
      .string()
      .required("الاسم مطلوب")
      .min(3, "اقل شئ اسم يتكون من 3 حروف"),
    email: yup
      .string()
      .email("هذا ليس ايميل الرجاء التأكد منه")
      .required("الايميل مطلوب"),
    password: yup
      .string()
      .required("الباسورد مطلوب")
      .min(8, "اقل شئ كلمة المرور تتكون من 8 مقاطع"),
  })
  .required();
export const Login_Schema = yup
  .object({
    identifier: yup
      .string()
      .email("هذا ليس ايميل الرجاء التأكد منه")
      .required("الايميل مطلوب"),
    password: yup
      .string()
      .required("الباسورد مطلوب")
      .min(8, "اقل شئ كلمة المرور تتكون من 8 مقاطع"),
  })
  .required();
export const change_Schema = yup
  .object({
    currentPassword: yup
      .string()
      .required("كلمة المرور القديمة مطلوبة ")
      .min(8, "اقل شئ كلمة المرور تتكون من 8 مقاطع"),
    password: yup
      .string()
      .required("كلمة المرور الجديدة مطلوبة")
      .min(8, "اقل شئ كلمة المرور تتكون من 8 مقاطع"),
    passwordConfirmation: yup
      .string()
      .required("تأكدي كلمة المرور الجديدة مطلوبة")
      .min(8, "اقل شئ كلمة المرور تتكون من 8 مقاطع"),
  })
  .required();
export const User_Schema = yup
  .object({
    username: yup
      .string()
      .required("اسم المستخدم مطلوب ")
      .min(3, "اقل شئ اسم المستخدم يتكون من 3 مقاطع"),
    email: yup
      .string()
      .email("هذا ليس بريد الكتروني")
      .required("الايميل مطلوب"),
    phone: yup
      .string()
      .required("رقم الهاتف مطلوب")
      .min(11, "رقم الهاتف في مصر مكون من 11 رقم")
      .max(11, "رقم الهاتف في مصر مكون من 11 رقم"),
    address: yup
      .string()
      .required("العنوان مطلوب")
      .min(11, "اقل شئ في العنوان ان يتكون من 7 مقاطع"),
  })
  .required();
export const Order_Schema = yup
  .object({
    firstName: yup
      .string()
      .required("اسم الاول من المستخدم مطلوب ")
      .min(3, "اقل شئ اسم المستخدم يتكون من 3 مقاطع"),
    lastName: yup
      .string()
      .required("اسم الاخير من المستخدم مطلوب ")
      .min(3, "اقل شئ اسم المستخدم يتكون من 3 مقاطع"),
    email: yup
      .string()
      .email("هذا ليس بريد الكتروني")
      .required("الايميل مطلوب"),
    phone: yup
      .string()
      .required("رقم الهاتف مطلوب")
      .min(11, "رقم الهاتف في مصر مكون من 11 رقم")
      .max(11, "رقم الهاتف في مصر مكون من 11 رقم"),
    address: yup
      .string()
      .required("اسم المدينة مطلوب")
      .min(2, "اقل شئ في اسم المدينة ان يتكون من 2 مقاطع"),
    street: yup
      .string()
      .required("الشارع او المنطقة مطلوب")
      .min(5, "اقل شئ في العنوان ان يتكون من 5 مقاطع"),
  })
  .required();
export const Sale_Schema = yup
  .object({
    title: yup
      .string()
      .required("اسم المنتج مطلوب")
      .min(5, "اقل شئ اسم المنتج يتكون من 3 مقاطع"),
    description: yup
      .string()
      .required("وصف المنتج مطلوب ")
      .min(7, "اقل شئ وصف المنتج ان يتكون من 7 مقاطع"),
    price: yup.string().required("السعر مطلوب مطلوب"),
    whatsapp: yup.string().required("رابط الواتس مطلوب").url("هذا ليس برابط"),
    facebook: yup.string().required("رابط الواتس مطلوب").url("هذا ليس برابط"),
  })
  .required();
