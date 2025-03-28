import { useState, useEffect  } from "react";
import classes from './Comics.module.css';
import mockComics from '../../mocks/mockComics';
import ItemCard from '../../components/ItemCard/ItemCard';
import Pagination from '../../components/Pagination/Pagination'; 

function Comics() {
    const itemsPerPage = 6; 
    const [comics, setComics] = useState(mockComics);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const toggleFavorite = (id: string) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = { ...prevFavorites, [id]: !prevFavorites[id] };
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });

        setComics((prevComics) =>
            prevComics.map((comic) =>
                comic.id === id ? { ...comic, isFavorite: !comic.isFavorite } : comic
            )
        );
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentComics = comics.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(comics.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <section className={classes.comics}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <p>Comics ({comics.length})</p>
                </div>
                <div className={classes.comics_items}>
                    {currentComics.map((comic) => (
                        <ItemCard 
                            key={comic.id} 
                            {...comic} 
                            isFavorite={favorites[comic.id] || false} 
                            toggleFavorite={toggleFavorite} 
                        />
                    ))}
                </div>

                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        setCurrentPage={setCurrentPage} 
                        nextPage={nextPage} 
                        prevPage={prevPage} 
                    />
            </div>
        </section>
    );
}

export default Comics;
