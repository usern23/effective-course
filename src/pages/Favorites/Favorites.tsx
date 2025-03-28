import { useState, useEffect } from "react";
import ItemCard from "../../components/ItemCard/ItemCard";
import classes from "./Favorites.module.css";
import mockComics from "../../mocks/mockComics";
import IComics  from "../../interfaces/IComics"; 
function Favorites() {
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});
    const [favoriteComics, setFavoriteComics] = useState<IComics[]>([]); 
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            const parsedFavorites: Record<string, boolean> = JSON.parse(storedFavorites);
            setFavorites(parsedFavorites);

            setFavoriteComics(mockComics.filter(comic => parsedFavorites[comic.id]));
        }
    }, []);

    const toggleFavorite = (id: string) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = { ...prevFavorites, [id]: !prevFavorites[id] };
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            setFavoriteComics(mockComics.filter(comic => updatedFavorites[comic.id]));

            return updatedFavorites;
        });
    };

    return (
        <section className={classes.favorites}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <p>Favorites ({favoriteComics.length})</p>
                </div>
                {favoriteComics.length > 0 ? (
                    <div className={classes.cards}>
                        {favoriteComics.map((comic) => (
                            <ItemCard 
                                key={comic.id} 
                                {...comic} 
                                isFavorite={favorites[comic.id] || false} 
                                toggleFavorite={toggleFavorite} 
                            />
                        ))}
                    </div>
                ) : (
                    <p className={classes.empty}>No favorites yet.</p>
                )}
            </div>
        </section>
    );
}

export default Favorites;
