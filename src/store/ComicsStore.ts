import { makeAutoObservable, computed } from 'mobx';
import { getComicsList, getComicsBySeries, getComicsByIssueNumber } from '../api/comicsList';
import { getComicById } from '../api/comicDetails';
import { IComics } from '../interfaces/IComics';
import i18n from '../i18n/react-i18next';

class ComicsStore {
    comics: IComics[] = []; 
    currentComic: IComics | null = null; 
    relatedComics: IComics[] = []; 
    loadingRelated = false; 
    favorites: IComics[] = []; 
    loading = false; 
    error: string | null = null; 
    errorRelated: string | null = null; 
    offset = 0; 
    total = 0; 
    pageSize = 20; 
    searchQuery = ''; 

    constructor() {
        makeAutoObservable(this, {
            filteredComics: computed
        });
        this.loadFavorites();
    }
    
    get filteredComics() {
        if (!this.searchQuery) {
            return this.comics;
        }
        
        const query = this.searchQuery.toLowerCase();
        return this.comics.filter(comic => 
            comic.title.toLowerCase().includes(query) || 
            (comic.description && comic.description.toLowerCase().includes(query))
        );
    }
    
    setSearchQuery(query: string) {
        this.searchQuery = query;
    }

    async loadComics(newOffset: number) {
        try {
            this.loading = true;
            this.error = null;
            this.offset = newOffset;

            const response = await getComicsList(this.offset, this.pageSize);

            this.comics = response.items.map((comic: any) => {
                const imageUrl = comic.image;
                const lastDotIndex = imageUrl.lastIndexOf('.');
                const extension = imageUrl.substring(lastDotIndex + 1);
                const path = imageUrl.substring(0, lastDotIndex);
                
                return {
                    id: comic.id,
                    title: comic.title,
                    description: comic.description,
                    thumbnail: {
                        path: path,
                        extension: extension
                    },
                    isFavorite: this.isFavorite(comic.id)
                };
            });
            this.total = response.totalItems;
        } catch (error) {
            this.error = i18n.t('errors.loadingComics');
            console.error('Error:', error);
        } finally {
            this.loading = false;
        }
    }

    async loadComic(id: number) {
        try {
            this.loading = true;
            this.error = null;
            this.relatedComics = []; 
            
            const comic = await getComicById(id.toString());

            if (!comic.thumbnail) {
                console.warn(`Комикс ${comic.id} не имеет изображения`);
                this.currentComic = {
                    id: comic.id,
                    title: comic.title,
                    description: comic.description,
                    thumbnail: {
                        path: 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
                        extension: 'jpg'
                    },
                    isFavorite: this.isFavorite(comic.id),
                    series: comic.series,
                    issueNumber: comic.issueNumber,
                    pageCount: comic.pageCount,
                    format: comic.format
                };
                
                if (this.currentComic) {
                    this.loadRelatedComics();
                }
                
                return;
            }

            this.currentComic = {
                id: comic.id,
                title: comic.title,
                description: comic.description,
                thumbnail: {
                    path: comic.thumbnail.path,
                    extension: comic.thumbnail.extension
                },
                isFavorite: this.isFavorite(comic.id),
                series: comic.series,
                issueNumber: comic.issueNumber,
                pageCount: comic.pageCount,
                format: comic.format
            };
            
            if (this.currentComic) {
                this.loadRelatedComics();
            }
        } catch (error) {
            this.error = i18n.t('errors.loadingComic');
            console.error('Error:', error);
        } finally {
            this.loading = false;
        }
    }
    
    async loadRelatedComics() {
        if (!this.currentComic) return;
        
        try {
            this.loadingRelated = true;
            this.errorRelated = null;
            this.relatedComics = [];
            
            if (this.currentComic.series && this.currentComic.series.resourceURI) {
                const seriesResponse = await getComicsBySeries(this.currentComic.series.resourceURI, 5);
                
                const seriesComics = seriesResponse.items
                    .filter(comic => Number(comic.id) !== this.currentComic!.id)
                    .map(this.processRelatedComic.bind(this));
                
                this.relatedComics = [...this.relatedComics, ...seriesComics];
            }
            
            if (this.currentComic.issueNumber !== undefined && this.relatedComics.length < 5) {
                const titleParts = this.currentComic.title.split('#');
                if (titleParts.length > 1) {
                    const baseTitle = titleParts[0].trim();
                    
                    const issueNumber = this.currentComic.issueNumber;
                    
                    if (issueNumber > 1) {
                        const prevIssueResponse = await getComicsByIssueNumber(baseTitle, issueNumber - 1, 1);
                        const prevIssueComics = prevIssueResponse.items.map(this.processRelatedComic.bind(this));
                        this.relatedComics = [...this.relatedComics, ...prevIssueComics];
                    }
                    
                    const nextIssueResponse = await getComicsByIssueNumber(baseTitle, issueNumber + 1, 1);
                    const nextIssueComics = nextIssueResponse.items.map(this.processRelatedComic.bind(this));
                    this.relatedComics = [...this.relatedComics, ...nextIssueComics];
                }
            }
            
            this.relatedComics = this.relatedComics.filter((comic, index, self) => 
                index === self.findIndex(c => c.id === comic.id)
            );
            
        } catch (error) {
            this.errorRelated = i18n.t('errors.loadingRelatedComics');
        } finally {
            this.loadingRelated = false;
        }
    }
    
    processRelatedComic(comic: any): IComics {
        if (comic.thumbnail) {
            return {
                ...comic,
                isFavorite: this.isFavorite(comic.id)
            };
        }
        
        const imageUrl = comic.image;
        const lastDotIndex = imageUrl.lastIndexOf('.');
        const extension = imageUrl.substring(lastDotIndex + 1);
        const path = imageUrl.substring(0, lastDotIndex);
        
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            thumbnail: {
                path: path,
                extension: extension
            },
            isFavorite: this.isFavorite(comic.id)
        };
    }

    resetCurrentComic() {
        this.currentComic = null;
        this.relatedComics = [];
        this.error = null;
    }

    loadFavorites() {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            this.favorites = JSON.parse(savedFavorites);
        }
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    toggleFavorite(comic: IComics) {
        const index = this.favorites.findIndex(f => f.id === comic.id);
        if (index === -1) {
            this.favorites.push(comic);
        } else {
            this.favorites.splice(index, 1);
        }
        this.saveFavorites();
    }

    isFavorite(id: number) {
        return this.favorites.some(f => f.id === id);
    }
}

export const comicsStore = new ComicsStore();
