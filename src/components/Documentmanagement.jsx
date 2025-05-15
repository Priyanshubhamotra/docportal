import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Upload, Search, Trash, Eye, Download, Folder } from "lucide-react";
import { storage, db, auth } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, getDocs } from "firebase/firestore";

export default function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("All");
  const [folders, setFolders] = useState(["All", "Work", "Home", "School"]);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedInUser) => {
      setUser(loggedInUser);

      if (loggedInUser) {
        const userDoc = await getDoc(doc(db, "users", loggedInUser.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name || "User");
        }

        const q = query(collection(db, "users", loggedInUser.uid, "documents"));
        const querySnapshot = await getDocs(q);

        const userDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const uniqueFolders = new Set(["All", "Work", "Home", "School"]);
        userDocuments.forEach((doc) => {
          if (doc.folder) uniqueFolders.add(doc.folder);
        });

        setFolders(Array.from(uniqueFolders));
        setDocuments(userDocuments);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFileUpload = async (event) => {
    if (!user) {
      alert("Please log in to upload files.");
      navigate("/login");
      return;
    }

    let files = [];

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      files = Array.from(event.dataTransfer.files);
    } else if (event.target && event.target.files.length > 0) {
      files = Array.from(event.target.files);
    }

    files.forEach((file) => uploadFile(file));
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadFile = (file) => {
    setUploading(true);

    const fileExtension = file.name.split('.').pop().toLowerCase();

    let category = "Other";
    if (fileExtension === "pdf") category = "PDF";
    else if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(fileExtension)) category = "Image";
    else if (fileExtension === "txt") category = "Text";

    const folder = selectedFolder === "All" ? "Uncategorized" : selectedFolder;

    const storageRef = ref(storage, `documents/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const newDoc = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          url: downloadURL,
          userId: user.uid,
          category,
          folder,
        };

        await setDoc(doc(db, "users", user.uid, "documents", newDoc.id.toString()), newDoc);
        setDocuments((prevDocs) => [...prevDocs, newDoc]);
        setFolders((prevFolders) => prevFolders.includes(folder) ? prevFolders : [...prevFolders, folder]);
        setUploading(false);
      }
    );
  };

  const handleDelete = async (docId, fileName) => {
    if (!user) return;

    try {
      const fileRef = ref(storage, `documents/${user.uid}/${fileName}`);
      await deleteObject(fileRef);
      await deleteDoc(doc(db, "users", user.uid, "documents", docId));
      setDocuments((prev) => prev.filter((d) => d.id.toString() !== docId));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFolder === "All" || doc.folder === selectedFolder)
  );

  const categorizedDocs = filteredDocuments.reduce((acc, doc) => {
    const folder = doc.folder || "Uncategorized";
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push(doc);
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📂 Document Portal </h1>
        {user ? (
          <div className="flex items-center gap-4">
            <p className="text-gray-700">Logged in as {userName}</p>
            <Button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => navigate("/home")} className="bg-purple-500 text-white px-4 py-2 rounded-md">
              Home
            </Button>
            <Button onClick={() => navigate("/contact")} className="bg-orange-500 text-white px-4 py-2 rounded-md">
              Contact Us
            </Button>
            <Button onClick={() => navigate("/login")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Login
            </Button>
            <Button onClick={() => navigate("/register")} className="bg-green-500 text-white px-4 py-2 rounded-md">
              Register
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border p-2 rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="border rounded-md px-3 py-2 bg-white"
        >
          {folders.map((folder) => (
            <option key={folder} value={folder}>{folder}</option>
          ))}
        </select>
      </div>

      <div className="border-dashed border-2 p-6 rounded-lg text-center cursor-pointer transition" onClick={triggerFileInput} onDragOver={(e) => { e.preventDefault(); setDragActive(true); }} onDragLeave={() => setDragActive(false)} onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFileUpload(e); }}>
        <input ref={fileInputRef} type="file" multiple onChange={handleFileUpload} className="hidden" />
        <Button className="flex items-center gap-2">
          <Upload size={18} /> {uploading ? "Uploading..." : "Drag & Drop or Click to Upload"}
        </Button>
      </div>

      <div className="mt-4 space-y-6">
        {Object.entries(categorizedDocs).map(([folder, docs]) => (
          <div key={folder} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">📁 {folder}</h2>
            {docs.length > 0 ? (
              docs.map((doc) => (
                <Card key={doc.id} className="flex justify-between items-center p-3 transition hover:shadow-md">
                  <CardContent className="flex items-center gap-2">
                    <Eye size={18} className="text-blue-500 cursor-pointer hover:scale-110 transition" onClick={() => window.open(doc.url, "_blank")} />
                    <p className="truncate w-40 font-semibold">{doc.name}</p>
                    <span className="text-gray-500">{doc.size}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      doc.category === "PDF" ? "bg-red-100 text-red-600" :
                      doc.category === "Image" ? "bg-green-100 text-green-600" :
                      doc.category === "Text" ? "bg-blue-100 text-blue-600" :
                      "bg-gray-200 text-gray-700"
                    }`}>
                      {doc.category}
                    </span>
                    <span className="text-sm text-purple-500">📁 {doc.folder}</span>
                  </CardContent>
                  <div className="flex gap-2">
                    <a href={doc.url} download={doc.name}>
                      <Button size="sm" variant="outline" className="hover:bg-gray-200">
                        <Download size={16} />
                      </Button>
                    </a>
                    <Button size="sm" variant="destructive" className="hover:bg-red-600" onClick={() => handleDelete(doc.id.toString(), doc.name)}>
                      <Trash size={16} />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No files in this folder.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
