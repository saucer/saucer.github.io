import { useAnimate } from "motion/react";
import { type ComponentProps, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";

export default function Logo({ ...props }: ComponentProps<"svg">)
{
    const [ref, hover] = useAnimate();
    const largeDisplay = useMediaQuery("(min-width: 85rem)");

    useEffect(() =>
    {
        if (!ref || !ref.current)
        {
            return;
        }

        hover(ref.current, {
            y: [-10, 0, 10, 0, -10],
        }, {
            bounce: 0.75,
            bounceDamping: 5,
            duration: 5,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
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
                xlinkHref="/src/assets/torus.png"
            >
            </image>
            <image
                x="102.957"
                y="130.13625"
                width="168.95999"
                height="113.27999"
                preserveAspectRatio="none"
                xlinkHref="/src/assets/hand.png"
            >
            </image>
            <image
                x="81.01725"
                y="267.00751"
                width="214.32001"
                height="57.84"
                preserveAspectRatio="none"
                xlinkHref="/src/assets/text.png"
            >
            </image>
        </svg>
    );
}
