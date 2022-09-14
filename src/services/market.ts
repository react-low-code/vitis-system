
import { request } from 'ice';

export interface Component extends Omit<ComponentBaseInfo, 'version'> {
  versions: string[];
  latest: string;
}

export interface ComponentBaseInfo {
  packageName: string;
  description: string;
  title: string;
  componentName: string;
  iconUrl: string;
  version: string;
}

export async function getAllComponents(page: number, pageSize: number) {
  return await request<{total: number; data: Component[]}>('/marketComponent/list', {
    params: {
      page,
      pageSize,
    },
  });
}

export async function getComponentDetail(packageName: string) {
  return await request<Component>('/marketComponent/detail?packageName=' + packageName);
}