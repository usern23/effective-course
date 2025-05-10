import instance from './helpers/axios';
import { IComics } from '../interfaces/IComics';

export const getComicById = async (id: string): Promise<IComics> => {
  const response = await instance.get(`v1/public/comics/${id}`);

  const data = response.data.data.results[0];

  if (!data.thumbnail) {
    console.warn(`Комикс ${data.id} не имеет thumbnail`);
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description || null,
    thumbnail: data.thumbnail ? {
      path: data.thumbnail.path,
      extension: data.thumbnail.extension
    } : {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
      extension: 'jpg'
    },
    isFavorite: false,
    series: data.series,
    issueNumber: data.issueNumber,
    pageCount: data.pageCount,
    format: data.format
  };
}; 