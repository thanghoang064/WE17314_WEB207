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
                for(let i = 0;i < $scope.danhsach.length;i++) {
                    if($scope.danhsach[i].id == editId) {
                        $scope.danhsach[i].ten = $scope.inputValue.ten;
                        $scope.danhsach[i].tuoi = $scope.inputValue.tuoi;
                    }
                }
                $scope.onClose();
                return;
            }
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
    $scope.onEdit = function(editId) {
        $scope.editId = editId;
        //tạo ra 1 đối tượng editItem 
        let editItem = {
            ten:"",
            tuoi:""
        }
        for(let i = 0; i < $scope.danhsach.length;i++) {
            if($scope.danhsach[i].id == editId) {
                editItem.ten = $scope.danhsach[i].ten;
                editItem.tuoi = $scope.danhsach[i].tuoi;
            }
        }
        // hiển thị thông tin cần sửa lên form 
        $scope.inputValue = {
            ten: editItem.ten,
            tuoi: editItem.tuoi
        }

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