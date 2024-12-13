const express = require("express");
const db = require("./models");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

/* 미들웨어 */
app.set("view engine", "ejs");
app.set("views", "./views"); // 생략 가능

app.use("/static", express.static(__dirname + "/static"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* 라우터 */
const indexRouter = require("./routes/index"); // 파일명이 index이면 생략 가능
app.use("/", indexRouter);

//404 설정
app.get("*", (req, res) => {
  res.render("404");
});

db.sequelize.sync({ force: false }).then((result) => {
  // sync({force:false}) or sync() 기존에 만들어둔 visitor 테이블을 연결
  // console.log(result);
  console.log("DB 연결 성공");
  // 서버 열기 - 얘가 가장 밑에 떴으면 좋겠을 때는 이렇게 then 안에 넣기
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});

// app.listen(PORT, () => {
//   console.log(`http://localhost:${PORT}`);
// });
