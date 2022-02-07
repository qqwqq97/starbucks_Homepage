(function($){
    var cnt = 0;    
$('.submit-btn').on({
    click: function(event){
        event.preventDefault();
        cnt++;
        var firum = $('#irum').val();
        var ftel = $('#tel').val();
        var fjob = $('#job').val();

        $.ajax({
            url:'./reponse.php',
            type: 'POST',
            data:{
                irum: firum,
                tel: ftel,
                job: fjob
            },
            success: function(result){
               //로컬스토리지 저장 : 키와 키값 한쌍으로 이루어진다.
               var data = JSON.parse(result);
               //var txt = JSON.stringify(data.이름 , data.전화 , data.소속);
               var txt2 = firum + ',' + ftel + ','+ fjob;
               localStorage.setItem(cnt, txt2)
               //localStorage.setItem(cnt, txt);
                $('#irum').val("");
                $('#tel').val("");
                $('#job').val("");
                //로컬스토리지 삭제
                //localStorage.removeItem('1');
                //localStorage.clear();
            },
            error: function(err){
                console.log(err)
            }
        });
    }
});
})(jQuery);

// var txt = JSON.parse(result);
//                var str = JSON.stringify(txt);
//                console.log(result['소속']);
//                console.log(txt['소속']);
//                console.log('JSON데이터 : ',result);
//                console.log(txt);
//                console.log(str);

//                console.log('문자데이터 : ', JSON.stringify(result));
//                console.log('JSON데이터 : ', JSON.parse(result));
//                var data = JSON.parse(result);
//                console.log(data['이름']);
//                console.log(data.이름);
//                console.log(data.소속);
//                console.log(data.전화);