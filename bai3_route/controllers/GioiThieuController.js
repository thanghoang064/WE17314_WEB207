window.GioiThieuController = function($scope,$routeParams) {
    // routeParams se ra 1 doi tuong chua param tren url
    // console.log($routeParams.name1);
    // tạo 1 đối tượng kiểm tra dữ liệu mặc định là false 
    $scope.kiemTraDuLieu = {
        ten:false, // chưa có lỗi gì mặc định là false
        tuoi:false
    }

    $scope.onSubmitForm = function() {
        //valide nếu như tên bỏ trống 
        if(!$scope.inputValue || !$scope.inputValue.ten) {
            // có lỗi 
            $scope.kiemTraDuLieu.ten = true; // có lỗi là true
        }
        // validate nếu như tuổi trống 
        if(!$scope.inputValue || !$scope.inputValue.tuoi) {
            $scope.kiemTraDuLieu.tuoi = true;
        }
    }

}