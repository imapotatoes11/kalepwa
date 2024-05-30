"use client";
import Shed from "@/components/shed";
import axios from "axios";
import {useEffect, useState} from "react";

const fetchJsonData = async (url: string): Promise<any> => {
    const response = await axios.get(url);
    return response.data;
};
function getCurrentDateFormatted(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${month}-${day}-${year}`;
}

// async function getScheduleData(): Promise<any> {
//     const url = "http://localhost:8000/schedule/get/05-22-24";
//
//     try {
//         const response = await fetch(url, {method: "GET"});
//         if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching schedule data:", error);
//         throw error; // Re-throw the error for further handling (optional)
//     }
// }
function formatDateString(dateStr: string): string {
    try {
        // Array of month names
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Extract the parts of the input date string
        const [month, day, year] = dateStr.split('-').map(Number);

        // Get the full year
        const fullYear = year < 70 ? 2000 + year : 1900 + year;

        // Determine the suffix for the day (1st, 2nd, 3rd, 4th, etc.)
        const daySuffix = (day: number): string => {
            if (day >= 11 && day <= 13) return 'th';
            switch (day % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        };

        // Format the date
        return `${months[month - 1]} ${day}${daySuffix(day)}, ${fullYear}`;
    } catch (error) {
        // error means api request is in progress
        return "...";
    }
}

export default function Home() {
    const [data, setData] = useState<any>({empty: true, periods: []});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = `https://142.198.249.98:10006/schedule/get/${getCurrentDateFormatted()}`; // Replace with your API endpoint

        const fetchData = async () => {
            try {
                const jsonData = await fetchJsonData(url);
                setData(jsonData);
            } catch (err) {
                setError((err as Error).message);
            }
        };
            fetchData();
    }, []);

    // let schedule: string = "-";
    // const [schedule, setSchedule] = useState<string>("-");

    // useEffect(() => {
    //     getScheduleData()
    //         .then(data => {
    //             console.log("Retrieved schedule data...");
    //             // schedule = data
    //             setSchedule(data);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching schedule data:", error);
    //         });
    // }, [])
    return (
        <main className="flex min-h-screen flex-row items-center justify-between p-6">
            {/*<button>lb</button>*/}
            <div className="bg-white dark:bg-black py-12 px-6 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold">{formatDateString(data.date)}</h1>
                {data.periods.map((period: any) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <Shed period={period.period} course={period.course} name={period.name} teacher={period.teacher} room={period.room} time1={period.time1} time2={period.time2}/>
                    )
                })}
            </div>
            {/*<button>rb</button>*/}
        </main>
    )
}