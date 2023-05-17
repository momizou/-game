//先行
const FirstMark = '○';

//後攻
const NextMark = '×';

//ターン数
let count = 1;

//マス目のIDリスト
const ids = [
  ['b1', 'b2', 'b3'],
  ['b4', 'b5', 'b6'],
  ['b7', 'b8', 'b9'],
];

//ゲーム実行中のフラグ
let isRun = true;

//IDからオブジェクトを取得する
function $(id) {
  return document.getElementById(id);
}

//先行のターンかどうかを判定する
function isFirstMove () {
  let isFirst = count % 2;
  return isFirst ===1;
}

//ターンの表示を切り替える
function changeDisplayCount() {
  if (isFirstMove()) {
    //先行のターンを表示する
    $('display-count').innerHTML = FirstMark + 'の番！'
  } else {
    //後攻のターンを表示する
    $('display-count').innerHTML = NextMark + 'の番！'
  }
}

///試合終了を判定する
function judgeEnd() {

  let isEnd = false;
  
  //横3マスが同じマークかを判定する
  for(let row=0; row < 3; row++) {
    isEnd = isWin(ids[row][0], ids[row][1], ids[row][2]);
     if (isEnd) {
      displayResult($(ids[row][0]).value + 'の勝ち！');
      return true;
    }
  }

  //縦3マスが同じマークかを判定する

  for(let col=0; col < 3; col++) {
    isEnd = isWin(ids[0][col], ids[1][col], ids[2][col]);
    if (isEnd) {
      displayResult($(ids[0][col]).value + 'の勝ち！');
      return true;
    }
  }

  //斜め3ますが同じマークかを判定する（右下がり）
  isEnd = isWin(ids[0][0], ids[1][1], ids[2][2]);
  if (isEnd) {
    displayResult($(ids[0][0]).value + 'の勝ち！');
    return true;
  }

  //斜め3ますが同じマークかを判定する（左下がり）
  isEnd = isWin(ids[0][2], ids[1][1], ids[2][0]);
  if (isEnd) {
    displayResult($(ids[0][2]).value + 'の勝ち！');
    return true;
  }

  //引き分けの判定
  if (9 <= count) {
    displayResult('引き分け！');
    return true;
  }

  return false;
}

//勝利を判定する
function isWin(firstId, secondId, thirdId) {
  if ($(firstId).value ==='')  {
    return false;
  }
  if ($(secondId).value ==='')  {
    return false;
  }
  if ($(thirdId).value ==='')  {
    return false;
  }
  if (
    ($(firstId).value === $(secondId).value)
      && ($(secondId).value === $(thirdId).value) 
      ) {
    return true;
  }

    return false;
  
}

//勝敗の結果を表示する
function displayResult(message) {
  $('display-result').innerHTML = message;
  isRun = false;
  //もう一度遊ぶボタンを表示する
  $('reset').style.display = '';
}

//マスを選択するアクション
function clickAction(event) {
  //ゲーム実行中でなければ何もせずに終了
  if(!isRun) {
    return;
  }
  let id = event.target.id;
  let object = $(id);

  if (object.innerHTML !=='') {
    return;
  }

  if(isFirstMove()) {
    object.value = FirstMark;
  } else {
    object.value = NextMark;
  }

  if (judgeEnd()) {
    return;
  }

  count = count + 1;
  changeDisplayCount();
}

//もう一度遊ぶボタンが押された場合の処理
function resetAction() {
  //ターンを1に戻す
  count = 1;
  changeDisplayCount();
  //マス目を空にする
  for (let row=0; row < 3; row++) {
    for (let col=0; col < 3; col++) {
      $(ids[row][col]).value = '';
    }
  }
  //結果の表示をリセットする
  displayResult('');
  //ゲームを実行中に戻す
  isRun = true;
  //もう一度遊ぶボタンを非表示にする
  $('reset').style.display = 'none';
}

//画面を読み込んだ時の処理
function onloadAction() {
  for (let row=0; row < 3; row++) {
    for (let col=0; col < 3; col++) {
      $(ids[row][col]).onclick = clickAction;
    }
  }
  //もう一度遊舞ボタンにイベントを設定する
  $('reset').onclick = resetAction;

  //リセットアクションを実行
  resetAction();

}

window.onload = onloadAction;