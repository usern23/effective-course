import React from "react";
import { observer } from "mobx-react-lite";
import ItemCard from "../../components/ItemCard/ItemCard";
import { comicsStore } from "../../store/ComicsStore";
import classes from "./Favorites.module.css";

const Favorites: React.FC = observer(() => {
    const favorites = comicsStore.favorites;
    
    const toggleFavorite = (id: string) => {
        const comic = favorites.find(c => c.id.toString() === id);
        if (comic) {
            comicsStore.toggleFavorite(comic);
        }
    };
    
    const favoriteComics = favorites.map(comic => ({
        id: comic.id.toString(),
        title: comic.title,
        description: comic.description,
        image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        isFavorite: true
    }));
    
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
                                toggleFavorite={toggleFavorite} 
                            />
                        ))}
                    </section>
                ) : (
                    <div className={classes.empty}>
                        <p>У вас пока нет избранных комиксов</p>
                    </div>
                )}
            </div>
        </section>
    );
});

export default Favorites;
