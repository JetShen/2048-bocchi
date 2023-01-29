/**
 * Created by Administrator on 2015/2/17.
 */
function showNumberWithAnimation( i , j , randNumber ){

    var numberCell = $('#number-cell-' + i + "-" + j );

    numberCell.css('background-image',getNumberBackgroundColor( randNumber ) );
    numberCell.text( randNumber );

    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop( i , j ),
        left:getPosLeft( i , j )
    },50);
}
//showMoveAnimation(i, j, i, k);
function showMoveAnimation( fromx , fromy , tox , toy ){
    var numberCell = $('#number-cell-'+fromx+'-'+fromy );
    numberCell.animate({
        top:getPosTop( tox ,toy ),
        left:getPosLeft(tox ,toy)

    },200)
}
function updateScore(score) {
    $("#score").text(score);
    document.getElementById("score-values").value = score;
}/**
 * Created by Administrator on 2015/2/17.
 */

documentWidth = window.screen.availWidth;       //  屏幕宽度 作为参照尺寸
gridContainerWidth = 0.46 * documentWidth;      //游戏显示区域
cellSideLength = 0.09 * documentWidth;      //一个小格的尺寸
cellSpace = 0.02 *documentWidth;        //小格间距

//获取小方格的坐标
function getPosTop( i , j ){
    return cellSpace + i * (cellSideLength + cellSpace);
}

function getPosLeft( i , j ){
    return cellSpace + j * (cellSideLength + cellSpace);
}

