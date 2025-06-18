
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User } from "@/types/Transaction";

interface PinConfirmationProps {
  onBack: () => void;
  onSuccess: () => void;
  amount: number;
  recipient: User;
}

const PinConfirmation = ({ onBack, onSuccess, amount, recipient }: PinConfirmationProps) => {
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const maxAttempts = 3;
  const correctPin = '123456'; // In real app, this would be verified with backend

  const handlePinInput = (digit: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + digit);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  const handleSubmit = async () => {
    if (pin.length !== 6) return;

    setIsProcessing(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (pin === correctPin) {
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= maxAttempts) {
        setError('PIN ผิดเกินกำหนด ระบบถูกล็อคชั่วคราว');
      } else {
        setError(`PIN ไม่ถูกต้อง เหลือ ${maxAttempts - newAttempts} ครั้ง`);
      }
      
      setPin('');
    }
    
    setIsProcessing(false);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="max-w-md mx-auto px-6">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <div className="bg-green-100 text-green-600 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">โอนเงินสำเร็จ!</h2>
            <p className="text-gray-600 mb-4">
              โอนเงินจำนวน ฿{amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} 
              <br />ให้ {recipient.name} เรียบร้อยแล้ว
            </p>
            <div className="animate-pulse text-blue-600 text-sm">
              กำลังกลับไปหน้าหลัก...
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
            <Button variant="ghost" size="sm" onClick={onBack} disabled={isProcessing}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">ยืนยันด้วย PIN</h1>
              <p className="text-sm text-gray-500">ใส่ PIN 6 หลักเพื่อยืนยันการโอน</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Transaction Summary */}
        <Card className="p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900">การโอนเงิน</p>
              <p className="text-sm text-gray-500">ต้องการ PIN เพื่อยืนยัน</p>
            </div>
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">จำนวน:</span>
              <span className="font-semibold text-lg">
                ฿{amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ผู้รับ:</span>
              <div className="text-right">
                <p className="font-medium">{recipient.name}</p>
                <p className="text-sm text-gray-500">{recipient.payTag}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* PIN Input */}
        <Card className="p-6">
          <div className="text-center mb-6">
            <p className="text-lg font-medium text-gray-900 mb-4">ใส่ PIN 6 หลัก</p>
            
            {/* PIN Dots */}
            <div className="flex justify-center space-x-3 mb-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border-2 ${
                    index < pin.length
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {error && (
              <Alert className="mb-4">
                <AlertDescription className="text-red-600">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
              <Button
                key={num}
                variant="outline"
                className="h-14 text-lg font-semibold"
                onClick={() => handlePinInput(num.toString())}
                disabled={isProcessing || attempts >= maxAttempts}
              >
                {num}
              </Button>
            ))}
            
            <Button
              variant="outline"
              className="h-14 text-lg"
              onClick={handleClear}
              disabled={isProcessing || attempts >= maxAttempts}
            >
              ล้าง
            </Button>
            
            <Button
              variant="outline"
              className="h-14 text-lg font-semibold"
              onClick={() => handlePinInput('0')}
              disabled={isProcessing || attempts >= maxAttempts}
            >
              0
            </Button>
            
            <Button
              variant="outline"
              className="h-14 text-lg"
              onClick={handleDelete}
              disabled={isProcessing || attempts >= maxAttempts}
            >
              ลบ
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={pin.length !== 6 || isProcessing || attempts >= maxAttempts}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>กำลังดำเนินการ...</span>
              </div>
            ) : (
              'ยืนยันการโอน'
            )}
          </Button>
          
          {attempts >= maxAttempts && (
            <p className="text-center text-sm text-red-600 mt-4">
              กรุณาติดต่อธนาคารเพื่อปลดล็อค
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PinConfirmation;
