export const Card = ({ children, className = '' }) => {
  return (
    <div className={`card-premium ${className}`}>
      {children}
    </div>
  );
};