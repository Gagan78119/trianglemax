
export const SectionHeading = ({ badge, title, subtitle }) => {
  return (
    <div className="section-header">
      {badge && <div className="section-badge">{badge}</div>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
