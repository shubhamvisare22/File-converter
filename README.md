# PDF and Word Converter

This project is a simple web application that allows users to convert PDF files to Word documents and Word documents to PDF files. The application is built using Flask for the backend, jQuery for handling frontend AJAX requests, and Bootstrap for styling.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- Convert PDF files to Word documents (.docx).
- Convert Word documents (.docx) to PDF files.
- Download converted files directly from the browser.
- User-friendly interface with real-time notifications.
- Error handling for unsupported file types.

## Demo

You can access the demo at [http://127.0.0.1:5000](http://127.0.0.1:5000).

## Installation

### Prerequisites

Ensure you have the following installed:

- Python 3.6 or higher
- pip (Python package installer)
- LibreOffice (for converting Word to PDF)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shubhamvisare22/pdf-word-converter.git
   cd pdf-word-converter
   ```
2. **Create a virtual environment and activate it:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install the required packages:**

   ```bash
   pip install -r requirements.txt
   ```
4. **Run the application:**

   ```bash
   python app.py
   ```
5. **Open your browser and navigate to:**

   ```
   http://127.0.0.1:5000
   ```

## Usage

### Converting PDF to Word

1. Upload a PDF file using the provided form.
2. Click on "Convert to Word".
3. Once the conversion is complete, download the Word file.

### Converting Word to PDF

1. Upload a Word (.docx) file using the provided form.
2. Click on "Convert to PDF".
3. Once the conversion is complete, download the PDF file.

## File Structure

pdf-word-converter/
│
├── static/
│ ├── css/
│ │ └── styles.css
│ ├── js/
│ │ └── scripts.js
│ └── output_docs/
│ └── output_pdfs/
├── templates/
│ └── home.html
├── app.py
├── converter.py
├── requirements.txt
└── README.md

- **`static/css/styles.css`**: Custom stylesheets.
- **`static/js/scripts.js`**: JavaScript for AJAX and interactions.
- **`static/output_docs/`**: Directory where converted Word documents are stored.
- **`static/output_pdfs/`**: Directory where converted PDF files are stored.
- **`templates/home.html`**: Main HTML file for the interface.
- **`app.py`**: Flask application and routes.
- **`converter.py`**: Conversion logic for PDF to Word and Word to PDF.
- **`requirements.txt`**: List of Python dependencies.

## API Endpoints

### Convert PDF to Word

- **URL**: `/pdf_to_word`
- **Method**: `POST`
- **Data**: `upload_file` (PDF file)
- **Response**: JSON with status and file path

### Convert Word to PDF

- **URL**: `/word_to_pdf`
- **Method**: `POST`
- **Data**: `upload_file` (Word file)
- **Response**: JSON with status and file path

### Download File

- **URL**: `/download/`
- **Method**: `POST`
- **Data**: `filename` (in JSON)
- **Response**: File as a binary blob for download

## Technologies Used

- **Backend**: Flask
- **Frontend**: jQuery, Bootstrap
- **File Conversion**: `pdf2docx`, `libreoffice`
- **Deployment**: Local server with Flask

## Troubleshooting

### File Not Downloading

- Ensure the filename is correctly sent to the download endpoint.
- Verify that the file paths in your Flask routes are correct and match where files are stored.

### Errors During Conversion

- Ensure that LibreOffice is installed and properly configured on your machine for converting Word documents to PDF.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
