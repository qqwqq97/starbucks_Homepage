(($)=>{

    const starBucks = {
        init(){
            this.header();
            this. section1();
            this. section2();
            this. section3();
            this. section4();
            this. section5();
            this. section6();
            this. section7();
            this. section8();
            this. section9();
            this. footer();
        },
        header(){
            //마우스를 메인메뉴에 올리면 서브메뉴 부드럽게 펼쳐지고 메뉴에는 색상이 변경된다
            $('.main-btn').on({
                mouseenter(){
                    $('.sub').stop().slideUp(0);
                    $(this).next().stop().slideDown(300);
                   
                    $('.main-btn').removeClass('addCurrent');
                    $(this).addClass('addCurrent');
                },
                focusin(){
                    $('.sub').stop().slideUp(0);
                    $(this).next().stop().slideDown(300);
                   
                    $('.main-btn').removeClass('addCurrent');
                    $(this).addClass('addCurrent');                    
                }
            });
            $('#nav').on({
                mouseleave(){
                    $('.sub').stop().slideUp(600);
                    $('.main-btn').removeClass('addCurrent');
                }
            });
            // aside 통합검색 버튼 이벤트
            //1. 검색 버튼(search-btn)을 클릭시 선택자(#aside)에 클래스 addClass('addSearch')가 추가되면
            //   너비가 부드럽게 늘어난다 입력상자가 보인다
            //2. $('#aside')요소에 추가된 클래스(addSearch)가 있다면 (참 true 이면)
            //  검색버튼을 누르면 입력상자에 입력된 내용 여부에 따라 오류메시지 또는 전송을 한다.
            //  (입력 내용이 있으면 전송하고, 없으면 오류메시지를 띠운다.)
            //////////////////////////////////////////////////////////////////////////
            //.hasClass() 헤스클래스 메서드(Method)
            //해당(선택자) 요소에 addSearch 이 클래스가 있다면 (true 참이면)
            //입력상자에 입력 여부를 판단하고 처리한다.
            //만약 클래스가 없다면 (false 거짓이면)
            //논리비교는 반드시 === 등호를 3개 사용 : 자료형까지 논리비교
            //1 == "1" 참(true) if( 1 == "1"){} 애는 못찾는다 [숫자와 문자형숫자는 자료형이 다르다]
            //1 ==="1" 거짓(false) if(1 ==="1"){} 애는 찾는다
            //타입스크립트(TypeScript) : 자료형 사용
            //JAVA
            //int a = 1; //정수형
            //String b = "1"; //문자열형
            //char c = '1'; //문자형
            //boolean t = true;
            //////////////////////////////////////////////////////////////////////////////
           $('.search-btn').on({
               click(){
                   //if($('#aside).hasClass('addSearch')===true){ //그러면 검색을 시작 입력상에서
                   if($('#aside').hasClass('addSearch')){ //그러면 검색을 시작 입력상에서
                     if($('#search').val() == ""){ //입력상자에 입력 내용이 없다면
                        alert('입력상자에 검색할 내용이 없습니다.');
                     }
                     else{
                         alert('전송합니다.');
                         //AJAX 전송 PHP 파일
                     }
                   }
                   else{ //addSearch 없으면
                    $('#aside').addClass('addSearch');
                   }
               }
           }); 
        },
        section1(){
          //애니메이션

          function anifn(){
              $('.ani1').stop().animate({opacity:1},500,function(){
                $('.ani2').stop().animate({opacity:1},500,function(){
                    $('.ani3').stop().animate({opacity:1},500,function(){
                        $('.ani4').stop().animate({opacity:1},500,function(){
                            $('.ani5').stop().animate({opacity:1},500);
                        });
                    });
                });



              });
          }
          setTimeout(anifn, 800); //로딩시 0.8초후에 1회 실행 끝
        },
        section2(){
            //공지사항 리스트 롤링 텍스트 슬라이드
            //z-index
            //변수 카운트변수
            //타이머 interval second 
            let cnt = -1;
            let interval=3000;
            //1.메인 슬라이드 함수
            
            function mainSlde(){
                //console.log(cnt);
                //1. 초기화(5개모두)
                $('.notice-slide').css({zIndex:1}).animate({top:24},0);
                //2. 현재 (이미 올라와있는 상태이기 때문에 움직임 속도 필요x)
                $('.notice-slide').eq(cnt).css({zIndex:2}).animate({top:0},0);
                //3. 다음=현재 + 1
                $('.notice-slide').eq(cnt==4?0:(cnt+1)).css({zIndex:3}).animate({top:24},0).animate({top:0},600);
            }
            //2. 다음카운트 함수
            function nextCount(){
                cnt++; //0 1 2 3 4 0 1 2 3 4 .....
                if(cnt>4){cnt=0}
                mainSlde();
            }
            //3.타이머 함수
            function timer(){
                setInterval(nextCount, interval);
            }
            timer(); //타이머 개시(스타트) 로딩시

        },
        section3(){
            //프로모션 버튼 이벤트
            //한번 클릭하면 부드럽게 펼쳐지고(slideDown(300))
            //또한번 클릭하면 부드럽게 접힌다.(slideUp(300))
            //슬라이드토글 : slideToggle(300)
         
            let cnt = 0;
            let setId = 0;
            let t =0;
            //프로모션 버튼에 addUp클래스 있으면 플레이상태   
            //프로모션 버튼에 addUp클래스 없으면 정지상태   
            $( '#section3').slideUp(0); //초기화 접힌상태 정지상태
            $('.promotion-btn').on({
                click: function(e){
                    e.preventDefault();
                    $( '#section3').slideToggle(300);
                    $('.promotion-btn').toggleClass('addUp');
                    if($('.promotion-btn').hasClass('addUp')){
                        clearInterval(setId);
                        timer();
                        $('.play-btn').removeClass('stop');
                        $('.play-btn').removeClass('addPlay');
                    }
                    else{
                        clearInterval(setId);
                        cnt=0;
                        $('.slide-wrap').stop().animate({left:-winW*cnt},0);
                        $('.play-btn').addClass('stop');
                        $('.play-btn').addClass('addPlay');
                        pageBtnEvent();
                    }
                }
            });
            var winW = 0;
            //반응형
            function resizefn(){
                if($(window).innerWidth()<=960){
                    winW = $(window).innerWidth();
                }
                else{
                    winW=829
                }
                mainSlde();
            }
            resizefn();
            $(window).resize(function(){
                resizefn();
            });
           
            //1. 메인 슬라이드
            function mainSlde(){
                $('.slide-wrap').stop().animate({left:-winW*cnt},300, function(){
                    if(cnt>2){cnt=0}
                    if(cnt<0){cnt=2}
                    $('.slide-wrap').stop().animate({left:-winW*cnt},0);
                });
                pageBtnEvent();
            }
            //2.1 다음 카운트
            function nextCount(){
                cnt++;
                mainSlde();
            }
            //2.2 이전 카운트
            function prevCount(){
                cnt--;
                mainSlde();
            }
            //2.3 다음화살버튼 클릭 이벤트
            $('.next-btn').on({
                click: function(e){
                    e.preventDefault();
                    nextCount();
                }
            });    
             //2.4 이전화살버튼 클릭 이벤트
             $('.prev-btn').on({
                click: function(e){
                    e.preventDefault();
                    prevCount();
                }
            });             
            //2.5 페이지버튼 이벤트: 배경색상
            //메인함수에 연동
            function pageBtnEvent(){  
                $('.page-btn').removeClass('addPage');
                $('.page-btn').eq(cnt>2?0:cnt).addClass('addPage');   
            }            
            //2.6페이지 버튼 클릭 이벤트
            $('.page-btn').each(function(index){
                $(this).on({
                    click: function(e){
                        e.preventDefault();
                        cnt=index;
                        mainSlde();
                    }
                });
            });
            //3. 타이머 함수
            function timer(){
               setId = setInterval(nextCount, 3000);
               console.log(setId);
            }
            //timer();
            //3-1타이머 중지
            //한번 클릭하면 중지 또 한번 클릭하면 타이머 재실행
            $('.play-btn').on({
                click:function(e){
                    e.preventDefault();
                    if($('.play-btn').hasClass('stop')){
                        timer();
                        $(this).removeClass('stop');
                        $(this).removeClass('addPlay');
                    }
                    else{
                        clearInterval(setId);
                        $(this).addClass('stop');
                        $(this).addClass('addPlay');
                    }
                   
                }
            });
            //slide-wrap 위에 마우스 올라가면 타이머 정지
            //slide-wrap 위에 마우스 떠나면 타이머 재실행

            $('.slide-wrap').on({
                mouseenter:function(){
                    t = 0;
                    clearInterval(setId);
                    $('.play-btn').addClass('stop');
                    $('.play-btn').addClass('addPlay');
                },
                mouseleave:function(){
                    if(t==0){
                        t=1;
                        timer();
                    }
                   
                    $('.play-btn').removeClass('stop');
                    $('.play-btn').removeClass('addPlay');
                }
            });
            

        },
        section4(){
         
        },
        section5(){
            
        },
        section6(){
           
        },
        section7(){
            
        },
        section8(){
            
        },
        section9(){
            
        },
        footer(){
           
        }

    }

    starBucks.init();
})(jQuery);