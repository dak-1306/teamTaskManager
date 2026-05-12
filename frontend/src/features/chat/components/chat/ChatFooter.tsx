import React from "react";
import { Send, Loader2, File, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ChatFooterProps {
  input: string;
  setInput: (val: string) => void;
  inputFile: File[];
  setInputFile: (files: File[]) => void;
  isSending: boolean;
  handleSend: (e?: React.FormEvent) => void;
  disabled: boolean;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({
  input,
  setInput,
  inputFile,
  setInputFile,
  isSending,
  handleSend,
  disabled,
}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {inputFile.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {inputFile.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 p-1 rounded"
            >
              <File className="w-4 h-4" />
              <span className="truncate max-w-[100px]">{file.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() =>
                  setInputFile(inputFile.filter((_, i) => i !== idx))
                }
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-2 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm"
      >
        <Label htmlFor="file-input" className="p-2 cursor-pointer">
          <Input
            id="file-input"
            type="file"
            className="hidden"
            onChange={(e) =>
              e.target.files &&
              setInputFile([...inputFile, ...Array.from(e.target.files)])
            }
          />
          <File className="w-5 h-5 text-gray-500" />
        </Label>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={disabled}
          className="border-none bg-transparent focus-visible:ring-0"
        />
        <Button
          type="submit"
          disabled={!input.trim() || disabled || isSending}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
};
