import { FiInbox } from "react-icons/fi";

const EmptyState = ({ message = "No records found", action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <FiInbox className="text-5xl mb-4" />

      <p className="text-lg font-medium">{message}</p>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 bg-transparent text-gray-900 px-4 py-2 rounded cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;