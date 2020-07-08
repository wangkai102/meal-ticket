import request from '../utils/request';

export const login = async (code) => {
  return await request({
    method: 'POST',
    url: `/wx/login`,
    data: { code },
    noToken: true,
  });
};
