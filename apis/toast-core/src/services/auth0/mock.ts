const MOCK_USER = {
  sub: 'mock-user-id',
  nickname: 'Mock User',
  username: 'mockuser',
};

export default {
  getUser: async () => {
    return MOCK_USER;
  },
};
