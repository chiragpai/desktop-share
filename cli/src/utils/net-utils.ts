import process from "process";
import os from "os";
import chalk from "chalk";

export class NetUtils {
    findLocalAddress(): string {
        let addrs = os.networkInterfaces();
        for (const n in addrs) {
            const inf = addrs[n];
            for (const index in inf) {
                const element = inf[index];
                if (element.address.match(/192\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/)) {
                    return element.address;
                }
            }
        }
        console.log(chalk.bold.yellow("No local network connection found!, try connecting to a Wifi and try again..."));
        process.exit(1);
    }
}