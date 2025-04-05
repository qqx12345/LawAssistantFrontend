import { useRef, useEffect, useState } from 'react';
import { IoCloseSharp } from'react-icons/io5';
import Style from './tuisong.module.css';
const AdBanner = ( props: { token: string | null }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [story, setstory] = useState<{
        ID: number;
        Title: string;
        Content: string;
        CreatedAt: string;
    } | null>(null);

    async function fetchRandomStory() {
        try {
            const response = await fetch('/api/story/get', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${props.token}`,
                    "Content-Type": "application/json"
                }
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const result = await response.json();
            
            if (result.code === 200 && result.data) {
                setstory(result.data); // 更新状态
                return result.data;
            }
            throw new Error('Invalid response structure');
        } catch (error) {
            console.error('获取故事失败:', error);
            return null;
        }
    }

    useEffect(() => {
        fetchRandomStory().then(() => {ref.current?.classList.add("active");});
    }, []);

    function close() {
        if (ref.current?.classList.contains("active")) {
            ref.current?.classList.remove("active");
        }
        else {
            ref.current?.classList.add("active");
        }
    }

    return (
        <div className={Style.adContainer} ref={ref}>
            <div className={Style.close}>
                <IoCloseSharp style={{ width: "24px", height: "24px" }} onClick={close} />
            </div>
            <div className={Style.card2}>
            <span className={Style.tuson}>今日推送</span>
                <div className={Style.contentBox}>
                    <span className={Style.cardTitle}>{story?.Title}</span>
                    <p className={Style.cardContent}>
                        {story?.Content}
                    </p>
                </div>
                <div className={Style.dateBox}>
                    <span className={Style.date}>{story?.CreatedAt.slice(0,5)}</span>
                    <span className={Style.month}>{story?.CreatedAt.slice(6,10)}</span>
                </div>
            </div>
        </div>
    );
};

export default AdBanner;