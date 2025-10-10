import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function FieldsDisplay({ docType, fields }) {
  if (!fields || !fields[docType]) {
    return (
      <div className="text-center text-gray-500">
        <p>No structured data available</p>
      </div>
    );
  }

  const data = fields[docType];

  const renderReceiptFields = (receipt) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">{receipt.merchant_name}</h4>
        <Badge className="bg-green-100 text-green-800 border-0 rounded-full shadow-clay-inner">
          {receipt.currency} {receipt.total}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-500">Date:</span>
          <p className="font-medium">{receipt.date}</p>
        </div>
        <div>
          <span className="text-gray-500">Time:</span>
          <p className="font-medium">{receipt.time}</p>
        </div>
      </div>

      {receipt.items && receipt.items.length > 0 && (
        <div>
          <h5 className="font-medium text-gray-700 mb-2">Items</h5>
          <div className="space-y-2">
            {receipt.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm bg-white/50 p-2 rounded-xl">
                <span>{item.name} (x{item.qty})</span>
                <span className="font-medium">{receipt.currency} {item.line_total}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
        <span>Subtotal:</span>
        <span>{receipt.currency} {receipt.subtotal}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Tax:</span>
        <span>{receipt.currency} {receipt.tax}</span>
      </div>
    </div>
  );

  const renderBusinessCardFields = (card) => (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-lg">{card.full_name}</h4>
        <p className="text-gray-600">{card.title}</p>
        <p className="text-gray-600 font-medium">{card.company}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        {card.email && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Email:</span>
            <span className="font-medium">{card.email}</span>
          </div>
        )}
        {card.phone && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Phone:</span>
            <span className="font-medium">{card.phone}</span>
          </div>
        )}
        {card.website && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Website:</span>
            <span className="font-medium">{card.website}</span>
          </div>
        )}
        {card.address && (
          <div className="flex items-start gap-2">
            <span className="text-gray-500">Address:</span>
            <span className="font-medium">{card.address}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderInvoiceFields = (invoice) => (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-lg">Invoice #{invoice.invoice_number}</h4>
          <p className="text-gray-600">{invoice.seller}</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800 border-0 rounded-full shadow-clay-inner">
          {invoice.currency} {invoice.total}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-500">Date:</span>
          <p className="font-medium">{invoice.invoice_date}</p>
        </div>
        <div>
          <span className="text-gray-500">Due:</span>
          <p className="font-medium">{invoice.due_date}</p>
        </div>
      </div>

      <div>
        <span className="text-gray-500 text-sm">Bill To:</span>
        <p className="font-medium">{invoice.buyer}</p>
      </div>
    </div>
  );

  const renderIdCardFields = (idCard) => (
    <div className="space-y-3">
      <h4 className="font-semibold text-lg">{idCard.full_name}</h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">ID Number:</span>
          <span className="font-medium">{idCard.id_number}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Date of Birth:</span>
          <span className="font-medium">{idCard.dob}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Expires:</span>
          <span className="font-medium">{idCard.expiry_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Country:</span>
          <span className="font-medium">{idCard.issuing_country}</span>
        </div>
      </div>
    </div>
  );

  const renderGenericFields = (generic) => (
    <div className="space-y-3">
      <h4 className="font-semibold text-lg">Document Details</h4>
      
      {generic.key_values && generic.key_values.length > 0 ? (
        <div className="space-y-2">
          {generic.key_values.map((kv, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-500">{kv.key}:</span>
              <span className="font-medium">{kv.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No key-value pairs extracted</p>
      )}
    </div>
  );

  const renderFields = () => {
    switch (docType) {
      case 'receipt':
        return renderReceiptFields(data);
      case 'invoice':
        return renderInvoiceFields(data);
      case 'business_card':
        return renderBusinessCardFields(data);
      case 'id_card':
        return renderIdCardFields(data);
      case 'generic':
        return renderGenericFields(data);
      default:
        return <p className="text-gray-500">Unknown document type</p>;
    }
  };

  return renderFields();
}