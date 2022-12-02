function doGet(e) {
    var htmlOutput =  HtmlService.createTemplateFromFile('index');
    htmlOutput.message = '';
    return htmlOutput.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Allows to be opened in other websites when embed. 
  }
  
  function doPost(e) {
    
    Logger.log(JSON.stringify(e));
    
    var destination_id = '########';  // ID OF GOOGLE DRIVE DIRECTORY. https://drive.google.com/drive/folders/############ . -- Replace it with the code after /folders/#####
    var destination = DriveApp.getFolderById(destination_id);
    var data = Utilities.base64Decode(e.parameter.fileData);
    var blob = Utilities.newBlob(data, e.parameter.mimeType, e.parameter.fileName);
    destination.createFile(blob);
    listRecord(e.parameter.band_name, e.parameter.vorname, e.parameter.nachname, e.parameter.email, e.parameter.fileName , e.parameter.ich_stimme_zu, e.parameter.ich_stimme_zu_2, e.parameter.ich_stimme_zu_3); 
    var htmlOutput =  HtmlService.createTemplateFromFile('msg');
    htmlOutput.message = 'File uploaded successfully';
    return htmlOutput.evaluate();
    
  }
  
  function listRecord(band_name, vorname, nachname, email, filename,ich_stimme_zu, ich_stimme_zu_2, ich_stimme_zu_3) // Html tags that are used for differente fields of the form. 
  {
    var url = 'https://docs.google.com/spreadsheets/d/######################';  //URL OF GOOGLE EXCEL SHEET;
    var ss= SpreadsheetApp.openByUrl(url);
    var recordsSheet = ss.getSheetByName("Sheet1");
    recordsSheet.appendRow([new Date(), band_name, vorname, nachname,email,   filename, ich_stimme_zu, ich_stimme_zu_2, ich_stimme_zu_3]);
  }
  
  function getUrl() {
   var url = ScriptApp.getService().getUrl();
   return url;
  }
  
  
  