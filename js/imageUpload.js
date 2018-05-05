           
    function workManager() {
        imageName = document.getElementById("txt").value;
        if (imageName != "") // check that there is a name for the image
            getPicture();
        else
            alert("Please Insert A Name For Your Picture!");
    }// Work Manager

//-------------------------------------------------------------------------------
// Get the picture from the camera
//-------------------------------------------------------------------------------
function getPicture() {
            
    if ($("#radio-view-b").attr('checked'))
        sourceType = navigator.camera.PictureSourceType.PHOTOLIBRARY;
    else
        sourceType = navigator.camera.PictureSourceType.CAMERA;
            
    params =  {
        quality: 50, // from 0 to 100 - size vs. quality
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: sourceType // other options : PHOTOLIBRARY , SAVEDPHOTOALBUM
    }
    navigator.camera.getPicture(uploadPhoto, // ** PG **
         function (message) { alert('camera.getPicture failed'); },
         params
         ); 

}// Get Picture

//---------------------------------------------------------------------------------
// Upload the photo to the server
//---------------------------------------------------------------------------------
function uploadPhoto(imageURI) {
    loadAnimation(); // Start the spinning "working" animation

    var options = new FileUploadOptions(); // PhoneGap options object 
    options.fileKey="file";
    options.fileName = imageName; // file name
    options.mimeType = "image/jpeg"; // file type

    var params = {}; // Optional parameters in case you need to pass
    params.value1 = "some param1";
    params.value2 = "some param2";
    options.params = params; // add parameters to the FileUploadOptions object

    var ft = new FileTransfer(); // ** PG **
    var serverUrl = "http://proj.ruppin.ac.il/mobile/pg/picUploadServer/ReturnValue.ashx";
    ft.upload(imageURI, encodeURI(serverUrl), uploadSuccess, uploadFail, options); // Upload
}// Upload Photo

//---------------------------------------------------
// Loading Successful
//---------------------------------------------------
function uploadSuccess(resp) {
    stopLoadAnimation(); // Stop "loading" animation
    path = "http://proj.ruppin.ac.il/mobile/pg/picUploadServer/images/"; // the folder in which the image is saved
    $("#mainImage").attr('src', path + imageName + ".jpg");
} // success (

//---------------------------------------------------
// Loading Failed
//---------------------------------------------------    
function uploadFail(error) { 
    stopLoadAnimation(); // Stop "loading" animation
    alert("An error has occurred: Code = " + error.code);
}

//---------------------------------------------------
// Loading Animation
//---------------------------------------------------
function loadAnimation() {
    $.mobile.loading('show', {
        text: "loading the image",
        theme: 'c',
        textVisible : true
    });} // loading

//---------------------------------------------------
// Stop Loading Animation
//---------------------------------------------------
function stopLoadAnimation() {
    $.mobile.loading('hide');
} // Unload

