export interface Postion {
  hide?: boolean;
  id: number;
  unitId?: any;
  name: string;
  dateAdd: Date;
}

export interface Unit {
  hide?: boolean;
  id: number;
  manageId?: number;
  name: string;
  dateAdd: Date;
  postions: Postion[];
}

export interface Manage {
  hide?: boolean;
  id: number;
  orgId: number;
  name: string;
  dateAdd: Date;
  units: Unit[];
}

export interface Scheme {
  hide?: boolean;
  id: number;
  name: string;
  dateAdd: Date;
  manages: Manage[];
}

export interface StructureObject {
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPages: number;
  totalRecords: number;
  nextPage?: any;
  previousPage?: any;
  data: Scheme[];
  succeeded: boolean;
  errors?: any;
  message?: any;
}
