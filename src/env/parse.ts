import * as process from 'process';

const transformEnvToObj = (envName: string) => {
  return JSON.parse(process.env[envName]);
};

export default () => {
  const apiToken = transformEnvToObj('API_AUTH_TOKEN');

  return {
    auth: {
      token: apiToken.token,
    },
  };
};
