type HomeSkeletonProps = {
  count?: number;
};

const getDefaultCount = () => {
  if (typeof window === "undefined") return 8;

  if (window.innerWidth < 576) return 4;
  if (window.innerWidth < 992) return 6;
  return 8;
};

const HomeSkeleton: React.FC<HomeSkeletonProps> = ({ count }) => {
  const cardCount = count ?? getDefaultCount();

  return (
    <div className="home_blogs" aria-live="polite" aria-busy="true">
      {Array.from({ length: cardCount }).map((_, index) => (
        <article className="card skeleton-card" key={index}>
          <div className="skeleton-thumb" />
          <div className="card-body">
            <div className="skeleton-line skeleton-line-lg" />
            <div className="skeleton-line" />
            <div className="skeleton-line skeleton-line-sm" />
          </div>
        </article>
      ))}
    </div>
  );
};

export default HomeSkeleton;
