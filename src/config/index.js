const conf = {
  ipStackKey:  process.env.IP_STACK_API_KEY,
  area_codes: {
    NO: {
      code: '+47',
      format: 'XXX-XX-XXX'
    },
    SE: {
      code: '+46',
      format: 'XXX-XX-XXX'
    },
    DK: {
      code: '+45',
      format: 'XXX-XX-XXX'
    },
    UK: {
      code: '+44',
      format: 'XXX-XX-XXX'
    },
    FR: {
      code: '+33',
      format: 'XXX-XX-XXX'
    },
    CH: {
      code: '+41',
      format: 'XXX-XX-XXX'
    },
    ES: {
      code: '+34',
      format: 'XXX-XX-XXX'
    }
  }
};

const get = (key) => {
  return conf[key];
}

const config = {
  get,
}
export default config;