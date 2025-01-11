// Client ID and API Key from the Developer Console
const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
const API_KEY = 'YOUR_API_KEY';

// Discovery doc URL for Sheets API
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

// DOM Elements
const fileMenu = document.getElementById('file-menu');
const insertMenu = document.getElementById('insert-menu');
const functionMenu = document.getElementById('function-menu');
const output = document.getElementById('output');
const spreadsheetContainer = document.getElementById('spreadsheet-container');
let spreadsheetId = '';
let currentSheet;

// Load the API client and auth library
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

// Initialize the API client library and set up sign-in state listeners
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [DISCOVERY_DOC],
        scope: SCOPES,
    }).then(() => {
        // Handle the initial sign-in state
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

// Update the UI based on sign-in status
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        output.innerHTML = 'Signed in!';
    } else {
        output.innerHTML = 'Please sign in!';
    }
}

// Handle the "File" menu options
document.getElementById('new').onclick = createNewSpreadsheet;
document.getElementById('open').onclick = openSpreadsheet;
document.getElementById('import').onclick = importSpreadsheet;
document.getElementById('copy').onclick = makeCopy;

// Handle the "Insert" menu options
document.getElementById('insert-row').onclick = insertRow;
document.getElementById('insert-column').onclick = insertColumn;
document.getElementById('insert-chart').onclick = insertChart;
document.getElementById('insert-function').onclick = toggleFunctionMenu;

// Handle the "Function" options
document.getElementById('sum').onclick = calculateSum;
document.getElementById('avg').onclick = calculateAvg;
document.getElementById('max').onclick = calculateMax;
document.getElementById('min').onclick = calculateMin;

// Handle creating a new spreadsheet
function createNewSpreadsheet() {
    const spreadsheetBody = {
        properties: { title: 'New Spreadsheet' },
    };
    gapi.client.sheets.spreadsheets.create({}, spreadsheetBody).then((response) => {
        spreadsheetId = response.result.spreadsheetId;
        currentSheet = response.result;
        output.innerHTML = `New spreadsheet created! <a href="https://docs.google.com/spreadsheets/d/${spreadsheetId}" target="_blank">Open it here</a>`;
    });
}

// Handle opening an existing spreadsheet
function openSpreadsheet() {
    const id = prompt('Enter the Spreadsheet ID');
    if (id) {
        gapi.client.sheets.spreadsheets.get({ spreadsheetId: id }).then((response) => {
            currentSheet = response.result;
            spreadsheetId = id;
            output.innerHTML = `Spreadsheet opened! <a href="https://docs.google.com/spreadsheets/d/${spreadsheetId}" target="_blank">Open it here</a>`;
        });
    }
}

// Handle importing the spreadsheet into PDF
function importSpreadsheet() {
    // Example of downloading the spreadsheet as a PDF (requires proper export URL)
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=pdf`;
    window.open(url, '_blank');
}

// Handle making a copy of the spreadsheet
function makeCopy() {
    gapi.client.sheets.spreadsheets.copyTo({
        spreadsheetId: spreadsheetId,
        resource: { destinationSpreadsheetId: 'NEW_SPREADSHEET_ID' },
    }).then((response) => {
        output.innerHTML = 'Spreadsheet copied!';
    });
}

// Handle inserting a row
function insertRow() {
    // Example logic to add a new row
    let newRow = `<tr><td></td><td></td><td></td></tr>`;
    document.getElementById('spreadsheet').innerHTML += newRow;
}

// Handle inserting a column
function insertColumn() {
    // Example logic to insert a column
    let rows = document.querySelectorAll('#spreadsheet tr');
    rows.forEach(row => {
        row.innerHTML += `<td></td>`;
    });
}

// Handle chart insertion (dummy implementation)
function insertChart() {
    let chartType = prompt("Enter chart type: bar, pie, or graph");
    if (chartType) {
        // This is a dummy implementation. You can create charts using Google Charts or Chart.js
        output.innerHTML = `Creating a ${chartType} chart...`;
    }
}

// Handle function insertion (dummy implementation)
function toggleFunctionMenu() {
    functionMenu.style.display = functionMenu.style.display === 'block' ? 'none' : 'block';
}

// Perform operations like sum, average, max, min
function calculateSum() {
    alert('Sum calculation is not implemented yet!');
}

function calculateAvg() {
    alert('Average calculation is not implemented yet!');
}

function calculateMax() {
    alert('Max calculation is not implemented yet!');
}

function calculateMin() {
    alert('Min calculation is not implemented yet!');
}

// Load the API client
handleClientLoad();
