var timer = null;

// index.html
function Tologin() {
  document.getElementById("loginpage").style.opacity = "0";
  setTimeout(() => {
    window.location.replace("./pages/loading.html");
  }, 800);
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
  document.getElementById("Outside").style.opacity = "1";
  // console.log("aaa");
  document.getElementById("time").style.opacity = "1";
  var m = 30;
  var s = 0;
  timer = setInterval(function () {
    if (m >= 0) {
      if (s < 10) {
        $("#time").html("剩余时间: " + "&nbsp" + m + ":0" + s);
      } else {
        $("#time").html("剩余时间: " + "&nbsp" + m + ":" + s);
      }
      if (m == 1 && s == 0) {
        alert("答题时间仅剩 1 分钟，时间到题目将自动提交！！");
      }
      if (m == 0 && s <= 0) {
        submit();
        alert("时间到，题目已自动提交！");
        clearInterval(timer);
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

  var aryAns = new Array(
    1,
    2,
    3,
    1,
    3,
    4,
    2,
    2,
    1,
    3,
    1,
    2,
    3,
    2,
    4,
    2,
    1,
    1,
    -1,
    -2
  ); //正确答案的数组
  var answer = new Array(
    "A",
    "B",
    "C",
    "A",
    "C",
    "D",
    "B",
    "B",
    "A",
    "C",
    "A",
    "B",
    "C",
    "B",
    "D",
    "B",
    "A",
    "A",
    "ABC",
    "ABCE"
  );
  for (var i = 0; i < questionArray.length; i++) {
    if (Name(questionArray[i]) != 10) {
      resultArray[i] = Name(questionArray[i]);
    } else {
      alert("第 " + (i + 1) + " 题 " + " 您未作答 !!");
      return false;
    }
  }
  console.log(resultArray);
  $("#btn").attr("disabled", true);
  var right_number = 0; //计算答对的题数；
  for (var i = 0; i < questionArray.length; i++) {
    if (aryAns[i] == -1 || aryAns[i] == -2) {
      //多选
      switch (aryAns[i]) {
        case -1:
          console.log(-1);
          break;
        case -2:
          console.log(-2);
          break;
        default:
          break;
      }
    } else {
      // 单选
      if (aryAns[i] == resultArray[i]) {
        right_number++;
        rightArray[i] = 1;
      } else {
        rightArray[i] = 0;
      }
    }
  }
  var right_question = " ";
  var error_question = " ";
  for (var i = 0; i < rightArray.length; i++) {
    if (rightArray[i] == 1) {
      right_question += i + 1 + ",";
    } else {
      error_question += i + 1 + "(" + answer[i] + ")" + ",";
    }
  }
  document.getElementById("Fen").innerText = right_number * 5;
  document.getElementById("right_number").innerText = right_number;
  if (right_question != " ") {
    document.getElementById("right_question").innerText = right_question;
  }
  if (error_question != " ") {
    document.getElementById("error_question").innerText = error_question;
  }
  document.getElementById("result").style.opacity = "1";
}

// 检测题目是否作答
function Name(name) {
  var temp = document.getElementsByName(name);
  // console.log(temp);
  var intHot = 9;
  for (var i = 0; i < temp.length; i++) {
    if (temp[i].checked) {
      intHot = temp[i].value;
    }
  }
  if (intHot == 9) {
    return 10;
  }
  return intHot;
}
