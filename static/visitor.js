const tbody = document.querySelector("tbody");
// 방명록 등록
// POST '/visitor'
function createVisitor() {
  const form = document.forms["visitor-form"];
  if (form.name.value.length === 0 || form.comment.value.length === 0) {
    alert("이름과 방명록을 모두 기입해주세요");
    return;
  }
  // 테이블 생성시 name 칼럼을 varchar(10)으로 설정
  // -->프론트에서 유효성검사 후 데이터 전송
  if (form.name.value.length > 10) {
    alert("이름은 10글자 미만으로 작성해주세요!");
    return;
  }
  axios({
    method: "post",
    url: "/visitor",
    data: {
      name: form.name.value,
      comment: form.comment.value,
    },
  })
    .then((res) => {
      console.log(res.data);
      const { id, name, comment } = res.data;
      const newhtml = `
        <tr id = "tr_${id}">
          <td>${id}</td>
          <td>${name}</td>
          <td>${comment}</td>
          <td><button onclick="editVisitor(${id})">수정</button></td>
          <td><button onclick="deleteVisitor(this,${id})">삭제</button></td>
        </tr>`;
      tbody.insertAdjacentHTML("beforeend", newhtml);
      // 문자열을 특정 요소의 맨 마지막으로('beforeend') HTML 추가
      form.reset();
    })
    .catch((err) => {
      console.error(err);
    });
}

// 방명록 삭제
// DELETE '/visitor'
function deleteVisitor(btn, id) {
  console.log(id);
  console.log(btn);
  axios({
    method: "delete",
    url: "/visitor",
    data: { id: id },
  })
    .then((text) => {
      console.log(text.data);
      //   btn.parentElement.parentElement.remove();
      btn.closest(`#tr_${id}`).remove();
      // 이 선택자를 가진 가장 가까운 조상 요소 선택
    })
    .catch((err) => {
      console.error(err);
    });
}

// 방명록 수정

// 수정 버튼을 누르면
// 1. 방명록 등록 창에 기존 데이터가 뜨면서 입력창으로 변함 --> 특정 데이터 조회
// GET '/visitor/:id'
function editVisitor(id) {
  const form = document.forms["visitor-form"];
  axios({
    method: "get",
    url: `/visitor/${id}`,
  })
    .then((res) => {
      console.log(res.data);
      const { id, name, comment } = res.data;
      form.name.value = name;
      form.comment.value = comment;

      const btnContainer = document.getElementById("btn-group");
      const html = `
                <button type="button" onclick="editDo(${id})">수정하기</button>
          <button type="button" onclick="editCancel()">수정 취소</button>

      `;
      btnContainer.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
    });
}

// 2-1. 실제 수정 데이터 요청 '방명록 등록' 버튼을 '수정하기'로 변경
// PATCH '/visitor'
function editDo(id) {
  const form = document.forms["visitor-form"];
  if (form.name.value.length === 0 || form.comment.value.length === 0) {
    alert("이름과 방명록을 모두 기입해주세요");
    return;
  }
  // 테이블 생성시 name 칼럼을 varchar(10)으로 설정
  // -->프론트에서 유효성검사 후 데이터 전송
  if (form.name.value.length > 10) {
    alert("이름은 10글자 미만으로 작성해주세요!");
    return;
  }
  axios({
    method: "patch",
    url: "/visitor",
    data: {
      id: id,
      name: form.name.value,
      comment: form.comment.value,
    },
  })
    .then((res) => {
      console.log(res.data); // "response patch"
      const tr = document.querySelector(`#tr_${id}`);
      console.log(tr);
      console.log(tr.children);
      const children = tr.children; // [td,td,td,td,td]
      children[1].textContent = form.name.value; // 작성자
      children[2].textContent = form.comment.value; // 방명록 내용

      editCancel();
    })
    .catch((err) => {
      console.error(err);
    });
}
//2-2. 수정 취소
function editCancel() {
  // (1) form 안의 input 초기화
  const form = document.forms["visitor-form"];
  // form.reset()
  form.name.value = "";
  form.comment.value = "";
  // 등록 버튼으로 바꾸기
  const btnContainer = document.getElementById("btn-group");
  btnContainer.innerHTML = `<button type="button" onclick="createVisitor()">방명록 등록</button>
  `;
}
