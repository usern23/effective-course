import { useState } from "react";
import { NavLink } from "react-router-dom";
import IItemCard from "../../interfaces/IItemCard";
import classes from "./ItemCard.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface ItemCardProps extends IItemCard {
    toggleFavorite: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ id, name, image, isFavorite, toggleFavorite }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <NavLink
            to={`/comics/${id}`}
            className={classes.item}
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={classes.image}>
                <img src={image} alt={name} />
                {isHovered && (
                    <button className={classes.favoriteBtn} onClick={(e) => { e.preventDefault(); toggleFavorite(id); }}>
                        {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                )}
            </div>
            <div className={classes.name}>
                <p>{name}</p>
            </div>
        </NavLink>
    );
};

export default ItemCard;
