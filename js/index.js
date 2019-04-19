$(function () {
    var wechat = new Vue({
        el: "#warp",
        data: {
            userNames: ["只求一份安定", "无可置疑◆", "吥↘恠侑嗳↘", "丶演绎悲伤", "一生承诺", "简单灬爱", "流年灬未亡", "舞动Dē灵魂￠", "别在我面前犯贱", "__没有背景丶只有背影", "乂日光倾城¤", "丶猫猫er", "雪花ミ飞舞", "在哪跌倒こ就在哪躺下", "淡抹丶悲伤", "メ稀饭你的笑", "﹏﹏那年一路向北", "纯真ブ已不复存在", "∞◆暯小萱◆", "や眼角⒈絲淚丶", "越疯癫的女人、心越脆弱", "开心的笨小孩", "虚张 声 势丶", "姬〆小溅", "涐们的幸福像流星丶", "吾皇万岁_万万岁", "倾听冷暖丿", "﹡巴黎铁塔", "_倾月轩萱_", "相见不如怀念〆", "沵算what°", "放手也是一种罪过‖", "有妳很瞞促", "早已▲沧海桑田", "冷落了♂自己·", "帶著面具過日子~", "體溫 ㎝ ╮", "哥，淫领时尚", "●芣へ慬っ爱", "筱┓熙┓", "从未消失的孤独", "丶七炫灬", "╰つ卸不掉的素装ゝ", "你永远都不知道我有多爱你", "哼唱 小情歌", "淡抹、煙熏妝丶", "◆残留德花瓣"],
            gust: [
                {
                    headImg: "",
                    userName: "",
                    sendImg: ""
                }
            ],
            admin: {
                
            },
            msg: [],
            time: {
                year: "",
                month: "",
                day: "",
                hour: "",
                min: ""
            },
            title:""
        },

    })
    _init_ = function () {
        var nowTime = new Date();
        var year = nowTime.getFullYear();
        var month = nowTime.getMonth() + 1;
        var day = nowTime.getDate();
        var hour = nowTime.getHours();
        var min = nowTime.getMinutes();
        min = min < 10 ? "0" + min : min;
        wechat.time.year = year;
        wechat.time.month = month;
        wechat.time.day = day;
        wechat.time.hour = hour;
        wechat.time.min = min;
        wechat.msg.push({
            type: "time",
            value: month + "月" + day + "日 " + hour + ":" + min
        })

        var headLength = 12;
        var gustHead = Math.floor(Math.random()*headLength);   //可均衡获取0到1的随机整数
        var adminHead = Math.floor(Math.random()*headLength);
        var gustImg = Math.floor(Math.random()*headLength);
        var adminImg = Math.floor(Math.random()*headLength);

        var nameLength = wechat.userNames.length
        var gustName = wechat.userNames[Math.floor(Math.random()*nameLength)]  //可均衡获取0到1的随机整数
        var adminName = wechat.userNames[Math.floor(Math.random()*nameLength)]
        wechat.title = gustName;
        wechat.gust[0] = { 
            headImg: "images/heads/"+gustHead+".jpg",
            userName: gustName,
            sendImg: "images/heads/"+gustImg+".jpg",
        }
        wechat.admin = {
            headImg: "images/heads/"+adminHead+".jpg",
            userName: adminName,
            sendImg: "images/heads/"+adminImg+".jpg",
        }

    }
    _init_()
    $(".set").on("click", function () {
        var year = $(".set_year").val();
        var month = $(".set_month").val();
        var day = $(".set_day").val();
        var hour = $(".set_hour").val();
        var min = $(".set_min").val();
        min = min < 10 ? "0" + min : min;
        wechat.msg.push({
            type: "time",
            value: year + "年" + month + "月" + day + "日 " + hour + ":" + min
        })
    })
    $(".gust_head").on("click", function () {
        var index = $(this).parent().parent().index()
        var gust_upload = $(".gust_upload_head").eq(index)
        gust_upload.click();
        gust_upload.on("change", function () {
            var filePath = $(this).val(), //获取到input的value，里面是文件的路径
                fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
                src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
            wechat.gust[index].headImg = src;
        })
    })
    $(".admin_head").on("click", function () {
        $(".admin_upload_head").click();
        $(".admin_upload_head").on("change", function () {
            var filePath = $(this).val(), //获取到input的value，里面是文件的路径
                fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
                src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
            wechat.admin.headImg = src;
        })
    })
    $(".set_Gustname").on("click", function () {
        var index = $(this).parent().parent().index()
        var value = $(".gust_name").eq(index).val()
        wechat.gust[index].userName = value;
    })
    $(".setAdminName").on("click", function () {
        var value = $(".admin_name").val()
        wechat.admin.userName = value;
    })
    $(".gust_send_text").on("click", function () {
        console.log("sss")
        var index = $(this).parent().parent().index()
        var value = $(".gust_text").eq(index).val()
        var head = wechat.gust[index].headImg
        wechat.msg.push({
            type: "text",
            align: "left",
            value: value,
            head: head
        })
    })
    $(".admin_send_text").on("click", function () {
        var value = $(".admin_text").val()
        wechat.msg.push({
            type: "text",
            align: "right",
            value: value,
        })
    })
    $(".gust_img").on("click", function () {
        var index = $(this).parent().parent().index()
        var gust_upload = $(".gust_upload_img").eq(index)
        gust_upload.click();
        gust_upload.on("change", function () {
            var filePath = $(this).val(), //获取到input的value，里面是文件的路径
                fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
                src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
            wechat.gust[index].sendImg = src;
        })
    })
    $(".gust_send_img").on("click", function () {
        var index = $(this).parent().parent().index()
        var value = $(".gust_img").eq(index).attr('src')
        console.log(value)
        var head = wechat.gust[index].headImg
        wechat.msg.push({
            type: "img",
            align: "left",
            value: value,
            head: head
        })
    })
    $(".admin_img").on("click", function () {
        $(".admin_upload_img").click();
        $(".admin_upload_img").on("change", function () {
            var filePath = $(this).val(), //获取到input的value，里面是文件的路径
                fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
                src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
            wechat.admin.sendImg = src;
        })
    })
    $(".admin_send_img").on("click", function () {
        var value = $(".admin_img").attr('src')
        wechat.msg.push({
            type: "img",
            align: "right",
            value: value,
        })
    })
    $(".gust_send_voice").on("click", function () {
        var index = $(this).parent().parent().index()
        var value = $(".gust_voice").eq(index).val() + '"'
        var head = wechat.gust[index].headImg
        wechat.msg.push({
            type: "voice",
            align: "left",
            value: value,
            head: head
        })
    })
    $(".admin_send_voice").on("click", function () {
        var value = $(".admin_voice").val()
        wechat.msg.push({
            type: "voice",
            align: "right",
            value: value,
        })
    })
    $(".gust_send_money").on("click", function () {
        var index = $(this).parent().parent().index()
        var value = "￥" + $(".gust_money").eq(index).val()
        var head = wechat.gust[index].headImg
        var user = "转账给" + wechat.admin.userName
        wechat.msg.push({
            type: "money",
            align: "left",
            value: value,
            head: head,
            user: user
        })
    })
    $(".admin_send_money").on("click", function () {
        var value = "￥" + $(".admin_money").val()
        var user = "转账给" + wechat.gust[0].userName
        wechat.msg.push({
            type: "money",
            align: "right",
            value: value,
            user: user
        })
    })
})