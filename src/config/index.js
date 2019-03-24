const conf = {
  ipStackKey:  process.env.ipstackApiKey
};

const get = (key) => {
  return conf[key];
}

const config = {
  get,
}
export default config;