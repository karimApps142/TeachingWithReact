import { useState } from "react";


const api_key = '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';
const model_name = "image-alpha-001";

const url = "https://api.openai.com/v1/images/generations";

export default function Welcome() {
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState([]);

    const generateImage = async () => {
        setLoading(true)
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${api_key}`,
            },
            body: JSON.stringify({
                model: model_name,
                prompt: prompt,
                n: 2,
                size: '256x256'
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setImage(data.data)
                console.log("Generated image URL:", image_url);
                setLoading(false)

            })
            .catch((error) => console.error(error)).finally(() =>
                setLoading(false)
            )

    }


    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col bg-gray-50-50">
            <div className="w-11/12 h-screen flex items-center justify-center flex-wrap">
                {image?.length ?
                    image.map(i =>
                        <img key={i.url} className="bg-cover w-96 h-96" src={i.url} />) : null}
            </div>
            <input className="w-96 px-4 h-8 border rounded block my-3" placeholder="enter a prompt for a image." value={prompt} onChange={e => setPrompt(e.target.value)} />
            <button disabled={loading} className="w-96 h-8 border-none rounded block my-3 disabled:opacity-25 bg-blue-400 text-white" onClick={generateImage}> Generate Image</button>
        </div>
    );
}
