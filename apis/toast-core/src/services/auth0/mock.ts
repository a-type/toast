import { ManagementClient } from 'auth0';

const MOCK_USER = {
  sub: 'mock-user-id',
  nickname: 'Mock User',
  username: 'mockuser',
};

const mockManagementClient: Partial<ManagementClient> = {
  getUser: async () => {
    return MOCK_USER;
  },
  getUsersByEmail: async (email: string) => {
    return [MOCK_USER];
  },
};

export default mockManagementClient;