//获取小方格的背景色
function getNumberBackgroundColor( number ){
    switch( number ){
        case 2:return 'url(/static/img/aaah.png)';break;
        case 4:return 'url(/static/img/b.png)';break;
        case 8:return 'url(/static/img/bocv.PNG)';break;
        case 16:return 'url(/static/img/thercok.PNG)';break;
        case 32:return 'url(/static/img/set.PNG)';break;
        case 64:return 'url(/static/img/fet.PNG)';break;
        case 128:return 'url(/static/img/gam1.PNG)';break;
        case 256:return 'url(/static/img/gam2.PNG)';break;
        case 512:return 'url(/static/img/gam3.PNG)';break;
        case 1024:return 'url(/static/img/gam4.PNG)';break;
        case 2048:return 'url(/static/img/gam5.PNG)';break;
        case 4096:return 'url(/static/img/gam6.PNG)';break;
        case 8192:return 'url(/static/img/gam7.PNG)';break;
    }

    return "black";
}
//获取小方格的字体颜色
function getNumberColor( number ){
    if( number <= 4 )
        return "#776e65";

    return "white";
}
//判断是否有空位置
function nospace( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if( board[i][j] == 0 )
                return false;

    return true;
}
//判断游戏是否结束
function isgameover(){

}
//判断是否可以向做移动
function canMoveLeft( board ){
    // 1.移动格的左侧相邻格子有空位置
    //2.移动格和左侧相邻格子等值
//    以上是可以移动的最起码条件  至少和相邻格子有上述关系才能移动，移动至少一个格
    for( var i =0 ; i < 4 ; i ++ ){
        for( var j = 1 ; j < 4 ; j ++ ){
            if( board[i][j] != 0){
                if (board[i][j - 1] == 0 || board[i][j-1] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}
function canMoveRight (board){
    for( var i =0 ; i < 4 ; i ++ ){
        for( var j = 0 ; j < 3 ; j ++ ){
            if( board[i][j] != 0){
                if (board[i][j + 1] == 0 || board[i][j+1] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}
function canMoveUp (board) {
    for( var i = 1 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i -1][j] == 0 || board[i - 1][j] == board[i][j] )
                    return true;
    return false;
}
// noBlockHorizontal( i , k , j ,board) 判断横向移动路线上是否有障碍物
function noBlockHorizontal ( row ,col1 , col2 ,board ){
    for ( var i= col1 + 1 ; i < col2 ;i ++ ){
        if( board[row][i] != 0 )
            return false;
    }
    return true;
}
// noBlockVertical( j , k , i , board) 判断纵向移动路线上是否有障碍物
function  noBlockVertical( col ,row1 ,row2 , board) {
    for ( var i= row1 +1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}
function canMoveDown( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;

    return false;
}
function gameover(){
    window.alert("GameOver！")
}
function nomove( board ) {
    if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)){
        return true;
    }
    return false;

}
/**
 * Created by Administrator on 2015/2/17.
 */
var board = [],     //棋盘格（2维）
     score,     //得分
    hasConflicted = [],     //碰撞检测，一个小格只允许发生一次数值的合并（2维）
    startx = 0,
    starty = 0,
    endx = 0,
    endy = 0;

$(function(){
    prepareForMobile();
    newGame();
});
function prepareForMobile() {
    if(documentWidth > 500) {//适应pc端
        gridContainerWidth =500;
        cellSideLength = 100;
        cellSpace = 20;
    }
    $("#grid-container").css('width',gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css('height',gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css('padding',cellSpace)
    $("#grid-container").css('border-radius',0.02 * gridContainerWidth);

    $(".grid").css('width',cellSideLength);
    $(".grid").css('height',cellSideLength);
    $(".grid").css('border-radius',0.02 * cellSideLength);
}
var newGame = function () {
    //棋盘初始化
    init();
    //随机生成两个数
    generateOneNumber();
    generateOneNumber();
}
function init (){
    //生成4*4的格子背景
    for(var i = 0 ; i < 4 ; i ++)
        for( var j = 0 ; j < 4 ; j ++ ){
            var gridCell = $('#grid-cell-'+i+"-"+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }

    //初始化二维数组board来存放2048的数值
    for( var i = 0 ; i < 4 ; i ++ ){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    //board[0][0] = 8;
   // board[0][1] = 4;
   // board[0][2] = 2;
   // board[0][3] = 2;

    updateBoardView();
    score = 0;
}
//显示前景：带数字的格子
function updateBoardView(){
    $(".number-cell").remove();
    //创建前景格子div
    for(var i = 0 ;i < 4 ; i ++){
        for(var j = 0 ; j < 4 ;j ++){
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
        }
    }
    //设置前景格子的样式： bgColor  color size top  left
    for(var i = 0 ;i < 4 ; i++){
        for(var j = 0 ; j < 4 ;j++){
            var numCell = $("#number-cell-"+i+"-"+j)

            if( board[i][j] == 0 ){
                //如果格子值为零，则格子大小为0，位置为背景格子中心（方便赋值时动画效果的显示）
                numCell.css("width","0px");
                numCell.css("height","0px");
                numCell.css("top",getPosTop(i,j) + cellSideLength / 2);
                numCell.css("left",getPosLeft(i,j) + cellSideLength / 2);
            }else{
                numCell.css("width",cellSideLength);
                numCell.css("height",cellSideLength);
                numCell.css("top",getPosTop(i,j) );
                numCell.css("left",getPosLeft(i,j));
                numCell.css('background-image',getNumberBackgroundColor( board[i][j] ) );
                numCell.text( board[i][j] );
            }
            hasConflicted[i][j] = false; //碰撞的值归位
        }
    }
    $(".number-cell").css('line-height',cellSideLength +"px");
    $(".number-cell").css('font-size', 0.6 * cellSideLength + "px");
}
//在随机格子上生成数字
function generateOneNumber(){

    if( nospace( board ) )
        return false;

    //随机一个位置，50次规约优化
    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );
    var times = 0
    while( times < 50 ){
        if( board[randx][randy] == 0 )
            break;

        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );
        times ++ ;
    }
    //如果50次随机定位都没有找到空位置，则
    if( times == 50 ) {
        for(var i = 0 ; i < 4 ; i++ ){
            for( var j = 0 ; j < 4 ; j ++){
                if(board[i][j] == 0){}
                randx = i;
                randy = j;
            }
        }
    }
    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );

    return true;
}
//键盘按下事件
$(document).keydown(function(event){
    // event.preventDefault();android Version 4.0 BUG ! touchmove 绑定事件 event.preventDefault();
    switch ( event.keyCode ) {
        case 37: //left
            //!!!!!!判断是否向左移动了，移动了则更新并判断是否结束
            event.preventDefault();//阻止默认行为
            if (moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",350);
            }
            break;
        case 38: //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",350);
            }
            break;
        case 39: //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",350);
            }
            break;
        case 40: //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",350);
            }
            break;
        //没有默认的default
    }
});

//touch事件监听
document.addEventListener('touchstart', function (event) {
    startx = event.touches[0].pageX;
    starty =event.touches[0].pageY;
})
document.addEventListener('touchmove', function (event) {
    event.preventDefault(); //
})
document.addEventListener('touchend', function (event) {
    endx = event.changedTouches[0].pageX;
    endy =event.changedTouches[0].pageY;

    var deltax = endx -startx;
    var deltay = endy -starty;

    //防止将点击判断为滑动
    if(Math.abs(deltax) < 0.07 * documentWidth &&Math.abs(deltay) < 0.07 * documentWidth){
        return ;
    }

    //x
    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax > 0){
            // move right
            if (moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",310);
            }
        }
        else{
            //move left
            if (moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",310);
            }
        }
    }else{//y
        //move up
        if(deltay >0){
            if (moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",310);
            }
        }else{
            //move down
            if (moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",310);
            }
        }
    }

})




function moveLeft(){
    //
    if( !canMoveLeft (board) )
        return false;
    //moveLeft
    // break 和 continue 用啥都一样！！！
    for( var i = 0 ; i < 4 ; i ++){     //遍历行
        for( var j = 1 ; j < 4 ; j ++ ){    // 遍历列（ 如果是向左移动则能移动的格子肯定是从第二列开始，）
            if( board[i][j] != 0 ){         // 存放数值的数组，初值为0， 如果不为0，则说明有值，就要对此格子进行判断是否有向左移动的条件
                for( var k = 0 ; k < j ; k ++ ){    //新的遍历列， 从0列到j-1列，如果有空，或者相等的值则board[i][j]可以向左移动
                    if( board[i][k] == 0 && noBlockHorizontal(i ,k ,j ,board)){
                        //move
                        showMoveAnimation( i , j , i , k );//这只是一个移动动画
                        board[i][k] = board[i][j];  //给目标格子赋值
                        board[i][j] = 0;            //移动格子该为初值为0
                        break;                      //break 和continue的问题
                        // 以 2 2 4 8为例 ： 如果是 break ，按一次向左 结果是： 4 4 8 【】 ;如果是continue： 按一次左结果是 16 【】 【】 【】 能说说下为啥吗？
                    }else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j ,board) && !hasConflicted[i][k] ) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        //碰撞标志设为true，在此次移动中拒绝下次合并
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }
    //移动的动画效果设置的时间是200毫秒；
    // 但是整个for循环的时间很短暂，可能就几毫秒
    //  接下来就会执行updateBoardView，里面有一个remove（）函数
    //也就是说 格子的移动动画才执行了若干秒就被移除，而现实新的格子
    setTimeout("updateBoardView()",200);
    return true;
}

function  moveRight () {
    if( !canMoveRight(board))
        return false;
    //move Right
//    for( var i = 0 ; i < 4 ; i ++ )
//        for ( var j = 0 ; j < 3 ; j ++ )
//            if( board[i][j] != 0 )
//                for( var k = j + 1 ; k < 4 ; k ++ ) {

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- )
            if( board[i][j] != 0 )
                for( var k = 3 ; k > j ; k -- ){

                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        break;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)  && !hasConflicted[i][k] ) {
                        showMoveAnimation(i, j, i, k)
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        break
                    }
                }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp() {
    //judge
    if (!canMoveUp)
        return false;
    // move
    for (var i = 1; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] != 0)
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //animation
                        showMoveAnimation( i , j , k , j );
                        //recount cell value
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)  && !hasConflicted[k][j] ) {
                        showMoveAnimation( i , j , k , j );
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        break;
                    }
                }
    setTimeout("updateBoardView()",200);
    return true;
 }
function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board )  && !hasConflicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}
