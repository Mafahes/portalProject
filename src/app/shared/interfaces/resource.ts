import { File } from './file';
export interface Resource {
  id: number;
  fileId: number;
  file: File;
  link: string;
  dateAdd: Date;
}

export interface ResourceData {
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPages: number;
  totalRecords: number;
  nextPage?: any;
  previousPage?: any;
  data: Resource[];
  succeeded: boolean;
  errors?: any;
  message?: any;
}
