
import { InvokeLLM, UploadFile } from '@/api/integrations';
import { backend } from '@/backend'; // Import the backend SDK

const ALLOWED_DOC_TYPES = ["receipt", "invoice", "business_card", "id_card", "generic"];

class OCRService {
  async extractFromImage(imageFile) {
    try {
      if (!imageFile || !(imageFile instanceof File)) {
        throw new Error('Invalid file data provided');
      }
      if (imageFile.size === 0) {
        throw new Error('File is empty');
      }

      // Use original file directly without reconstruction
      let uploadResult;
      try {
        uploadResult = await UploadFile({ file: imageFile });
      } catch(e) {
         throw new Error('File upload failed. Please check your network connection and try again.');
      }

      if (!uploadResult || !uploadResult.file_url) {
        throw new Error('Failed to get file URL after upload.');
      }
      const { file_url } = uploadResult;
      
      const prompt = `You are a precise OCR & document-parsing agent. Extract text, detect document type, and return STRICT JSON matching the provided schema.

Crucially, you MUST select 'doc_type' from this exact list: ${ALLOWED_DOC_TYPES.join(', ')}. Do not invent new types. If unsure, classify as 'generic'.

Steps:
1. Read all text carefully from the provided file.
2. Infer the document type from the list above.
3. Populate the schema strictly with extracted data.
4. Provide a confidence score between 0 and 1 for your classification.
5. List any uncertainties in the 'warnings' array.

Return ONLY valid JSON.`;

      const response_json_schema = {
        type: "object",
        properties: {
          doc_type: {
            type: "string",
            enum: ALLOWED_DOC_TYPES
          },
          confidence: {
            type: "number",
            minimum: 0,
            maximum: 1
          },
          structured_data: {
            type: "object",
            properties: {
              receipt: {
                type: "object",
                properties: {
                  merchant_name: { type: "string" },
                  date: { type: "string" },
                  time: { type: "string" },
                  subtotal: { type: "string" },
                  tax: { type: "string" },
                  total: { type: "string" },
                  currency: { type: "string" },
                  payment_method: { type: "string" },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        qty: { type: "string" },
                        unit_price: { type: "string" },
                        line_total: { type: "string" }
                      }
                    }
                  }
                }
              },
              invoice: {
                type: "object",
                properties: {
                  invoice_number: { type: "string" },
                  invoice_date: { type: "string" },
                  due_date: { type: "string" },
                  seller: { type: "string" },
                  buyer: { type: "string" },
                  line_items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        description: { type: "string" },
                        qty: { type: "string" },
                        unit_price: { type: "string" },
                        line_total: { type: "string" }
                      }
                    }
                  },
                  subtotal: { type: "string" },
                  tax: { type: "string" },
                  total: { type: "string" },
                  currency: { type: "string" }
                }
              },
              business_card: {
                type: "object",
                properties: {
                  full_name: { type: "string" },
                  title: { type: "string" },
                  company: { type: "string" },
                  email: { type: "string" },
                  phone: { type: "string" },
                  website: { type: "string" },
                  address: { type: "string" }
                }
              },
              id_card: {
                type: "object",
                properties: {
                  full_name: { type: "string" },
                  dob: { type: "string" },
                  id_number: { type: "string" },
                  expiry_date: { type: "string" },
                  issuing_country: { type: "string" }
                }
              },
              generic: {
                type: "object",
                properties: {
                  key_values: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        key: { type: "string" },
                        value: { type: "string" }
                      }
                    }
                  }
                }
              }
            }
          },
          full_text: { type: "string" },
          warnings: {
            type: "array",
            items: { type: "string" }
          }
        },
        required: ["doc_type", "confidence", "structured_data", "full_text", "warnings"]
      };

      const result = await InvokeLLM({
        prompt,
        response_json_schema,
        file_urls: [file_url]
      });

      if (!ALLOWED_DOC_TYPES.includes(result.doc_type)) {
        result.doc_type = 'generic';
      }
      if (typeof result.confidence !== 'number') {
        result.confidence = 0.5;
      }
      
      const structuredData = {
        receipt: {},
        invoice: {},
        business_card: {},
        id_card: {},
        generic: { key_values: [] },
        ...(result.structured_data || {})
      };

      return {
        ...result,
        structured_data: structuredData,
        image_url: file_url
      };

    } catch (error) {
      console.error('OCR Service Error Details:', error);
      throw new Error(error.message || 'Failed to extract text from file.');
    }
  }

  async convertPdfToWord(pdfFile) {
    try {
      if (!pdfFile || !(pdfFile instanceof File) || pdfFile.type !== 'application/pdf') {
        throw new Error('Invalid PDF file provided');
      }

      // 1. Upload the file to get a URL
      const uploadResult = await UploadFile({ file: pdfFile });
      if (!uploadResult || !uploadResult.file_url) {
        throw new Error('File upload failed or did not return a URL.');
      }
      const { file_url } = uploadResult;

      // 2. Call the new backend function with the file URL
      const result = await backend.pdf_processor.extract_pdf_content({ file_url });

      if (result.status === 'error') {
        throw new Error(result.message || 'Backend failed to process the PDF.');
      }

      // 3. Build the HTML from the structured data returned by the backend
      let htmlContent = '';
      if (result.data && result.data.pages) {
        for (const page of result.data.pages) {
          htmlContent += `<div class="pdf-page" style="page-break-after: always; position: relative;">`;
          if (page.content) {
            for (const item of page.content) {
              if (item.type === 'text') {
                htmlContent += `<p>${item.value}</p>`;
              } else if (item.type === 'image') {
                htmlContent += `<img src="${item.base64}" style="max-width: 100%; height: auto;" />`;
              }
            }
          }
          htmlContent += `</div>`;
        }
      }

      if (htmlContent.trim() === '') {
        throw new Error("The document appears to be empty or could not be read.");
      }

      return htmlContent;

    } catch (error) {
      console.error('PDF to Word Service Error:', error);
      throw new Error(error.message || 'Failed to convert PDF to Word document.');
    }
  }
}

export const ocrService = new OCRService();
