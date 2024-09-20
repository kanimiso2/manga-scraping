import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const StarIcon = ({ isActive, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${className} ${isActive ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500 transition-colors duration-200`}
    >
      <FontAwesomeIcon icon={solidStar} size="lg" />
    </div>
  );
};

export default StarIcon;


