interface IItemCard {
  id: string;
  title: string;
  description: string | null;
  image: string;
  isFavorite: boolean;
}

export default IItemCard;