import Router, { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import PageHeader from "../../PageHeader";
import { PencilAltIcon } from "@heroicons/react/outline";
import Link from "next/link";

const BookSingleTextResponse = () => {
    const dispatch = useAppDispatch();
    const { query: queryParams } = useRouter();
    const { expertisePost, error } = useAppSelector(
        (state) => state.expertisePostDetails
    );

    // Calculate prices

    const pricePerSubmission: number = expertisePost?.pricePerSubmission;
    const serviceFeeString: string = (
        Math.round((pricePerSubmission * 0.029 + 0.3) * 100) /
        100
    ).toFixed(2);
    const serviceFee: number = parseFloat(serviceFeeString);
    const total: number = pricePerSubmission + serviceFee
    // Check if user is logged in and is the owner of this post.
    // They shouldn't be able to Send a Submission if so, of course.
    const { user, loading } = useAppSelector((state) => {
        return state.auth;
    });

    let userIsOwner: boolean = false;
    if (user?._id === expertisePost?.user?._id) {
        Router.push("/");
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <PageHeader
                pageName="Book a Single Text Response"
                heroPhrase="For those bite-sized, important questions."
                supportingText="Simply write your text submission then enter payment."
            />
            <form>
                <div className="flex flex-col p-8 gap-6 bg-white w-full sm:w-[32rem] h-[32rem] border border-black rounded-xl">
                    {/* Header for Text Input */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center w-16 h-16 rounded-full bg-black/10">
                            <PencilAltIcon className="w-3/5 m-auto" />
                        </div>
                        <div className="w-3/4">
                            <h1 className="text-2xl font-semibold w-fit">
                                Write a message
                            </h1>
                            <p className="font-light opacity-60 text-sm mt-1 w-fit">
                                The expert will read the message and reply back
                                within a week.
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-black/10"></div>
                    {/* Text Input Field */}
                    <textarea
                        id="textMessage"
                        name="textMessage"
                        autoComplete="none"
                        required
                        // maxLength={maxDescriptionLength}
                        className="block px-3 py-2 h-full w-8/9 rounded-md placeholder-gray-400 resize-none focus:ring-0 border-transparent focus:border-transparent sm:text-md"
                        placeholder="Hi! I was wondering if you could give me advice about..."
                        // value={description}
                        // onChange={onChange}
                    />
                    <Link href="#">
                        <button className="rounded-xl bg-brand-primary-light text-white p-3 font-semibold text-sm md:text-md">
                            Continue &darr;
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col items-center p-8 mt-4 gap-6 bg-white w-full sm:w-[32rem] h-[32rem] border border-black rounded-xl">
                    <img
                        className=" h-16 w-16 rounded-full"
                        src={expertisePost.user.avatar.url}
                        alt={`User Profile Pic for ${expertisePost.user.name}`}
                    />
                    <h1 className="text-2xl font-semibold w-fit text-center ">
                        Personalized Expert Advice: Text Response
                    </h1>
                    <div className="w-full h-[1px] bg-black/10"></div>

                    {/* Pricing Summary */}
                    <div className="flex flex-col gap-3 w-full">
                        <h1 className="text-xl font-semibold w-fit self-start">
                            Summary
                        </h1>
                        <div className="flex justify-between w-full">
                            <h1 className="text-lg font-semibold w-fit self-start opacity-40">
                                Text Response
                            </h1>
                            <h1 className="text-lg font-semibold w-fit self-start opacity-40">
                                ${pricePerSubmission}
                            </h1>
                        </div>
                        <div className="flex justify-between w-full">
                            <h1 className="text-lg font-semibold w-fit self-start opacity-40">
                                Service Fee{" "}
                                <span className="text-base">(2.9% + 0.3)</span>
                            </h1>
                            <h1 className="text-lg font-semibold w-fit self-start opacity-40">
                                ${serviceFee}
                            </h1>
                        </div>
                        <div className="flex justify-between w-full">
                            <h1 className="text-xl font-semibold w-fit self-start">
                                Total Due
                            </h1>
                            <h1 className="text-xl font-semibold w-fit self-start">
                                ${total}
                            </h1>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-black/10"></div>

                    {/* Stripe Elements  */}
                    
                </div>
            </form>
        </div>
    );
};

export default BookSingleTextResponse;
