#! /usr/bin/env node
import { Server } from "./utils/server.js";
import { Command } from 'commander';
import chalk from "chalk";
import QRCode from "qrcode";

const program = new Command();

program.name("desktop-share")
    .description("Utility to easily share files to your Computer or text to your Computer's clipboard")
    .version("desktop-share v1.0.4. For more details visit https://desktop--share.web.app")
    .addHelpText("afterAll", `
        For more details visit https://desktop--share.web.app
        `)
    .option("-p, --port <port>", "Port to start the desktop-share server on", "8080")
    .option("-q, --qr [qr]", "Display the QR code for the text. Does not start the desktop-share server");

program.parse(process.argv);
const options = program.opts();

if (options.qr === true) {
    let qrText = "https://desktop--share.web.app";
    console.log(chalk.bgGray.bold.red(`QR Code for: ${qrText}\r\n`))
    QRCode.toString(qrText, { type: 'terminal' },
        function (err, QRcode) {
            if (err) return console.log("error occurred")
            console.log(QRcode)
        });
} else if (options.qr !== undefined) {
    let qrText = options.qr;
    console.log(chalk.bgGray.bold.red(`QR Code for: ${qrText}\r\n`))
    QRCode.toString(qrText, { type: 'terminal' },
        function (err, QRcode) {
            if (err) return console.log("error occurred")
            console.log(QRcode)
        });
} else {
    const server = new Server();
    server.startServer(parseInt(options.port));
}