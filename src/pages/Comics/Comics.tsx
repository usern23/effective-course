import { useState } from "react";
import classes from './Comics.module.css';
import mockComics from '../../mocks/mockComics';
import ItemCard from '../../components/ItemCard/ItemCard';

function Comics() {
    // Изначально добавляем первые 3 комикса в избранное
    const initialFavorites: Record<string, boolean> = {
        "0": true,
        "1": true,
        "2": true
    };

    const [comics, setComics] = useState(mockComics);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState<Record<string, boolean>>(initialFavorites);

    const toggleFavorite = (id: string) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = { ...prevFavorites, [id]: !prevFavorites[id] };
            return updatedFavorites;
        });

        setComics((prevComics) =>
            prevComics.map((comic) =>
                comic.id === id ? { ...comic, isFavorite: !comic.isFavorite } : comic
            )
        );
    };

    const totalPages = 892; 

    const renderPagination = () => {
        const maxButtons = 4;
        const pageButtons = [];
        
        pageButtons.push(
            <button 
                key={1} 
                onClick={() => setCurrentPage(1)} 
                className={currentPage === 1 ? classes.activePage : classes.pageButton}
            >
                1
            </button>
        );
        
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, startPage + maxButtons - 2);
        
        if (currentPage > totalPages - maxButtons) {
            startPage = Math.max(2, totalPages - maxButtons);
            endPage = totalPages - 1;
        }
        
        if (startPage > 2) {
            pageButtons.push(
                <span key="ellipsis1" className={classes.ellipsis}>...</span>
            );
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button 
                    key={i} 
                    onClick={() => setCurrentPage(i)} 
                    className={currentPage === i ? classes.activePage : classes.pageButton}
                >
                    {i}
                </button>
            );
        }
        
        if (endPage < totalPages - 1) {
            pageButtons.push(
                <span key="ellipsis2" className={classes.ellipsis}>...</span>
            );
        }
        
        if (totalPages > 1) {
            pageButtons.push(
                <button 
                    key={totalPages} 
                    onClick={() => setCurrentPage(totalPages)} 
                    className={currentPage === totalPages ? classes.activePage : classes.pageButton}
                >
                    {totalPages}
                </button>
            );
        }
        
        return pageButtons;
    };

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
                            isFavorite={favorites[comic.id] || false} 
                            toggleFavorite={toggleFavorite} 
                        />
                    ))}
                </section>

                <div className={classes.pagination}>
                    {renderPagination()}
                </div>
            </div>
        </section>
    );
}

export default Comics;
