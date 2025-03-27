import React from "react";
import classes from "./Pagination.module.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage, nextPage, prevPage }) => {

    const pageRange = (currentPage: number, totalPages: number) => {
        if (totalPages <= 1) return [1];

        const range = [];
        const delta = 2; 
        let start = Math.max(2, currentPage - delta);
        let end = Math.min(totalPages - 1, currentPage + delta);

        range.push(1); 

        if (start > 2) range.push("..."); 

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        if (end < totalPages - 1) range.push("..."); 

        if (totalPages > 1 && end < totalPages) range.push(totalPages); 

        return range;
    };

    return (
        <div className={classes.pagination}>
            {currentPage > 1 && (
                <button onClick={prevPage} className={classes.arrowButton}>
                    &lt;
                </button>
            )}

            {pageRange(currentPage, totalPages).map((page, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(Number(page))}
                    className={`${classes.pageButton} ${page === currentPage ? classes.activePage : ""}`}
                    disabled={page === "..."}
                >
                    {page}
                </button>
            ))}

            {currentPage < totalPages && (
                <button onClick={nextPage} className={classes.arrowButton}>
                    &gt;
                </button>
            )}
        </div>
    );
};

export default Pagination;
