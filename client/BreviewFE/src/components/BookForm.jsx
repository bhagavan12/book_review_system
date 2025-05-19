// // import React, { useState } from 'react';

// // const BookForm = ({ onSubmit }) => {
// //   const [title, setTitle] = useState("");
// //   const [author, setAuthor] = useState("");
// //   const [coverUrl, setCoverUrl] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [genre, setGenre] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const newBook = { title, author, coverUrl, description, genre,userId:JSON.parse(localStorage.getItem('user'))._id };
// //     onSubmit(newBook);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <h3>Add a New Book</h3>
// //       <div>
// //         <input
// //           type="text"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //           placeholder="Book Title"
// //           required
// //         />
// //       </div>
// //       <div>
// //         <input
// //           type="text"
// //           value={author}
// //           onChange={(e) => setAuthor(e.target.value)}
// //           placeholder="Author"
// //           required
// //         />
// //       </div>
// //       <div>
// //         <input
// //           type="text"
// //           value={coverUrl}
// //           onChange={(e) => setCoverUrl(e.target.value)}
// //           placeholder="Cover URL"
// //         />
// //       </div>
// //       <div>
// //         <textarea
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           placeholder="Description"
// //           required
// //         />
// //       </div>
// //       <div>
// //         <input
// //           type="text"
// //           value={genre}
// //           onChange={(e) => setGenre(e.target.value)}
// //           placeholder="Genre"
// //         />
// //       </div>
// //       <button type="submit">Add Book</button>
// //     </form>
// //   );
// // };

// // export default BookForm;


// import React, { useState } from "react";
// import { storage } from "../firebase"; // Import Firebase storage
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const BookForm = ({ onSubmit }) => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [coverUrl, setCoverUrl] = useState("");
//   const [coverFile, setCoverFile] = useState(null);
//   const [description, setDescription] = useState("");
//   const [genre, setGenre] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     setCoverFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let imageUrl = coverUrl; // Use coverUrl if provided manually

//     if (coverFile) {
//       try {
//         setUploading(true);
//         const storageRef = ref(storage, `book_covers/${coverFile.name}`);
//         await uploadBytes(storageRef, coverFile);
//         imageUrl = await getDownloadURL(storageRef);
//         setUploading(false);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         setUploading(false);
//         return;
//       }
//     }

//     const newBook = {
//       title,
//       author,
//       coverUrl: imageUrl,
//       description,
//       genre,
//       userId: JSON.parse(localStorage.getItem("user"))._id,
//     };

//     onSubmit(newBook);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Add a New Book</h3>

//       <div>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Book Title"
//           required
//         />
//       </div>

//       <div>
//         <input
//           type="text"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           placeholder="Author"
//           required
//         />
//       </div>

//       <div>
//         <input
//           type="text"
//           value={coverUrl}
//           onChange={(e) => setCoverUrl(e.target.value)}
//           placeholder="Cover Image URL (optional)"
//         />
//       </div>

//       <div>
//         <input type="file" onChange={handleFileChange} accept="image/*" />
//       </div>

//       {uploading && <p>Uploading Image...</p>}

//       <div>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//           required
//         />
//       </div>

//       <div>
//         <input
//           type="text"
//           value={genre}
//           onChange={(e) => setGenre(e.target.value)}
//           placeholder="Genre"
//         />
//       </div>

//       <button type="submit" disabled={uploading}>
//         {uploading ? "Uploading..." : "Add Book"}
//       </button>
//     </form>
//   );
// };

// export default BookForm;

//v1 - 10-2-25 
/********/
// import React, { useState } from "react";
// import Modal from 'react-modal';
// import { storage } from "../firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { Upload, Image, Loader } from 'lucide-react';
// import '../styles/BookForm.css';
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// // import { Textarea } from "primereact/textarea";
// import { Button } from "primereact/button";
// import { FileUpload } from "primereact/fileupload";
// import { ProgressSpinner } from "primereact/progressspinner";
// import { InputTextarea } from "primereact/inputtextarea";
// // import { Button } from "primereact/button";


