
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUp, ArrowDown, Download, Copy, Check } from "lucide-react";
import { Transaction } from "@/types/Transaction";
import ESlipView from "./ESlipView";

interface TransactionHistoryProps {
  transactions: Transaction[];
  onBack: () => void;
  onTransactionSelect: (transaction: Transaction | null) => void;
  selectedTransaction: Transaction | null;
}

const TransactionHistory = ({ 
  transactions, 
  onBack, 
  onTransactionSelect, 
  selectedTransaction 
}: TransactionHistoryProps) => {
  const [showESlip, setShowESlip] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyTransactionId = async (transactionId: string) => {
    try {
      await navigator.clipboard.writeText(transactionId);
      setCopiedId(transactionId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy transaction ID:', err);
    }
  };

  if (showESlip && selectedTransaction) {
    return (
      <ESlipView 
        transaction={selectedTransaction}
        onBack={() => {
          setShowESlip(false);
          onTransactionSelect(null);
        }}
      />
    );
  }

  if (selectedTransaction) {
    return (
      <div>
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => onTransactionSelect(null)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">รายละเอียดธุรกรรม</h1>
                <p className="text-sm text-gray-500">#{selectedTransaction.id}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-6 py-6">
          <Card className="p-6 space-y-6">
            {/* Status Badge */}
            <div className="text-center">
              <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                ✓ สำเร็จ
              </Badge>
            </div>

            {/* Amount */}
            <div className="text-center border-b pb-6">
              <p className={`text-4xl font-bold ${
                selectedTransaction.type === 'outgoing' ? 'text-red-600' : 'text-green-600'
              }`}>
                {selectedTransaction.type === 'outgoing' ? '-' : '+'}฿{selectedTransaction.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-gray-500 mt-2">
                {selectedTransaction.type === 'outgoing' ? 'เงินออก' : 'เงินเข้า'}
              </p>
            </div>

            {/* Transaction Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-gray-600">
                  {selectedTransaction.type === 'outgoing' ? 'ผู้รับเงิน:' : 'ผู้ส่งเงิน:'}
                </span>
                <div className="text-right">
                  <p className="font-medium">
                    {selectedTransaction.type === 'outgoing' 
                      ? selectedTransaction.recipient?.name 
                      : selectedTransaction.sender?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedTransaction.type === 'outgoing' 
                      ? selectedTransaction.recipient?.payTag 
                      : selectedTransaction.sender?.payTag}
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">วันที่และเวลา:</span>
                <div className="text-right">
                  <p className="font-medium">
                    {selectedTransaction.date.toLocaleDateString('th-TH')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedTransaction.date.toLocaleTimeString('th-TH', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">รหัสธุรกรรม:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm">{selectedTransaction.id}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyTransactionId(selectedTransaction.id)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedId === selectedTransaction.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {selectedTransaction.memo && (
                <div className="flex justify-between">
                  <span className="text-gray-600">หมายเหตุ:</span>
                  <span className="font-medium text-right max-w-[200px]">
                    "{selectedTransaction.memo}"
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <Button 
                onClick={() => setShowESlip(true)}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-5 h-5 mr-2" />
                ดาวน์โหลด E-Slip
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">ประวัติการทำธุรกรรม</h1>
              <p className="text-sm text-gray-500">รายการเงินเข้า-ออกทั้งหมด</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <ArrowDown className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-green-700">เงินเข้า</p>
                <p className="font-semibold text-green-800">
                  ฿{transactions
                    .filter(t => t.type === 'incoming')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString('th-TH')}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 text-red-600 p-2 rounded-full">
                <ArrowUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-red-700">เงินออก</p>
                <p className="font-semibold text-red-800">
                  ฿{transactions
                    .filter(t => t.type === 'outgoing')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString('th-TH')}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">รายการธุรกรรม</h2>
          
          {transactions.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">ยังไม่มีรายการธุรกรรม</p>
            </Card>
          ) : (
            transactions.map((transaction) => (
              <Card 
                key={transaction.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onTransactionSelect(transaction)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'outgoing' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {transaction.type === 'outgoing' ? (
                        <ArrowUp className="w-5 h-5" />
                      ) : (
                        <ArrowDown className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.type === 'outgoing' 
                          ? transaction.recipient?.name 
                          : transaction.sender?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.type === 'outgoing' 
                          ? transaction.recipient?.payTag 
                          : transaction.sender?.payTag}
                      </p>
                      <p className="text-xs text-gray-400">
                        {transaction.date.toLocaleDateString('th-TH')} • {transaction.date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-lg ${
                      transaction.type === 'outgoing' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.type === 'outgoing' ? '-' : '+'}฿{transaction.amount.toLocaleString('th-TH')}
                    </p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      สำเร็จ
                    </Badge>
                  </div>
                </div>
                {transaction.memo && (
                  <p className="text-sm text-gray-600 mt-2 ml-11">"{transaction.memo}"</p>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
