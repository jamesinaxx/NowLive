import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

const Button = styled.button`
  position: absolute;
  top: 15px;
  right: 25px;
  border: none;
  background: none;
  color: yellow;
`;

interface FavoriteButtonProps {
  favorite: boolean;
  toggleFavorite: (old: boolean) => void;
}

export default function FavoriteButton({
  favorite,
  toggleFavorite,
}: FavoriteButtonProps) {
  return (
    <Button onClick={() => toggleFavorite(favorite)}>
      <FontAwesomeIcon icon={favorite ? solidStar : emptyStar} size="lg" />
    </Button>
  );
}
