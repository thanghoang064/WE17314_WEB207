window.GioiThieuController = function($scope,$routeParams,$http,$location) {
    // routeParams se ra 1 doi tuong chua param tren url
    // console.log($routeParams.name1);
    // tạo 1 đối tượng kiểm tra dữ liệu mặc định là false 
    // tham số $http là giao thức để gọi api 
    // $location hỗ trợ chuyển trang cú pháp sử dụng 
    //$location.path("Tên route muốn nhảy");
    $scope.kiemTraDuLieu = {
        ten:false, // chưa có lỗi gì mặc định là false
        tuoi:false
    };
    let apiURl = "http://localhost:3000/posts"; // điền link api mà mình muốn gọi
    $scope.getData = function() {
        $http.get(apiURl).then(function(reponse) {
            // khi gọi API thành công cục reponse sẽ  nhận dữ liệu 
            // console.log(reponse);
            if(reponse.status == 200) { // nếu trạng thái  == 200 // thành công
                    $scope.danhsach = reponse.data;
            }
        })
    }
    $scope.getData();
    // $scope.danhsach = [
    //     {id:1,ten:"Nguyễn Văn A",tuoi:19},
    //     {id:2,ten:"Nguyễn Văn B",tuoi:20}
    // ]
    $scope.onClose = function() {
        $scope.inputValue = {
            ten:"",
            tuoi:""
        }

        $scope.editId = 0;
    }
    $scope.onSubmitForm = function() {
        //valide nếu như tên bỏ trống 
        let flag = false;
        if(!$scope.inputValue || !$scope.inputValue.ten) {
            // có lỗi 
            $scope.kiemTraDuLieu.ten = true; // có lỗi là true
            flag = true;
        }
        // validate nếu như tuổi trống 
        if(!$scope.inputValue || !$scope.inputValue.tuoi) {
            $scope.kiemTraDuLieu.tuoi = true;
            flag = true;
        }
        //không có lỗi xử lý thêm
        if(!flag) {
            //xử lý sửa
            let editId = $scope.editId;
            //kiểm tra nếu tồn tại editId là sửa 
            if(editId) {
                // for(let i = 0;i < $scope.danhsach.length;i++) {
                //     if($scope.danhsach[i].id == editId) {
                //         $scope.danhsach[i].ten = $scope.inputValue.ten;
                //         $scope.danhsach[i].tuoi = $scope.inputValue.tuoi;
                //     }
                // }
                // tạo đối tượng updateItem
                let updateItem  = {
                    ten :$scope.inputValue.ten,
                    tuoi:$scope.inputValue.tuoi
                }
                $http.put(
                    `${apiURl}/${editId}`, // đường link cập nhập theo id
                    updateItem // dữ liệu được update 
                ).then(
                    function(response) {
                        if(response.status == 200) {
                            $scope.getData(); // gọi lại hàm getData để update lại
                        }
                    }
                )
                $scope.onClose();
                return;
            }
            // let ds = $scope.danhsach;
            //fake id tăng tự động 
            // let newId = ds.length > 0 ? ds[ds.length - 1].id + 1 : 1;
            let newItem = {
                // id:newId,
                ten: $scope.inputValue.ten,
                tuoi: $scope.inputValue.tuoi
            }
            $http.post(
                apiURl, //đường dẫn API 
                newItem // dữ liệu thêm 
            ).then(
                function (reponse) {
                    console.log(reponse);
                    if(reponse.status == 201) {
                        $scope.getData();
                    }
                }
            )
            // $scope.danhsach.push(newItem);
            $scope.onClose();
        }
    }
    $scope.onEdit = function(editId) {
        $scope.editId = editId;
        //nhẩy sang route sửa
        $location.path(`gioithieu/${editId}/edit`);
        //gọi API để lấy dữ liệu theo editID và bắn lên form 
        $http.get(`${apiURl}/${editId}`).then(
            function(response) {
                // bắt trạng thái thành công 
                if(response.status == 200) {
                    $scope.inputValue = {
                            ten: response.data.ten,
                            tuoi: response.data.tuoi
                        }
                }
                // console.log(response);
            }
        )
        //tạo ra 1 đối tượng editItem 
        // let editItem = {
        //     ten:"",
        //     tuoi:""
        // }
        // for(let i = 0; i < $scope.danhsach.length;i++) {
        //     if($scope.danhsach[i].id == editId) {
        //         editItem.ten = $scope.danhsach[i].ten;
        //         editItem.tuoi = $scope.danhsach[i].tuoi;
        //     }
        // }
        // hiển thị thông tin cần sửa lên form 
        // $scope.inputValue = {
        //     ten: editItem.ten,
        //     tuoi: editItem.tuoi
        // }

    }
    $scope.onDelete = function (deleteId) {
        let confirm = window.confirm("Bạn xóa muốn xóa không ?");
        if(confirm) {
            //xóa 
            $scope.danhsach  = $scope.danhsach.filter(function(item){
                return item.id !== deleteId;
            });
        }
    }

}