// const BookForm = ({ isOpen, onRequestClose, onSubmit }) => {
//   const customStyles = {
//     content: {
//       top: '60%',
//       left: '50%',
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%)',
//     },
//   };
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [coverUrl, setCoverUrl] = useState("");
//   const [coverFile, setCoverFile] = useState(null);
//   const [description, setDescription] = useState("");
//   const [genre, setGenre] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     // setCoverFile(e.target.files[0]);
//     const file = e.files[0];
//     setCoverFile(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let imageUrl = coverUrl;

//     if (coverFile) {
//       try {
//         setUploading(true);
//         const storageRef = ref(storage, `book_covers/${coverFile.name}`);
//         await uploadBytes(storageRef, coverFile);
//         imageUrl = await getDownloadURL(storageRef);
//         setUploading(false);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         setUploading(false);
//         return;
//       }
//     }

//     const newBook = {
//       title,
//       author,
//       coverUrl: imageUrl,
//       description,
//       genre,
//       userId: JSON.parse(localStorage.getItem("user"))._id,
//     };

//     onSubmit(newBook);
//   };

//   return (
//     //   <Modal
//     //   isOpen={isOpen}
//     //   onRequestClose={onRequestClose}
//     //   style={customStyles}
//     //   contentLabel="Add Book Modal"
//     // >
//     <Dialog
//       header="Add a New Book"
//       visible={isOpen}
//       style={{ width: "40vw" }}
//       modal
//       onHide={onRequestClose}
//       className="book-form-container"
//     >
//       <form className="book-form" onSubmit={handleSubmit}>
//         <div className="form-field">
//           <label>Book Title</label>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className=""
//           />
//         </div>

//         <div className="p-field">
//           <label>Author</label>
//           <input
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             required
//             className="p-inputtext w-full"
//           />
//         </div>

//         <div className="p-field">
//           <label>Cover Image URL (Optional)</label>
//           <input
//             value={coverUrl}
//             onChange={(e) => setCoverUrl(e.target.value)}
//             className="p-inputtext w-full"
//           />
//         </div>

//         <div className="p-field">
//           <label>Upload Cover Image</label>
//           <FileUpload
//             mode="basic"
//             accept="image/*"
//             maxFileSize={1000000}
//             customUpload
//             onSelect={handleFileChange}
//             chooseLabel="Select Image"
//           />
//         </div>

//         {uploading && (
//           <div className="uploading">
//             <ProgressSpinner />
//             <span>Uploading Image...</span>
//           </div>
//         )}

//         <div className="p-field">
//           <label>Description</label>
//           <InputTextarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             className="p-textarea w-full"
//           />
//         </div>

//         <div className="p-field">
//           <label>Genre</label>
//           <InputText
//             value={genre}
//             onChange={(e) => setGenre(e.target.value)}
//             className="p-inputtext w-full"
//           />
//         </div>

//         <Button
//           type="submit"
//           disabled={uploading}
//           label={uploading ? "Uploading..." : "Add Book"}
//           icon={uploading ? "pi pi-spin pi-spinner" : "pi pi-check"}
//           className="p-button-success w-full"
//         />
//       </form>
//     </Dialog>
//   );
// };

