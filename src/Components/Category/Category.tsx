import { useEffect, useState } from "react";
import Title from "../Title/Title";
import { AxiosInterface } from "../Config/Axios";

import "./category.css"
import { Link } from "react-router-dom";

interface ICategory {
  id?: number;
  attributes: {
    name: string;
    name_eng:string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

const Category = () => {
  const [category, setCategory] = useState<ICategory[]>([]);

  const GET_CATEGORIES = async () => {
    const { data } = await AxiosInterface.get("categories?populate=*");

    setCategory(data.data);
  };

  useEffect(() => {
    GET_CATEGORIES();
  }, []);

  const MY_Category = category.map((item) => {
    return (
      <Link to={`/category/${item.attributes.name_eng}`} className="box" key={item.id}>
        <div className="image">
          <img src={item.attributes.image.data.attributes.url} alt="" />
        </div>
        <h2>{item.attributes.name}</h2>
      </Link>
    );
  });

  return (
    <div className="category">
      <div className="spikes"></div>

      <Title text="الاقسام" isShow={true} />
      <div className="container">{MY_Category}</div>
    </div>
  );
};

export default Category;
