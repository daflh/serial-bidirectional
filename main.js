const readline = require('readline');
const { SerialPort } = require('serialport');
const { DelimiterParser } = require('@serialport/parser-delimiter')

const serial = new SerialPort({ path: 'COM12', baudRate: 115200 });
const parser = serial.pipe(new DelimiterParser({ delimiter: '\r\n' }))

parser.on('data', (buffer) => {
    const data = buffer.toString()
    if (!data) return

    console.log(`\x1b[92m${data}\x1b[0m`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getUserInput() {
  rl.question('', (input) => {
    serial.write(input + '\n')
    getUserInput();
  });
}
getUserInput();
