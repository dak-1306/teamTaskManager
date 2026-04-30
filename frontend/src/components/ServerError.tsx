import React from "react";
import { ServerCrash, RefreshCw } from "lucide-react";

const ServerError: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center space-y-6">
        <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ServerCrash className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800">Không thể kết nối đến máy chủ</h1>
        
        <p className="text-slate-500 leading-relaxed text-sm">
          Hệ thống hiện đang khởi động (điều này thường xảy ra khi máy chủ trên Render đang "thức dậy" sau thời gian nghỉ) hoặc tạm thời không phản hồi.
          <br /><br />
          Vui lòng đợi khoảng 30 - 60 giây và tải lại trang.
        </p>
        
        <button 
          onClick={() => {
            // Quay về trang chủ trước khi reload để thử lại
            window.location.href = "/";
          }}
          className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Thử lại ngay
        </button>

        <p className="text-xs text-slate-400 mt-4">
          Nếu vấn đề vẫn tiếp diễn, vui lòng quay lại sau ít phút.
        </p>
      </div>
    </div>
  );
};

export default ServerError;
