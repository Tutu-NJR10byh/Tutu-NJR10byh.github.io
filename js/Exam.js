var timer = null;
var teacherId = "";
var chance = "";
// index.html
function Tologin() {
  alert("答题已结束！");
  // let name = document.getElementById("name").value;
  // var number = document.getElementById("number").value;
  // teacherId = document.getElementById("number").value;
  // if (name == "" || number == "") {
  //   alert("请将姓名、工号填写完整");
  // } else {
  //   if (
  //     confirm(
  //       "请您确认\n填写的姓名和工号是否正确\n姓名：" +
  //       name +
  //       "\n工号：" +
  //       number
  //     )
  //   ) {
  //     axios
  //       .post("http://39.104.78.253/teacher/Login", {
  //         teacherName: name,
  //         teacherId: number,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         if (res.data.code == 0) {
  //           alert("登录成功!");
  //           document.getElementById("loginpage").style.opacity = "0";
  //           let url = "./pages/loading.html" + "?" + "teacherId=" + number;
  //           setTimeout(() => {
  //             window.location.replace(url);
  //           }, 800);
  //         } else if (res.data.code == 1) {
  //           alert(res.data.errMessage);
  //           return false;
  //         }
  //       });
  //   } else {
  //     return false;
  //   }
  // }
}
function ChangeTopimg1() {
  event.stopPropagation();
  document.getElementById("topimg").style.filter = "blur(3px)";
}
function ChangeTopimg2() {
  event.stopPropagation();
  document.getElementById("topimg").style.filter = "blur(3px)";
}
function Backtopimg() {
  // console.log("aaa");
  document.getElementById("topimg").style.filter = "blur(0px)";
}

// Exam.html
function Show() {
  teacherId = location.href.split("=")[1].split("&")[0];
  chance = location.href.split("=")[2];
  if (chance == 0) {
    document.getElementById("btntext").innerHTML = "查看答案";
  }
  document.getElementById("Outside").style.opacity = "1";
  // console.log("aaa");
  document.getElementById("time").style.opacity = "1";
  var m = 40;
  var s = 0;
  timer = setInterval(function () {
    if (m >= 0) {
      if (s < 10) {
        $("#time").html("剩余时间: " + "&nbsp" + m + ":0" + s);
      } else {
        $("#time").html("剩余时间: " + "&nbsp" + m + ":" + s);
      }
      if (m == 1 && s == 0) {
        alert("答题时间仅剩 3 分钟，时间到题目将自动提交！！");
      }
      if (m == 0 && s == 0) {
        submit();
        clearInterval(timer);
        alert("时间到，题目已自动提交！");
      }
      s--;
      if (s < 0) {
        s = 59;
        m--;
      }
    }
  }, 1000);
}
function two_char(n) {
  return n >= 10 ? n : "0" + n;
}

// 提交分数
function submit() {
  clearInterval(timer);
  var questionArray = new Array(
    "Q1",
    "Q2",
    "Q3",
    "Q4",
    "Q5",
    "Q6",
    "Q7",
    "Q8",
    "Q9",
    "Q10",
    "Q11",
    "Q12",
    "Q13",
    "Q14",
    "Q15",
    "Q16",
    "Q17",
    "Q18",
    "Q19",
    "Q20"
  );
  var resultArray = new Array();
  var rightArray = new Array();
  var right_number = 0; //计算答对的题数；

  var aryAns = new Array(1, 1, 2, 4, 3, 1, 4, 1, 4, 4, 3, 1, 4, 4, 4, 3, 1, 1, 2, 1); //正确答案的数组
  var answer = new Array(
    "A",
    "A",
    "B",
    "D",
    "C",
    "A",
    "D",
    "A",
    "D",
    "D",
    "C",
    "A",
    "D",
    "D",
    "D",
    "C",
    "A",
    "A",
    "B",
    "A"
  );
  for (var i = 0; i < questionArray.length; i++) {
    if (Name(questionArray[i])) {
      alert("第 " + (i + 1) + " 题 " + " 您未作答 !!");
      return false;
    } else {
      resultArray[i] = Name1(questionArray[i]);
    }
  }
  $("#btn").attr("disabled", true);
  for (var i = 0; i < questionArray.length; i++) {
    // 单选
    if (aryAns[i] == resultArray[i]) {
      right_number++;
      rightArray[i] = 1;
    } else {
      rightArray[i] = 0;
    }
  }
  var error_question = " ";
  for (var i = 0; i < rightArray.length; i++) {
    if (rightArray[i] == 0) {
      error_question += i + 1 + "(" + answer[i] + ")" + ", ";
    }
  }
  let Fen = right_number * 5;
  if (location.href.split("=")[2] != 0) {
    // 上传分数
    axios
      .post("http://39.104.78.253/teacher/upScore", {
        "teacherId": teacherId,
        "score": Fen,
      })
      .then((res) => {
        console.log(res);
      });
  }
  if (Fen >= 80) {
    document.getElementById("download").href = "http://39.104.78.253/teacher/getCertificate?teacherId=" + teacherId;
    document.getElementById("successpage").style.opacity = "1";
  } else {
    document.getElementById("lostpage").style.opacity = "1";
  }
  document.getElementById("Fen").innerText = Fen;
  document.getElementById("right_number").innerText = right_number;
  if (error_question != " ") {
    document.getElementById("error_question").innerText = error_question;
  }
  document.getElementById("result").style.opacity = "1";
}

// 检测题目是否作答
function Name(name) {
  let temp = document.getElementsByName(name);
  let flag = true;
  for (var i = 0; i < temp.length; i++) {
    if (temp[i].checked) {
      flag = false;
    }
  }
  if (flag) {
    return true;
  } else {
    return false;
  }
}
// 单选
function Name1(name) {
  let temp = document.getElementsByName(name);
  let intHot = 10;
  for (var i = 0; i < temp.length; i++) {
    if (temp[i].checked) {
      intHot = temp[i].value;
    }
  }
  return intHot;
}
// 多选
// function Name2(name) {
//   let temp = document.getElementsByName(name);
//   let result = new Array();
//   for (var i = 0; i < temp.length; i++) {
//     if (temp[i].checked) {
//       result.push(temp[i].value);
//     }
//   }
//   return result;
// }
// 返回
function back() {
  console.log(teacherId);
  document.getElementById("Outside").style.opacity = "0";
  let url = "../pages/loading.html" + "?" + "teacherId=" + teacherId;
  setTimeout(() => {
    window.location.replace(url);
  }, 800);
}
