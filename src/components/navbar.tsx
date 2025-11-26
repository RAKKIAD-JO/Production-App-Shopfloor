import { useState } from "react";
import Station1 from "./station1";
import Station2 from "./station2";
import Station3 from "./station1";


export default function Navbar() {
    const [activeTab, setActiveTab] = useState("station1");

    return (
        <div className="p-5">

            {/* Tabs */}
            <div role="tablist" className="tabs tabs-bordered mb-5">
                <a
                    role="tab"
                    className={`tab ${activeTab === "station1" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("station1")}
                >
                    Station 1
                </a>

                <a
                    role="tab"
                    className={`tab ${activeTab === "station2" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("station2")}
                >
                    Station 2
                </a>

                <a
                    role="tab"
                    className={`tab ${activeTab === "station3" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("station3")}
                >
                    Station 3
                </a>
            </div>

            {/* Content */}
            <div className="p-5 border rounded-lg">
                {activeTab === "station1" && <Station1 />}
                {activeTab === "station2" && <Station2 />}
                {activeTab === "station3" && <Station3 />}
            </div>
        </div>
    );
}
