(function($){

var wedding = {
    init: function(){
        //this.header();
        this.section1();
        this.section2();
        //this.footer();
        this.popup();
        this.ajaxfn();

    },
    header: function(){
        //네비게이션 메인버튼 클릭 이벤트
$('.main-btn').on({
    mouseenter: function(){
        $('.sub').stop().slideUp(0);
        $(this).next().stop().slideDown(600);
        $('.main-btn').removeClass('addCurrent');
        $(this).addClass('addCurrent');
    },
    focusin: function(){
        $('.sub').stop().slideUp(0);
        $(this).next().stop().slideDown(600);
        $('.main-btn').removeClass('addCurrent');
        $(this).addClass('addCurrent');
    }
});

$('#nav').on({
    mouseleave: function(){
        $('.sub').stop().slideUp(0);
        $('.main-btn').removeClass('addCurrent');
    }
});
    },
    section1: function(){
        //메인슬라이드
var cnt = -1;
var n =  $('.slide').length-1;
//1.mainslide function
function mainSlide(){
   $('.slide').css({zIndex:1}).stop().animate({opacity:1}, 0); //모든 슬라이드 초기화
   $('.slide').eq(cnt==n?0:cnt+1).css({zIndex:2});
   $('.slide').eq(cnt).css({zIndex:3}).stop().animate({opacity:0}, 1000);
}
//2.count function
function nextCount(){
    cnt++;
    if(cnt>n){cnt=0}
    mainSlide();
}
//3.setinterval
setInterval(nextCount,3000);
    },
    section2: function(){
        //갤러리 버튼 클릭 이벤트
    $('.gallery-btn').on({
        click: function(){
            $('.notice-btn, .gallery-btn, .notice-box, .gallery-box').addClass('addGallery');
        }
    });
    //공지사항 버튼 클릭 이벤트
    $('.notice-btn').on({
        click: function(){
            $('.notice-btn, .gallery-btn, .notice-box, .gallery-box').removeClass('addGallery');
        }
    });
        },
        footer: function(){
            var 배열 = ['피자','파스타','감자탕','닭갈비','순대국'];
            var 객체 = {"학번":"2021001", "성명":"차분희", "연락처":"010-1234-5678"};

            //console.log(배열);
            //console.log(배열[0]);
           // console.log(배열.length + '개');

           for(i=0; i<배열.length; i++){
               console.log('for()반복문', i, 배열[i]);
           }
           for(i in 배열){
               console.log('for in', i , 배열[i]);
           }
           for(i of 배열){
               console.log('for of', i);
           }
           배열.forEach(function(value, index, array){
               console.log(array);
           })

           //리턴을 이용한 배열 값 출력
           var result = 배열.forEach(function(value, index){
            return value;
           });
           console.log(result);
           var result = 배열.map(function(value, index, array){
            return{
                value,
                index
            };
           });
           console.log(result);

           var 배열객체 = [
               {메인메뉴:'메인메뉴-1', 서브메뉴:['서브메뉴-1','서브메뉴-2','서브메뉴-3','서브메뉴-4']},
               {메인메뉴:'메인메뉴-2', 서브메뉴:['서브메뉴-1','서브메뉴-2','서브메뉴-3','서브메뉴-4','서브메뉴-5']},
               {메인메뉴:'메인메뉴-3', 서브메뉴:['서브메뉴-1','서브메뉴-2','서브메뉴-3']},
               {메인메뉴:'메인메뉴-4', 서브메뉴:['서브메뉴-1','서브메뉴-2','서브메뉴-3','서브메뉴-4']}
           ]

           for(i in 배열객체){
               console.log('==========================');
               console.log(배열객체[i].메인메뉴);
               console.log('--------------------------');
               for(j in 배열객체[i].서브메뉴){
                   console.log(배열객체[i].서브메뉴[j])
               }
               console.log("==========================")
           }

           for(i in 배열객체){
            console.log('==========================');
            console.log(배열객체[i].메인메뉴);
            console.log('--------------------------');
            for(j of 배열객체[i].서브메뉴){
                console.log(j)
            }
            console.log("==========================")
        }
        배열객체.forEach(function(v, i){
            console.log(배열객체[i].메인메뉴);
            배열객체[i].서브메뉴.forEach(function(z, j){
                console.log(배열객체[i].서브메뉴[j]);
            })
        });


        배열객체.forEach(function(r){
            console.log(r.메인메뉴);
            r.서브메뉴.forEach(function(c){
                console.log(c);
            })
        });

        배열객체.map(function(r){
            console.log(r.메인메뉴);
            r.서브메뉴.map(function(c){
                console.log(c);
            })
        });

        },
        popup: function(){
           

            //폴리필
            $(document).on('click','.notice-list-btn', function(){
                var txt1 = $(this).text();
                var txt2 = $(this).next().text();
                $('.title').text(txt1);
                $('.date').text(txt2);
                $('#popup').stop().show();
            });



        //팝업창 열기 이벤트 
    // $('.notice-list-btn').on({
    //     click:function(){
    //         console.log($(this).text());
    //         var txt1 = $(this).text();
    //         var txt2 = $(this).next().text();
    //         $('.title').text(txt1);
    //         $('.date').text(txt2);
    //         $('#popup').stop().show();
    //     }
    // });
    //팝업창 닫기이벤트
    $('.close-btn').on({
        click:function(){
            $('#popup').stop().hide();
        }
    });

    $('#popup').on({
        click:function(event){
            if(event.target !== event.currentTarget){
                return false;
            }
            $('#popup').stop().hide();
        }
    });
        
    },
    
    // ajaxfn: function(){
    //     $.ajax({
    //         url:'./Data/news.json',
    //         type:'GET',
    //         success: function(result){
    //             var txt = '';
    //             result.공지사항.forEach(function(item, index){
    //                txt +="<li><a href='# class='notice-list-btn'>"+item.제목+"</a><span>"+item.날짜+"</span></li>"
    //             });
    //             $('.notice-box ul').html(txt);
    //         },
    //         error: function(error){
    //             console.log('error!!!!!!!', error);
    //         }
    //     });
    // }  
    
    ajaxfn: function(){
        $.ajax({
            url:'./Data/news.json',
            type:'GET',
            success(result){
                var txt = '';
                result.공지사항.map((item, index)=>{
                   txt +="<li><a href='# class='notice-list-btn'>"+item.제목+"</a><span>"+item.날짜+"</span></li>"
                });
                $('.notice-box ul').html(txt);
            },
            error(error){
                console.log('error!!!!!!!', error);
            }
        });
       $.ajax({
           url:'./Data/nav.json',
           type:'GET',
           success(result){
            let txt ='';
            result.nav.map((item) => {
            txt += '<li>';
            txt +=    '<a href="#" class="main-btn" title="'+item.메인메뉴+'">'+item.메인메뉴+'</a>';
            txt +=    '<div class="sub">';
            txt +=      '<ul>';    
                item.서브메뉴.map((item) => {
            txt +=      '<li><a href="#" title="'+item+'">'+item+'</a></li>';
                });

            txt +=      '</ul>';
            txt +=     '</div>';
            txt += '</li>';        
        });
            $('#nav>ul').html(txt);  
             },
           error(error) {
            console.log(error);
           }
       }); 
    },
    googoodan(){
    //2단
    var i =2;
    for(var j=1; j<=9; j++){
        console.log(i + "*" + j +"=" +(i*j));
    }
    //2단 - 9단
    var txt ='';
    for(var i=2; i <=9; i++){
        txt += ' ' +i+ '단\n';
        for(var j =1;j<=9;j++){
            if(i*j<10){
                txt += i + "*" + j + "="+("0"+(i*j));
            }
            else{
                txt += i +"*"+j+"="+(i*j);
            }
        }
    }
    //console.log(txt);
    txt ="";
    for(i=1;i<=9;i++){
        for(j=2;j<=9;j++){
            if(i*j<10){
                txt += j + "*"+i+"="+("0"+(j*i))+"  ";
            }
            else{
                txt += j+ "*"+ i+"="+(j*i) + "  ";
            }
           
        }
        txt += '\n';
    }
    console.log(txt);
    }    
            
}
    
  
//wedding.init();
wedding.googoodan();








})(jQuery);

