import instance from './helpers/axios';
import IItemCard from '../interfaces/IItemCard';

export const getComicsList = async (offset = 0, limit = 20, titleStartsWith?: string): Promise<{ items: IItemCard[], totalItems: number }> => {
  const params: any = { offset, limit };
  
  if (titleStartsWith) {
    params.titleStartsWith = titleStartsWith;
  }
  
  const response = await instance.get('v1/public/comics', { params });

  const comics = response.data.data.results.map((comic: any) => {

    if (!comic.thumbnail) {
      console.warn(`Комикс ${comic.id} не имеет thumbnail`);
    }
    
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || null,
      image: comic.thumbnail ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` : 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      isFavorite: false
    };
  });
  
  return {
    items: comics,
    totalItems: response.data.data.total,
  };
}; 

export const getComicsBySeries = async (seriesId: string, limit = 10): Promise<{ items: IItemCard[], totalItems: number }> => {
  const params: any = { limit };

  const seriesResourceId = seriesId.split('/').pop();
  
  const response = await instance.get(`v1/public/series/${seriesResourceId}/comics`, { params });
  
  const comics = response.data.data.results.map((comic: any) => {
    if (!comic.thumbnail) {
      console.warn(`Комикс ${comic.id} не имеет thumbnail`);
    }
    
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || null,
      image: comic.thumbnail ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` : 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      isFavorite: false
    };
  });
  
  return {
    items: comics,
    totalItems: response.data.data.total,
  };
};

export const getComicsByIssueNumber = async (titleStartsWith: string, issueNumber: number, limit = 10): Promise<{ items: IItemCard[], totalItems: number }> => {
  const params: any = { 
    limit,
    titleStartsWith,
    issueNumber
  };
  
  const response = await instance.get('v1/public/comics', { params });
  
  const comics = response.data.data.results.map((comic: any) => {
    if (!comic.thumbnail) {
      console.warn(`Комикс ${comic.id} не имеет thumbnail`);
    }
    
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || null,
      image: comic.thumbnail ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` : 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      isFavorite: false
    };
  });
  
  return {
    items: comics,
    totalItems: response.data.data.total,
  };
}; 