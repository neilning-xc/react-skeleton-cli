const axios = require('axios')

axios.interceptors.response.use(res => {
  return res.data;
})

/**
 * 获取模板列表
 * @returns Promise
 */
async function getBranches() {
  return axios.get('https://api.github.com/repos/neilning-xc/react-ts-redux-template/branches');
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function  getTags(repo) {
  return axios.get(`https://api.github.com/repos/neilning-xc/react-ts-redux-template/tags`);
}

module.exports = {
  getBranches,
  getTags
}
