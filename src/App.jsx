import Room from "./room";
import bgImage from "./assets/bg.svg";
import text from "./assets/text.svg";

function App() {
    return (
        <div
            style={{
                background: `url(${bgImage})`,
                backgroundColor: "#002233",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="min-w-screen min-h-screen text-white flex flex-col"
        >
            <header className="w-100 flex justify-center py-4">
                <div>
                    <img src={text} className="w-[600px]" />
                </div>
            </header>
            <Room />
        </div>
    );
}

export default App;
