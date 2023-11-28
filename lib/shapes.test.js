const { Circle, Square, Triangle } = require("./shapes");

// Circle Shape Test
describe('Circle', () => {
    test('renders correctly', () => {
        const circle = new Circle();
        const color = 'blue';
        circle.setColor(color);
        expect(circle.render()).toEqual(`<circle cx="50%" cy="50%" r="100" fill="${color}"></circle>`);
    });
});

// Square Shape Test
describe('Square', () => {
    test('renders correctly', () => {
        const square = new Square();
        const color = 'green';
        square.setColor(color);
        expect(square.render()).toEqual(`<rect x="50" y="50" height="200" width="200" fill="${color}"></rect>`);
    });
});

// Triangle Shape Test
describe('Triangle', () => {
    test('renders correctly', () => {
        const triangle = new Triangle();
        const color = 'pink';
        triangle.setColor(color);
        expect(triangle.render()).toEqual(`<polygon points="0,200 300,200 150,0" fill="${color}"></polygon>`);
    });
});
