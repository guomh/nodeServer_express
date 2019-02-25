/**
 * Created by guominghui on 16/12/9.
 */
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
