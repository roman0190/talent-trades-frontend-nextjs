import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { sellerUrl } from "../utils/constants";
import { getUserToken } from "../utils/manageAuth";
import { Gig } from "../utils/types";
interface GigCardProps extends Gig {
    own?: boolean;
    reloadGigs: () => void;
}
const GigCard = ({
    title,
    description,
    gigImage,
    gigThumbnail,
    id,
    own,
    price,
    reloadGigs,
}: GigCardProps) => {
    const router = useRouter();
    const modalRef = useRef();
    const handleDelete = () => {
        // @ts-ignore
        modalRef?.current?.showModal();
    };
    const deleteGig = async () => {
        const url = `${sellerUrl}/gigs/delete/${id}`;
        const access_token = getUserToken();

        if (!access_token) {
            alert("Access token null");
            return;
        }
        const config = {
            headers: { Authorization: "Bearer " + access_token },
        };
        try {
            await axios.delete(url, config);
            reloadGigs();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="card card-compact w-full bg-base-100 shadow-xl overflow-hidden">
                {gigImage ? (
                    <div className="">
                        <figure>
                            <img
                                src={`${sellerUrl}/getImage/${gigImage}`}
                                className=""
                                alt={title}
                            />
                        </figure>
                    </div>
                ) : (
                    <div className="w-full h-80 bg-gray-300 flex justify-center items-center">
                        No images
                    </div>
                )}

                <div className="card-body">
                    <div className="flex justify-between items-center">
                        <h2 className="card-title">{title}</h2>
                        <h2 className="card-title">${price}</h2>
                    </div>
                    <p>{description}</p>

                    <div
                        className={`card-actions ${
                            own ? "justify-between" : "justify-end"
                        }`}
                    >
                        {own ? (
                            <>
                                <button
                                    className="btn btn-error"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-neutral"
                                    onClick={() => {
                                        router.push("/seller/main/myGig/" + id);
                                    }}
                                >
                                    Edit
                                </button>
                            </>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={() => prompt("credit card number")}
                            >
                                Buy Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <dialog
                ref={modalRef}
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Are you sure you want to delete?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className="flex items-center gap-5">
                                <button
                                    className="btn btn-error"
                                    onClick={deleteGig}
                                >
                                    Delete
                                </button>
                                <button className="btn btn-neutral">
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default GigCard;
