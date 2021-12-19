import { IObjectItemServer } from './../types/server';
import { IObjectItem } from './../types/index';

export const mapDocumentsToObjectItems = (
  documents: IObjectItemServer[]
): IObjectItem[] => {
  return documents.map((doc: IObjectItemServer) => ({
    _id: doc._id,
    title: doc?.ObjObjectTitleTxt ?? '',
    subTitle: doc?.ObjObjectTitleSubTxt ?? '',
    dating: doc?.ObjDateGrp_DateFromTxt ?? '',
    designer: doc?.ObjDesigner ?? '',
    highlight: doc?.ObjHighlight ?? '',
    image: doc?.ObjMultimediaRel?.[0]?.MulUrl ?? '',
  }));
};
