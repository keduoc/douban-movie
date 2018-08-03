

var top250 = {
    init: function(){
        this.$main = $('main')
        this.$element = $('#top250')
        this.isLoading = false
        this.isFinish = false
        this.index = 0
        this.start()
        this.bind()


    },
    bind: function () {
        var _this = this
        console.log("bind")
        console.log(document.querySelector('main'))
        _this.$main.scroll(function(){
            if(_this.$main.height() + _this.$main.scrollTop() >= _this.$element.find('.container').height() - 10){
                console.log('scroll')
                _this.start()
            }
        })
    },
    start: function () {
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
        var _this = this
        if(_this.isLoading){return}
        _this.isLoading = true
        _this.$element.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/top250',
            type: 'GET',
            data: {
                start: _this.index,
                count: 20
            },
            dataType: 'jsonp'
        }).done(function(ret){
            console.log(ret)
            _this.index += 20
            if(_this.index >= ret.total){
                _this.isFinish = true
            }
            callback&&callback(ret)
        }).fail(function(){
            console.log('error：获取数据失败')
        }).always(function(){
            _this.isLoading = false
            _this.$element.find('.loading').hide()
        })
    },
    render: function(data){
        var _this = this
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
            $node.find('a').attr('href',movie.alt)
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
            _this.$element.find('.container').append($node)
        })
    },
    isToBottom: function(){
        return _this.$element.height() + _this.$element.scrollTop() >= _this.$element.find('.container').height() - 20
    }
}

var usBox = {
    init: function(){
        this.$element = $('#beimei')

        this.start()
    },

    start: function () {
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
        var _this = this
        _this.$element.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/us_box',
            type: 'GET',

            dataType: 'jsonp'
        }).done(function(ret){
            console.log(ret)
            callback&&callback(ret)
        }).fail(function(){
            console.log('error：获取数据失败')
        }).always(function(){
            _this.$element.find('.loading').hide()
        })
    },
    render: function(data){
        var _this = this
        console.log(data)
        data.subjects.forEach(function(movie){
            movie = movie.subject
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
            $node.find('a').attr('href',movie.alt)
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
            _this.$element.find('.container').append($node)
        })
    },
}

var search = {
    init: function(){
        this.$element = $('#search')
        this.keyValue = ''
        this.bind()
        this.start()
    },

    bind: function() {
        var _this = this
        this.$element.find('.button').click(function () {
            _this.keyValue = _this.$element.find('input').val() // jquery 里面不用 .value
            _this.start()
        })
    }
    ,
    start: function () {
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
        var _this = this
        _this.$element.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/search',
            type: 'GET',
            data:{
              q: _this.keyValue
            },
            dataType: 'jsonp'
        }).done(function(ret){
            console.log(ret)
            callback&&callback(ret)
        }).fail(function(){
            console.log('error：获取数据失败')
        }).always(function(){
            _this.$element.find('.loading').hide()
        })
    },
    render: function(data){
        var _this = this
        console.log(data)
        data.subjects.forEach(function(movie){
            var template = `<div class="item">
                        <a href="#">
                            <div class="cover">
                                <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
                            </div>
                            <div class="detail">
                                <h2></h2>
                                <div class="extra"><span class="score">9.3</span>分 /<span class="collect">1000</span> 收藏</div>
                                <div class="extra"><span class="year">1994</span> / <span class="type">剧情、犯罪</span></div>
                                <div class="extra">导演：<span class="director">张艺谋</span></div>
                                <div class="extra">主演：<span class="actor">xxx</span></div>
                            </div>
                        </a>
                     </div>`
            //创建一个 dom 元素赋给 $node
            var $node = $(template)
            //.attr()给属性赋值
            $node.find('a').attr('href',movie.alt)
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
            _this.$element.find('.search-result').append($node)
        })
    },
}



var app = {
    init: function(){
        this.$tabs = $('footer>div')
        this.$panels = $('section')
        this.bind()

        top250.init()
        usBox.init()
        search.init()

    },
    bind: function () {
        var _this = this
        this.$tabs.on('click',function () {
            $(this).addClass('active').siblings().removeClass('active')
            _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
        })
    }
}

app.init()














