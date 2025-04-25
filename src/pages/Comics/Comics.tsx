import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { comicsStore } from '../../store/ComicsStore';
import ItemCard from '../../components/ItemCard/ItemCard';
import Pagination from '../../components/Pagination/Pagination';
import classes from './Comics.module.css';

const Comics = observer(() => {
    useEffect(() => {
        comicsStore.loadComics(0);
    }, []);

    const handlePageChange = (page: number) => {
        comicsStore.loadComics((page - 1) * comicsStore.pageSize);
    };

    const toggleFavorite = (id: string) => {
        const comic = comicsStore.comics.find(c => c.id.toString() === id);
        if (comic) {
            comicsStore.toggleFavorite(comic);
        }
    };

    if (comicsStore.loading) {
        return (
            <section className={classes.comics}>
                <div className={classes.container}>
                    <div className={classes.loading}>Загрузка...</div>
                </div>
            </section>
        );
    }

    if (comicsStore.error) {
        return (
            <section className={classes.comics}>
                <div className={classes.container}>
                    <div className={classes.error}>{comicsStore.error}</div>
                </div>
            </section>
        );
    }

    const comics = comicsStore.comics.map(comic => ({
        id: comic.id.toString(),
        title: comic.title,
        description: comic.description,
        image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        isFavorite: comicsStore.isFavorite(comic.id)
    }));

    return (
        <section className={classes.comics}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <h3>Comics ({comics.length})</h3>
                </div>
                <section className={classes.comics_items}>
                    {comics.map((comic) => (
                        <ItemCard 
                            key={comic.id} 
                            {...comic} 
                            toggleFavorite={toggleFavorite} 
                        />
                    ))}
                </section>
                
                <div className={classes.pagination}>
                    <Pagination
                        currentPage={Math.floor(comicsStore.offset / comicsStore.pageSize) + 1}
                        totalPages={Math.ceil(comicsStore.total / comicsStore.pageSize)}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </section>
    );
});

export default Comics;
