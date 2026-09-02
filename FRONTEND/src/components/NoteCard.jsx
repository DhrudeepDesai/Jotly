import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils"; // Just to format date in UI
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // default behavior of Link is to navigate to note page when clicked anywhere on card, so for delete button apan yeh nhi karenge

    // Not to delete welcome notes
    const protectedIds = [
    "6a97ec24dad3796bfaa9da6e",
    "6a96d48e73c0b980c2525e14",
    "6a96d31648b3a7c73645b7f5",
    ];

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // gupdate UI after deletion without refreshing the page
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      if (protectedIds.includes(id)) {
        toast.error("This can only be deleted by the admin");
      } else {
        toast.error("Failed to delete note");
      }
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;