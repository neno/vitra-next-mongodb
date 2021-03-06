import fetch, { RequestInit } from 'node-fetch';
import { mapDocumentsToObjectItems, mapDocumentToObject } from '../helper';
import {
  IObjectItemServer,
  IObjectServer,
  IObject,
  IObjectItem,
  TDbCollection,
} from '../types';

const baseUrl =
  'https://data.mongodb-api.com/app/data-ifniy/endpoint/data/beta/action';

const getFetchApiData = (
  collection: TDbCollection,
  projection: { [key: string]: number },
  limit: number | null = null,
  filter: { [key: string]: string | number } = {},
  skip: 0
) =>
  JSON.stringify({
    collection,
    database: process.env.DATABASE as string,
    dataSource: process.env.DATASOURCE as string,
    projection,
    limit,
    filter,
    skip,
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
  config: RequestInit = {},
  isRequestingSingleRecord = false
): Promise<TResponse> {
  // console.log('request', config);

  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
      if (isRequestingSingleRecord) {
        const { document } = data as { document: TResponse };
        return document;
      }
      const { documents } = data as { documents: TResponse };
      return documents;
    });
}

const objectItemProjection = {
  _id: 1,
  ObjObjectTitleTxt: 1,
  ObjObjectTitleSubTxt: 1,
  ObjDateGrp_DateFromTxt: 1,
  ObjDesigner: 1,
  ObjMultimediaRel: 1,
};

const objectProjection = {
  ...objectItemProjection,
  ObjCategoryVoc: 1,
  ObjDateTxt: 1,
  ObjMaterialTechniqueTxt: 1,
  ObjDimension: 1,
  ObjMarkdown: 1,
  ObjDateGrp_Notes2Clb: 1,
  ObjObjectNumberGrp_Part1Txt: 1,
  ObjPersonRel: 1,
  ObjObjectRel: 1,
};

export const fetchObjectItems = async (): Promise<IObjectItem[]> => {
  const apiData = getFetchApiData('objects', objectItemProjection, 20);
  const config = getFetchConfig(apiData);
  const documents = await request<IObjectItemServer[]>(
    `${baseUrl}/find`,
    config
  );

  return mapDocumentsToObjectItems(documents);
};

export const fetchObjectById = async (id: string): Promise<IObject> => {
  const apiData = getFetchApiData('objects', objectProjection, null, {
    _id: parseInt(id),
  });
  const config = getFetchConfig(apiData);
  const object = await request<IObjectServer>(
    `${baseUrl}/findOne`,
    config,
    true
  );

  return mapDocumentToObject(object);
};
