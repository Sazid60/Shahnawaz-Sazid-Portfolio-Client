"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import FuzzyText from "@/components/solo-components/FuzzyText";


export default function NotFoundPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <div className="max-w-md text-center">
                <FuzzyText
                    baseIntensity={0.2}
                    hoverIntensity={0.5} 
                    enableHover={true}     
                >
                    404
                </FuzzyText>

                <h2 className="mt-2 text-2xl font-semibold ">
                    Page not found
                </h2>
                <p className="mt-2 ">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>

                <div className="mt-6">
                    <Button variant={"violet"} >
                        <Link href="/">Go Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
