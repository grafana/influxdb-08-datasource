define([
  './datasource',
  './query_ctrl'
],
function(InfluxDB08Datasource, InfluxDB08QueryCtrl) {
  'use strict';

  var InfluxDB08ConfigCtrl = function() {}
  InfluxDB08ConfigCtrl.templateUrl = "partials/config.html";

  var InfluxDB08QueryOptionsCtrl = function() {}
  InfluxDB08QueryOptionsCtrl.templateUrl = "partials/query.options.html";

  var InfluxDB08AnnotationsCtrl = function() {}
  InfluxDB08AnnotationsCtrl.templateUrl = "partials/annotations.editor.html";

  return {
    'Datasource': InfluxDB08Datasource,
    'QueryCtrl': InfluxDB08QueryCtrl,
    'ConfigCtrl': InfluxDB08ConfigCtrl,
    'QueryOptionsCtrl': InfluxDB08QueryOptionsCtrl,
    'AnnotationsQueryCtrl': InfluxDB08AnnotationsCtrl
  };
});