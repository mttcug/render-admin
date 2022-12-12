export const getUrlParams = (key, urlParams) => {
  const params = formatUrlParams(urlParams) || {};
  return params[key] || "";
};

export const formatUrlParams = urlParams => {
  // ?type=edit&appid=$5sdfwer
  const entries = urlParams.trim().replace("?", "");
  const paramsList = entries.split("&");
  const result = {};
  paramsList.map(item => {
    const [key, value] = item.split("=");
    result[key] = value;
  });
  return result;
};
