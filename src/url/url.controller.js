const path = require("path");
const urls = require(path.resolve("src/data/urls-data.js"));
const uses = require(path.resolve("src/data/uses-data.js"));

function hasHref(req, res, next) {
    const {data : {href}} = req.body;
    if (href) {
        next()
    } else {
        next({
            status: '400',
            message: "A 'href' property is required."
        })
    }
}

function read(req, res) {
    const findUrl = res.locals.url;
    const use = {
        id: uses.length + 1,
        urlId: findUrl.id,
        time: Date.now()
    }
    uses.push(use)
    res.status(200).json({data: findUrl})
}

function create(req, res) {
    const {data : {href}} = req.body;
    const newUrl = {
        id: urls.length + 1,
        href
    }
    urls.push(newUrl)
    res.status(201).json({data: newUrl})
}

function isExists(req, res, next) {
    const { urlId } = req.params;
    const findUrl = urls.find(url => url.id === Number(urlId));
    if (findUrl) {
        res.locals.url = findUrl;
        next()
    } else {
        next({
            status: 404,
            message: `Url not found ${urlId}`
        })
    }
}

function update(req, res) {
    const findUrl = res.locals.url;
    const {data : {href}} = req.body;
    findUrl.href = href;
    res.status(200).json({data: findUrl})
}

function list(req, res) {
    res.status(200).json({data: urls});
}

module.exports = {
    create: [
        hasHref,
        create
    ],
    update: [
        isExists,
        hasHref,
        update
    ],
    read: [
        isExists,
        read
    ],
    list
}