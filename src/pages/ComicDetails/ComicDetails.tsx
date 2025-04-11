import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { comicsStore } from "../../store/ComicsStore";
import ItemCard from "../../components/ItemCard/ItemCard";
import classes from "./ComicDetails.module.css";

const ComicDetails = observer(() => {
    const { id } = useParams<{ id: string }>();
    const [hovered, setHovered] = useState(false);
    
    useEffect(() => {
        if (id) {
            comicsStore.loadComic(parseInt(id));
        }
        
        return () => {
            comicsStore.resetCurrentComic();
        };
    }, [id]);
    
    if (comicsStore.loading) {
        return <div className={classes.loading}>Загрузка...</div>;
    }
    
    if (comicsStore.error) {
        return <div className={classes.error}>Ошибка: {comicsStore.error}</div>;
    }
    
    if (!comicsStore.currentComic) {
        return <p>Комикс не найден</p>;
    }
    
    const comic = comicsStore.currentComic;
    const toggleFavorite = (comicId: string) => {
        const comicObj = comicId === comic.id.toString() 
            ? comic 
            : comicsStore.relatedComics.find(c => c.id.toString() === comicId);
        
        if (comicObj) {
            comicsStore.toggleFavorite(comicObj);
        }
    };
    
    return (
        <section className={classes.details}>
            <div className={classes.comics}>
                <img 
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                    alt={comic.title}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
                    }}
                />
            </div>
            <div className={classes.content}>
                <div
                    className={classes.titleWrapper}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <h1>{comic.title}</h1>
                    {hovered && (
                        <button
                            className={classes.favoriteButton}
                            onClick={() => toggleFavorite(comic.id.toString())}
                        >
                            {comic.isFavorite ? <FaHeart size={24} color="red" /> : <FaRegHeart size={24} />}
                        </button>
                    )}
                </div>
                {comic.description && (
                    <p className={classes.description}>{comic.description}</p>
                )}
                
                <div className={classes.metadata}>
                    {comic.series && (
                        <p><strong>Серия:</strong> {comic.series.name}</p>
                    )}
                    
                    {comic.issueNumber !== undefined && (
                        <p><strong>Номер выпуска:</strong> {comic.issueNumber}</p>
                    )}
                    
                    {comic.pageCount && (
                        <p><strong>Количество страниц:</strong> {comic.pageCount}</p>
                    )}
                    
                    {comic.format && (
                        <p><strong>Формат:</strong> {comic.format}</p>
                    )}
                </div>
            </div>

            <section className={classes.relatedComics}>
                <h2>Похожие комиксы</h2>
                
                {comicsStore.loadingRelated ? (
                    <div className={classes.loading}>Загрузка связанных комиксов...</div>
                ) : comicsStore.relatedComics.length > 0 ? (
                    <div className={classes.cards}>
                        {comicsStore.relatedComics.map((relatedComic) => {
                            const comicData = {
                                id: relatedComic.id.toString(),
                                title: relatedComic.title,
                                image: `${relatedComic.thumbnail.path}.${relatedComic.thumbnail.extension}`,
                                isFavorite: comicsStore.isFavorite(relatedComic.id),
                                description: relatedComic.description
                            };
                            
                            return (
                                <ItemCard
                                    key={relatedComic.id}
                                    {...comicData}
                                    toggleFavorite={toggleFavorite}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <p>Связанные комиксы не найдены</p>
                )}
            </section>
        </section>
    );
});

export default ComicDetails;
