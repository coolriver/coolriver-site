import axios from 'axios';
import apiConf from '../../../config/api-config';
import errorHandler from './interceptors/error-handler';

const instance = axios.create({
  timeout: apiConf.timeout
});

// 添加 showDefaultError 配置项
// 是否默认错误处理
errorHandler(instance);

export default instance;
