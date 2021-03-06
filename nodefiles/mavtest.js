var SerialPort = require('serialport');
var mavlink = require('mavlink');


//Open serial port
var port = new SerialPort('/dev/cu.usbserial-A502IDJM', {
	baudrate: 57600
});

//When port is open, start up mavlink
port.on('open', function() {
	console.log("Serial Port is ready");
	
	//listening for system 1 component 1
	var m = new mavlink(1,1);
	
	//When mavlink is ready, assign some listeners
	m.on('ready', function() {
		console.log("Mavlink is ready!");
		
		//Parse any new incoming data
		port.on('data', function(data) {
			m.parse(data);
		});
		
		//Attitude listener
		m.on('ATTITUDE', function(message, fields) {
			//Do something interesting with Attitude data here
			console.log("Roll is " + fields.roll + "\nPitch is " + fields.pitch);
		});
		
		m.createMessage("MISSION_ITEM", {
			'target_system'		: 1,
			'target_component'	: 1,
			'seq'				: 1,
			'frame'				: 2,
			'command'			: 400,
			'current'			: 1,
			'autocontinue'		: 0,
			'param1'			: 1,
			'param2'			: 0,
			'param3'			: 0,
			'param4'			: 0,
			'x'					: 0,
			'y'					: 0,
			'z'					: 0
		}, function(message) {
			echoMessage(message);
            port.write(message.buffer);
			console.log("Arm commanded.");
        });
		
		// //Create a few messages and print them to screen
		// m.createMessage("ATTITUDE", {
		// 	'time_boot_ms':	30,
		// 	'roll':			0.1,
		// 	'pitch':		0.2,
		// 	'yaw':			0.3,
		// 	'rollspeed':	0.4,
		// 	'pitchspeed':	0.5,
		// 	'yawspeed':		0.6
		// }, echoMessage);
		
		// m.createMessage("PARAM_VALUE", {
		// 	'param_id':		'MY_PI',
		// 	'param_value':	3.14159,
		// 	'param_type':	5,
		// 	'param_count':	100,
		// 	'param_index':	55
		// }, echoMessage);
		
		// m.createMessage("GPS_STATUS", {
		// 	'satellites_visible':		5,
		// 	'satellite_prn':			[1, 2, 3, 4, 5],
		// 	'satellite_used':			[2, 3, 4, 5, 6],
		// 	'satellite_elevation':		[3, 4, 5, 6, 7],
		// 	'satellite_azimuth':		[4, 5, 6, 7, 8],
		// 	'satellite_snr':			[5, 6, 7, 8, 9]
		// }, echoMessage);
	});
});

var echoMessage = function(message) {
	console.log(message);
}