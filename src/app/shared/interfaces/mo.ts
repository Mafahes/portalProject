export interface Mo {
  id: number;
  name: string;
}
export interface Org {
  id: number;
  mcod: string;
  glpu: string;
  idump: number;
  krai: string;
  urop: number;
  name: string;
  m_namef: string;
  m_ogrn: string;
  m_adres: string;
  fam_gv: string;
  grup: number;
  mo?: Mo
}
export interface MoV2 {
  nummer: number;
  date: string;
  typeMO: string;
  nameMO: string;
  status: string;
}
