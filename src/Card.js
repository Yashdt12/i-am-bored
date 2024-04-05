import { useNavigate } from "react-router-dom";

const Card = ({ imgSrc, title, description, route }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  }

  return (
    <article className='Card' onClick={handleClick}>
      <img src={imgSrc} alt="" />
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  );
};

export default Card;