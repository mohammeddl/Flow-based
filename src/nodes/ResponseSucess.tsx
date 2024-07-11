import { CheckCircle } from "lucide-react";

export default function ResponseSucess() {
  return (
    <div className="flex items-center p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400 shadow-md">
      <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
      <span className="font-medium">{message}</span>
    </div>
  );
}