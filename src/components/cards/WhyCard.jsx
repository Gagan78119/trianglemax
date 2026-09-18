
export const WhyCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="why-card">
      <div className="why-icon-wrap">
        {Icon && <Icon size={28} />}
      </div>
      <h3 className="why-title">{title}</h3>
      <p className="why-desc">{description}</p>
    </div>
  );
};

export default WhyCard;