// export default BookForm;
/********/
  //   <Dialog
  //   header="Add a New Book"
  //   visible={isOpen}
  //   style={{ width: "50vw" }}
  //   modal
  //   onHide={onRequestClose}
  // >
  //   <form className="book-form" onSubmit={handleSubmit}>
  //     <h3>Add a New Book</h3>
  //     <div className="grpp">
  //       <div className="form-group">
  //         <InputText
  //           type="text"
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //           placeholder="Book Title"
  //           required
  //           className="form-input"
  //         />
  //       </div>

  //       <div className="form-group">
  //         <InputText
  //           type="text"
  //           value={author}
  //           onChange={(e) => setAuthor(e.target.value)}
  //           placeholder="Author"
  //           required
  //           className="form-input"
  //         />
  //       </div>

  //       <div className="form-group">
  //         <InputText
  //           type="text"
  //           value={coverUrl}
  //           onChange={(e) => setCoverUrl(e.target.value)}
  //           placeholder="Cover Image URL (optional)"
  //           className="form-input"
  //         />
  //         <div className="form-group file-upload">
  //           <label className="file-label">
  //             <InputText
  //               type="file"
  //               onChange={handleFileChange}
  //               accept="image/*"
  //               className="file-input"
  //             />
  //             <span className="file-button">
  //               <Image size={20} />
  //               Choose Cover Image
  //             </span>
  //           </label>
  //           {coverFile && <span className="file-name">{coverFile.name}</span>}
  //         </div>
  //       </div>


  //       {uploading && (
  //         <div className="uploading">
  //           <Loader className="spin" />
  //           <span>Uploading Image...</span>
  //         </div>
  //       )}

  //       <div className="form-group">
  //         <InputTextarea
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //           placeholder="Description"
  //           required
  //           className="form-textarea"
  //         />
  //       </div>

  //       <div className="form-group">
  //         <InputText
  //           type="text"
  //           value={genre}
  //           onChange={(e) => setGenre(e.target.value)}
  //           placeholder="Genre"
  //           className="form-input"
  //         />
  //       </div>

  //       <Button type="submit" disabled={uploading} className="submit-button">
  //         {uploading ? (
  //           <>
  //             <Loader className="spin" />
  //             <span>Uploading...</span>
  //           </>
  //         ) : (
  //           <>
  //             <Upload size={20} />
  //             <span>Add Book</span>
  //           </>
  //         )}
  //       </Button>
  //     </div>
  //   </form>
  //   </Dialog>



  import React, { useState } from "react";
import Modal from 'react-modal';
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Upload, X, Loader } from 'lucide-react';
import '../styles/BookForm.css';

const BookForm = ({ isOpen, onRequestClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setCoverFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = coverUrl;

    if (coverFile) {
      try {
        setUploading(true);
        const storageRef = ref(storage, `book_covers/${coverFile.name}`);
        await uploadBytes(storageRef, coverFile);
        imageUrl = await getDownloadURL(storageRef);
        setUploading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploading(false);
        return;
      }
    }

    const newBook = {
      title,
      author,
      coverUrl: imageUrl,
      description,
      genre,
      userId: JSON.parse(localStorage.getItem("user"))._id,
    };

    onSubmit(newBook);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      contentLabel="Add Book Modal"
    >
      <div className="modal-header">
        <h2 className="modal-title">Add a New Book</h2>
        <button onClick={onRequestClose} className="close-button">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label className="form-label">Book Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="form-input"
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Cover Image URL (Optional)</label>
          <input
            type="text"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            className="form-input"
            placeholder="Enter image URL"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Upload Cover Image</label>
          <div
            className="upload-container"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {previewUrl ? (
              <div className="preview-container">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="preview-image"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewUrl("");
                    setCoverFile(null);
                  }}
                  className="remove-preview"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <>
                <Upload className="upload-icon" />
                <p className="upload-text">Click or drag file to upload</p>
              </>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="upload-input"
            />
          </div>
        </div>

        {uploading && (
          <div className="loading-indicator">
            <div className="spinner" />
            <span className="loading-text">Uploading image...</span>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="form-input form-textarea"
            placeholder="Enter book description"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="form-input"
            placeholder="Enter book genre"
          />
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={onRequestClose}
            className="button1 button-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="button1 button-primary"
          >
            {uploading ? (
              <span className="loading-text">
                <Loader className="spinner" />
                Uploading...
              </span>
            ) : (
              "Add Book"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BookForm;