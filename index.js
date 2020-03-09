// Based on: https://medium.com/@refik/a-journey-and-a-method-for-drawing-spheres-5b24246ca479

const sphere = document.getElementById('sphere');

const xControls = document.getElementById('x-controls');
const yControls = document.getElementById('y-controls');
const zControls = document.getElementById('z-controls');

const useColorsCheckbox = document.getElementById("use-colors-checkbox");

const mouseDamping = 1/3;

function getControls(name) {
    if (name.startsWith('x')) {
        return xControls;

    } else if (name.startsWith('y')) {
        return yControls;

    } else if (name.startsWith('z')) {
        return zControls;
    }

    return undefined;
}

function getCoordinate(axis) {
    return getControls(axis).value;
}

function setCoordinate(axis, value) {
    getControls(axis).value = realMod(value, 360);
}

function setAllCoordinates(x, y, z) {
    setCoordinate('x', x);
    setCoordinate('y', y);
    setCoordinate('z', z);
}

function onResetClicked() {
    setAllCoordinates(0, 0, 0);
    draw()
}

function onMouseMove(event) {
    if (event.buttons > 0) {
        const x = getCoordinate('x');
        let newX = x - Math.floor(event.movementY * mouseDamping);
        setCoordinate('x', newX);

        const y = getCoordinate('y');
        let newY = y + Math.floor(event.movementX * mouseDamping);
        setCoordinate('y', newY);

        draw()
    }
}

function onValueChanged() {
    sphere.angles = [xControls.value, yControls.value, zControls.value];
    draw()
}

function draw() {
    sphere.draw();
}

document.getElementById("reset-button").onclick = onResetClicked;
// canvas.addEventListener('mousemove', onMouseMove);
useColorsCheckbox.addEventListener('change', draw);

xControls.addEventListener('value-changed', onValueChanged);
xControls.addEventListener('visibility-changed', draw);

yControls.addEventListener('value-changed', onValueChanged);
yControls.addEventListener('visibility-changed', draw);

zControls.addEventListener('value-changed', onValueChanged);
zControls.addEventListener('visibility-changed', draw);


draw();
