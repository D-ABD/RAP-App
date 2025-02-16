interface FormationEditButtonProps {
    onEdit: () => void;
  }
  
  export function FormationEditButton({ onEdit }: FormationEditButtonProps) {
    return (
      <button 
        onClick={onEdit} 
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
      >
        ✏️
      </button>
    );
  }
  