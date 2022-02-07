(function($){
    var del = []; //삭제할 키를 보관하는 배열
    var chkCnt = 0;
    $('.submit-btn').on({
        click: function(event){
            event.preventDefault();
            var formSubject = $('#subject').val();
            var formContent = $('#content').val();
            $.ajax({
                url:'./reponse.php',
                type: 'POST',
                data:{
                    subject: formSubject,
                    content: formContent
                },
                success: function(result){
                    var jsondata = JSON.parse(result)
                    //console.log(jsondata.제목);
                    //console.log(jsondata.할일내용);
                    localStorage.setItem(jsondata.제목, jsondata.할일내용);
                    list();
                },
                error: function(err){
                    console.log('AJAX 오류', err)
                }
            });
        }
    });
    function list(){
        var keySubject = null;
        var keyContent = null;
        var txt = '';
        for(i=0; i<=localStorage.length; i++){
            keySubject = localStorage.key(i);
            keyContent = localStorage.getItem(localStorage.key(i));

           txt += '<tr>';
           txt += '<td><input type="checkbox" class="chk" value="'+keySubject+'"></td>';
           txt += '<td><p>'+keySubject +'</p></td>';     
           txt += '<td><p>'+keyContent +'</p></td>';       
           txt +='</tr>'; 
        }
        $('#listBox tbody').html(txt);
    }
    list();

    //체크상자 클릭 이벤트
    //동적으로 추가된 체크상자 그래서 document이벤트 추가해야 클릭대상이된다 문서중 최상위 위치 :html 모든문서
    $(document).on('change', '.chk', function(){


        //체크를 한개라도 해제하면
        //allChk가 해제 되어야한다.
        //마지막 남은 체크상자 한개까지 체크하면 모든 체크상자가 체크 된상태 이므로
        //allChk가 체크되어야한다.
        //console.log($('.chk').length);
        chkCnt = 0; //변수 초기화
        $('.chk').each(function(idx){
            if($('.chk').eq(idx).is(':checked')){
                chkCnt++;
            }
                if(chkCnt==$('.chk').length){ //모두 체크된경우 $('.chk').length 체크상자 전체개수
                    $('.allChk').prop('checked', true); //prop는 속성변경 체크드를 트루로 설정
                }
                else{ //단 한개라도 체크가 안되어있다면
                    $('.allChk').prop('checked', false); //allChk는 해제
                }
            
        });
      
        //delItem = $(this).val(); //삭제아이템항목저장하는 변수
        //단 체크한 상자의 값만 푸쉬(밀어넣기) : 체크상자의 체크 유무 확인 해야한다.
        //체크를 해제한 상자의 값은 배열에서 삭제하기
        if($(this).is(':checked')){ //현재 클릭한 체크상자가 체크한상태이면(true)       
            del.push( $(this).val()); // 배열이랑 체크상자랑 두가지를 확인 해야한다. 푸시-누적해서 계속 밀어넣어서 보관
            //console.log(del); //삭제 전
        }
        else{ //체크가 해제되면 배열안에 해제된 값들은 배열안에서 삭제한다.
            //!$(this).is(':checked')
            //삭제 알고리즘
            //del=[];//배열 초기화 모두삭제
            //del.splice(삭제할 인덱스번호,1); //첫번째 배열 1개를 삭제 하겠다
            //체크 해제한 상자의 value 값(키)을 배열안에서 찾아서 그 인덱스번호를 알아내고
            //그 인덱스 번호를 배열에서 이용하여 내용을 삭제한다.
            for(i in del){
                //console.log(i); //i=index
                if( $(this).val() == del[i]){ //체크해제한 키값
                    //체크해제한 값과 배열값 비교 찾으면
                    //console.log( $(this).val() , ' 찾았다 ', del[i],'인덱스번호 : ' ,i);
                    del.splice(i,1); // 배열 안 값을 삭제
                    //삭제후
                   // console.log(del);
                }
            }
           


        }
       // console.log('체크여부 확인: ',$(this).is(':checked')); //체크된상태이면 true 반환 아니면 false 반환한다
        
        console.log(del);// 배열 값 확인
    });
    //삭제버튼 클릭 이벤트
    $('.delete-btn').on({
        click:function(){
            for(item of del){ //of: 키의 값
                localStorage.removeItem(item);
            }
           
            list();
        }
    })
    //모든 체크상자 체크하는 기능
    $('.allChk').on({
        change:function(){
            //console.log(event);
            //alert('체인지 이벤트!!')
           del=[]; // 꼭필요 낱개로 선택할 떄 누적된 내용이 전체선택할때 누적되어 들어간다. 배열 초기화 기조의 있던것다지우고 전체다시집어넣어라
            //클릭하면 하단에 모든 체크상자 체크를 강제 하게 한다.
            //$('.chk').prop('checked', true); //체크함
            //$('.chk').prop('checked', false); //체크 해제함
            //객체 요소를 배열처리 each();
            if($(this).is(':checked')){ //this: 밖에 allChk
                $('.chk').each(function(i){
                   // console.log(i)
                    $('.chk').eq(i).prop('checked', true);
                    del.push($('.chk').eq(i).val()); //삭제할 전체 값 배열에 저장
                });
                //배열에 체크상자 키값을 모두 저장한다.
            }
            else{
                $('.chk').each(function(idx){
                 //   console.log(idx)
                    $(this).prop('checked', false); //this내가 누른 박스들
                    del=[] //전체배열 삭제
                });
            }
            //체크되면 모두 체크
            // if($(this).is(':checked')){ //this: allchk
            //     for(i=0; i<$('.chk').length; i++){
            //         $('.chk').eq(i).prop('checked', true); //eq(i) 내가 선택한것들 1 2 3
            //     }
            // }
            // //체크해제되면 모두 체크해제
            // else{
            //     for(i=0; i<$('.chk').length; i++){
            //         $('.chk').eq(i).prop('checked', false);
            //     }
            // } 
            
            console.log(del);
        }
    })
})(jQuery);