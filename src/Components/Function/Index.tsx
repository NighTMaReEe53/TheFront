import toast from "react-hot-toast";
import type { IProduct, IProduct_Single } from "../../Interfaces/Index";
import { AxiosInterface, ID_Parsing, JWT_Parsing } from "../Config/Axios";

interface IItem {
  product: IProduct;
  id?: number;
}

export const SEND_FAVOURTIE = async (
  AllProduct: IItem[],
  product: IProduct | IProduct_Single | undefined
) => {
  const FINDED = AllProduct.find((item) => item.product.id == product?.id);

  if (FINDED && JWT_Parsing) {
    toast.error("هذا المنتج تم اضافته من قبل الي مفضلتك", {
      duration: 1500,
      position: "top-center",
    });
  } else {
    const { status } = await AxiosInterface.post(
      "/favourites",
      {
        data: {
          product,
          users: [ID_Parsing],
        },
      },
      {
        headers: { Authorization: `Bearer ${JWT_Parsing}` },
      }
    );

    if (status == 200) {
      toast.success("تم اضافة المنتج بنجاح الي مفضلتك", {
        position: "top-left",
        duration: 1500,
      });
    }
  }
};

export const Remove_Favourite_Product = async (
  AllProduct: IItem[],
  product: IProduct
) => {
  const CONFIRM = window.confirm("هل تريد حذف هذا المنتج بالفعل من مفضلتك ؟");

  if (CONFIRM) {
    const FILTERED = AllProduct.filter(
      (item) => item.product.id === product.id
    );

    const { status } = await AxiosInterface.delete(
      `favourites/${FILTERED[0].id}`,
      {
        headers: {
          Authorization: `Bearer ${JWT_Parsing}`,
        },
      }
    );

    if (status === 200) {
      toast.success("تم حذف المنتج بنجاح", {
        duration: 1500,
        position: "top-center",
      });
    }
  }
};
