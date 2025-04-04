import { useState } from "react";
import ItemCard from "../../components/ItemCard/ItemCard";
import classes from "./Favorites.module.css";
import mockComics from "../../mocks/mockComics";
import IComics from "../../interfaces/IComics";

function Favorites() {
    const initialFavorites: Record<string, boolean> = {
        "0": true,
        "1": true,
        "2": true
    };

    const [favorites, setFavorites] = useState<Record<string, boolean>>(initialFavorites);
    const [favoriteComics, setFavoriteComics] = useState<IComics[]>(
        mockComics.filter(comic => initialFavorites[comic.id])
    );

    const toggleFavorite = (id: string) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = { ...prevFavorites, [id]: !prevFavorites[id] };
            
            setFavoriteComics(mockComics.filter(comic => 
                id === comic.id ? updatedFavorites[id] : prevFavorites[comic.id]
            ));

            return updatedFavorites;
        });
    };

    return (
        <section className={classes.favorites}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <h3>Favorites ({favoriteComics.length})</h3>
                </div>
                {favoriteComics.length > 0 ? (
                    <section className={classes.cards}>
                        {favoriteComics.map((comic) => (
                            <ItemCard 
                                key={comic.id} 
                                {...comic} 
                                isFavorite={favorites[comic.id] || false} 
                                toggleFavorite={toggleFavorite} 
                            />
                        ))}
                    </section>
                ) : (
                    <p className={classes.empty}></p>
                )}
            </div>
        </section>
    );
}

export default Favorites;
