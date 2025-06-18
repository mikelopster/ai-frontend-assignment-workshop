
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, CreditCard, History, UserCheck, Wallet } from "lucide-react";
import { useState } from "react";
import TransferForm from "@/components/TransferForm";
import TransactionHistory from "@/components/TransactionHistory";
import { Transaction } from "@/types/Transaction";

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  {
    id: "TXN202412180001",
    type: "outgoing",
    amount: 500,
    recipient: {
      name: "สมชาย ใจดี",
      payTag: "@somchai_jaidee"
    },
    memo: "ค่าอาหารมื้อเที่ยง",
    date: new Date("2024-12-18T12:30:00"),
    status: "completed"
  },
  {
    id: "TXN202412180002",
    type: "incoming",
    amount: 1200,
    sender: {
      name: "สุดา แสงใส",
      payTag: "@suda_sangsai"
    },
    memo: "ค่าหนังสือ",
    date: new Date("2024-12-18T09:15:00"),
    status: "completed"
  },
  {
    id: "TXN202412170001",
    type: "outgoing",
    amount: 2500,
    recipient: {
      name: "ปิยะ รุ่งอรุณ",
      payTag: "@piya_sunrise"
    },
    memo: "ค่าเช่าบ้าน",
    date: new Date("2024-12-17T14:20:00"),
    status: "completed"
  }
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'transfer' | 'history'>('dashboard');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [balance] = useState(15750.50);

  const handleTransactionComplete = (transaction: Transaction) => {
    // In a real app, this would update the backend
    console.log('Transaction completed:', transaction);
    setCurrentView('dashboard');
  };

  if (currentView === 'transfer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <TransferForm 
          onBack={() => setCurrentView('dashboard')}
          onComplete={handleTransactionComplete}
          userBalance={balance}
        />
      </div>
    );
  }

  if (currentView === 'history') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <TransactionHistory 
          transactions={mockTransactions}
          onBack={() => setCurrentView('dashboard')}
          onTransactionSelect={setSelectedTransaction}
          selectedTransaction={selectedTransaction}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PayWise</h1>
              <p className="text-sm text-gray-500">P2P Transfers</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Wallet className="w-3 h-3 mr-1" />
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-blue-100 text-sm">ยอดเงินคงเหลือ</p>
                <p className="text-3xl font-bold">฿{balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-white/10 p-3 rounded-full">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center text-blue-100 text-sm">
              <UserCheck className="w-4 h-4 mr-2" />
              บัญชีหลัก • ****1234
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => setCurrentView('transfer')}
              className="h-20 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 flex flex-col items-center justify-center space-y-2 shadow-sm"
              variant="outline"
            >
              <ArrowUp className="w-6 h-6 text-red-500" />
              <span className="text-sm font-medium">ส่งเงิน</span>
            </Button>
            
            <Button 
              onClick={() => setCurrentView('history')}
              className="h-20 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 flex flex-col items-center justify-center space-y-2 shadow-sm"
              variant="outline"
            >
              <History className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium">ประวัติ</span>
            </Button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">รายการล่าสุด</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentView('history')}
              className="text-blue-600 hover:text-blue-700"
            >
              ดูทั้งหมด
            </Button>
          </div>
          
          <div className="space-y-3">
            {mockTransactions.slice(0, 3).map((transaction) => (
              <Card key={transaction.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'outgoing' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {transaction.type === 'outgoing' ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
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
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'outgoing' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.type === 'outgoing' ? '-' : '+'}฿{transaction.amount.toLocaleString('th-TH')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction.date.toLocaleDateString('th-TH')}
                    </p>
                  </div>
                </div>
                {transaction.memo && (
                  <p className="text-sm text-gray-600 mt-2 ml-11">"{transaction.memo}"</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
