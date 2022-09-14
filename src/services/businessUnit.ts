import { request } from 'ice';
import { ComponentBaseInfo } from './market'

export interface BusinessUnitInfo {
  name: string;
  desc: string;
  schemaProjectId: string;
  codeProjectId: string;
  components: ComponentBaseInfo[];
  applications: string[];
}

export async function getAllBU() {
  return await request<BusinessUnitInfo[]>('/businessUnit/list');
}

export async function pickComponent(data: ComponentBaseInfo & {BUName: string}) {
  return await request<null>({
    url: '/businessUnit/pick/component',
    method: 'POST',
    data,
  });
}
