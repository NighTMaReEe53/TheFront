import { Link, useNavigate, useParams } from "react-router-dom";
import { AxiosInterface } from "../Components/Config/Axios";
import { useEffect, useState, type ChangeEvent } from "react";
import type { IProduct } from "../Interfaces/Index";
import Product_Card from "../Components/UI/Product/Product_Card";

import "../Styles/category.css";
import { IoHomeOutline } from "react-icons/io5";

const Category = () => {
  const param = useParams();
  const navigate = useNavigate();

  const [theData, setTheData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [value, setValue] = useState<string | undefined>("");

  const GET_DATA = async () => {
    setLoading(true);
    try {
      const { data } = await AxiosInterface.get(
        `products?populate=*&filters[categories][name_eng]=${param.ID}`
      );
      setTheData(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GET_DATA();

    setValue(param.ID);

    document.title = `${param.ID} Page`;
  }, [param]);

  const Product = theData.map((item) => {
    return <Product_Card key={item.id} product={item} />;
  });

  const handleChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    navigate(`/category/${e.target.value}`);
    setValue(e.target.value);
  };

  return (
    <div className="the-category">
      <div className="container">
        <div className="info">
          <h2>
            <Link to={"/"}>
              <IoHomeOutline size={22} />
              الصفحة الرئيسية
            </Link>
            <span> / </span>
            قسم {param.ID}
          </h2>
          <select id="selection" onChange={(e) => handleChanged(e)}>
            <option value="laptop" selected={value === "laptop"}>
              Laptop
            </option>
            <option value="tv" selected={value === "tv"}>
              TV
            </option>
            <option value="computer" selected={value === "computer"}>
              Computer
            </option>
            <option value="phone" selected={value === "phone"}>
              Phone
            </option>
          </select>
        </div>
        {loading ? (
          <div className="content-skeleton">
            {["", "", "", ""].map((_, i) => {
              return (
                <div className="category-loading" key={i}>
                  <div className="image-skeleton"></div>
                  <div className="title-skeleton"></div>
                  <div className="para-skeleton"></div>
                  <div className="btns">
                    <div className="btn-skeleton"></div>
                    <div className="btn-skeleton"></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="content">{Product}</div>
        )}
      </div>
    </div>
  );
};

export default Category;
