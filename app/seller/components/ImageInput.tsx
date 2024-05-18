import axios from "axios";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { sellerUrl } from "../utils/constants";
import { getUserToken } from "../utils/manageAuth";
import Button from "./Button";
interface ImageInputProps {
    userUpdated: () => void;
    image: File | undefined;
    setImage: Dispatch<SetStateAction<File | undefined>>;
}
const ImageInput = ({ setImage, image, userUpdated }: ImageInputProps) => {
    const imageRef = useRef<any>();
    const [loading, setLoading] = useState(false);
    const imageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            if (file) {
                setImage(file);
            }
        }
    };
    const uploadImage = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const accessToken = getUserToken();
            const headers = { Authorization: `Bearer ${accessToken}` };
            const formData = new FormData();
            formData.append("file", image);
            const res = await axios.post(`${sellerUrl}/upload-pfp`, formData, {
                headers,
            });
            userUpdated();
            setLoading(false);
            imageRef.current.value = "";
            alert("Uploaded file successfully");
        } catch (error: any) {
            setLoading(false);
            console.log(error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                alert(error.response.data.message);
            }
        }
    };
    return (
        <div className=" flex flex-col gap-5">
            <input
                ref={imageRef}
                type="file"
                className="file-input file-input-bordered  w-full max-w-xs"
                onChange={imageUploadHandler}
            />
            {image && (
                <button
                    onClick={uploadImage}
                    className="btn btn-neutral w-full max-w-xs"
                    disabled={loading}
                >
                    Upload
                </button>
            )}
        </div>
    );
};

export default ImageInput;
