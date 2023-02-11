export default {
  //dbUri:
  //'mongodb://store-mongo:5hsSD3NKyK5WxsQo8AQxuK1Z39ogRg0arsHHJlKGK6XvCRjepWLzdnowCCfqfLVdUvYth9N55hN5ACDbt9f1jw%3D%3D@store-mongo.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@store-mongo@',
  dbUri: 'mongodb://localhost:27017/store',
  logLevel: 'info',
  port: 3000,
  accessTokenPrivateKey: '',
  refreshTokenPrivateKey: '',
  smtp: {
    user: 'pedro7@ethereal.email',
    pass: 'gkfnHx75QhdDQ3Ej1v',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
  },
};
