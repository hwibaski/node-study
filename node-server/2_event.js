const EventEmiiter = require('node:events');

const eventEmitter = new EventEmiiter();

eventEmitter.on('start', (num1, num2) => {
    console.log('started');
    console.log(num1, num2);
}
);
	
eventEmitter.emit('start', 1, 2);