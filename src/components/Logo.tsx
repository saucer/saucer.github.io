import { useAnimate } from "motion/react";
import { type ComponentProps, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";

import imageTorus from "../assets/torus.png";
import imageHand from "../assets/hand.png";
import imageText from "../assets/text.png";

export default function Logo({ ...props }: ComponentProps<"svg">)
{
    const [ref, animate] = useAnimate();
    const largeDisplay = useMediaQuery("(min-width: 85rem)");

    useEffect(() =>
    {
        if (!ref || !ref.current)
        {
            return;
        }

        animate(ref.current, {
            y: [-10, 10],
            rotate: [1, -3],
        }, {
            type: "tween",
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
        });
    }, [ref]);

    return (
        <svg
            zoomAndPan="magnify"
            height={largeDisplay ? 350 : 200}
            viewBox="0 0 375 374.999991"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <image
                ref={ref}
                x="129.16725"
                y="37.5"
                width="106.08"
                height="92.159996"
                preserveAspectRatio="none"
                xlinkHref={imageTorus.src}
            >
            </image>
            <image
                x="102.957"
                y="130.13625"
                width="168.95999"
                height="113.27999"
                preserveAspectRatio="none"
                xlinkHref={imageHand.src}
            >
            </image>
            <image
                x="81.01725"
                y="267.00751"
                width="214.32001"
                height="57.84"
                preserveAspectRatio="none"
                xlinkHref={imageText.src}
            >
            </image>
        </svg>
    );
}
