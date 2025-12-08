// src/SinglePageApp.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { dummyBooks } from "./data/dummyBooks";
import Navbar from "./components/Navbar";
import BookCard from "./components/BookCard";
import { motion, AnimatePresence } from "framer-motion";

// Helper: read real books from localStorage
const readRealBooks = () => JSON.parse(localStorage.getItem("bookbridge-books")) || [];

/* -------------------- Motion variants -------------------- */
const containerFade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const heroVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.05, duration: 0.6, ease: "circOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: (i = 1) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: 0.08 * i, duration: 0.55 } }),
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.22, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.18 } },
};

/* -------------------- Sections -------------------- */
function HomeSection({ onOpenDonate, onOpenRequest }) {
  return (
    <motion.section
      id="home"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={heroVariant}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 pt-28"
    >
      <motion.h1 layout className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-sm">
        BookBridge 📚
      </motion.h1>

      <motion.p className="mt-4 text-xl text-gray-600 max-w-xl text-center" variants={containerFade}>
        Give your unused books a new life & help someone learn. A small donation can make a big difference.
      </motion.p>

      <motion.div className="mt-10 flex gap-6" variants={containerFade}>
        <motion.button
          onClick={onOpenDonate}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="px-7 py-4 bg-blue-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition"
        >
          Donate Book
        </motion.button>

        <motion.button
          onClick={onOpenRequest}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="px-7 py-4 bg-green-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition"
        >
          Request Book
        </motion.button>
      </motion.div>
    </motion.section>
  );
}

