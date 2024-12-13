// jsdocs
/**
 * 서버 에러가 났을 때 실행될 코드 모음
 * @param {Response} res
 * @param {Error} err 실제 에러 전달
 * @param {string} errMsgInServer 서버 콘솔에 띄워줄 메시지
 * @param {string} errMsgInClient 클라이언트에게 보내줄 메시지
 * @param {number} statusCode 에러의 상태 코드
 */

exports.errorlogo = (
  res,
  err,
  errMsgInServer = "ERROR!",
  errMsgInClient = "Internal Server Error!",
  statusCode = 500
) => {
  console.log(errMsgInServer, err); // 어디에서 났는지 보여줄 것
  res.status(statusCode).send(errMsgInClient);
};
