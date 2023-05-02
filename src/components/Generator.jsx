import React, { useState } from "react";
import { API_TOKEN } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth, db, storage} from "../firebase-config";
import {collection, addDoc} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [user] = useAuthState(Auth);
  const postRef = collection(db, "post");

  const uploadImage = async (e) => {
    if(imageFile!== null && prompt!== null) {  
        const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
        uploadBytes(imageRef, imageFile)
        .then(() => getDownloadURL(imageRef))
        .then(url => {
            addDoc(postRef,{
            image: url,
            prompt: prompt,
            logo: user.photoURL,
            user: user.displayName
        });
        alert("success")
    }).catch(err=>(console.log(err)))
    }
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setImageFile(new File([blob], "art.png", { type: "image/png" }));
    setLoading(false);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = output;
    link.download = "output.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (<div className="container al-c mt-3">
    <h1 className='font-extrabold text-[50px]'>Open<span>Journey</span></h1>
    <p className="mt-2 text-[15px] max-w-[500px]">Enter any prompt then download and/or share the generated image.</p>
    <form className="generate-form mt-3" onSubmit={handleSubmit}>
      <input 
      type="text" 
      name="input" 
      placeholder="Type your prompt here..." 
      onChange={(e)=>setPrompt(e.target.value)}
      required
      />
      <button type="submit" className="button">Generate</button>
    </form>
    <div>
    {loading && <div className="loading">Loading...</div>}
    {!loading && output && (
      <div className="result-image">
        <img src={output} alt="art"/>
        <div className="action">
            <button className="button" onClick={downloadImage}>Download</button>
            {user && <button className="button" onClick={uploadImage}>Share</button>}

        </div>
      </div>
    )}
    </div>

    </div>);
};
  

export default ImageGenerationForm;