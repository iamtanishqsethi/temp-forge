import { useEffect, useState } from "react";

const TransitionComp = () => {
    const features = [
        {
            title: 'Personalized Storage',
            mainText: 'Accessible',
            description: 'Securely store all your prompts in a personalized cloud storage system, customized to your preferences and workflow. Access your saved content effortlessly from any device, anytime you need inspiration or reference.'
        },
        {
            title: 'Post Your Prompts',
            mainText: 'Shareable',
            description: 'Share your most creative prompts with a supportive online community of like-minded individuals. Gain constructive feedback, spark discussions, and build connections by showcasing your work and engaging with others" ideas.'
        },
        {
            title: 'AI',
            mainText: 'Intelligent',
            description: 'Harness the power of advanced AI tools to elevate your creative process. From generating unique prompt suggestions to refining your ideas with smart insights, this feature helps you work smarter and unlock new levels of innovation.'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(index => (index + 1) % features.length);
        }, 3500);

        return () => {
            clearInterval(interval);
        };
    }, [features.length]);

    return (
        <div className="bg-lightGreen w-full lg:w-[49.5%] rounded-3xl text-black text-left p-4 md:p-8 relative my-4 lg:my-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold my-2">Why TempForge?</h1>

            <div className="flex flex-wrap items-center my-4 md:my-6 gap-2 md:gap-4">
                {features.map((feature, index) => (
                    <h1
                        key={feature.title}
                        className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-full transition-all duration-500 ${
                            index === currentIndex ? 'bg-black text-lightGreen' : 'border-black text-black border-2'} cursor-pointer`}
                        onClick={() => setCurrentIndex(index)}>
                        {feature.title}
                    </h1>
                ))}
            </div>

            <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[6.5rem] leading-tight my-4 font-medium animate-fadeIn"
                key={features[currentIndex].mainText}
            >
                {features[currentIndex].mainText}
            </h1>

            <div className="h-[3.5px] w-[80%] bg-black rounded-full"></div>

            <p
                className="text-sm md:text-base text-black py-4 md:py-8 w-full md:w-[80%] lg:w-[70%] animate-fadeIn"
                key={features[currentIndex].description}
            >
                {features[currentIndex].description}
            </p>

            <svg
                className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-16 h-16 md:w-24 md:h-24"
                viewBox="0 0 105 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M43.8 107.7L44.4 66.3L8.7 88.2L2.23517e-07 74.7L37.2 52.8L1.2 31.2L9.9 18L44.1 39.3L43.8 -1.43051e-05H60L59.7 39L93.6 18L102.6 31.2L66.6 52.8L104.1 74.7L94.8 88.2L59.4 66.3L60 107.7H43.8Z"
                    fill="white"
                />
            </svg>
        </div>
    );
};

export default TransitionComp;