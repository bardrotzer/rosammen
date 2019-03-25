const conf = {
  ipStackKey:  process.env.IP_STACK_API_KEY,
};

const get = (key) => {
  return conf[key];
}

const config = {
  get,
}
export default config;