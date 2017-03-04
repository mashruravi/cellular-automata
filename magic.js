function generateRandomBinaryState() {
    return Math.floor(Math.random() * 2);
}

function createRow() {
    let row = document.createElement('div');

    // Get the width of the browser viewport
    let browserViewportWidth = window.innerWidth;

    // Width of 1 cell is 10px.
    let cellWidth = 10;

    let maxCellsPossible = browserViewportWidth / cellWidth;

    // Account for implicit padding on the left and scrollbars
    maxCellsPossible -= 3;

    for(let i = 0; i < maxCellsPossible; i++) {
        let cell = document.createElement('div');
        row.appendChild(cell);
    }
    row.classList.add('row');
    return row;
}

function createFirstRow() {
    let firstRow = createRow();
    randomizeRow(firstRow);
    document.querySelector('.rowWrapper').appendChild(firstRow);
}

function randomizeRow(rowDiv) {
    for(let i = 0; i < rowDiv.childNodes.length; i++) {
        let cell = rowDiv.childNodes[i];
        cell.classList.add(generateRandomBinaryState() ? 'active' : 'inactive');
    }
}

function getState(cell) {
    return cell.classList.contains('active');
}

function getRuleValues() {
    return [false, true, false, false, true, false, false, false];
}

function processTarget(target, leftSiblingState, prevSelfState, rightSiblingState) {
    let rule = getRuleValues();

    let targetWeight = 0;
    if(leftSiblingState) {
        targetWeight += 4;
    }
    if(prevSelfState) {
        targetWeight += 2;
    }
    if(rightSiblingState) {
        targetWeight += 1;
    }

    target.classList.add(rule[targetWeight] ? 'active' : 'inactive');
}

function processRow(newRow, prevRow) {
    for(let i = 0; i < newRow.childNodes.length; i++) {
        let target = newRow.childNodes[i];
        let prevSelf = prevRow.childNodes[i];
        
        let leftSibling = prevSelf.previousElementSibling ||
            prevRow.childNodes[prevRow.childElementCount - 1];

        let rightSibling = prevSelf.nextElementSibling ||
            prevRow.childNodes[0];

        processTarget(target, getState(leftSibling), getState(prevSelf), getState(rightSibling));
    }
}

function generateNextRow() {
    let newRow = createRow();
    let wrapper = document.querySelector('.rowWrapper');
    let prevRow = wrapper.childNodes[wrapper.childElementCount - 1];
    processRow(newRow, prevRow);
    wrapper.appendChild(newRow);
}