const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "sesac",
  password: "1111",
  database: "sesac",
});

// 1. 전체 데이터 조회
exports.getVisitors = (cb) => {
  conn.query(`SELECT * FROM visitor`, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("visitor 테이블 전체 조회: ", rows);
    // 배열 형태로 들어옴
    /*
      [
        RowDataPacket { id: 1, name: '홍길동', comment: '내가 왔다.' },
        RowDataPacket { id: 2, name: '이찬혁', comment: '으라차차' }
      ]
     */
    cb(rows);
  });
};

// 2. 특정 데이터 조회
exports.getVisitor = (id, cb) => {
  conn.query(`SELECT * FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("visitor 테이블 특정 데이터 조회", rows);
    cb(rows[0]);
  });
};

// 3. 데이터 등록
// visitor 테이블에 데이터 삽입 => INSERT INTO
exports.postVisitor = (data, cb) => {
  // data = req.body ( name과 comment 정보가 있는 객체 형태)
  conn.query(
    `INSERT INTO visitor VALUE(null,'${data.name}','${data.comment}'`,
    (err, rows) => {
      // 문자열은 ''안에 ❗️
      if (err) {
        throw err;
      }
      console.log("model post", rows);
      /**
       OkPacket {
        fieldCount: 0,
        affectedRows: 1,
        ⭐️insertId: 4, // 현재 넣어진 id
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
        }
       */
      cb(rows.insertId);
    }
  );
};
// 4. 데이터 삭제
exports.deleteVisitor = (id, cb) => {
  conn.query(`DELETE FROM visitor WHERE id = ${id}`, (err, rows) => {
    if (err) throw err;

    console.log("모델 Visitor.js 데이터 삭제", rows);
    cb();
  });
};

// 5. 데이터 수정
exports.patchVisitor = (data, cb) => {
  console.log("model data", data);
  // {id : , name : , comment : }
  conn.query(
    `UPDATE visitor SET name = '${data.name}', comment = '${data.comment}' WHERE id = ${data.id}`,
    (err, rows) => {
      if (err) throw err;

      console.log("Visitor.js 수정", rows);
      cb();
    }
  );
};
