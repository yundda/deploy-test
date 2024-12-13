const Visitor = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "visitor",
    {
      // id INT AUTO_INCREMENT PRIMARY KEY,
      // name VARCHAR(10) NOT NULL,
      // comment mediumtext
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT("medium"),
      },
    }, // 칼럼 정의
    {
      timestamps: false,
      // 데이터 추가/수정 컬럼을 자동으로 만들어서 기록
      // default ; true
      freezeTableName: true,
      // 첫번째 인자로 전달 해준 모델 이름('visitor')을 그대로 사용
      // 테이블 이름 고정하겠다 ; default는 복수형으로 바꿈
    }
  );
  return model;
};
module.exports = Visitor; // models/index.js에서 사용할 예정
