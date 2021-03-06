import {
  IObjectItemServer,
  IObjectRelation,
  IObjectServer,
  IPersonRelation,
  IObject,
  IObjectItem,
  PersonType,
} from '../types';

export function getAsString(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export const mapDocumentsToObjectItems = (
  documents: IObjectItemServer[]
): IObjectItem[] => {
  return documents.map((doc: IObjectItemServer) => ({
    id: doc._id,
    title: doc?.ObjObjectTitleTxt ?? '',
    subTitle: doc?.ObjObjectTitleSubTxt ?? '',
    designed: doc?.ObjDateGrp_DateFromTxt ?? '',
    designer: doc?.ObjDesigner ?? '',
    highlight: doc?.ObjHighlight ?? '',
    image: doc?.ObjMultimediaRel?.[0]?.MulUrl ?? '',
  }));
};

export function mapDocumentToObject(doc: IObjectServer): IObject {
  return {
    id: doc._id,
    title: doc?.ObjObjectTitleTxt ?? '',
    subTitle: doc?.ObjObjectTitleSubTxt ?? '',
    dating: doc?.ObjDateTxt ?? '',
    designer: doc?.ObjDesigner ?? '',
    image: doc?.ObjMultimediaRel?.[0]?.MulUrl ?? null,
    material: doc.ObjMaterialTechniqueTxt ?? '',
    dimensions: doc.ObjDimension ?? '',
    designed: doc.ObjDateGrp_DateFromTxt ?? '',
    firstProduction: doc.ObjDateGrp_Notes2Clb ?? '',
    type: doc.ObjCategoryVoc,
    inventoryNo: doc.ObjObjectNumberGrp_Part1Txt ?? '',
    description: doc.ObjMarkdown
      ? doc.ObjMarkdown.replace(/<br><br>/g, '<br>')
      : '',
    relatedObjects:
      doc.ObjObjectRel?.map((obj: IObjectRelation) => ({
        id: obj.ObjId,
        title: createTitleString(
          obj.ObjObjectTitleTxt ?? '',
          obj.ObjObjectTitleSubTxt ?? '',
          obj.ObjDateGrp_DateFromTxt ?? ''
        ),
        text: obj.ObjDesigner ?? '',
        image: obj.ObjUrl ?? null,
      })) ?? [],
    relatedDesigners:
      doc.ObjPersonRel?.filter(
        (per: IPersonRelation) => per.PerTypeVoc === PersonType.Designer
      ).map((per: IPersonRelation) => ({
        id: per.PerId,
        title: per.PerNameTxt ?? '',
        text: per.PerDatingTxt ?? '',
        image: per.PerUrl ?? null,
      })) ?? [],
    relatedManufacturers:
      doc.ObjPersonRel?.filter(
        (per: IPersonRelation) => per.PerTypeVoc === PersonType.Manufacturer
      ).map((per: IPersonRelation) => ({
        id: per.PerId,
        title: per.PerNameTxt ?? '',
        text:
          [per.PerBirthPlaceCity, per.PerBirthPlaceCountry].join(', ') ?? '',
        image: per.PerUrl ?? null,
      })) ?? [],
  };
}

export const createTitleString = (
  title: string,
  subTitle: string,
  designed: string
): string => {
  const str = `${title} ${subTitle}`.trim();
  return str ? `${str}, ${designed}` : designed;
};
