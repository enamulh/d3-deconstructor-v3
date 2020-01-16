"use strict";


//var pathSeg = require('../lib/pathSeg.js');
var VisDeconstruct = require('d3-decon-lib').Deconstruct;
var $ = require('jquery');
var _ = require('underscore');
var CircularJSON = require('circular-json');

setTimeout(pageDeconstruct, 10);

/*function pageDeconstruct() {
	console.load("hello");
    var deconstructed = VisDeconstruct.pageDeconstruct();
    var deconData = [];

    $.each(deconstructed, function(i, decon) {
        //nodes = nodes.concat(decon.dataNodes.nodes);
        //ids = ids.concat(decon.dataNodes.ids);
        //updaters.push(new VisUpdater(svgNode, decon.dataNodes.nodes, decon.dataNodes.ids,
        //    decon.schematizedData));
        var deconDataItem = {
            schematized: decon.groups,
            ids: _.map(decon.marks, function(mark) { return mark.deconID; })
        };
        deconData.push(deconDataItem);
    });

    deconData = JSON.parse(CircularJSON.stringify(deconData));
    console.log(deconData);
}*/
