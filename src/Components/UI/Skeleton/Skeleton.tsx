import "./skeleton.css";

const Skeleton = () => {
  return (
    <div className="skeleton">
      <div className="container">
        <div className="box-skeleton">
          <div className="skeleton-image"></div>
          <div className="text">
            <h2 className="skeleton-title"></h2>
            <h2 className="skeleton-description"></h2>
            <h2 className="skeleton-price"></h2>
            <div className="btns">
              <button className="btn-skeleton"></button>
              <button className="btn-skeleton"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
