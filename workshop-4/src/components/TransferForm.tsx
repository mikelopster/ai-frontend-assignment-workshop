
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Search, User, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PinConfirmation from "./PinConfirmation";
import { Transaction, User as UserType } from "@/types/Transaction";

interface TransferFormProps {
  onBack: () => void;
  onComplete: (transaction: Transaction) => void;
  userBalance: number;
}

// Mock users for PayTag search
const mockUsers: UserType[] = [
  { name: "สมชาย ใจดี", payTag: "@somchai_jaidee" },
  { name: "สุดา แสงใส", payTag: "@suda_sangsai" },
  { name: "ปิยะ รุ่งอรุณ", payTag: "@piya_sunrise" },
  { name: "นิรันดร์ สุขใจ", payTag: "@niran_sukjai" },
  { name: "มาลี ดอกไม้", payTag: "@mali_dokmai" }
];

const TransferForm = ({ onBack, onComplete, userBalance }: TransferFormProps) => {
  const [step, setStep] = useState<'search' | 'form' | 'confirm' | 'pin'>('search');
  const [payTagSearch, setPayTagSearch] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<UserType | null>(null);
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const filteredUsers = mockUsers.filter(user => 
    user.payTag.toLowerCase().includes(payTagSearch.toLowerCase()) ||
    user.name.toLowerCase().includes(payTagSearch.toLowerCase())
  );

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!selectedRecipient) {
      newErrors.recipient = 'กรุณาเลือกผู้รับเงิน';
    }
    
    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum)) {
      newErrors.amount = 'กรุณาใส่จำนวนเงิน';
    } else if (amountNum <= 0) {
      newErrors.amount = 'จำนวนเงินต้องมากกว่า 0';
    } else if (amountNum > userBalance) {
      newErrors.amount = 'ยอดเงินไม่เพียงพอ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 'form') {
      if (validateForm()) {
        setStep('confirm');
      }
    } else if (step === 'confirm') {
      setStep('pin');
    }
  };

  const handlePinSuccess = () => {
    const transaction: Transaction = {
      id: `TXN${Date.now()}`,
      type: 'outgoing',
      amount: parseFloat(amount),
      recipient: selectedRecipient!,
      memo: memo || undefined,
      date: new Date(),
      status: 'completed'
    };
    onComplete(transaction);
  };

  const renderSearchStep = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="payTag" className="text-base font-medium text-gray-700">
          ค้นหาผู้รับเงินด้วย PayTag หรือชื่อ
        </Label>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="payTag"
            value={payTagSearch}
            onChange={(e) => setPayTagSearch(e.target.value)}
            placeholder="@username หรือ ชื่อผู้ใช้"
            className="pl-10 h-12 text-base"
          />
        </div>
      </div>

      {payTagSearch && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">ผลการค้นหา</Label>
          {filteredUsers.length > 0 ? (
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <Card 
                  key={user.payTag} 
                  className="p-4 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  onClick={() => {
                    setSelectedRecipient(user);
                    setStep('form');
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.payTag}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                ไม่พบผู้ใช้งานที่ตรงกับการค้นหา กรุณาตรวจสอบ PayTag อีกครั้ง
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );

  const renderFormStep = () => (
    <div className="space-y-6">
      {/* Selected Recipient */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{selectedRecipient?.name}</p>
            <p className="text-sm text-gray-500">{selectedRecipient?.payTag}</p>
          </div>
        </div>
      </Card>

      {/* Amount Input */}
      <div>
        <Label htmlFor="amount" className="text-base font-medium text-gray-700">
          จำนวนเงิน (บาท)
        </Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="mt-2 h-12 text-lg text-center"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          ยอดเงินคงเหลือ: ฿{userBalance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Memo Input */}
      <div>
        <Label htmlFor="memo" className="text-base font-medium text-gray-700">
          หมายเหตุ (ไม่บังคับ)
        </Label>
        <Textarea
          id="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="เช่น ค่าอาหาร, ค่าเช่าบ้าน..."
          className="mt-2"
          maxLength={100}
        />
        <p className="text-xs text-gray-500 mt-1">{memo.length}/100 ตัวอักษร</p>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">ยืนยันการโอนเงิน</h3>
        <p className="text-gray-600">กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนยืนยัน</p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="text-center border-b pb-4">
          <p className="text-3xl font-bold text-blue-600">
            ฿{parseFloat(amount).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">ผู้รับเงิน:</span>
            <div className="text-right">
              <p className="font-medium">{selectedRecipient?.name}</p>
              <p className="text-sm text-gray-500">{selectedRecipient?.payTag}</p>
            </div>
          </div>
          
          {memo && (
            <div className="flex justify-between">
              <span className="text-gray-600">หมายเหตุ:</span>
              <span className="font-medium">"{memo}"</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">วันที่:</span>
            <span className="font-medium">{new Date().toLocaleDateString('th-TH')}</span>
          </div>
        </div>
      </Card>
    </div>
  );

  if (step === 'pin') {
    return (
      <PinConfirmation
        onBack={() => setStep('confirm')}
        onSuccess={handlePinSuccess}
        amount={parseFloat(amount)}
        recipient={selectedRecipient!}
      />
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
              <h1 className="text-xl font-semibold text-gray-900">ส่งเงิน</h1>
              <p className="text-sm text-gray-500">
                {step === 'search' && 'ค้นหาผู้รับเงิน'}
                {step === 'form' && 'ใส่จำนวนเงิน'}
                {step === 'confirm' && 'ยืนยันการโอน'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <Card className="p-6">
          {step === 'search' && renderSearchStep()}
          {step === 'form' && renderFormStep()}
          {step === 'confirm' && renderConfirmStep()}

          <div className="flex space-x-3 mt-8">
            {step !== 'search' && (
              <Button 
                variant="outline" 
                onClick={() => {
                  if (step === 'form') setStep('search');
                  if (step === 'confirm') setStep('form');
                }}
                className="flex-1"
              >
                ย้อนกลับ
              </Button>
            )}
            
            {step === 'search' && payTagSearch && filteredUsers.length === 0 && (
              <Button disabled className="flex-1">
                ไม่พบผู้ใช้งาน
              </Button>
            )}
            
            {(step === 'form' || step === 'confirm') && (
              <Button 
                onClick={handleNext}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {step === 'form' ? 'ถัดไป' : 'ยืนยันการโอน'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TransferForm;
