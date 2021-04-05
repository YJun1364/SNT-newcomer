$(function () {
    var _searchNode = $('#search');
    var _treeNode = $('#tree').jstree({
        plugins: ['checkbox', 'search', 'wholerow'], // checkbox 와 search 플러그인 적용 whoerow -> 칸 나누는 효과
        checkbox: {
            keep_selected_style: false,
        },
        core: { data: Parms },
    });
    var _status;
    var _toggle;

    //  dialogButton widget 시작
    $.widget('custom.dialogButton', $.ui.button, {
        options: {
            toggle: true,
            status: false,
        },
        defaultStyle: {
            cursor: 'hand',
            'font-size': '2em',
            'border-radius': '10px',
            border: '1px solid',
            'background-color': '#2980b9',
            color: 'white',
        },

        _create: function () {
            this.element.addClass('custom-button');

            this.dialogBtn = $('<button>', {
                text: 'Dialog Button',
                class: 'dialogbtn',
            })
                .appendTo(this.element)
                .css(this.defaultStyle);
        },

        clickAction: function (location) {
            _toggle = this.options.toggle;
            _status = this.options.status;
            this.element.bind('click.dialogButton', function (e) {
                // console.log(_toggle);
                // console.log(_status);
                if (!_status) {
                    location.myDialog('open');
                    _treeNode.jstree('open_all');
                    _treeNode.jstree('deselect_all');
                    _status = true;
                } else {
                    _status = false;
                    // console.log('1');
                    if (_status && _toggle) location.myDialog('close');
                    // console.log(_status);
                }
            });
        },

        toggleOff: function () {
            _toggle = false;
        },
    });
    // dialogButton widget - end

    // myDialog widgetvar
    $.widget('custom.myDialog', $.ui.dialog, {
        options: {
            autoOpen: false, // 숨기기
            modal: false, //모달대화상자
            title: '조직 검색',
            position: top,
            width: 500,
            height: 700,
            show: {
                duration: 300,
            },

            hide: {
                duration: 300,
            },
            buttons: [
                {
                    // 확인 btn - alert창 정보 출력
                    text: '확인',
                    click: function () {
                        var nodeID = _treeNode.jstree('get_checked'); //jstree('get_checked') : 체크된 노드의 id 값을 배열로 받아온다 nodeID 는 배열
                        _searchNode.val('');
                        if (nodeID.length == 0) {
                            alert('Are you checked?');
                        } else {
                            var message = ''; //[];
                            $.each(nodeID, function (index, items) {
                                // each 문 첫번째 인자 : 배열 객체 / 두번째 인자 콜백함수(index,item)
                                var nodeInfo = _treeNode.jstree('get_node', items).text; //jstree('get_node',nodeId) - 노드 id 로 노드정보를 검색하는 메소드
                                message += nodeInfo + '\n';
                            });
                            alert(message);
                        }
                    },
                },

                {
                    // 취소 btn - jstree reset
                    text: '취소',
                    click: function () {
                        _searchNode.val('');
                        _searchNode.focus();
                    },
                },
            ], // buttons
        },
    });
    // mydialog widget - end

    //enter - search 기능
    _searchNode.keyup(function (key) {
        if (key.keyCode == 13) {
            _treeNode.find('.jstree-search').click(); // 선택
        }
        var to = false;
        if (to) {
            clearTimeout(to);
        }
        to = setTimeout(function () {
            var v = _searchNode.val();
            _treeNode.jstree(true).search(v);
            _searchNode.focus();
        }, 250);
    }); // enter -end
}); // $ -end
