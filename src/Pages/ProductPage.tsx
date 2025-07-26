import { useEffect, useState, type ChangeEvent } from "react";
import { AxiosInterface } from "../Components/Config/Axios";
import "../Styles/ProductPage.css";
import type { IProduct } from "../Interfaces/Index";
import Product_Card from "../Components/UI/Product/Product_Card";
import { MdErrorOutline, MdOutlineCurrencyPound } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";

interface ICate {
  attributes: {
    name: string;
    name_eng: string;
  };
  id: number;
}

const ProductPage = () => {
  const [category, setCategory] = useState<ICate[]>([]);
  const [product, setProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [range, setRange] = useState<number>(0);
  const [isPrice, setPrice] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [sorting, setSorting] = useState<"asc" | "desc">("asc");

  const [search, setSearch] = useState<string>("");

  const [selectedSubCategories, setSelectSubCategories] = useState<string[]>(
    []
  );

  const GET_CATEGORY_DATA = async () => {
    const { data } = await AxiosInterface.get("categories");

    setCategory(data.data);
  };

  useEffect(() => {
    GET_CATEGORY_DATA();
  }, []);

  useEffect(() => {
    document.title = "منتجاتنا"
  }, [])

  const handleChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cheked = e.target.checked;

    setSelectSubCategories(
      cheked
        ? [...selectedSubCategories, value]
        : selectedSubCategories.filter((item) => item !== value)
    );
  };

  const EndPoint = selectedSubCategories
    .map((item) => `&[filters][categories][name_eng]=${item}`)
    .join("");

  const GET_DATA_FROM_CATEGORY = async (engPoint: string) => {
    setLoading(true);
    try {
      const { data } = await AxiosInterface.get(
        `products?populate=*&${engPoint}${
          range > 0 ? `&filters[price]=${range}` : ""
        }${isPrice === 0 ? "" : `&filters[price][$lte]=${isPrice}`}${
          search === "" ? "" : `&filters[title][$contains]=${search}`
        }&sort=createdAt:${sorting}`
      );

      setProduct(data?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GET_DATA_FROM_CATEGORY(EndPoint);
  }, [selectedSubCategories, range, isPrice, search, sorting]);

  const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
    setRange(+e.target.value);
  };

  const handelPriceChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(+e.target.value);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const MY_PRODUCT = product.map((item) => {
    return <Product_Card product={item} key={item.id} />;
  });

  const MY_CATEGORY = category.map((item) => {
    return (
      <div className="cate-name" key={item.id}>
        <input
          type="checkbox"
          id={item.attributes.name}
          onChange={handleChanged}
          value={item.attributes.name_eng}
        />
        <label key={item.id} htmlFor={item.attributes.name}>
          {item.attributes.name}
        </label>
      </div>
    );
  });

  return (
    <div className="our-product">
      <div className={`right ${show && "show"}`}>
        <div
          className="overlay overlay-right"
          onClick={() => setShow(false)}
        ></div>
        <div className="search">
          <input type="text" placeholder="ابحث هنا" onChange={handleSearch} />
          <CiSearch size={22} />
        </div>
        <h2> فلتر المنتجات حسب القسم :-</h2>
        {MY_CATEGORY}
        <h2>فلتر حسب الاسعار :-</h2>
        <div className="price-div">
          <input
            type="radio"
            value={100}
            id="filter1000"
            name="filterprice"
            onChange={handelPriceChanged}
          />
          <label htmlFor="filter1000">اقل من 1000 جنيه مصري</label>
        </div>
        <div className="price-div">
          <input
            type="radio"
            value={2000}
            id="filter2000"
            name="filterprice"
            onChange={handelPriceChanged}
          />
          <label htmlFor="filter2000">اقل من 2000 جنيه مصري</label>
        </div>
        <div className="price-div">
          <input
            type="radio"
            value={3000}
            id="filter3000"
            name="filterprice"
            onChange={handelPriceChanged}
          />
          <label htmlFor="filter3000">اقل من 3000 جنيه مصري</label>
        </div>
        <div className="price-div">
          <input
            type="radio"
            value={4000}
            id="filter4000"
            name="filterprice"
            onChange={handelPriceChanged}
          />
          <label htmlFor="filter4000">اقل من 4000 جنيه مصري</label>
        </div>
        <div className="price-div">
          <input
            type="radio"
            value={""}
            id="filter5000"
            name="filterprice"
            onChange={() => setPrice(0)}
          />
          <label htmlFor="filter5000">اعادة الي الوضع الطبيعي</label>
        </div>
        <h2>فلتر حسب السعر :-</h2>
        <input
          type="range"
          id="range"
          step={500}
          min={0}
          max={5000}
          onChange={handleChangeRange}
        />
        <span>
          {range} جنيه مصري <MdOutlineCurrencyPound size={22} />
        </span>
        <h2>فلتر حسب الترتيب :-</h2>
        <div className="sorting">
          <input
            type="radio"
            name="sort"
            id="sort-asc"
            onChange={() => setSorting("asc")}
            checked={sorting === "asc" ? true : false}
          />
          <label htmlFor="sort-asc">ترتيب تصاعدي</label>
        </div>
        <div className="sorting">
          <input
            type="radio"
            name="sort"
            id="sort-desc"
            onChange={() => setSorting("desc")}
          />
          <label htmlFor="sort-desc">ترتيب تنازلي</label>
        </div>
      </div>
      <div className={`left ${loading ? "edit" : ""}`}>
        {MY_PRODUCT.length ? (
          <div className="filter" onClick={() => setShow(true)}>
            فلتر
            <FaFilter size={20} />
          </div>
        ) : (
          ""
        )}

        {MY_PRODUCT.length ? (
          loading ? (
            <>
              <div className="overlay">
                <span className="loader-spinner"></span>
              </div>
            </>
          ) : (
            <>{MY_PRODUCT}</>
          )
        ) : (
          <h2 className="over-write">
            <MdErrorOutline size={80} />
            لا توجد اي منتجات
          </h2>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
