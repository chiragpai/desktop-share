import bodyParser from "body-parser";
import chalk from "chalk";
import clipboard from "clipboardy";
import express from "express";
import os from "os";
import QRCode from "qrcode";
import multer from "multer";
import fs from "fs";
import path from "path";
import { NetUtils } from "./net-utils.js";
import { fileURLToPath } from 'url';

enum endpoints {
    STATIC = "/static",
    RECEIVE_FILES = "/files",
    RECEIVE_TEXT = "/text"
}

// @ts-ignore
const dirname = path.dirname(fileURLToPath(import.meta.url));

export class Server {
    private dest = os.homedir() + "/Downloads/desktop-share";
    private netUtils;
    private app;

    private urlencodedParser;
    private storage;
    private upload;

    private port = 8080;
    private server;

    constructor() {
        this.netUtils = new NetUtils();
        this.app = express();
        this.urlencodedParser = bodyParser.urlencoded({ extended: false });
        this.storage = multer.diskStorage({
            destination: function (req, file, callback) {
                if (!fs.existsSync(this.dest)) {
                    fs.mkdirSync(this.dest);
                }
                callback(null, this.dest);
            },
            filename: function (req, file, callback) {
                callback(null, file.originalname);
            }
        });
        this.upload = multer({ storage: this.storage }).single("uploaded_file");
    }

    private initServer() {
        this.app.get(endpoints.RECEIVE_TEXT, this.urlencodedParser, (request, response) => {
            let text = request.query.text;
            response.send("Received text: " + text);
        });

        this.app.post(endpoints.RECEIVE_TEXT, bodyParser.json(), (request, response) => {
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

        this.app.post(endpoints.RECEIVE_FILES, (request, response) => {
            response.set("Access-Control-Allow-Origin", "*");
            response.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            this.upload(request, response, function (err) {
                if (err) {
                    console.log(err);
                    response.status(500).send(err);
                } else {
                    response.status(200).send(request.file);
                    console.log("Received file", request.file);
                }
            })
        });

        this.app.get("/", (request, response) => response.redirect("/index.html"));

        this.app.get("/:fileName", (request, response) => {
            const fileName: string = request.params.fileName ? request.params.fileName : "index.html";
            // const filePath = path.join(process.cwd(), "dist", "static", fileName);
            const filePath = path.resolve(dirname + "/" + path.join("..", "..", "dist", "static", fileName));
            console.log("Loading requested file", filePath);
            response.set("Access-Control-Allow-Origin", "*");
            response.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            response.sendFile(filePath);
        });

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    startServer(port?: number) {
        if (this.server) {
            return this.server;
        }
        this.initServer();
        if (port) {
            this.port = port;
        }
        this.server = this.app.listen(this.port, () => {
            //@ts-ignore
            const url = "http://" + this.netUtils.findLocalAddress() + ":" + this.port;
            console.log(chalk.bold.red("Started desktop-share server on %s"), url);

            QRCode.toString(url, { type: 'terminal' },
                function (err, QRcode) {
                    if (err) return console.log("error occurred")
                    console.log(QRcode)
                });

        });

        return this.server;
    }
}