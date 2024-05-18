"use client";
import { sellerUrl } from "@/app/seller/utils/constants";
import { getUserToken } from "@/app/seller/utils/manageAuth";
import {
    validateDescription,
    validateTitle,
} from "@/app/seller/utils/validations";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyGigPage = () => {
    const router = useRouter();
    const params = useParams();
    const edit = params.gigId === "new" ? false : params.gigId;
    const [oldImage, setOldImage] = useState<string>();
    const [image, setImage] = useState<File>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getGigData() {
            try {
                const res = await axios.get(`${sellerUrl}/gigs/${edit}`);
                const data = res.data;
                if (data.title) {
                    setTitle(data.title);
                    setDescription(data.description);
                    setPrice(data.price);
                    setOldImage(data.gigImage);
                }
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        if (edit) getGigData();
    }, [edit]);

    const imageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            if (file) {
                setImage(file);
            }
        }
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setErrors([]);
        let currentErrors: string[] = [];
        currentErrors = [...currentErrors, ...validateTitle(title)];
        currentErrors = [...currentErrors, ...validateDescription(description)];

        if (price < 1) currentErrors.push("Price must be a positive number");
        if (!image && !oldImage) {
            currentErrors.push("Gig image is required");
        }
        if (currentErrors.length > 0) {
            setErrors(currentErrors);
            return;
        }
        uploadGig();
    };
    const uploadGig = async () => {
        setLoading(true);
        try {
            const formdata = new FormData();
            formdata.append("title", title);
            formdata.append("description", description);
            formdata.append("price", price.toString());
            if (image) {
                formdata.append("gigImage", image as Blob);
            }
            // formdata.append("gigThumbnail", image as Blob);

            const access_token = getUserToken();
            const config = {
                headers: { Authorization: "Bearer " + access_token },
            };
            const url = edit
                ? `${sellerUrl}/gigs/update/${edit}`
                : `${sellerUrl}/gigs/create`;
            const res = edit
                ? await axios.patch(url, formdata, config)
                : await axios.post(url, formdata, config);

            const data = res.data;
            if (data.error) {
                setErrors([data.message]);
            } else {
                console.log(data);
                if (edit) {
                    alert("successfully Edited Gig");
                } else {
                    alert("successfully Posted Gig");
                }
                router.push("/seller/main/dashboard");
            }
            setLoading(false);
        } catch (error: any) {
            const errorResponse = error?.response;

            if (errorResponse) {
                const errorMessages = errorResponse?.data?.message;
                if (typeof errorMessages === "string") {
                    setErrors([errorMessages]);
                } else {
                    setErrors(errorMessages);
                }
            } else {
                console.error("error :", error);
            }
            console.log(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-xl">{edit ? "Edit " : "New "} Gig</h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="relative w-40 h-40 overflow-hidden rounded-lg">
                    <input
                        type="file"
                        className="absolute inset-0 bg-transparent cursor-pointer opacity-0"
                        onChange={imageUploadHandler}
                    />
                    <div className=" flex justify-center items-center bg-gray-400 hover:bg-gray-500  w-full h-full cursor-pointer pointer-events-none">
                        {image || oldImage ? (
                            <img
                                src={
                                    image
                                        ? URL.createObjectURL(image)
                                        : `${sellerUrl}/getImage/${oldImage}`
                                }
                                className="object-cover"
                            />
                        ) : (
                            "Upload Image"
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap3">
                    <div className="flex flex-col gap-3">
                        <p className="text-lg font-bold flex gap-5 items-center">
                            <span className="w-32"> Title:</span>

                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Your gig title"
                                className="input input-bordered input-md w-full max-w-xs"
                            />
                        </p>
                        <p className="text-lg font-bold flex gap-5 items-center">
                            <span className="w-32"> Description:</span>

                            <textarea
                                rows={6}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Your gig description"
                                className="textarea textarea-bordered h-24 w-full max-w-xs input-md"
                            />
                        </p>
                        <p className="text-lg font-bold flex gap-5 items-center">
                            <span className="w-32"> Price:</span>

                            <input
                                value={price}
                                onChange={(e) =>
                                    setPrice(parseInt(e.target.value))
                                }
                                type="number"
                                placeholder="set a price"
                                className="input input-bordered input-md w-full max-w-xs"
                            />
                        </p>
                        {errors.map((error, index) => (
                            <p className="text-red-600" key={error + index}>
                                {error}
                            </p>
                        ))}

                        <input
                            type="submit"
                            value={edit ? "Save" : "Upload"}
                            onChange={() => {}}
                            className="btn btn-neutral w-full max-w-xs"
                            disabled={loading}
                        ></input>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MyGigPage;
