import Title from "../Title/Title";
import "./news.css";
const News = () => {
  return (
    <div className="news">
      <div className="spikes"></div>
      <Title text="قسم المقالات" />
      <div className="container">
        <div className="box box-1">
          <div className="item">
            <img src="image/news/1.jpg" alt="" />
            <div className="text">
              <h2>المقالة الاولة</h2>
              <button className="main-btn">قراءة عنها</button>
            </div>
          </div>
          <div className="item">
            <img src="image/news/2.jpg" alt="" />
            <div className="text">
              <h2>المقالة الثانية</h2>
              <button className="main-btn">قراءة عنها</button>
            </div>
          </div>
        </div>
        <div className="content-box ">
          <img src="image/news/6.jpg" alt="" />
          <div className="text">
            <h2>مقالة الثالثة</h2>
            <button className="secondary-btn">قراءة عنها</button>
          </div>
        </div>
        <div className="box">
          <div className="item">
            <img src="image/news/3.jpg" alt="" />
            <div className="text">
              <h2>المقالة الرابعة</h2>
              <button className="main-btn">قراءة عنها</button>
            </div>
          </div>
          <div className="item">
            <img src="image/news/5.avif" alt="" />
            <div className="text">
              <h2>المقالة الخامسة</h2>
              <button className="main-btn">قراءة عنها</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
