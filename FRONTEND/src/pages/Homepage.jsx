import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import api from "../lib/axios"
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';

const Homepage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // fetch and then .json ko ek line mai likhne ke liye we'll use axios instead
        const res = await api.get("/notes");
        // console.log(res.data)
        setNotes(res.data);
        setIsRateLimited(false);
        // toast.success("Notes fetched")
      } catch (error) {
        console.log('FRONTEND -> src -> pages -> Error fetching Notes', error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Error Fetching notes")
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimitedUI/>}

      <div className="max-w-7xl mx-auto p-4 mt-6">

        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              // key for react optimisation
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

      </div>

    </div>  
  )
}

export default Homepage