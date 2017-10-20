
export default (instance) => {
  // Add a response interceptor
  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    // Do something with response error
    let content = '';
    if (error.response) {
      content = error.response.data && error.response.data.msg;
    } else {
      content = error.message;
    }

    content = content || '请求出错, 请稍后重试';

    console.error(content);

    return Promise.reject(error);
  });
};
