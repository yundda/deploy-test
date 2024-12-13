"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];
// config 폴더에서 development(개발 환경)만 남기고 삭제 했기 때문에 이렇게 변경
// env 사용했을 때는 confing.js로만 변경
console.log("config", config);
// 객체를 가져왔기 때문에 []로 호출
// { development {
//       username: 'sesac',
//       password: '1111',
//       database: 'sesac',
//       host: '127.0.0.1',
//       dialect: 'mysql'
//   }
// }
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
// 키 값 = 설정 값
//위에서 설정한 정보(좌측 sequelize)를 db의 sequelize라는 키에 넣어주는 중 즉, 아래와 같은 과정
// {
//   sequelize : sequelize
// }
db.Sequelize = Sequelize;
// Sequelize 모듈(맨 위 설정)을 Sequelize 라는 key안에 넣어주는 중
// {
//   sequelize :sequelize,
//   Sequelize : Sequelize
// }

//-------위는 아래에서 변수에 담아 보내기 위한 과정---------

//-------아래는 실질적으로 controller에서 사용할 모델-------
db.Visitor = require("./Visitor")(sequelize, Sequelize);
// {
//   sequelize :sequelize,
//   Sequelize : Sequelize,
//   Visitor : visitor의 model을 추가해준 것
// }
// db.User = require("./Visitor")(sequelize, Sequelize);
// 🖐또 다른 모델(,테이블) 추가 해주고 싶으면 models 안에 새 파일을 만들고 위처럼 똑같이&파일명("./Visitor")만 바꿔서!
module.exports = db;
// app.js에서 db.sequelize.sync()에서 사용
// sequelize는 db.Visitor의 인자로 Visitor.js에서 Sequelize로 호출
// Sequelize.define('visitor')으로 'visitor' 모델 추가
//  visitor 테이블과 연결
