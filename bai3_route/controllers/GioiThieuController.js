window.GioiThieuController = function($scope,$routeParams) {
    // routeParams se ra 1 doi tuong chua param tren url
    // console.log($routeParams.name1);
    // tạo 1 đối tượng kiểm tra dữ liệu mặc định là false 
    $scope.kiemTraDuLieu = {
        ten:false, // chưa có lỗi gì mặc định là false
        tuoi:false
    };
    $scope.danhsach = [
        {id:1,ten:"Nguyễn Văn A",tuoi:19},
        {id:2,ten:"Nguyễn Văn B",tuoi:20}
    ]
    $scope.onClose = function() {
        $scope.inputValue = {
            ten:"",
            tuoi:""
        }
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
            let ds = $scope.danhsach;
            //fake id tăng tự động 
            let newId = ds.length > 0 ? ds[ds.length - 1].id + 1 : 1;
            let newItem = {
                id:newId,
                ten: $scope.inputValue.ten,
                tuoi: $scope.inputValue.tuoi
            }
            $scope.danhsach.push(newItem);
            $scope.onClose();
        }
    }

}