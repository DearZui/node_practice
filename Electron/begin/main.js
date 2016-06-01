const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

//保持对window对象的全局引用
let mainwindow = null;

//所有窗口关闭退出
app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

//完成初始化并准备创建窗口后
app.on('ready', function() {
	//创建浏览器窗口
	mainwindow = new BrowserWindow({ width: 900, height: 600 });

	//加载应用的html
	mainwindow.loadURL('file://' + __dirname + '/index.html');

	//关闭window
	mainwindow.on('closed', function() {
		mainwindow = null;
	})
})