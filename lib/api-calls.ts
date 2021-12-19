import fetch, { RequestInit } from 'node-fetch';
import { mapDocumentsToObjectItems } from '../helper';
import { IObjectItemServer } from '../types/server';

type TCollection = 'objects' | 'contents' | 'persons';

const baseUrl =
  'https://data.mongodb-api.com/app/data-ifniy/endpoint/data/beta/action';

const getFetchApiData = (
  collection: TCollection,
  projection: { [key: string]: number },
  limit: number
) =>
  JSON.stringify({
    collection,
    database: process.env.DATABASE as string,
    dataSource: process.env.DATASOURCE as string,
    limit,
    projection,
  });

const getFetchConfig = (data: string): RequestInit => ({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': process.env.MONGODB_VITRA_API_KEY as string,
  },
  body: data,
});

function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
      const { documents } = data as { documents: TResponse };
      return documents;
    });
}

export const fetchObjectItems = async () => {
  const projection = {
    _id: 1,
    ObjObjectTitleTxt: 1,
    ObjObjectTitleSubTxt: 1,
    ObjDateGrp_DateFromTxt: 1,
    ObjDesigner: 1,
    ObjHighlight: 1,
    ObjMultimediaRel: 1,
  };

  const apiData = getFetchApiData('objects', projection, 20);
  const config = getFetchConfig(apiData);
  const documents = await request<IObjectItemServer[]>(
    `${baseUrl}/find`,
    config
  );

  return mapDocumentsToObjectItems(documents);
};
