"use client";
import Shed from "@/components/shed";

async function getScheduleData(): Promise<any> {
    const url = "http://localhost:8000/schedule/get/05-22-24";

    try {
        const response = await fetch(url, {method: "GET"});
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching schedule data:", error);
        throw error; // Re-throw the error for further handling (optional)
    }
}

export default function Home() {
    let schedule: string = "-";

    getScheduleData()
        .then(data => {
            console.log("Retrieved schedule data...");
            schedule = data
        })
        .catch(error => {
            console.error("Error fetching schedule data:", error);
        });
    return (
        <main className="flex min-h-screen flex-row items-center justify-between p-6">
            <button>lb</button>
            <div className="bg-white py-12 px-6 rounded-2xl shadow-xl">
                main
                <Shed />
                <p>{schedule.toString()}</p>
            </div>
            <button>rb</button>
        </main>
    )
}