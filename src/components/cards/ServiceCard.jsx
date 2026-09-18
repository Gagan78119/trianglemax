import { ChevronRight } from 'lucide-react';

export const ServiceCard = ({
  icon: Icon,
  title,
  description,
  modalTitle,
  modalDesc,
  onPreview,
}) => {
  return (
    <div className="service-card">
      <div className="service-icon-box">
        {Icon && <Icon size={28} />}
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
      <button
        className="service-action-btn"
        onClick={() =>
          onPreview?.({
            title: modalTitle || title,
            desc: modalDesc || description,
          })
        }
      >
        Preview Style <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default ServiceCard;
