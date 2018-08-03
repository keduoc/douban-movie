$('footer>div').click(function(){
    var index = $(this).index()
    $('section').hide().eq(index).fadeIn()
    $(this).addClass('active').siblings().removeClass('active')
})

var index = 0;
var isLoading = false
start()

var clock
$('main').scroll(function(){
    if(clock){
        clearTimeout(clock)
    }
    clock = setTimeout(function(){
        if($('main').height() + $('main').scrollTop() >= $('section').eq(0).height() - 20){
            console.log('loading')
            start()
        }
    },300)
})


function start() {
    var _this = this
    if(_this.isLoading){return}
    _this.isLoading = true
    $('.loading').show()
    $.ajax({
        url: 'http://api.douban.com/v2/movie/top250',
        type: 'GET',
        data: {
            start: index,
            count: 20
        },
        dataType: 'jsonp'
    }).done(function(ret){
        console.log(ret)
        setData(ret)
        index += 20
    }).fail(function(){
        console.log('error')
    }).always(function(){
        _this.isLoading = false
        $('.loading').hide()
    })
}


function setData(data) {
    data.subjects.forEach(function(movie){
        var template = ' <div class="item">\
                        <a href="#">\
                            <div class="cover">\
                                <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">\
                            </div>\
                            <div class="detail">\
                                <h2></h2>\
                                <div class="extra"><span class="score">9.3</span>分 /<span class="collect">1000</span> 收藏</div>\
                                <div class="extra"><span class="year">1994</span> / <span class="type">剧情、犯罪</span></div>\
                                <div class="extra">导演：<span class="director">张艺谋</span></div>\
                                <div class="extra">主演：<span class="actor">xxx</span></div>\
                            </div>\
                        </a>\
                     </div>'
        //创建一个 dom 元素赋给 $node
        var $node = $(template)
        //.attr()给属性赋值
        $node.find('.cover img').attr('src',movie.images.medium)
        $node.find('.detail h2').text(movie.title)
        $node.find('.score').text(movie.rating.average)
        $node.find('.collect').text(movie.collect_count)
        $node.find('.year').text(movie.year)
        $node.find('.type').text(movie.genres.join('、'))
        $node.find('.director').text(function(item){
            var directorsArr = []
            movie.directors.forEach(function(item){
                directorsArr.push(item.name)
            })
            return directorsArr.join('、')
        })
        $node.find('.actor').text(function(item){
            var directorsArr = []
            movie.casts.forEach(function(item){
                directorsArr.push(item.name)
            })
            return directorsArr.join('、')
        })
        $('#top250').append($node)
    })
}

///////////////////////////////////

// var top250 = {
//     init: function(){
//         this.$element = $('#top250')
//         this.isLoading = false
//         this.isFinish = false
//         this.index = 0
//         this.start()
//         this.bind()
//
//
//     },
//     bind: function () {
//         var _this = this
//         console.log("bind")
//         console.log(_this.$element.find('.container'))
//         _this.$element.find('.container').scroll(function(){
//             console.log('scroll')
//                 _this.start()
//         })
//     },
//     start: function () {
//         var _this = this
//         this.getData(function(data){
//             _this.render(data)
//         })
//     },
//     getData: function(callback){
//         var _this = this
//         if(_this.isLoading){return}
//         _this.isLoading = true
//         _this.$element.find('.loading').show()
//         $.ajax({
//             url: 'https://api.douban.com/v2/movie/top250',
//             type: 'GET',
//             data: {
//                 start: _this.index,
//                 count: 20
//             },
//             dataType: 'jsonp'
//         }).done(function(ret){
//             console.log(ret)
//             _this.index += 20
//             if(_this.index >= ret.total){
//                 _this.isFinish = true
//             }
//             callback&&callback(ret)
//         }).fail(function(){
//             console.log('error')
//         }).always(function(){
//             _this.isLoading = false
//             _this.$element.find('.loading').hide()
//         })
//     },
//     render: function(data){
//         var _this = this
//         data.subjects.forEach(function(movie){
//             var template = ' <div class="item">\
//                         <a href="#">\
//                             <div class="cover">\
//                                 <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">\
//                             </div>\
//                             <div class="detail">\
//                                 <h2></h2>\
//                                 <div class="extra"><span class="score">9.3</span>分 /<span class="collect">1000</span> 收藏</div>\
//                                 <div class="extra"><span class="year">1994</span> / <span class="type">剧情、犯罪</span></div>\
//                                 <div class="extra">导演：<span class="director">张艺谋</span></div>\
//                                 <div class="extra">主演：<span class="actor">xxx</span></div>\
//                             </div>\
//                         </a>\
//                      </div>'
//             //创建一个 dom 元素赋给 $node
//             var $node = $(template)
//             //.attr()给属性赋值
//             $node.find('.cover img').attr('src',movie.images.medium)
//             $node.find('.detail h2').text(movie.title)
//             $node.find('.score').text(movie.rating.average)
//             $node.find('.collect').text(movie.collect_count)
//             $node.find('.year').text(movie.year)
//             $node.find('.type').text(movie.genres.join('、'))
//             $node.find('.director').text(function(item){
//                 var directorsArr = []
//                 movie.directors.forEach(function(item){
//                     directorsArr.push(item.name)
//                 })
//                 return directorsArr.join('、')
//             })
//             $node.find('.actor').text(function(item){
//                 var directorsArr = []
//                 movie.casts.forEach(function(item){
//                     directorsArr.push(item.name)
//                 })
//                 return directorsArr.join('、')
//             })
//             _this.$element.find('.container').append($node)
//         })
//     },
//     isToBottom: function(){
//         return _this.$element.height() + _this.$element.scrollTop() >= _this.$element.find('.container').height() - 20
//     }
// }
//
// var usBox = {
//     init: function(){
//
//     },
//     bind: function () {
//
//     },
//     start: function () {
//
//     }
// }
//
// var search = {
//     init: function(){
//
//     },
//     bind: function () {
//
//     },
//     start: function () {
//
//     }
// }
//
//
//
// var app = {
//     init: function(){
//         this.$tabs = $('footer>div')
//         this.$panels = $('section')
//         this.bind()
//
//         top250.init()
//         usBox.init()
//         search.init()
//
//     },
//     bind: function () {
//         var _this = this
//         this.$tabs.on('click',function () {
//             $(this).addClass('active').siblings().removeClass('active')
//             _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
//         })
//     }
// }
//
// app.init()