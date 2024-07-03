import subprocess
from pdf2docx import parse
import os
import secrets


def pdf_to_word(input_file_path):
    output_directory = os.path.join(os.getcwd(), "./output_docs")
    os.makedirs(output_directory, exist_ok=True)

    output_file_name = f"{secrets.token_hex(10)}.docx"
    output_file_path = os.path.join(output_directory, output_file_name)

    try:
        if input_file_path.endswith(".pdf"):
            parse(input_file_path, output_file_path)
            return output_file_path  # Return the full path
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False


def word_to_pdf(input_file_path):
    output_directory = os.path.join(os.getcwd(), "./output_pdfs")
    os.makedirs(output_directory, exist_ok=True)
    output_file_name = f"{secrets.token_hex(10)}.pdf"
    output_file_path = os.path.join(output_directory, output_file_name)
    try:
        if input_file_path.endswith(".docx"):
            subprocess.call(['libreoffice', '--convert-to', 'pdf',
                            '--outdir', output_directory, input_file_path])
            expected_output_file_path = os.path.join(
                output_directory, os.path.basename(input_file_path).replace(".docx", ".pdf"))
            if os.path.exists(expected_output_file_path):
                os.rename(expected_output_file_path, output_file_path)
                return output_file_path  # Return the full path
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False
