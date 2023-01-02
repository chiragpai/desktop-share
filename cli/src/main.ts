#! /usr/bin/env node
import bodyParser from "body-parser";
import chalk from "chalk";
import clipboard from "clipboardy";
import express from "express";
import os from "os";
import QRCode from "qrcode";
import multer from "multer";
import fs from "fs";
import path from "path";
import process from "process";

const dest = os.homedir() + "/Downloads/desktop-share";

const findLocalAddress = (): string => {
    let addrs = os.networkInterfaces();
    if (!addrs?.wlan0) {
        console.log(chalk.bold.yellow("No wiress connection found!, try connecting to a Wifi and try again..."));
        return "";
    }
    for (let index = 0; index < addrs.wlan0.length; index++) {
        const element = addrs.wlan0[index];
        if (element.address.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/)) {
            return element.address;
        }
    }
}

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if(!fs.existsSync(dest)){
            fs.mkdirSync(dest);
        }
        callback(null, dest);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({ storage: storage }).single("uploaded_file");

enum endpoints {
    STATIC = "/static",
    RECEIVE_FILES = "/files",
    RECEIVE_TEXT = "/text"
}

const port = 8080;
app.get(endpoints.RECEIVE_TEXT, urlencodedParser, (request, response) => {
    let text = request.query.text;
    response.send("Received text: " + text);
});

app.post(endpoints.RECEIVE_TEXT, bodyParser.json(), (request, response) => {
    let text = request.body;
    console.log("Received request to update clipboard", request.body);
    const respJson = { "received": request.body, "clipboardUpdated": false };
    if (request.body.text) {
        clipboard.writeSync(request.body.text);
        respJson.clipboardUpdated = true;
    }
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.send(respJson)
});

app.post(endpoints.RECEIVE_FILES, (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    upload(request, response, function (err) {
        if (err) {
            console.log(err);
            response.status(500).send(err);
        } else {
            response.status(200).send(request.file);
        }
    })
});

app.get("/", (request, response) => response.redirect("/index.html"));

app.get("/:fileName", (request, response) => {
    const fileName: string = request.params.fileName ? request.params.fileName : "index.html";
    const filePath = path.join(process.cwd(), "dist", "static", fileName);
    console.log("Loading requested file", filePath);
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.sendFile(filePath);
});

const serverHandler = () => {
    //@ts-ignore
    var host = server.address().address;
    const url = "http://" + findLocalAddress() + ":" + port;
    console.log(chalk.bold.red("Started desktop-share server on %s"), url);

    if (host != "0.0.0.0") {
        QRCode.toString(url, { type: 'terminal' },
            function (err, QRcode) {
                if (err) return console.log("error occurred")
                console.log(QRcode)
            });
    }

};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const server = app.listen(port, serverHandler);