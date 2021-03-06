$(function () {
    //jstree plugin 적용
    var myTree = $('#tree').jstree({
        checkbox: {
            keep_selected_style: false,
        },
        plugins: ['checkbox', 'search', 'wholerow'], // checkbox 와 search 플러그인 적용 whoerow -> 칸 나누는 효과
        core: { data: parms },
    });

    // Dialog 적용
    $('#list').dialog({
        autoOpen: false, // 숨기기
        modal: false, //모달대화상자
        title: '조직 검색',
        position: top,
        width: 400,
        height: 700,
        show: {
            duration: 300,
        },
        hide: {
            duration: 300,
        },
        buttons: [
            {
                // 확인 - alert창 정보 출력
                text: '확인',
                click: function () {
                    var nodeID = $('#tree').jstree('get_checked'); //jstree('get_checked') : 체크된 노드의 id 값을 배열로 받아온다 nodeID 는 배열
                    // console.log(nodeID.length);
                    $('#search').val('');
                    if (nodeID.length == 0) {
                        alert('Are you checked?');
                    } else {
                        var message = ''; //[];
                        $.each(nodeID, function (index, items) {
                            // each 문 첫번째 인자 : 배열 객체 / 두번째 인자 콜백함수(index,item)
                            var nodeInfo = $('#tree').jstree('get_node', items).text; //jstree('get_node',nodeId) - 노드 id 로 노드정보를 검색하는 메소드
                            message += nodeInfo + '\n';
                        });
                        alert(message);
                    }
                },
            },

            {
                // 취소 - jstree reset
                text: '취소',
                click: function () {
                    $('#tree').jstree('deselect_all');
                    $('#search').val('');
                },
            },
        ],
    });

    // Dialog-open
    $('#open-btn').on('click', function () {
        $('#list').dialog('open');
        $('#search').val('');
        $('#tree').jstree('open_all'); // 편의상 삽입 코드 - 모든 노드 open
        $('#tree').jstree('deselect_all');
    });

    // input : search 기능
    $('#search').keyup(function (key) {
        if (key.keyCode == 13) {
            $('#tree').find('.jstree-search').trigger('click'); // 선택
        }
        var to = false;
        if (to) {
            clearTimeout(to);
        }
        to = setTimeout(function () {
            var v = $('#search').val();
            $('#tree').jstree(true).search(v);  
        }, 250);
    });
});
