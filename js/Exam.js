function Tologin() {
  document.getElementById("loginpage").style.opacity = "0";
  setTimeout(() => {
    window.location.replace("./pages/loading.html");
  }, 800);
}
function Show() {
  document.getElementById("Outside").style.opacity = "1";
  console.log("aaa");
  var m = 1;
  var s = 10;
  var timer = setInterval(function () {
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
  var questionArray = new Array("Q1", "Q2", "Q3", "Q4", "Q5");
  var resultArray = new Array();
  var rightArray = new Array();

  //aryAns[]是从后端返回的数组,当点击交卷的时候,向后端请求正确答案的数组,赋值给aryAns[]即可;
  var aryAns = new Array(4, 3, 4, 3, 2); //建立储存正确答案的数组
  for (var i = 0; i < questionArray.length; i++) {
    if (Name(questionArray[i]) != 10) {
      resultArray[i] = Name(questionArray[i]);
    } else {
      alert("第 " + (i + 1) + " 题 " + " 您未作答 !!");
      return false;
    }
  }
  // var right_number = 0; //计算答对的题数；
  // for (var i = 0; i < questionArray.length; i++) {
  //   if (aryAns[i] == resultArray[i]) {
  //     right_number++;
  //     rightArray[i] = 1;
  //   } else {
  //     rightArray[i] = 0;
  //   }
  // }
  // var right_question = " ";
  // var error_question = " ";
  // for (var i = 0; i < rightArray.length; i++) {
  //   if (rightArray[i] == 1) {
  //     right_question += i + 1 + ",";
  //   } else {
  //     error_question += i + 1 + ",";
  //   }
  // }
  // document.getElementById("right_number").innerText = right_number;
  // if (right_question != " ") {
  //   document.getElementById("right_question").innerText = right_question;
  // }
  // if (error_question != " ") {
  //   document.getElementById("error_question").innerText = error_question;
  // }
}

function Name(name) {
  var temp = document.getElementsByName(name);
  var intHot = 9;
  for (var i = 0; i < temp.length; i++) {
    if (temp[i].checked) intHot = temp[i].value;
  }
  if (intHot == 9) {
    return 10;
  }
  return intHot;
}
