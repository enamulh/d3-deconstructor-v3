var sendDataToServer = false;

var pathSeg = require('../lib/pathSeg.js');
var VisDeconstruct = require('d3-decon-lib').Deconstruct;
var $ = require('jquery');
var _ = require('underscore');
var CircularJSON = require('circular-json');


var contextElem;
document.addEventListener("contextmenu", function(event) {
    contextElem = event.target;
});

document.addEventListener("pageDeconEvent", function () {
    console.log("about to deconstruct");
    buildOverlay($("html")[0], true);
    setTimeout(pageDeconstruct, 10);
});

document.addEventListener("nodeDeconEvent", function () {
    console.log("nodeDeconEvent");
    if (contextElem instanceof SVGElement) {
        if (contextElem.tagName !== "svg") {
            contextElem = contextElem.ownerSVGElement;
        }

        buildOverlay(contextElem, false);
        setTimeout(function() {
            visDeconstruct(contextElem);
        }, 10);
    }
    else {

    }
});

function buildOverlay(domElem, fullPage) {
    var overlay;
    if (fullPage) {
        overlay = $('<div class="loadingOverlayFullPage"></div>');
        $(overlay).append(text);
    }
    else {
        var elemOffset = $(domElem).offset();
        overlay = $('<div class="loadingOverlay"></div>');
        $(overlay).css("top", elemOffset.top);
        $(overlay).css("left", elemOffset.left);

        var rect = domElem.getBoundingClientRect();
        $(overlay).css("width", rect.width);
        $(overlay).css("height", rect.height);
    }

    var text = $('<div class="overlayText">Deconstructing...</div>');
    $(overlay).append(text);
    $("html").append(overlay);
}

/**
 * Accepts a top level SVG node and deconstructs it by extracting data, marks, and the
 * mappings between them.
 * @param svgNode - Top level SVG node of a D3 visualization.
 */
function visDeconstruct(svgNode) {
  console.log('visDeconstruct');
  console.log(svgNode);
  var deconstructed = VisDeconstruct.deconstruct(svgNode,sendDataToServer, "from 64");

    var deconData = [{
        schematized: deconstructed.groups,
        svg: deconstructed.svg,
        labels: deconstructed.labels,
        ids: _.map(deconstructed.marks, function(mark) { return mark.deconID; })
    }];

    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent("deconDataEvent", true, true, deconData);
    document.dispatchEvent(evt);
    if(sendDataToServer){
        window.deconstruction = {
            deconstruction: [deconstructed],
            updaterRecovered: false
        };
    }

}


function pageDeconstruct() {
    var deconstructed = VisDeconstruct.pageDeconstruct(sendDataToServer);
    var deconData = [];
    //console.log(deconstructed);
    $.each(deconstructed, function(i, decon) {
        //nodes = nodes.concat(decon.dataNodes.nodes);
        //ids = ids.concat(decon.dataNodes.ids);
        //updaters.push(new VisUpdater(svgNode, decon.dataNodes.nodes, decon.dataNodes.ids,
        //    decon.schematizedData));

        var deconDataItem = {
            schematized: decon.groups,
            svg: decon.svg,
            labels: decon.labels,
            ids: _.map(decon.marks, function(mark) { return mark.deconID; })
        };
        deconData.push(deconDataItem);
    });

    deconData = JSON.parse(CircularJSON.stringify(deconData));

    var deconDataStr = JSON.stringify(deconData);
    deconDataStr = '{"url": "'+window.location.href+'","scrap_date":"'+new Date().toUTCString()+'","d3data": '+ deconDataStr +'}';

    //console.log(deconDataStr);

    if(sendDataToServer){
      var request= new XMLHttpRequest();
      request.open("POST", "https://localhost:3000/", true);
      request.setRequestHeader("Content-type", "application/json");
      request.send(deconDataStr);

    }

    if(sendDataToServer === false) {
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("deconDataEvent", true, true, deconData);
      document.dispatchEvent(evt);

      window.deconstruction = {
        deconstruction: deconstructed,
        updaterRecovered: false
      };
    }
}
