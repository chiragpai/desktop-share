#! /usr/bin/env node
import { Server } from "./utils/server.js";
import { Command } from 'commander';
const program = new Command();

program.name("desktop-share")
    .description("Utility to easily share files to your Computer or text to your Computer's clipboard")
    .version("1.0.2")
    .option("-p, --port <port>", "Port to start the desktop-share server on", "8080");

program.parse(process.argv);
const options = program.opts();

const server = new Server();
server.startServer(parseInt(options.port));