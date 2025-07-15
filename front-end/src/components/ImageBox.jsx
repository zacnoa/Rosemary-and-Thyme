import React from "react";

export function ImageBox({ image, dispatch,type }) {
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            dispatch({
                type: `edited_${type}`,
                image: fileUrl
            });
        }
    };

    return (
        <>
            {image && <img src={image} alt="Preview" />}
            <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
        </>
    );
}