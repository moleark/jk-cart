/* eslint-disable */
var FindMoleculeNamespace = {};
//Called by DrawMolecule before drawing
//Use to draw a structure in DrawMolecule on load
function getCdx() {
	return $("#structureSearchValue").val();
}

//Called by DrawMolecule on startup
function rightPaneStartup() {
	$('#drawmolecule')[0].contentWindow.rightPaneStartup(true, true, true, false, "search");
}

//Called by DrawMolecule on startup
function isAutomaticCenterRequired() {
	return true;
}

function getStructure() {
	//Call DrawMolecule to get the cdx before searching
	var structure = $('#drawmolecule')[0].contentWindow.getCdx();
	return structure;
}

function getSearchOptions() {
	//Call DrawMolecule to get the searchOptions before searching
	var searchOptions = $('#drawmolecule')[0].contentWindow.getSearchOptions();
	return searchOptions;
}


function drawMolecule(index, lcmFile) {
	// var c = $("#moleculeCanvas" + index);
	var c = document.getElementById("moleculeCanvas" + index);
	var ctx = c.getContext("2d");
	ctx.lineWidth = 1;

	FindMoleculeNamespace.drawMoleculeInCanvas(ctx, lcmFile, 75, 50);
}

var structure;
var searchOptions;
var lastId;

