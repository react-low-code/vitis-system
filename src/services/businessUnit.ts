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

export async function addBu(data: {
  desc: string;
  BUName: string;
}) {
  return await request<boolean>({
    url: '/businessUnit/add',
    method: 'POST',
    data,
  });
}

export async function pickComponent(data: ComponentBaseInfo & {BUName: string}) {
  return await request<null>({
    url: '/businessUnit/pick/component',
    method: 'POST',
    data,
  });
}

export async function getComponents(BUName: string) {
  return await request<ComponentBaseInfo[]>({
    url: '/businessUnit/components?BUName=' + BUName,
    method: 'GET',
  });
}

export async function updateComponent(data: ComponentBaseInfo & {BUName: string}) {
  return await request<null>({
    url: '/businessUnit/update/component/version',
    method: 'POST',
    data,
  });
}