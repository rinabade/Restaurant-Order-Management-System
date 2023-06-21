import React, { useState } from "react";

function ImageUpload(){
    
    const [image, setImage] = useState('')

    function handleImage(e){
        console.log(e.target.file);
        setImage(e.target.files[0])
    }
    return(
        <div>
            <input type="file" name="file" onChange={handleImage}></input>
            <button>Submit</button>
        </div>
    )
}