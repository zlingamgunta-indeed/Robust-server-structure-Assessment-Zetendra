const path = require("path");
const urls = require(path.resolve("src/data/urls-data.js"));
const uses = require(path.resolve("src/data/uses-data.js"));
const controller = require("../url/url.controller")

function list(req, res) {
    res.status(200).json({data: uses})
}

function isUrlExists(req, res, next) {
    const {urlId} = req.params;
    const urlsFound = uses.filter((use) => use.urlId === Number(urlId))
    if (urlsFound.length > 0) {
        res.locals.urlUses = urlsFound;
        next();
    } else {
        next({
            status: 404,
            message: `Uses not found for url ${urlId}`
        })
    }
}

function isExists(req, res, next) {
    const {useId} = req.params;
    const findUse = uses.find(use => use.id === Number(useId));
    if (findUse) {
        res.locals.use = findUse;
        next()
    } else {
        next({
            status: 404,
            message: `Uses not found for ${useId}`
        })
    }
}

function isUrlUseMatched(req, res, next) {
    const {urlId, useId} = req.params;
    const foundUse = uses.find((use) => use.id === Number(useId) && use.urlId === Number(urlId));
    if (foundUse) {
        res.locals.foundUse = foundUse;
        next();
    } else {
        next({
            status: 404,
            message: `Use ${useId} not matching with url ${urlId}`
        })
    }
}

function getUrlUse(req, res) {
    res.status(200).json({data: res.locals.foundUse})
}

function read(req, res) {
    res.status(200).json({data: res.locals.use})
}

function listUrlUses(req, res) {
    res.status(200).json({data: res.locals.urlUses})
}

function deleteUse(req, res) {
    const {useId} = req.params;
    const index = uses.findIndex(use => use.id === Number(useId))
    uses.splice(index, 1);
    res.sendStatus(204)
}

function deleteUrlUseMatched(req, res) {
    const {urlId, useId} = req.params;
    const index = uses.findIndex((use) => use.id === Number(useId) && use.urlId === Number(urlId));
    uses.splice(index, 1);
    res.sendStatus(204)
}

module.exports = {
    list,
    listUrlUses: [
        isUrlExists,
        listUrlUses
    ],
    read: [
        isExists,
        read
    ],
    getUrlUse: [
        isUrlUseMatched,
        getUrlUse
    ],
    deleteUse: [
        isExists,
        deleteUse
    ],
    deleteUrlUseMatched: [
        isUrlUseMatched,
        deleteUrlUseMatched
    ]
}