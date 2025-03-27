import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import comicsData from "../../mocks/mockComics";
import classes from "./ComicDetails.module.css";
import ItemCard from "../../components/ItemCard/ItemCard";

function ComicDetails() {
    const { id } = useParams();
    const comic = comicsData.find((c) => c.id === id);

    if (!comic) {
        return <p>Комикс не найден</p>;
    }

    const [favorites, setFavorites] = useState<Record<string, boolean>>({});
    const [hovered, setHovered] = useState(false);

    const toggleFavorite = (comicId: string) => {
        setFavorites((prev) => ({
            ...prev,
            [comicId]: !prev[comicId],
        }));
    };

    const isFavorite = favorites[comic.id] || false;

    const relatedComics = comicsData.filter((c) => c.id !== id).slice(0, 3);

    return (
        <div className={classes.details}>

            <div className={classes.comics}>
                <img src={comic.image} alt={comic.name} />
            </div>

            <div className={classes.content}>
                <div 
                    className={classes.titleWrapper} 
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
                >
                    <h1>{comic.name}</h1>
                    {hovered && (
                        <button className={classes.favoriteButton} onClick={() => toggleFavorite(comic.id)}>
                            {isFavorite ? <FaHeart size={24} color="red" /> : <FaRegHeart size={24} />}
                        </button>
                    )}
                </div>
                <p className={classes.description}>{comic.description}</p>
            </div>

            <div className={classes.relatedComics}>
                <h2>Related Comics</h2>
                <div className={classes.cards}>
                    {relatedComics.map((c) => (
                        <ItemCard
                            key={c.id}
                            id={c.id}
                            name={c.name}
                            image={c.image}
                            isFavorite={favorites[c.id] || false}
                            toggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ComicDetails;
