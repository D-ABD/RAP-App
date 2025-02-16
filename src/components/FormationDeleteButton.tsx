interface FormationDeleteButtonProps {
    onDelete: () => void;
  }
  
  export function FormationDeleteButton({ onDelete }: FormationDeleteButtonProps) {
    const handleClick = () => {
      if (confirm("Voulez-vous supprimer cette formation ?")) {
        onDelete();
      }
    };
  
    return (
      <button 
        onClick={handleClick} 
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        🗑
      </button>
    );
  }
  