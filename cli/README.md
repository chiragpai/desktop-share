# desktop-share

 ## About
 desktop-share is sharing application which runs on your Windows / macOS / Linux machine and can accept incoming files and can set incoming set automatically to your clipboard for easy pasting `ctrl + v (on Windows)` or `cmd + v (on macOS)`<br/>
 ### Installation
 To get started run below in your terminal/command prompt
```console
npm install @com.chirag.software/desktop-share
```
### Starting desktop-share
To start receiving, run
```console
desktop-share
```

Other options
```console
  -V, --version      output the version number
  -p, --port <port>  Port to start the desktop-share server on (default: "8080")
  -h, --help         display help for command
```
### After starting desktop-share
Once desktop-share has started in your terminal you should see a QR Code of your local IP and the port used.<br/>
Scan the QR Code on your phone. **All connected devices must be in the same WiFi / local network**

 ## Usage
 Desktop share is powered by Node.js and Angular and is open source. It transmits data within your local network and does not interact with the cloud nor does your data leave your network.<br/><br/>
 Since there is no signing certificate, your data is trasmitted locally using <i>http</i>. Make sure there is no one intercepting your local traffic.

 ## Terms of usage
 The developer does not bear any reponsibility for your data, how this utility is used. Continuing to use the application, you agree to bear reponsibility.

 ## Issues with the app?
 If you see any issues with the application, you can raise an issue here [https://github.com/chiragpai/desktop-share/issues](https://github.com/chiragpai/desktop-share/issues)