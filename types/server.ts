export interface IObjectItemServer {
  _id: string;
  ObjObjectTitleTxt?: string;
  ObjObjectTitleSubTxt?: string;
  ObjDateGrp_DateFromTxt?: string;
  ObjDesigner?: string;
  ObjHighlight?: string;
  ObjMultimediaRel?: {
    [0]: {
      MulId: number;
      MulDefinition: string;
      MulUrl: string;
      MulUrls: any;
    };
  };
}
