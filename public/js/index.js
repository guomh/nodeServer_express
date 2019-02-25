/**
 * Created by guominghui on 17/2/24.
 */

var app = angular.module('Model', []);
app.factory('ajaxUtil', ['$http', '$q', function($http, $q) {
    return {
        ajax: function(obj) {
            var delay = $q.defer();

            // 默认post请求
            if (!obj.type) {
                obj.type = 'get';
            }

            if (!obj.reTryTime) {
                obj.reTryTime = 0;
            }

            ($http({
                method: obj.type,
                url: obj.url,
                data: obj.params

                // timeout: appSettings.timeout
                // headers:obj.headers,

                // 参数 data, status, headers, config
            })).success(function(data) {
                if (typeof data === 'string') {
                    data = JSON.parse(data);
                }

                delay.resolve(data);
                /*if(data.error_code===0){
                 delay.resolve(data.data);
                 }else{
                 configService.errorCodeDetail(data.error_code);
                 delay.reject(data.error_code);
                 }*/
            }).error(function() {
                /*if(obj.reTryTime!=(configService.reTryTime||1)){
                 obj.reTryTime++;
                 $timeout(function(){
                 _this.ajax(obj);
                 },configService.reTryDelay||500);
                 }else if(typeof obj.error ==='function') {
                 delay.reject(-1);
                 //obj.error(data, status, headers, config);
                 }*/
                delay.reject(-1);
            });
            return delay.promise;
        }
    };
}]);
var host = 'http://127.0.0.1:3001'
app.controller('Controller', ['$scope','ajaxUtil', function ($scope,ajaxUtil) {

    function getAll(){
        var obj = {
            url:host+'/users/all',
            type:'POST'
        }
        ajaxUtil.ajax(obj).then(function(data){
            console.log(data);
            if(data&&data.data){
                for(var user in data.data){
                    $scope.users.push(data.data[user]);
                }
            }
        })
    }

    $scope.delete = function(user){
        if(!user){
            return;
        }
        var obj = {
            url:host+'/users/delete',
            type:'post',
            params:{id:user.id}
        }
        ajaxUtil.ajax(obj).then(function(data){
            console.log(data);
            if(data){
                var index = $scope.users.indexOf(user);
                if(index>-1){
                    $scope.users.splice(index,1);
                }
            }
        })
    };

    $scope.select = function(user){
        if(!user){
            return;
        }
        $scope.uu = user;
    };
    $scope.update = function(){
        if(!$scope.uu){
            return;
        }
        var obj = {
            url:host+'/users/update',
            type:'POST',
            params:$scope.uu
        }
        ajaxUtil.ajax(obj).then(function(data){
            if(data){
                var index = $scope.users.indexOf($scope.uu);
                if(index>-1){
                    $scope.users[index] = data.data;
                    $scope.uu = {};
                }
            }
        })
    };

    $scope.create = function(){
        if($scope.cu&&$scope.cu.name&&$scope.cu.age){
            var obj = {
                url:host+'/users/create',
                type:'POST',
                params:$scope.cu
            }
            ajaxUtil.ajax(obj).then(function(data){
                console.log(data);
                if(data){
                    $scope.cu = data.data;
                    $scope.users.push($scope.cu);
                    $scope.cu ={};
                }
            })
        }
    };

    $scope.upload = function(){
        var form = document.getElementById('form');
        var f = new FormData(form);
        console.log(f.get('a'));
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST',host+'/users/upload',true);
        xmlhttp.send(f);
    };

    (function init(){
        $scope.users =[];
        $scope.up={};
        getAll();
    })();
}])
