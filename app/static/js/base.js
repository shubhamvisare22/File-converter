$(document).ready(function () {
    // Toastr options
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    // Show loader
    function showLoader() {
        $("#loaderOverlay").fadeIn();
        $("#loader").show();
    }

    // Hide loader
    function hideLoader() {
        $("#loaderOverlay").fadeOut();
        $("#loader").hide();
    }

    // Validate PDF file upload
    function validatePdfUpload(file) {
        if (file && file.type !== "application/pdf") {
            toastr.error("Please upload a valid PDF file.");
            return false;
        }
        else if (!file) {
            toastr.error("Please upload PDF file.");
            return false;
        }
        return true;
    }

    // Validate Word file upload
    function validateWordUpload(file) {
        if (file && !file.name.endsWith(".docx")) {
            toastr.error("Please upload a valid Word file (.docx).");
            return false;
        }
        else if (!file) {
            toastr.error("Please upload word file.");
            return false;
        }
        return true;
    }

    function downloadFile(filename) {
        var downloadUrl = "/download";
        var data = JSON.stringify({ "filename": filename });

        $.ajax({
            url: downloadUrl,
            type: 'POST',
            data: data,
            contentType: 'application/json',
            xhrFields: {
                responseType: 'blob'
            },
            success: function (response, status, xhr) {
                var blob = new Blob([response], { type: xhr.getResponseHeader('Content-Type') });
                var downloadUrl = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(downloadUrl);
            },
            error: function (xhr, status, error) {
                toastr.error("Failed to download the file: " + error);
            }
        });
        return true
    }

    $("#pdfToWordForm").submit(function (e) {
        e.preventDefault();
        var file = document.getElementById("pdf_file").files[0];
        if (validatePdfUpload(file)) {
            showLoader();
            var formData = new FormData(this);
            $.ajax({
                url: "/pdf_to_word",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    hideLoader();
                    $("#pdf_file").val("")
                    if (response.status) {
                        Swal.fire({
                            title: "Success",
                            text: response.msg,
                            icon: "success",
                            showCancelButton: true,
                            confirmButtonText: 'Download',
                            cancelButtonText: 'Close'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                console.log(response.file_path)
                                if (downloadFile(response.file_path)) {
                                    toastr.success("file downloaded successfully.");
                                }
                            }
                        });
                    } else {
                        toastr.error(response.msg);
                    }
                },
                error: function () {
                    hideLoader();
                    toastr.error("An error occurred while converting the file.");
                }
            });
        }
    });

    // Handle Word to PDF form submission
    $("#wordToPdfForm").submit(function (e) {
        e.preventDefault();
        var file = document.getElementById("word_file").files[0];
        if (validateWordUpload(file)) {
            showLoader();
            var formData = new FormData(this);
            $.ajax({
                url: "/word_to_pdf",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    hideLoader();
                    $("#word_file").val("")
                    if (response.status) {
                        Swal.fire({
                            title: "Success",
                            text: response.msg,
                            icon: "success",
                            showCancelButton: true,
                            confirmButtonText: 'Download',
                            cancelButtonText: 'Close'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                downloadFile(response.file_path);
                            }
                        });
                    } else {
                        toastr.error(response.msg);
                    }
                },
                error: function () {
                    hideLoader();
                    toastr.error("An error occurred while converting the file.");
                }
            });
        }
    });
});