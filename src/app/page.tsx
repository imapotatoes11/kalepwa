"use client";
import Shed from "@/components/shed";
import axios from "axios";
import { useEffect, useState } from "react";

const fetchJsonData = async (url: string): Promise<any> => {
    const response = await axios.get(url);
    return response.data;
};

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
    const [data, setData] = useState<any>({empty: true});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = 'http://localhost:8000/schedule/get/05-22-24'; // Replace with your API endpoint

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

    // TODO: are u kidding me its cuz localhost dont work on idx
    // cuz its a different machine

    // let schedule: string = "-";
    const [schedule, setSchedule] = useState<string>("-");

    useEffect(() => {
        getScheduleData()
            .then(data => {
                console.log("Retrieved schedule data...");
                // schedule = data
                setSchedule(data);
            })
            .catch(error => {
                console.error("Error fetching schedule data:", error);
            });
    }, [])
    return (
        <main className="flex min-h-screen flex-row items-center justify-between p-6">
            <button>lb</button>
            <div className="bg-white py-12 px-6 rounded-2xl shadow-xl">
                main
                {/*TODO: data.date is [object Object] for some reason*/}
                {JSON.stringify(data.date)}
                {typeof data.period}
                <Shed period={data.period} course={data.course} name={data.name} teacher={data.teacher} room={data.room} time1={data.time1} time2={data.time2}/>
                <p>{`${schedule}`}</p>
                <p>{JSON.stringify(data)}</p>
            </div>
            <button>rb</button>
        </main>
    )
}