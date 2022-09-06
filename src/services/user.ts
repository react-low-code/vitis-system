import { request } from 'ice';

export interface User {
  account: string;
  editable: boolean;
  releasable: boolean;
}

export interface FormUser extends User{
  password: string;
}

export async function getAllUsers() {
  return await request<User[]>('/user/list');
}

export async function delUser(account: string) {
  return await request<null>({
    url: '/user/del',
    method: 'POST',
    data: {
      account,
    },
  });
}

export async function addUser(data: FormUser) {
  return await request<null>({
    url: '/user/add',
    method: 'POST',
    data,
  });
}

export async function updateUser(data: Pick<User, 'editable' | 'releasable' | 'account'>) {
  return await request<null>({
    url: '/user/update',
    method: 'POST',
    data,
  });
}
