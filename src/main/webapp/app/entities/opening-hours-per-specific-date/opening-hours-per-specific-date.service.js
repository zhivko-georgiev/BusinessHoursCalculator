(function() {
    'use strict';
    angular
        .module('businessHoursCalculatorApp')
        .factory('OpeningHoursPerSpecificDate', OpeningHoursPerSpecificDate);

    OpeningHoursPerSpecificDate.$inject = ['$resource', 'DateUtils'];

    function OpeningHoursPerSpecificDate ($resource, DateUtils) {
        var resourceUrl =  'api/opening-hours-per-specific-dates/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertLocalDateFromServer(data.date);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.date = DateUtils.convertLocalDateToServer(data.date);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.date = DateUtils.convertLocalDateToServer(data.date);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