function callStructureSearch() {
	structure = getStructure();
	searchOptions = getSearchOptions();
	var structureSearchJSON = { "structure": structure, "options": { "searchOptions": searchOptions } };

	$.ajax({
		type: "POST",
		headers: {
			'Accept': "*",
			// 'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		url: "https://fm.jkchemical.com/fm/structureSearch",
		data: JSON.stringify(structureSearchJSON)
	}).done(function (fmResults) {
		//parse JSON
		if (fmResults) {
			//Iterate on results
			var canvases = $("#moleculeCanvases").html("");
			for (var i = 0; i < fmResults.list.length; i++) {
				var casNumber = fmResults.list[i].casNumber;

				//TODO create HTML canvases	
				var createA = $("<a>"), createDiv = $("<div>"), createCanvas = $("<canvas>");
				createA.attr("class", "col-6 col-sm-4 col-lg-3 mb-2").attr("target", "_blank")
					.attr("href", "/search/" + "170491-63-1" || casNumber);
				createDiv.html(casNumber).attr("class", "text-center");
				createCanvas.attr("id", "moleculeCanvas" + i).attr("class", "moleculeCanvas border")
					.attr("height", 260).attr("style", "width:100%");
				createA.append(createCanvas).append(createDiv).appendTo(canvases);

				//Draw structures
				drawMolecule(i, fmResults.list[i].lcmFile);
				lastId = fmResults.list[i].id;
			}
		}
	}).fail(function (error) {
		console.error(error);
	});
}

function callStructureSearchNextResults(lastId) {
	//Use structure and searchOptions from previous search
	var structureSearchJSON = { "structure": structure, "options": { "searchOptions": searchOptions, "moleculeId": lastId } };

	$.ajax({
		type: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		url: "http://211.5.9.57:8080/fm/structureSearch",
		data: JSON.stringify(structureSearchJSON)
	}).done(function (fmResults) {
		//parse JSON
		if (fmResults) {
			//Iterate on results
			for (var i = 0; i < fmResults.list.length; i++) {
				var casNumber = fmResults.list[i].casNumber;

				//TODO create HTML canvases of results to append to the existing ones

				//Draw structures
				drawMolecule(i, fmResults.list[i].lcmFile);
			}
		}
	}).fail(function (error) {
		console.error(error);
	});
}



FindMoleculeNamespace.drawSolidLine = function (ctx, line) {
	ctx.setLineDash([]);
	ctx.beginPath();
	ctx.moveTo(line[0], line[1]);
	ctx.lineTo(line[2], line[3]);
	ctx.stroke();
};

FindMoleculeNamespace.drawDashLine = function (ctx, line) {
	ctx.setLineDash([4, 4]);
	ctx.beginPath();
	ctx.moveTo(line[0], line[1]);
	ctx.lineTo(line[2], line[3]);
	ctx.stroke();
};

//draw wavy line between origin point and dest point 
FindMoleculeNamespace.drawWavyLine = function (ctx, origin, dest) {
	var WAVE_LENGTH = 10;
	ctx.setLineDash([]);
	ctx.beginPath();
	ctx.moveTo(origin[0], origin[1]);

	var distance = FindMoleculeNamespace.computeDistance(origin, dest);
	var nbCycles = (distance / WAVE_LENGTH);

	for (var i = 0; i < nbCycles - 1; i++) {
		var p1 = FindMoleculeNamespace.computeIntervalPoint(origin, dest, i, nbCycles);
		var p2 = FindMoleculeNamespace.computeIntervalPoint(origin, dest, i + 1, nbCycles);

		var midPoint = FindMoleculeNamespace.computeMidPoint(p1, p2);
		var pointAbove = FindMoleculeNamespace.computePerpendicularPoint(midPoint, p1, 1.5);
		var pointBelow = FindMoleculeNamespace.computePerpendicularPoint(midPoint, p1, -1.5);

		ctx.bezierCurveTo(pointAbove[0], pointAbove[1], pointBelow[0], pointBelow[1], p2[0], p2[1]);
	}

	ctx.stroke();
};

//compute distance between origin point and dest point 
FindMoleculeNamespace.computeDistance = function (origin, dest) {
	var dx = origin[0] - dest[0];
	var dy = origin[1] - dest[1];
	var distance = Math.sqrt(dx * dx + dy * dy);
	return distance;
};

//compute interval point between origin and dist, 
//located at i/nbCycles the distance from origin to dist
FindMoleculeNamespace.computeIntervalPoint = function (origin, dest, i, nbCycles) {
	var mx = origin[0] + (dest[0] - origin[0]) / nbCycles * i;
	var my = origin[1] + (dest[1] - origin[1]) / nbCycles * i;
	var ip = new Array(mx, my);
	return ip;
};

//compute point between origin and dist 
FindMoleculeNamespace.computeMidPoint = function (origin, dest) {
	var mx = (origin[0] + dest[0]) / 2;
	var my = (origin[1] + dest[1]) / 2;
	var mp = new Array(mx, my);
	return mp;
};

//compute pp point at 90' degree (if amplitude > 0) or at 270 (if amplitude < 0)
//of the ref point, where line pivotPoint-refpoint and line pivotPoint-pp point 
//cross perpendicularly. If amplitude is 1 or -1, the pp point is equally 
//distant from pivotPoint than refPoint. 
FindMoleculeNamespace.computePerpendicularPoint = function (pivotPoint, refPoint, amplitude) {
	var dx = pivotPoint[0] - refPoint[0];
	var dy = pivotPoint[1] - refPoint[1];
	var distance = FindMoleculeNamespace.computeDistance(pivotPoint, refPoint);
	dx = dx / distance;
	dy = dy / distance;

	var px = pivotPoint[0] + (amplitude * distance) * dy;
	var py = pivotPoint[1] + (-1 * amplitude * distance) * dx;
	var pp = new Array(px, py);
	return pp;
};

//Draw molecule in canvas using LCM file
FindMoleculeNamespace.drawMoleculeInCanvas = function (ctx, lcmFile, translateX, translateY) {
	if (lcmFile) {
		//window.alert("draw!");
		var array = lcmFile.split("\n");
		//window.alert("array.length : " + array.length);

		ctx.translate(translateX, translateY);

		//window.alert("array[8] : " + array[8]);
		var scaleLine = array[5].match(/\S+/g);
		var scaleFactor = scaleLine[1];
		ctx.scale(scaleFactor, scaleFactor);

		var i = 8;
		for (; i < array.length; i++) {
			if (array[i].trim() == '') {
				break;
			}

			//window.alert("array[i] : " + array[i]);
			var line = array[i].match(/\S+/g);
			line[0] = +line[0];
			line[1] = +line[1];
			line[2] = +line[2];
			line[3] = +line[3];
			//window.alert("line[0] : " + line[0]);

			ctx.beginPath();
			ctx.moveTo(line[0], line[1]);
			ctx.strokeStyle = 'rgb(' + line[5] + ', ' + line[6] + ', ' + line[7] + ')';

			if (line[10] == '0') {
				FindMoleculeNamespace.drawSolidLine(ctx, line);
			} else if (line[10] == '1') {
				FindMoleculeNamespace.drawDashLine(ctx, line);
			} else if (line[10] == '2') {
				var origin = new Array(line[0], line[1]);
				var dest = new Array(line[2], line[3]);
				FindMoleculeNamespace.drawWavyLine(ctx, origin, dest);
			} else {
				FindMoleculeNamespace.drawSolidLine(ctx, line);
			}
		}

		for (i += 3; i < array.length; i++) {
			var caption = array[i].match(/\S+/g);
			caption[1] = +caption[1];
			caption[2] = +caption[2];
			if (caption[7] == 20) {
				ctx.font = 'lighter 20px Arial';
				ctx.textBaseline = "alphabetic";
			}
			else if (caption[7] < 15) {
				ctx.font = 'lighter 12px Arial';
				if (caption[0].startsWith("^")) {
					// supscript
					ctx.textBaseline = "bottom";
					caption[0] = caption[0].substring(1);
				} else {
					//subscript
					ctx.textBaseline = "middle";
				}
			}
			else {
				if (caption[6] === 'Arial') {
					ctx.font = 'lighter 15px Arial';
				}
				else {
					//bold
					ctx.font = 'bold 15px Arial';
				}
				ctx.textBaseline = "alphabetic";
			}

			ctx.fillStyle = 'rgb(' + caption[3] + ', ' + caption[4] + ', ' + caption[5] + ')';
			ctx.fillText(caption[0].split('_').join(' '), caption[1], caption[2]);
		}
	}
};