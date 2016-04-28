define([
  'angular',
  'app/plugins/sdk'
],
function (angular, sdk) {
  'use strict';

  var seriesList = null;

  var InfluxQueryCtrl08 = (function(_super) {
    var self;

    function InfluxQueryCtrl08($scope, $injector, $timeout) {
      _super.call(this, $scope, $injector)
      this.timeout = $timeout;
      this.scope = $scope;

      var target = this.target;

      target.function = target.function || 'mean';
      target.column = target.column || 'value';

      // backward compatible correction of schema
      if (target.condition_value) {
        target.condition = target.condition_key + ' ' + target.condition_op + ' ' + target.condition_value;
        delete target.condition_key;
        delete target.condition_op;
        delete target.condition_value;
      }

      if (target.groupby_field_add === false) {
        target.groupby_field = '';
        delete target.groupby_field_add;
      }

      this.functions = [
        'count', 'mean', 'sum', 'min',
        'max', 'mode', 'distinct', 'median',
        'derivative', 'stddev', 'first', 'last',
        'difference'
      ];

      this.operators = ['=', '=~', '>', '<', '!~', '<>'];
      this.oldSeries = target.series;
      //this.$on('typeahead-updated', function() {
      //  self.timeout(self.panelCtrl.refresh);
      //});

      self = this;
    };

    InfluxQueryCtrl08.prototype = Object.create(_super.prototype);
    InfluxQueryCtrl08.prototype.constructor = InfluxQueryCtrl08;

    InfluxQueryCtrl08.templateUrl = 'public/plugins/grafana-influxdb-08-datasource/partials/query.editor.html';

    InfluxQueryCtrl08.prototype.toggleEditorMode = function () {
      this.target.rawQuery = !this.target.rawQuery;
    };

    // Cannot use typeahead and ng-change on blur at the same time
    InfluxQueryCtrl08.prototype.seriesBlur = function() {
      if (this.oldSeries !== this.target.series) {
        this.oldSeries = this.target.series;
        this.columnList = null;
        this.panelCtrl.refresh();
      }
    };

    InfluxQueryCtrl08.prototype.changeFunction = function(func) {
      this.target.function = func;
      this.panelCtrl.refresh();
    };

    // called outside of digest
    InfluxQueryCtrl08.prototype.listColumns = function(query, callback) {
      if (!self.columnList) {
        self.scope.$apply(function() {
          self.datasource.listColumns(self.target.series).then(function(columns) {
            self.columnList = columns;
            callback(columns);
          });
        });
      }
      else {
        return self.columnList;
      }
    };

    InfluxQueryCtrl08.prototype.listSeries = function(query, callback) {
      if (query !== '') {
        seriesList = [];
        this.datasource.listSeries(query).then(function(series) {
          seriesList = series;
          callback(seriesList);
        });
      }
      else {
        return seriesList;
      }
    };

    return InfluxQueryCtrl08;

  })(sdk.QueryCtrl);

  return InfluxQueryCtrl08;
});
