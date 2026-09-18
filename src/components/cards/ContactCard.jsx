
export const ContactCard = ({
  href,
  target,
  rel,
  icon: Icon,
  iconType, // 'wa' | 'mail' | 'ig'
  label,
  value,
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="contact-card-item"
    >
      <div className={`contact-icon-wrap ${iconType}`}>
        {Icon && <Icon size={26} />}
      </div>
      <div className="contact-info-text">
        <label>{label}</label>
        <p>{value}</p>
      </div>
    </a>
  );
};

export default ContactCard;
