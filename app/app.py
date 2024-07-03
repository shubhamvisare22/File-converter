from flask import Flask, jsonify, request, render_template, send_file
from flask.views import MethodView
from converter import pdf_to_word, word_to_pdf
import os

app = Flask(__name__,
            static_url_path='',
            static_folder='./static',
            template_folder='./templates',
            )

# Ensure output directories exist
os.makedirs("./static/output_docs", exist_ok=True)
os.makedirs("./static/output_pdfs", exist_ok=True)
os.makedirs("./input_docs", exist_ok=True)
os.makedirs("./input_pdf", exist_ok=True)


class FileConverterMixin:
    def _convert_file(self, upload_key, input_subdir, converter, success_msg, error_msg):
        if not upload_key in request.files:
            return jsonify({"status": False, "msg": error_msg}), 400

        uploaded_file = request.files[upload_key]
        input_directory = os.path.join(os.getcwd(), f"{input_subdir}/{uploaded_file.filename}")
        uploaded_file.save(input_directory)

        if uploaded_file:
            output_path = converter(input_directory)
            if output_path:
                os.remove(input_directory)
                output_file_name = os.path.basename(output_path)
                return jsonify({"status": True, "msg": success_msg, "file_path": output_file_name}), 200
            return jsonify({"status": False, "msg": "Something went wrong."}), 400


class HomeView(MethodView):
    def get(self):
        return render_template("home.html")


class PdfToWordView(FileConverterMixin, MethodView):
    def post(self):
        return self._convert_file(
            upload_key="upload_file",
            input_subdir="input_docs",
            converter=pdf_to_word,
            success_msg="File converted to Word.",
            error_msg="PDF is not provided."
        )


class WordToPdfView(FileConverterMixin, MethodView):
    def post(self):
        return self._convert_file(
            upload_key="upload_file",
            input_subdir="input_pdf",
            converter=word_to_pdf,
            success_msg="File converted to PDF.",
            error_msg="Word file is not provided."
        )


class DownloadFileView(MethodView):
    def post(self):
        try:
            filename = request.json.get('filename')
            if not filename:
                return jsonify({"status": False, "msg": "Filename not provided."}), 400

            if filename.endswith(".pdf"):
                file_path = os.path.join("output_pdfs", filename)
            else:
                file_path = os.path.join("output_docs", filename)

            return send_file(file_path, as_attachment=True), os.remove(file_path)
        except Exception as e:
            return str(e), 404


# Register URL rules
app.add_url_rule('/', view_func=HomeView.as_view('home_view'))
app.add_url_rule('/pdf_to_word', view_func=PdfToWordView.as_view('pdf_to_word_view'))
app.add_url_rule('/word_to_pdf', view_func=WordToPdfView.as_view('word_to_pdf_view'))
app.add_url_rule('/download', view_func=DownloadFileView.as_view('download_file'))

if __name__ == "__main__":
    app.run(debug=True, port=5000)
