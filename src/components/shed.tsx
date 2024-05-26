export default function Shed({
    period,
    course,
    name,
    teacher,
    room,
    time1,
    time2
}: {
    period: string;
    course: string;
    name: string;
    teacher: string;
    room: string;
    time1: string;
    time2: string;
}) {
    return (
        <main className="w-96 flex flex-row bg-white p-4 px-6 rounded-lg gap-12 shadow-md justify-between">
            <div className="my-0.5">
                <p>{`${time1}` === "undefined" ? "--:--" : time1} - {`${time2}` === "undefined" ? "--:--" : time2}</p> {"\n"}
                <p className="text-sm text-gray-500">P{period} RM {room}</p>
            </div>
            <div>
                <p className="font-bold text-lg">{`${course}`.toUpperCase()}</p>
                <p>{`${name}` === "undefined" ? "N/A" : (name.length > 24 ? name.substring(0, 24) + "..." : name)}</p>
                <p className="text-md">{`${teacher}` === "undefined" ? "-" : teacher}</p>
            </div>
        </main>
    )
}