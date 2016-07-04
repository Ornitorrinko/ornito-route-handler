"use strict";

const express = require("express");

module.exports = function(data) {

	if (!data) {
		throw new Error("data argument is required");
	}

	let version = data.version;
	let route_map = data.route_map;

	version = version || "1.0";
	route_map = route_map || [];

	if (route_map.constructor !== Array) {
		route_map = [];
	}

	const app = (0, express.Router)();

	for (let i = route_map.length - 1; i >= 0; i--) {
		if (isRoute(route_map[i].router)) {
			app.use("/" + route_map[i].url, route_map[i].router);
		}
	}

	app.use(handleError);

	app.get("/", function(req, res) {
		res.json({
			version: version
		});
	});

	return app;
}

function handleError(err, req, res, next) {
	if (!err) {
		next();
	}

	var msg = err.message;
	if (msg === "EmptyResponse") {
		res.status(404).end();
	} else {
		var error = buildError(err);
		if (err.reason) {
			res.status(500).json(error);
		} else {
			res.json(error);
		}
	}
}

function buildError(err) {
	var data = {
		error: ""
	};

	if (err.message) {
		data.error = err.message;
	} else {
		if (typeof err === "string") {
			data.error = err;
		} else {
			data.error = JSON.stringify(err);
		}
	}

	return data;
}

function isRoute(route) {
	if (!route) return false;

	return ["get", "post", "put", "delete"]
		.filter(function(act) {
			return route[act];
		}).length > 0;
}