function DonateSection({ onOpenLogin }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault?.();

    if (!user) {
      alert("You must be logged in to donate a book!");
      onOpenLogin();
      return;
    }

    if (!title || !author || !imageUrl || !shortDescription) {
      alert("Fill out all the fields");
      return;
    }

    const newBook = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      description: shortDescription.trim(),
      imageUrl,
      donatedBy: user?.name,
      donorEmail: user?.email?.toLowerCase(),
    };

    const existing = readRealBooks();
    existing.push(newBook);
    localStorage.setItem("bookbridge-books", JSON.stringify(existing));
    alert("Book donated successfully");

    setTitle("");
    setAuthor("");
    setImageUrl("");
    setShortDescription("");
    document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      id="donate"
      variants={containerFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="min-h-screen pt-24 flex items-center justify-center bg-white px-6"
    >
      <motion.div className="w-full max-w-2xl bg-gradient-to-tr from-white to-gray-50 rounded-xl p-8 shadow-lg" variants={containerFade}>
        <h2 className="text-2xl font-semibold mb-4">Donate a Book</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book Title" className="w-full p-3 border rounded" />
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="w-full p-3 border rounded" />
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className="w-full p-3 border rounded" />
          <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Short Description" rows="4" className="w-full p-3 border rounded" />

          <div className="flex gap-3 mt-2">
            <motion.button whileHover={{ y: -3 }} className="bg-blue-600 text-white py-3 px-6 rounded-lg">
              Donate Book
            </motion.button>
            {!user && (
              <motion.button whileHover={{ y: -3 }} type="button" onClick={onOpenLogin} className="bg-gray-200 py-3 px-4 rounded-lg">
                Login to Donate
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.section>
  );
}

function RequestSection({ onOpenBook }) {
  const [search, setSearch] = useState("");
  const [realBooks, setRealBooks] = useState(readRealBooks());

  useEffect(() => {
    const handler = () => setRealBooks(readRealBooks());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const allBooks = useMemo(() => [...dummyBooks, ...realBooks], [realBooks]);
  const filtered = allBooks.filter((b) => b.title.toLowerCase().startsWith(search.toLowerCase()));

  return (
    <section id="request" className="min-h-screen pt-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto py-12">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-6">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Books..." className="w-full p-4 border rounded-lg" />
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((book, idx) => (
            <motion.div key={book.id} custom={idx} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={cardVariant}>
              <BookCard book={book} onOpen={() => onOpenBook(book)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- Modal for Book Details -------------------- */
function BookDetailsModal({ book, onClose }) {
  return (
    <AnimatePresence>
      {book && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial="hidden" animate="show" exit="exit" variants={{ exit: { opacity: 0 } }}>
          <motion.div className="absolute inset-0 bg-black/40" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} />

          <motion.div className="relative z-10 max-w-4xl w-full bg-white rounded-lg shadow-lg p-6" variants={modalVariant} initial="hidden" animate="show" exit="exit">
            <button onClick={onClose} className="absolute right-3 top-3 text-gray-600 hover:text-gray-900">
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <img src={book.imageUrl} alt={book.title} className="w-full md:w-1/3 h-72 object-cover rounded-xl" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                <p className="text-gray-600 mb-1 text-lg">{book.author}</p>
                <p className="text-gray-700 mt-3 mb-4">{book.description}</p>
                {book.donatedBy && <p className="text-sm text-blue-700 italic mb-3">Donated by: {book.donatedBy}</p>}

                <div className="mt-auto">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => {
                    const requests = JSON.parse(localStorage.getItem("requested-books")) || [];
                    if (requests.some((req) => req.id === book.id)) {
                      alert("You already added this book!");
                      return;
                    }
                    requests.push(book);
                    localStorage.setItem("requested-books", JSON.stringify(requests));
                    alert("Book requested successfully");
                  }} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                    Request This Book
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------- Auth Modals (Login + Signup) -------------------- */
function AuthModals({ openLogin, setOpenLogin, openSignup, setOpenSignup }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("please enter both email and password");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("bookbridge-user"));
    if (!savedUser) {
      alert("No user found! Please signup first.");
      return;
    }

    if (savedUser.email !== email || savedUser.password !== password) {
      alert("Invalid email or password");
      return;
    }

    login({ name: savedUser.name, email: savedUser.email });
    setOpenLogin(false);
  };

  const handleSignup = () => {
    if (!name || !sEmail || !sPassword || !confirmPassword) {
      alert("please fill all the fields");
      return;
    }
    if (sPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const userData = { name, email: sEmail, password: sPassword };
    localStorage.setItem("bookbridge-user", JSON.stringify(userData));
    login({ name, email: sEmail });
    setOpenSignup(false);
  };

  return (
    <>
      <AnimatePresence>
        {openLogin && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/30" onClick={() => setOpenLogin(false)} />
            <motion.div className="relative z-10 w-full max-w-md bg-white rounded-lg p-6" variants={modalVariant} initial="hidden" animate="show" exit="exit">
              <button onClick={() => setOpenLogin(false)} className="absolute right-3 top-3">✕</button>
              <h3 className="text-2xl font-semibold mb-4">Login</h3>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded mb-3" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-3 border rounded mb-4" />
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.02 }} onClick={handleLogin} className="bg-blue-600 text-white py-2 px-4 rounded">
                  Login
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => { setOpenLogin(false); setOpenSignup(true); }} className="bg-gray-200 py-2 px-4 rounded">
                  Signup
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {openSignup && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/30" onClick={() => setOpenSignup(false)} />
            <motion.div className="relative z-10 w-full max-w-md bg-white rounded-lg p-6" variants={modalVariant} initial="hidden" animate="show" exit="exit">
              <button onClick={() => setOpenSignup(false)} className="absolute right-3 top-3">✕</button>
              <h3 className="text-2xl font-semibold mb-4">Signup</h3>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full p-3 border rounded mb-2" />
              <input value={sEmail} onChange={(e) => setSEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded mb-2" />
              <input value={sPassword} onChange={(e) => setSPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-3 border rounded mb-2" />
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" type="password" className="w-full p-3 border rounded mb-4" />
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.02 }} onClick={handleSignup} className="bg-green-600 text-white py-2 px-4 rounded">
                  Signup
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => { setOpenSignup(false); setOpenLogin(true); }} className="bg-gray-200 py-2 px-4 rounded">
                  Login
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------- Main App -------------------- */
export default function SinglePageApp() {
  const [openBook, setOpenBook] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const openDonate = () => document.querySelector("#donate")?.scrollIntoView({ behavior: "smooth" });
  const openRequest = () => document.querySelector("#request")?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen antialiased selection:bg-blue-200 selection:text-blue-900">
        <Navbar onOpenLogin={() => setOpenLogin(true)} onOpenSignup={() => setOpenSignup(true)} />
        <main className="pt-16">
          <HomeSection onOpenDonate={openDonate} onOpenRequest={openRequest} />
          <DonateSection onOpenLogin={() => setOpenLogin(true)} />
          <RequestSection onOpenBook={(book) => setOpenBook(book)} />
        </main>

        <footer className="py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} BookBridge</footer>

        {/* Modals */}
        <BookDetailsModal book={openBook} onClose={() => setOpenBook(null)} />
        <AuthModals openLogin={openLogin} setOpenLogin={setOpenLogin} openSignup={openSignup} setOpenSignup={setOpenSignup} />
      </div>
    </AuthProvider>
  );
}
