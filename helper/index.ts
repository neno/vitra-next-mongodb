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
    dating: doc?.ObjDateGrp_DateFromTxt ?? '',
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
    dating: doc?.ObjDateGrp_DateFromTxt ?? '',
    designer: doc?.ObjDesigner ?? '',
    highlight: doc?.ObjHighlight ?? '',
    image: doc?.ObjMultimediaRel?.[0]?.MulUrl ?? '',
    material: doc.ObjMaterialTechniqueTxt ?? '',
    dimensions: doc.ObjDimension ?? '',
    designed: doc.ObjDateGrp_DateFromTxt ?? '',
    firstProduction: doc.ObjDateGrp_Notes2Clb ?? '',
    type: doc.ObjCategoryVoc,
    inventoryNo: doc.ObjObjectNumberGrp_Part1Txt ?? '',
    description: doc.ObjMarkdown ?? '',
    relatedObjects:
      doc.ObjObjectRel?.map((obj: IObjectRelation) => ({
        id: obj.ObjId,
        title: obj.ObjObjectTitleTxt ?? '',
        dating: obj.ObjDateGrp_DateFromTxt ?? '',
        image: obj.ObjUrl ?? '',
      })) ?? [],
    relatedDesigners:
      doc.ObjPersonRel?.filter(
        (per: IPersonRelation) => per.PerTypeVoc === PersonType.Designer
      ).map((per: IPersonRelation) => ({
        id: per.PerId,
        title: per.PerNameTxt ?? '',
        dating: per.PerDatingTxt ?? '',
        image: per.PerUrl ?? '',
      })) ?? [],
    relatedManufacturers:
      doc.ObjPersonRel?.filter(
        (per: IPersonRelation) => per.PerTypeVoc === PersonType.Manufacturer
      ).map((per: IPersonRelation) => ({
        id: per.PerId,
        title: per.PerNameTxt ?? '',
        dating: per.PerDatingTxt ?? '',
        image: per.PerUrl ?? '',
      })) ?? [],
  };
}
