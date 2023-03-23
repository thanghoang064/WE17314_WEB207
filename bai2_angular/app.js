 //khai báo angular js cùng với vùng mình sử dụng
 var app = angular.module("myapp",[]);
 // map hàm myFunc với vùng demoController để 
 //viết tắt 
 app.controller("infoController",function($scope){
     // $scope.ten = "Nguyễn Văn a";
     // $scope.tuoi = 18;
     // $scope.sdt = "09329239";
     $scope.info = [{
         ten:"Nguyen van a",
         tuoi:18,
         sdt:"09393939"
     },
     {
         ten:"Nguyen van b",
         tuoi:19,
         sdt:"0292929"
     }
 ]
    $scope.welcome = "hihi";

    $scope.sayHello = function() {
        // $scope.thongbao = $scope.test; //lấy dữ liệu
        // từ input sau đó gán cho biến thông báo 
        // alert($scope.doibong); // lấy ra value của select
        if($scope.doibong == 1) {
            $scope.thongbao = "Mu vô địch";
        } else if($scope.doibong == 2) {
            $scope.thongbao = "MC top 2";
        } else {
            $scope.thongbao = "Arsenal top 3";
        }
        $scope.thongbao = $scope.gioitinh;

    }
    $scope.count = 0;
    $scope.myMouse = function() {
        $scope.count++;
    }

 });
