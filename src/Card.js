import { useNavigate } from "react-router-dom";

const Card = ({ imgSrc, title, description }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('cats-and-dogs-facts');
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