const excelJs = require("exceljs"); //impoting all the dependency
const {test, expect} = require('@playwright/test');

async function writeExcel(searchText, replaceText, change, filePath) {
  const workbook = new excelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1"); //this worksheet will have knowledge of everything in sheet1
  const output = await readExcel(worksheet, searchText);

  const cell = worksheet.getCell(output.row, output.column + change.colChange); //it's not a good practice to add static data so adding dynamic into it by removing (3,2)
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber; //putting value of rownumber into object row
        output.column = colNumber;
      }
    });
  });
  return output;
}
// update Banana price to 350
// writeExcel("Apple", 350, {rowChange:0,colChange:2}, "C:/Users/champ/Downloads/excelHe.xlsx");

test('Upload and Download Excel Validation', async ({page})=>{

    const textSearch = 'Mango'
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download'); //wait till download fully completes
    await page.getByRole('button', {name: 'download'}).click(); 
    await downloadPromise;
    writeExcel("Apple", updateValue, {rowChange:0,colChange:2}, "C:/Users/champ/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/champ/Downloads/download.xlsx");
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

});
