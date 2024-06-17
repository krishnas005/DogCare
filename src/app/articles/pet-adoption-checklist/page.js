"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Article = () => {
    const router = useRouter();

    return (
        <div className="container mx-auto p-4 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
                <article className="prose lg:prose-xl mx-auto p-6">
                    <h1 className="text-center mb-8 text-4xl tracking-tighter font-bold">Pet Adoption Checklist</h1>
                    <div className="relative w-full h-64 lg:h-96 mb-8">
                        <Image
                            src="/adoption-article.jpg"
                            alt="adoption article"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                    </div>
                    <div className="text-lg text-gray-700 leading-relaxed">
                        <p>Congratulations on adopting a pet! You are embarking on a wonderful and rewarding relationship. Adopting a new pet comes with a lot of change for both pet and pet parent, but it also comes with a lot of responsibilities. Here are some key points to consider before bringing a new pet into your home:</p>
                        
                        <h2 className="text-2xl font-semibold mt-8 mb-4">Size Considerations (for Dogs)</h2>
                        <ul className="list-disc list-inside">
                            <li>What size dog can your home accommodate?</li>
                            <li>Will you have enough room if your dog grows to be bigger than expected?</li>
                            <li>What size pet would suit the other people who live in or visit your home regularly?</li>
                            <li>Do you have another pet to consider when choosing the size of your next pet?</li>
                            <li>How big a pet can you travel comfortably with?</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Pet Costs</h2>
                        <ul className="list-disc list-inside">
                            <li>The adopting agency will likely charge a fee to help defray the cost of taking in unwanted or lost animals.</li>
                            <li>You may need to pay for your adopted pet to be spayed or neutered before bringing them home.</li>
                            <li>Mandatory expenses for all pets include food, routine veterinary care, licensing, collars, leashes, identification tags, kitty litter and box, and basic grooming equipment and supplies.</li>
                            <li>Recommended but optional expenditures include permanent identification (e.g., microchip or tattoo), training classes, additional grooming supplies or professional grooming, a spare collar or leash, a bed and toys, and a crate or carrier.</li>
                            <li>Unexpected costs can arise from accidents and illnesses, which may require costly emergency veterinary care. Recovery tools for finding a missing pet can include posters and rewards. Pets with special physical or behavioral challenges may require specialized professional support.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Time Considerations</h2>
                        <ul className="list-disc list-inside">
                            <li>Pets need to be fed two to three times a day and need a constant supply of fresh water.</li>
                            <li>A responsible pet parent should spend at least one hour per day giving direct attention to their pet. This may include training, exercising, grooming, and playing, or with cats, it may just be lap time on the couch. Dogs will need to be taken out to potty several times a day.</li>
                            <li>Pets with an abundance of energy need more time to exercise and interactive toys to keep them entertained.</li>
                            <li>Pets with long coats need 20 minutes a day of grooming to prevent matting.</li>
                            <li>Pets with certain medical conditions may need additional attention, including specifically timed injections in the case of diabetic animals.</li>
                            <li>Remember that adopted pets may need additional bonding and reassurance time in the early weeks.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Shopping Checklist</h2>
                        <p>It may be a good idea to wait until you select your new pet before you begin shopping for supplies. For example, some items, such as food and water bowls or collars and harnesses, depend upon the size of the pet you will be adopting.</p>
                        <p>Also, be sure to find out which food your pet was eating in the shelter or foster home so that you can provide the same in the beginning, again to ease the transition. After the pet has settled in, talk with your veterinarian about switching to the food of your choice.</p>
                        <p>Once you've selected your pet, here's a checklist of supplies you may need:</p>
                        
                        <h3 className="text-xl font-semibold mt-6 mb-2">Necessary Items for Dogs:</h3>
                        <ul className="list-disc list-inside">
                            <li>Food and water bowls</li>
                            <li>Food (canned and/or dry)</li>
                            <li>Collar</li>
                            <li>Four to six-foot leash</li>
                            <li>ID tag with your phone number</li>
                            <li>Hard plastic carrier or foldable metal crate</li>
                            <li>Dog bed</li>
                            <li>Doggy shampoo and conditioner</li>
                            <li>Nail clippers</li>
                            <li>Canine toothbrush and toothpaste</li>
                            <li>Brush or comb (depends on your pet's coat length and type)</li>
                            <li>Super-absorbent paper towels</li>
                            <li>Sponge and scrub brush</li>
                            <li>Non-toxic cleanser</li>
                            <li>Enzymatic odor neutralizer</li>
                            <li>Plastic poop baggies (biodegradable ones are best) or pooper scooper</li>
                            <li>Absorbent house-training pads</li>
                            <li>Variety of toys (a ball, rope, chew toy and puzzle toy are good starts)</li>
                            <li>Variety of treats (such as small cookies, larger rawhides, etc.)</li>
                            <li>First-aid supplies</li>
                            <li>Baby gate(s)</li>
                        </ul>

                        <p className="mt-8">By following this checklist, you can ensure a smooth transition for your new pet and create a loving home environment.</p>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default Article;
