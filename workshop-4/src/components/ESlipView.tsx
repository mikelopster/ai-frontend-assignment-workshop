
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, CheckCircle } from "lucide-react";
import { Transaction } from "@/types/Transaction";

interface ESlipViewProps {
  transaction: Transaction;
  onBack: () => void;
}

const ESlipView = ({ transaction, onBack }: ESlipViewProps) => {
  const slipRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!slipRef.current) return;

    try {
      // In a real app, you would use a library like html2canvas
      // For now, we'll simulate the download
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = 400;
        canvas.height = 600;
        
        // Simple white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some basic text (in a real app, you'd convert the HTML properly)
        ctx.fillStyle = '#000000';
        ctx.font = '16px Arial';
        ctx.fillText('PayWise E-Slip', 20, 40);
        ctx.fillText(`Transaction ID: ${transaction.id}`, 20, 80);
        ctx.fillText(`Amount: ฿${transaction.amount.toLocaleString('th-TH')}`, 20, 120);
        
        // Create download link
        const link = document.createElement('a');
        link.download = `PayWise-ESlip-${transaction.id}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    } catch (error) {
      console.error('Error downloading E-Slip:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PayWise E-Slip',
          text: `รายการโอนเงิน ${transaction.amount} บาท - รหัสธุรกรรม: ${transaction.id}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`PayWise E-Slip - รหัสธุรกรรม: ${transaction.id}`);
    }
  };

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
              <h1 className="text-xl font-semibold text-gray-900">E-Slip</h1>
              <p className="text-sm text-gray-500">หลักฐานการโอนเงิน</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* E-Slip Card */}
        <Card ref={slipRef} className="bg-white border-2 border-gray-200 shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-1">PayWise</h2>
              <p className="text-blue-100 text-sm">หลักฐานการโอนเงิน</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Success Status */}
            <div className="text-center">
              <div className="bg-green-100 text-green-600 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <p className="text-lg font-semibold text-gray-900">การโอนเงินสำเร็จ</p>
              <p className="text-sm text-gray-500">Transaction Completed</p>
            </div>

            {/* Amount */}
            <div className="text-center border-y py-6">
              <p className="text-sm text-gray-500 mb-1">จำนวนเงิน</p>
              <p className={`text-4xl font-bold ${
                transaction.type === 'outgoing' ? 'text-red-600' : 'text-green-600'
              }`}>
                {transaction.type === 'outgoing' ? '-' : '+'}฿{transaction.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </p>
            </div>

            {/* Transaction Details */}
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">รหัสธุรกรรม:</span>
                <span className="font-mono font-medium">{transaction.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">วันที่และเวลา:</span>
                <div className="text-right">
                  <p className="font-medium">{transaction.date.toLocaleDateString('th-TH')}</p>
                  <p className="text-gray-500">
                    {transaction.date.toLocaleTimeString('th-TH', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">
                  {transaction.type === 'outgoing' ? 'ผู้รับเงิน:' : 'ผู้ส่งเงิน:'}
                </span>
                <div className="text-right">
                  <p className="font-medium">
                    {transaction.type === 'outgoing' 
                      ? transaction.recipient?.name 
                      : transaction.sender?.name}
                  </p>
                  <p className="text-gray-500">
                    {transaction.type === 'outgoing' 
                      ? transaction.recipient?.payTag 
                      : transaction.sender?.payTag}
                  </p>
                </div>
              </div>

              {transaction.memo && (
                <div className="flex justify-between">
                  <span className="text-gray-600">หมายเหตุ:</span>
                  <span className="font-medium text-right max-w-[180px]">
                    "{transaction.memo}"
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">ประเภท:</span>
                <span className="font-medium">
                  {transaction.type === 'outgoing' ? 'เงินออก' : 'เงินเข้า'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">สถานะ:</span>
                <span className="font-medium text-green-600">สำเร็จ</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-6 border-t text-xs text-gray-500 space-y-1">
              <p>PayWise - P2P Money Transfer</p>
              <p>สอบถามข้อมูลเพิ่มเติม: 1234</p>
              <p className="font-mono">Generated: {new Date().toLocaleString('th-TH')}</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button 
            onClick={handleDownload}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-5 h-5 mr-2" />
            บันทึกเป็นรูปภาพ
          </Button>
          
          <Button 
            onClick={handleShare}
            variant="outline"
            className="w-full h-12"
          >
            <Share2 className="w-5 h-5 mr-2" />
            แชร์
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ESlipView;
