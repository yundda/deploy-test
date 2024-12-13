// const Visitor = require("../model/Visitor");
const models = require("../models/index");
const { errorlogo } = require("../utils/common");
// console.log(Visitor.getVisitors());
// 얘가 문제임....

// GET '/'
exports.main = (req, res) => {
  res.render("index");
};

// GET '/visitors'
exports.getVisitors = (req, res) => {
  // [Sequelize 전]
  // Visitor.getVisitors((result) => {
  //   console.log("전체목록 Cvisitor.js", result);
  //   res.render("visitors", { data: result });
  // });

  // [Sequelize 후]
  // `SELECT * FROM visitor`가 적혀있음
  models.Visitor.findAll()
    .then((result) => {
      console.log("findAll :", result);
      // findAll의 결과는 배열
      res.render("visitors", { data: result });
    })
    .catch((err) => {
      console.error("getVisitors Controller Err", err);
      res.status(500).send("server err!");
    });
};

// GET '/visitor/:id'
exports.getVisitor = async (req, res) => {
  console.log(req.params); // { id: '1' }
  console.log(req.params.id); // 1
  // [Sequelize 전]
  // Visitor.getVisitor(req.params.id, (result) => {
  //   console.log("특정 데이터 Cvisitor.js", result);
  //   res.send(result);
  // });

  // [Sequelize 후]
  // `SELECT * FROM visitor WHERE id=${id}`
  try {
    const result = await models.Visitor.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log("findOne :", result);
    res.send(result);
    // 하나만 가져오기 때문에 항상 객체임!
  } catch (err) {
    console.error("getVisitors Controller Err", err);
    res.status(500).send("server err!");
  }
};

// POST '/visitor' 등록
exports.postVisitor = (req, res) => {
  console.log(req.body);
  // [Sequelize 전]
  // Visitor.postVisitor(req.body, (result) => {
  //   console.log("Cvisitor.js:", result);
  //   res.send({ id: result, name: req.body.name, comment: req.body.comment });
  // });

  // [Sequelize 후]
  // INSERT INTO visitor VALUE(null,'${data.name}','${data.comment}'
  models.Visitor.create({
    name: req.body.name,
    comment: req.body.comment,
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("server Err");
    });
};

// DELETE '/visitor'
exports.deleteVisitor = async (req, res) => {
  // [Sequelize 전]

  // console.log(req.body); // {id : '3'}
  // console.log(req.body.id); // '3'
  // Visitor.deleteVisitor(req.body.id, () => {
  //   res.send(req.body.id + "번 ID 삭제 완료");
  // });

  // [Sequelize 후]
  // DELETE FROM visitor WHERE id = ${id}
  try {
    const result = await models.Visitor.destroy({
      where: { id: req.body.id },
    });
    console.log(result);
    // 1 : 삭제 성공 , 0 : 삭제 실패(없는 데이터를 삭제하려고 할 때)
    // true       ,  false
    if (Boolean(result)) {
      // Num -> Boolean 형으로 변환
      res.send(req.body.id + "번 삭제 완료");
    } else {
      res.send("잘못된 접근입니다!");
    }
  } catch (err) {
    errorlogo(res, err);
  }
};

// PATCH '/visitor'
exports.patchVisitor = async (req, res) => {
  console.log(req.body);
  // [Sequelize 전]
  // Visitor.patchVisitor(req.body, () => {
  //   res.send("response patch");
  // });
  // [Sequelize 후]
  // UPDATE visitor SET name = '${data.name}', comment = '${data.comment}' WHERE id = ${data.id}
  try {
    const [result] = await models.Visitor.update(
      {
        name: req.body.name,
        comment: req.body.comment,
      },
      {
        where: { id: req.body.id },
      }
    );
    console.log(result); // [1], [0] 이라서 위에서 [result]로 변경하면 1, 0 숫자만 가져옴 (구조 분해 할당)
    if (Boolean(result)) {
      res.send("수정 완료");
    } else {
      res.send("잘못된 접근입니다.");
    }
  } catch (err) {
    errorlogo(res, err, "patch controller 내부");
  }
};
