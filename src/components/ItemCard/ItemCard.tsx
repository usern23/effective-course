import { useState } from "react";
import { NavLink } from "react-router-dom";
import IItemCard from "../../interfaces/IItemCard";
import classes from "./ItemCard.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface ItemCardProps extends IItemCard {
    toggleFavorite: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ id, title, image, isFavorite, toggleFavorite }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <NavLink
            to={`/comics/${id}`}
            className={classes.item}
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={classes.image}>
                <img 
                    src={imageError ? 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' : image} 
                    alt={title} 
                    onError={handleImageError}
                />
                {isHovered && (
                    <button className={classes.favoriteBtn} onClick={(e) => { e.preventDefault(); toggleFavorite(id); }}>
                        {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                )}
            </div>
            <div className={classes.name}>
                <p>{title}</p>
            </div>
        </NavLink>
    );
};

export default ItemCard;
