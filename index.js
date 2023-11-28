const fs = require('graceful-fs');
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");

class Svg {
    constructor() {
        this.text = '';
        this.shape = '';
    }

    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shape}${this.text}</svg>`;
    }

    setText(text, color) {
        this.text = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
    }

    setShape(shape) {
        this.shape = shape.render();
    }
}

const questions = [
    { type: "input", name: "text", message: "Enter up to 3 Characters:" },
    { type: "input", name: "textColor", message: "Enter text color (keyword or hex):" },
    { type: "input", name: "shapeColor", message: "Enter shape color (keyword or hex):" },
    { type: "list", name: "shapeType", message: "Choose a shape:", choices: ["Circle", "Square", "Triangle"] }
];

async function init() {
    console.log("Initializing SVG Generator...");
    const answers = await inquirer.prompt(questions);
    const { text, textColor, shapeColor, shapeType } = answers;

    if (text.length === 0 || text.length > 3) {
        console.log("Error: Text must be 1-3 characters.");
        return;
    }

    let shape;
    switch (shapeType.toLowerCase()) {
        case "square": shape = new Square(); break;
        case "circle": shape = new Circle(); break;
        case "triangle": shape = new Triangle(); break;
        default: console.log("Error: Invalid shape."); return;
    }
    shape.setColor(shapeColor);

    const svg = new Svg();
    svg.setText(text, textColor);
    svg.setShape(shape);

    const svgString = svg.render();
    console.log("Generated SVG:", svgString);

    writeToFile('logo.svg', svgString);
    console.log("SVG written to logo.svg");
}


function writeToFile(fileName, data) {
    const filePath = `generated_logos/${fileName}`;
    fs.writeFile(filePath, data, (err) => {
        if (err) console.error("Error writing file:", err);
        else console.log(`SVG written to ${filePath}`);
    });
}

init();
