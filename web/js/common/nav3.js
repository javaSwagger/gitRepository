var isLogin=false;

$(function () {
    var v_navHtml = "<nav class=\"navbar navbar-inverse\">\n" +
        "    <div class=\"container-fluid\">\n" +
        "        <!-- Brand and toggle get grouped for better mobile display -->\n" +
        "        <div class=\"navbar-header\">\n" +
        "           <ul> <li><a class=\"navbar-brand\" href='/'>飞狐电商前台666</a></li></ul>\n" +
        "        </div>\n" +
        "\n" +
        "        <!-- Collect the nav links, forms, and other content for toggling -->\n" +
        "        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">" +
        "            <ul class=\"nav navbar-nav navbar-right\" id='nav_ul'>" +
        "                <li id=\"loginInfo\"><a href=\"/login.html\">登录</a></li>" +
        "                <li><a href=\"/register.html\">注册</a></li>" +
        "                <li><a href=\"/cart-student.html\">购物车</a></li>" +
        "            </ul>\n" +
        "        </div><!-- /.navbar-collapse -->\n" +
        "    </div><!-- /.container-fluid -->\n" +
        "</nav>";

    $("#navDiv").html(v_navHtml);

    //在每次使用ajax请求时都会带着这个token
    $.ajaxSetup({
        beforeSend: function(xhr) {
            var token = window.localStorage.getItem("atoken");
            console.log("token:"+token);
            xhr.setRequestHeader("token",token);
        }
    })

    //查询用户是否已经登陆
    $.ajax({
        url:"http://localhost:8086/car/getMembers.do",
        type:"post",
        async:false,
        dataType:"json",
        success:function(data){
            if (data.status==200){
                isLogin=true;
                var meName = data.data;
                $("#loginInfo").html('<a>欢迎'+meName+'登录!!</a>');
                $("#nav_ul").append('<li><a  onclick="loginOut()">退出</a></li>');
            }
        }
    })
})
    //加入购物车的方法
    function buy(productId,count) {
        $.post(
            "http://localhost:8086/car/buy.do",
            {"productId":productId,"count":count},
            function (data) {
                if (data.status == 200){
                    window.location.href="cart-student.html";
                }else {
                    alert("token失效");

                }            }
        )
    }
    /*
    * 退出登录
    * */
    function loginOut(){
        $.post(
            "http://localhost:8086/members/loginOut.do",
            function(data){
                if (data.status ==200){
                    location.href="shop.html";
                }
            }
        )
    }








