import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import cv2
import numpy as np

# Path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'/opt/anaconda3/lib/python3.8/site-packages/pytesseract'  # Adjust the path as per your installation

def preprocess_image(image):
    # Convert to grayscale
    gray = cv2.cvtColor(np.array(image), cv2.COLOR_BGR2GRAY)
    # Apply thresholding
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return thresh

def extract_text_from_image(image):
    # Convert the image to a format that pytesseract can work with
    preprocessed_image = preprocess_image(image)
    # Use pytesseract to extract text
    text = pytesseract.image_to_string(preprocessed_image, config='--psm 6')
    return text

def extract_text_from_pdf(pdf_path):
    # Convert PDF to images
    images = convert_from_path(pdf_path)
    extracted_text = ""
    for image in images:
        # Process multi-column documents by splitting the image if necessary
        width, height = image.size
        left_image = image.crop((0, 0, width // 3, height))
        middle_image = image.crop((width // 3, 0, 2 * width // 3, height))
        right_image = image.crop((2 * width // 3, 0, width, height))
        
        # Extract text from each column
        left_text = extract_text_from_image(left_image)
        middle_text = extract_text_from_image(middle_image)
        right_text = extract_text_from_image(right_image)
        
        # Combine text from all columns
        page_text = left_text + "\n" + middle_text + "\n" + right_text
        extracted_text += page_text + "\n\n"
    return extracted_text

# Example usage
pdf_path = 'path_to_your_legal_document.pdf'
extracted_text = extract_text_from_pdf(pdf_path)
print(extracted_text)
